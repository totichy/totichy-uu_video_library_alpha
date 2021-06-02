//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent, useLsi, useDataList  } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import Config from "./config/config.js";
import VideoLsi from "../config/video";
import Calls from "../calls";
import Errors from "../config/errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoDetail",
  //@@viewOff:statics
};

export const VideoDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOn:propTypes

  //@@viewOff:propTypes
  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render(props) {
    const { search } = window.location;
    const query = new URLSearchParams(search);
    
    //@@viewOn:hook
  //   let videoObject = useDataList({
  //     handlerMap: {
  //         load: Calls.getVideo
  //     },
  //     initialDtoIn: {

  //             code: query.get("code")
  //         }
      
  // })

    //@@viewOff:hook

    const delVideoText = VideoLsi.delVideo || {};
    const wasDeleted = VideoLsi.wasDeleted || {};
    const wasCreated = VideoLsi.wasCreated || {};
    const wasUpdated = VideoLsi.wasUpdated || {};
    const createError = VideoLsi.errorCreate || {};
    const updateError = VideoLsi.errorVideoUpdate || {};
    const errorServerData = VideoLsi.errorServer || {};
    const AllVideos = VideoLsi.AllVideos || {};
    const SelectedVideos = VideoLsi.SelectedVideos || {};
    const forTitle = VideoLsi.forTitle || {};

    let resultTitle = useLsi(forTitle);
    let VideoListHeader = useLsi(AllVideos);
    let SelectedVideoListHeader = useLsi(SelectedVideos);
    let videoWithTitle = useLsi(delVideoText);
    let wasDeletedC = useLsi(wasDeleted);
    let wasCreatedC = useLsi(wasCreated);
    let wasUpdatedC = useLsi(wasUpdated);
    let errorCreated = useLsi(createError);
    let errorUpdated = useLsi(updateError);
    let serverErrorData = useLsi(errorServerData);
    let VideoHeader = VideoListHeader;

    const errorTtl = Errors.titleError || {};
    let headerError = useLsi(errorTtl);
    const errorDn = Errors.titleDone || {};
    let headerDone = useLsi(errorDn);

  



  

    //@@viewOn:interface

    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <UU5.Bricks.Section>
          <div>
      
      
      
          </div>
        </UU5.Bricks.Section>
      </div>
    );
    //@@viewOff:render
  },
});

export default VideoDetail;
