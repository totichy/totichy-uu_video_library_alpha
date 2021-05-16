//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import UU5 from "uu5g04";
import Config from "./config/config.js";
import VideoList from "../bricks/video-list.js";
import VideoProvider from "../bricks/video-provider.js";
import VideoCreate from "../bricks/video-create.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOn:propTypes

  //@@viewOff:propTypes

  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div>
        <VideoProvider>
          {({ error, isLoaded, videos, handleDelete, handleCreate }) => {
            if (error) {
              return (
                <div>
                  <VideoCreate onCreate={handleCreate} />
                  <UU5.Bricks.Container>
                    <UU5.Common.Error content={error} />
                  </UU5.Bricks.Container>
                  <UU5.Bricks.Section>
                    <VideoList videos={videos} onDelete={handleDelete} />
                  </UU5.Bricks.Section>
                </div>
              );
            } else if (!isLoaded) {
              return (
                <div>
                  <UU5.Bricks.Container>
                  <UU5.Bricks.Loading/>
                  </UU5.Bricks.Container>
                </div>
              );
            } else {
              return (
                <>
                  <VideoCreate onCreate={handleCreate} />
                  <UU5.Bricks.Section>
                    <VideoList videos={videos} onDelete={handleDelete} />
                  </UU5.Bricks.Section>
                </>
              );
            }
          }}
        </VideoProvider>
      </div>
    );
    //@@viewOff:render
  },
});

export default Home;
