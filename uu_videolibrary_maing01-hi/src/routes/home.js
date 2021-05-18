//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent, useRef, useLsi } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import Config from "./config/config.js";
import VideoList from "../bricks/video-list.js";
import VideoProvider from "../bricks/video-provider.js";
import VideoCreate from "../bricks/video-create.js";
import VideoLsi from "../config/video";
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
    //@@viewOn:hook
    const createVideoRef = useRef();
    const deleteVideoRef = useRef();
    //@@viewOff:hook

    const delVideoText = VideoLsi.delVideo || {};
    const wasDeleted = VideoLsi.wasDeleted || {};
    const wasCreated = VideoLsi.wasCreated || {};
    const createError = VideoLsi.errorCreate || {};
    const errorServerData = VideoLsi.errorServer || {};

    let videoWithTitle = useLsi(delVideoText);
    let wasDeletedC = useLsi(wasDeleted);
    let wasCreatedC = useLsi(wasCreated);
    let errorCreated = useLsi(createError);
    let serverErrorData = useLsi(errorServerData);

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
    content,
    colorSchema: "red",
    closeTimer: 1000
      })
    }

    function showSuccess(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
    content,
    colorSchema: "green",
    closeTimer: 1000
      })
    }

    async function handleCreateVideo(video) {
      try {
      await createVideoRef.current(video);
      showSuccess(`${categoryWithTitle} ${video.title} ${wasCreatedC}`);
      } catch (e) {
      showError(errorCreated);
      }
    }    

    async function handleDeleteVideo(video) {
      try {
      await deleteVideoRef.current({code : video.code});
      showSuccess(`${videoWithTitle} ${video.title} ${wasDeletedC}`);
      } catch (e) {
      showError(`Deletion of ${video.title} is failed.`);
      }
    }   
    //@@viewOff:private

    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderError(errorData) {
      return <UU5.Bricks.Error content={serverErrorData} />;
      }

    function renderReady(videos) {

      return (
        <>
          <VideoCreate onCreate={handleCreateVideo} />
          <UU5.Bricks.Section>
            <VideoList videos={videos} onDelete={handleDeleteVideo} />
          </UU5.Bricks.Section>
        </>
      );
    }


    //@@viewOn:interface

    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div>
        <VideoProvider>
          {({ state, data, newData, pendingData, errorData, handlerMap }) => {

            createVideoRef.current = handlerMap.createVideo;
            deleteVideoRef.current = handlerMap.deleteVideo;

            switch (state) {
                case "pending":
                case "pendingNoData":
                  return renderLoad();
                case "error":
                case "errorNoData":
                  return renderError(errorData);
                case "itemPending":
                case "ready":
                case "readyNoData":
                default:
                  return renderReady(data);  
            }

          }}
        </VideoProvider>
      </div>
    );
    //@@viewOff:render
  },
});

export default Home;
