//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-block-layout";
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
    onRating: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    videos: [],
    onDelete: () => {},
    onRating: () => {},
    onUpdate: () => {},
  },
  //@@viewOff:defaultProps
  render({ videos, onDelete, onRating, onUpdate }) {
    //@@viewOn:private
    const noVideo = VideoLsi.noVideo || {};

    let noVideoCgi = useLsi(noVideo);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (videos.length === 0) {
      return (
        <>
          <UU5.Common.Error content={noVideoCgi} />
        </>
      );
    }
    return (
      <>
        {videos.map((video, index) => {
          return (
            <UU5.Bricks.Div key={index}>
              <Video video={video.data} onDelete={onDelete} onUpdate={onUpdate} onRating={onRating} />
            </UU5.Bricks.Div>
          );
        })}
      </>
    );
    //@@viewOff:render
  },
});

export default VideoList;
