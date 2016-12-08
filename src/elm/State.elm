module Main exposing (..)

import Main.State exposing (init, update)


nowPlaceholder =
    32412341234


init : List Project -> Model
init unselectedProjects =
    { isMinimised = False
    , selectedProject = Nothing
    , unselectedProjects = unselectedProjects
    }


update : Msg Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SelectDeliverable project maybeDeliverable ->
            ( model, Cmd.none )

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
                newSelectedProject =
                    case selectedProject of
                        Nothing ->
                            model.selectedProject

                        Just proj ->
                            case proj.selectedDeliverable of
                                Nothing ->
                                    model.selectedProject

                                Just deliv ->
                                    let
                                        newDeliverable =
                                            { deliv
                                                | recording =
                                                    toggleRecording deliv.recording
                                            }
                                    in
                                        { proj
                                            | deliverable = newDeliverable
                                        }
            in
                ( model, Cmd.none )


toggleRecording : Recording -> Recording
toggleRecording recording =
    case recording.startTime of
        Nothing ->
            { recording | startTime = nowPlaceholder }

        Just aStartTime ->
            let
                newInterval =
                    TimeInterval recording.startTime nowPlaceholder
            in
                { recording
                    | startTime = Nothing
                    , intervals = newInterval :: recording.intervals
                }


allProjects : Model -> List Project
allProjects model =
    case model.selectedProject of
        Nothing ->
            model.unselectedProjects

        Just aProject ->
            aProject :: model.unselectedProjects
