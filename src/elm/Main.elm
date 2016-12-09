module Main exposing (..)

import Main.Types exposing (Model, Msg)
import Main.State exposing (init, update)
import Main.View exposing (view)
import Html


placeholderProjects =
    [ { name = "Useless Project"
      , url = "useless.co.uk"
      , selectedDeliverable = Nothing
      , unselectedDeliverables =
            [ { name = "Create useless ads"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            , { name = "Talk to useless clients"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            , { name = "Create a useless logo"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            ]
      }
    , { name = "Rushed Project"
      , url = "rushed.co.uk"
      , selectedDeliverable = Nothing
      , unselectedDeliverables =
            [ { name = "Create rushed ads"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            , { name = "Talk to rushed clients"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            , { name = "Create a rushed logo"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            ]
      }
    , { name = "Big Project"
      , url = "big.co.uk"
      , selectedDeliverable = Nothing
      , unselectedDeliverables =
            [ { name = "Create big ads"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            , { name = "Talk to big clients"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            , { name = "Create a big logo"
              , url = "http://create_logo.com"
              , recording =
                    { startTime = Nothing
                    , intervals = []
                    }
              }
            ]
      }
    ]



-- APP


main : Program Never Model Msg
main =
    Html.program
        { init = ( init placeholderProjects, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
