module Main.View exposing (view)

import Main.Utils exposing (allProjects, allDeliverables)
import Main.Types exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, disabled, selected, href)
import Html.Events exposing (on, targetValue, onClick)
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
    in
        div [ class topClass ]
            [ div
                [ class "TimeTracker-timer"
                , onClick ToggleMinimise
                ]
                [ div
                    [ class "TimeTracker-timer-time"
                    ]
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
