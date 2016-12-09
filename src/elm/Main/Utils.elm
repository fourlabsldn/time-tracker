module Main.Utils exposing (..)

import Main.Types exposing (..)


allProjects : Model -> List Project
allProjects model =
    case model.selectedProject of
        Nothing ->
            model.unselectedProjects

        Just aProject ->
            aProject :: model.unselectedProjects


allDeliverables : Project -> List Deliverable
allDeliverables project =
    case project.selectedDeliverable of
        Nothing ->
            project.unselectedDeliverables

        Just deliv ->
            deliv :: project.unselectedDeliverables
