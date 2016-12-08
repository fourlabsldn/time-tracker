module Main.View exposing (view)

import Main.Types exposing (..)
import Html.Elements exposing (..)
import Html.Attributes exposing (class)


view : Model -> Html Msg
view model =
    div [ class "TimeTracker" ]
        [ div
            [ class "TimeTracker-timer" ]
            [ div
                [ class "TimeTracker-timer-time" ]
                [ text "00:00" ]
            ]
        , div
            [ class "TimeTracker-fields" ]
            [ div
                [ class "TimeTracker-projects" ]
                [ div [ class "Select" ] []
                , a [ class "TimeTracker-projects-link btn btn-disabled fa fa-link" ] []
                ]
            , div [ class "TimeTracker-deliverables" ]
                [ div [ class "Select" ] []
                , a [ class "TimeTracker-deliverables-link btn btn-disabled fa fa-link" ] []
                ]
            , button
                [ class "TimeTracker-start-stop btn btn-default" ]
                [ text "Start" ]
            ]
        ]
