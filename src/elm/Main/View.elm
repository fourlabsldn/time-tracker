module Main.View exposing (view)

import Main.Utils exposing (allProjects, allDeliverables)
import Main.Types exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, disabled, selected, href)
import Html.Events exposing (on, targetValue, onClick)
import List.Extra
import Json.Decode as Json
import Time exposing (Time)


type alias RecordingInfo =
    { project : Project
    , deliverable : Deliverable
    , recording : Recording
    }


view : Model -> Html Msg
view model =
    let
        availableProjects =
            allProjects model

        availableDeliverables =
            case model.selectedProject of
                Nothing ->
                    []

                Just aProject ->
                    allDeliverables aProject

        projectLink =
            model.selectedProject
                |> Maybe.map .url
                |> Maybe.withDefault ""

        projectLinkClass =
            model.selectedProject
                |> Maybe.map (\_ -> "danger")
                |> Maybe.withDefault "disabled"

        deliverableLink =
            model.selectedProject
                |> Maybe.andThen .selectedDeliverable
                |> Maybe.map .url
                |> Maybe.withDefault ""

        deliverableLinkClass =
            model.selectedProject
                |> Maybe.andThen .selectedDeliverable
                |> Maybe.map (\_ -> "danger")
                |> Maybe.withDefault "disabled"

        topClass =
            if model.isMinimised then
                "TimeTracker TimeTracker--minimised"
            else
                "TimeTracker"

        runningTime =
            model.selectedProject
                |> Maybe.andThen .selectedDeliverable
                |> Maybe.map .recording
                |> Maybe.map (totalDuration model.clock)
                |> Maybe.withDefault 0
                |> prettyTime

        onStartClick =
            model.selectedProject
                |> Maybe.andThen .selectedDeliverable
                |> Maybe.map2 ToggleRecording model.selectedProject
                |> Maybe.withDefault DoNothing

        startClickEnabled =
            model.selectedProject
                |> Maybe.andThen .selectedDeliverable
                |> Maybe.map (\_ -> True)
                |> Maybe.withDefault False

        isRecordingOn =
            model.selectedProject
                |> Maybe.andThen .selectedDeliverable
                |> Maybe.map .recording
                |> Maybe.map isRecording
                |> Maybe.withDefault False
    in
        div [ class topClass ]
            [ div
                [ class <|
                    if isRecordingOn then
                        "TimeTracker-timer TimeTracker-timer--recording"
                    else
                        "TimeTracker-timer"
                , onClick ToggleMinimise
                ]
                [ div
                    [ class "TimeTracker-timer-time"
                    ]
                    [ text runningTime ]
                ]
            , div
                [ class "TimeTracker-fields" ]
                [ div
                    [ class "TimeTracker-projects" ]
                    [ select
                        [ class "Select"
                        , onChange
                            (\n ->
                                availableProjects
                                    |> List.Extra.find (\p -> p.name == n)
                                    |> SelectProject
                            )
                        ]
                      <|
                        (::)
                            (option [ disabled True, selected True ] [ text "Select..." ])
                            (availableProjects |> List.map (\p -> option [] [ text p.name ]))
                    , a
                        [ class <| "TimeTracker-projects-link btn btn-" ++ projectLinkClass ++ " fa fa-link"
                        , href projectLink
                        ]
                        []
                    ]
                , div
                    [ class "TimeTracker-deliverables"
                    , onChange
                        (\n ->
                            let
                                project =
                                    model.selectedProject

                                deliverable =
                                    model.selectedProject
                                        |> Maybe.map allDeliverables
                                        |> Maybe.map (List.Extra.find (\d -> d.name == n))

                                cmd =
                                    Maybe.map2 SelectDeliverable project deliverable
                            in
                                case cmd of
                                    Nothing ->
                                        DoNothing

                                    Just aCommand ->
                                        aCommand
                        )
                    ]
                    [ select [ class "Select" ] <|
                        (::)
                            (option [ disabled True, selected True ] [ text "Select..." ])
                            (availableDeliverables |> List.map (\d -> option [] [ text d.name ]))
                    , a
                        [ class <| "TimeTracker-deliverables-link btn btn-" ++ deliverableLinkClass ++ "  fa fa-link"
                        , href deliverableLink
                        ]
                        []
                    ]
                , button
                    [ class <|
                        if isRecordingOn then
                            "TimeTracker-start-stop btn btn-danger"
                        else
                            "TimeTracker-start-stop btn btn-default"
                    , onClick onStartClick
                    , disabled <| not startClickEnabled
                    ]
                    [ text <|
                        if isRecordingOn then
                            "Pause"
                        else
                            "Start"
                    ]
                , div [] <| (allStartedTimers model |> List.map (recordingInfoView model.clock))
                ]
            ]


onChange : (String -> Msg) -> Attribute Msg
onChange tagger =
    let
        decoder =
            targetValue
                |> Json.map tagger
    in
        on "change" decoder


totalDuration : Time -> Recording -> Float
totalDuration clock recording =
    let
        intervalsDuration =
            recording.intervals
                |> List.map (\i -> i.end - i.start)
                |> List.foldl (+) 0

        runningTime =
            case recording.startTime of
                Nothing ->
                    0

                Just aTime ->
                    clock - aTime
    in
        intervalsDuration + runningTime


prettyTime : Time -> String
prettyTime time =
    toTwoDigits (floor <| Time.inMinutes time)
        ++ ":"
        ++ toTwoDigits (floor <| Time.inSeconds time)


toTwoDigits : Int -> String
toTwoDigits =
    toString >> (++) "00" >> String.right 2


allStartedTimers : Model -> List RecordingInfo
allStartedTimers model =
    model
        |> allRecordingInfos
        |> List.filter (\info -> (<) 0 <| totalDuration model.clock info.recording)


allRecordingInfos : Model -> List RecordingInfo
allRecordingInfos model =
    model
        |> allProjects
        |> List.map projectRecordingInfos
        |> List.concat


projectRecordingInfos : Project -> List RecordingInfo
projectRecordingInfos project =
    allDeliverables project
        |> List.map (\d -> RecordingInfo project d d.recording)


recordingInfoView : Time -> RecordingInfo -> Html Msg
recordingInfoView clock info =
    div
        [ class "TimeTracker-RecordingRow" ]
        [ div
            [ class "TimeTracker-RecordingRow-names" ]
            [ span
                [ class "TimeTracker-RecordingRow-deliverableName" ]
                [ text info.deliverable.name ]
            , span
                [ class "TimeTracker-RecordingRow-projectName" ]
                [ text info.project.name ]
            ]
        , button
            [ class <|
                if isRecording info.recording then
                    "TimeTracker-RecordingRow-start-stop btn fa btn-danger fa-pause"
                else
                    "TimeTracker-RecordingRow-start-stop btn fa btn-info fa-play"
            , onClick (ToggleRecording info.project info.deliverable)
            ]
            []
        , timeTracker clock info.recording
        ]


isRecording : Recording -> Bool
isRecording recording =
    recording
        |> .startTime
        |> Maybe.map (\_ -> True)
        |> Maybe.withDefault False


timeTracker : Time -> Recording -> Html Msg
timeTracker clock recording =
    div
        [ class "TimeTracker-timer-time"
        ]
        [ text <| prettyTime <| totalDuration clock recording ]
