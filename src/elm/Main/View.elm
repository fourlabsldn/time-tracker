module Main.View exposing (view)

import Main.Utils exposing (allProjects, allDeliverables)
import Main.Types exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, disabled, selected)
import Html.Events exposing (on, targetValue)
import List.Extra
import Json.Decode as Json


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
    in
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
                    , a [ class "TimeTracker-projects-link btn btn-disabled fa fa-link" ] []
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
                    , a [ class "TimeTracker-deliverables-link btn btn-disabled fa fa-link" ] []
                    ]
                , button
                    [ class "TimeTracker-start-stop btn btn-default" ]
                    [ text "Start" ]
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
