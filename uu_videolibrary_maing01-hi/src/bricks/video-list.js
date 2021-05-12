//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import Video from "./video";
import VideoLsi from "../config/video";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const VideoList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    videos: UU5.PropTypes.array,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    videos: [],
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ videos, onDelete }) {
    //@@viewOn:private
    const noVideo = VideoLsi.noVideo || {};
    const AllVideos = VideoLsi.AllVideos || {};

    let noVideoCgi = useLsi(noVideo);
    let VideoListHeader = useLsi(AllVideos);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (videos.length === 0) {
      return (
        <div>
          <UU5.Bricks.Container>
            <UU5.Bricks.Header level="1" content={VideoListHeader} underline={true} />
            <UU5.Common.Error content={noVideoCgi} />
          </UU5.Bricks.Container>
        </div>
      );
    }
    return (
      <div>
        <UU5.Bricks.Container>
          <UU5.Bricks.Header level="1" content={VideoListHeader} underline={true} />
          {videos.map((video) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <UU5.Bricks.Div>
                <Video key={video.code} video={video} onDelete={onDelete} />
              </UU5.Bricks.Div>
            );
          })}
        </UU5.Bricks.Container>
      </div>
    );
    //@@viewOff:render
  },
});

export default VideoList;
