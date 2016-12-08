module Main.Types exposing (..)

import Time exposing (Time)


type alias Model =
    { isMinimised : Bool
    , selectedProject : Maybe Project
    , unselectedProjects : List Project
    }


type alias Project =
    { name : String
    , url : String
    , selectedDeliverable : Maybe Deliverable
    , unselectedDeliverables : List Deliverable
    }


type alias Deliverable =
    { name : String
    , url : String
    , recording : Recording
    }


type alias Recording =
    { startTime : Maybe Time
    , intervals : List Interval
    }


type alias Interval =
    { start : Time
    , end : Time
    }


type Msg
    = SelectDeliverable Project Maybe Deliverable
    | SelectProject Maybe Project
    | SetProjects (List Project)
    | ToggleRecording Project Deliverable
