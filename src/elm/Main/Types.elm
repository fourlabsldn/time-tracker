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
    , intervals : List TimeInterval
    }


type alias TimeInterval =
    { start : Time
    , end : Time
    }


type Msg
    = DoNothing
    | SelectDeliverable Project (Maybe Deliverable)
    | SelectProject (Maybe Project)
    | SetProjects (List Project)
    | ToggleRecording Project Deliverable
    | ToggleMinimise
