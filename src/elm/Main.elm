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
              , url = "create_ads"
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
