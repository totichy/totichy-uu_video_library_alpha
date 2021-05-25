//@@viewOn:imports
//@@import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
//@@import VideoLsi from "../config/video";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoProvider",
  //@@viewOff:statics
};

export const VideoProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render({ children }) {
    //@@viewOn:hooks

    let listData = useDataList({
      itemIdentifier: "code",
      handlerMap: {
        load: Calls.listVideos,
        createVideo: Calls.createVideo,
        deleteVideo: Calls.deleteVideo,
        ratingVideo: Calls.ratingVideo,
        updateVideo: Calls.updateVideo,
      },
    });

    let { state, data, newData, pendingData, errorData, handlerMap } = listData;

    //@@viewOff:hooks

    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return children({ state, data, newData, pendingData, errorData, handlerMap });
    //@@viewOff:render
  },
});

export default VideoProvider;
