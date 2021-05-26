//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import Config from "./config/config.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NotFoundRoute",
  //@@viewOff:statics
};

export const NotFoundRoute = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOn:propTypes

  //@@viewOff:propTypes

  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hook
    //@@viewOff:hook

    //@@viewOn:private

    return (
      <UU5.Bricks.Div>
        <UU5.Common.Error>
          <UU5.Bricks.Lsi>
            <UU5.Bricks.Lsi.Item language="cs">CHYBA 404 STRÁNKA NENALEZENA</UU5.Bricks.Lsi.Item>
            <UU5.Bricks.Lsi.Item language="en">ERROR 404 NOT FOUND PAGE</UU5.Bricks.Lsi.Item>
          </UU5.Bricks.Lsi>
        </UU5.Common.Error>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default NotFoundRoute;
