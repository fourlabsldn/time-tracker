module Main.State exposing (init, update)

import Main.Types exposing (..)
import Main.Utils exposing (..)
import Time exposing (Time)


nowPlaceholder =
    32412341234


init : List Project -> Model
init unselectedProjects =
    { isMinimised = False
    , selectedProject = Nothing
    , unselectedProjects = unselectedProjects
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SelectDeliverable project maybeDeliverable ->
            let
                isProjectSelected =
                    case model.selectedProject of
                        Nothing ->
                            False

                        Just aProject ->
                            aProject == project
            in
                if not isProjectSelected then
                    ( model, Cmd.none )
                else
                    let
                        newSelectedProject =
                            case maybeDeliverable of
                                Nothing ->
                                    { project
                                        | selectedDeliverable = Nothing
                                        , unselectedDeliverables = allDeliverables project
                                    }

                                Just deliv ->
                                    { project
                                        | selectedDeliverable = Just deliv
                                        , unselectedDeliverables =
                                            allDeliverables project
                                                |> List.filter ((/=) deliv)
                                    }
                    in
                        ( { model
                            | selectedProject = Just newSelectedProject
                            , unselectedProjects =
                                allProjects model
                                    |> List.filter ((/=) newSelectedProject)
                          }
                        , Cmd.none
                        )

        SelectProject maybeProject ->
            let
                newUnselectedProjects =
                    case maybeProject of
                        Nothing ->
                            allProjects model

                        Just aProject ->
                            allProjects model
                                |> List.filter (.name >> ((/=) aProject.name))
            in
                ( { model
                    | selectedProject = maybeProject
                    , unselectedProjects = newUnselectedProjects
                  }
                , Cmd.none
                )

        SetProjects newProjects ->
            ( init newProjects, Cmd.none )

        ToggleRecording project deliverable ->
            let
                newDeliverable =
                    { deliverable
                        | recording =
                            toggleRecording deliverable.recording
                    }

                newProject =
                    { project
                        | selectedDeliverable = Just newDeliverable
                    }
            in
                ( updateProject model newProject
                , Cmd.none
                )


toggleRecording : Recording -> Recording
toggleRecording recording =
    case recording.startTime of
        Nothing ->
            { recording | startTime = Just nowPlaceholder }

        Just aStartTime ->
            let
                newInterval =
                    TimeInterval aStartTime nowPlaceholder
            in
                { recording
                    | startTime = Nothing
                    , intervals = newInterval :: recording.intervals
                }


updateProject : Model -> Project -> Model
updateProject model newProject =
    let
        newProjectIsSelected =
            model.selectedProject
                |> Maybe.map .name
                |> Maybe.map ((==) newProject.name)
                |> Maybe.withDefault False
    in
        if newProjectIsSelected then
            { model
                | selectedProject = Just newProject
            }
        else
            { model
                | unselectedProjects =
                    model.unselectedProjects
                        |> List.map
                            (\p ->
                                if p.name == newProject.name then
                                    newProject
                                else
                                    p
                            )
            }
