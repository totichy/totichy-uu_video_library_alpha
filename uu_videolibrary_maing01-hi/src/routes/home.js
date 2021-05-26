//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent, useRef, useLsi, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config.js";
import VideoList from "../bricks/video-list.js";
import VideoProvider from "../bricks/video-provider";
import VideoCreate from "../bricks/video-create";
import VideoLsi from "../config/video";
import Calls from "../calls";
import Errors from "../config/errors";
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
    const ratingVideoRef = useRef();
    const updateVideoRef = useRef();
    //@@viewOff:hook

    const delVideoText = VideoLsi.delVideo || {};
    const wasDeleted = VideoLsi.wasDeleted || {};
    const wasCreated = VideoLsi.wasCreated || {};
    const createError = VideoLsi.errorCreate || {};
    const errorServerData = VideoLsi.errorServer || {};
    const AllVideos = VideoLsi.AllVideos || {};
    const SelectedVideos = VideoLsi.SelectedVideos || {};

    let VideoListHeader = useLsi(AllVideos);
    let SelectedVideoListHeader = useLsi(SelectedVideos);
    let videoWithTitle = useLsi(delVideoText);
    let wasDeletedC = useLsi(wasDeleted);
    let wasCreatedC = useLsi(wasCreated);
    let errorCreated = useLsi(createError);
    let serverErrorData = useLsi(errorServerData);
    let VideoHeader = VideoListHeader;
    
    const errorTtl = Errors.titleError || {};
    let headerError =  useLsi(errorTtl);
    const errorDn = Errors.titleDone || {};
    let headerDone =  useLsi(errorDn);

    function categorySelection(queryString) {
      let urlParams = new URLSearchParams(queryString);
      return urlParams.get("category");
    }

    const categoryListResult = useDataList({
      handlerMap: {
        load: Calls.listCategory,
      },
      initialDtoIn: { data: {} },
    });

    const categoryMap = {};
    if (categoryListResult.data) {
      categoryListResult.data.forEach(
        (category) => (categoryMap[category.data.categoryId] = category.data.categoryName)
      );
    }

    const dada = categoryMap[categorySelection(window.location.search)];

  
    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "red",
        closeTimer: 3000,
        header: headerError,
        block: true,
      });
    }

    function showSuccess(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "green",
        closeTimer: 3000,
        header: headerDone,
        block: true,
      });
    }

    async function handleCreateVideo(video) {
      try {

        
        await createVideoRef.current(video);
        showSuccess(`${videoWithTitle} ${video.title} ${wasCreatedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.error[0].message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(errorCreated);
        } else {
          showError(errorCreated);
        }
      }
    }

    async function handleUpdateVideo(video) {
      try {
        await updateVideoRef.current(video);
        showSuccess(`${videoWithTitle} ${video.title} ${wasCreatedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(errorCreated);
        } else {
          showError(errorCreated);
        }
      }
    }

    async function handleDeleteVideo(video) {
      try {
        await deleteVideoRef.current({ code: video.code }, video.code);
        showSuccess(`${videoWithTitle} ${video.title} ${wasDeletedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.error_message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(`Deletion of ${video.title} is failed.`);
        } else {
          showError(`Deletion of ${video.title} is failed.`);
        }
      }
    }

    async function handleRatingVideo(video, mrating) {
      try {
        await ratingVideoRef.current({ code: video.code, mrating: Number(mrating) });
        showSuccess("Děkujeme za hodnocení, které bylo: " + mrating);
      } catch (e) {
        showError(`Rating of ${video.title} is failed.`);
      }
    }
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderError(errorData) {
      return <UU5.Bricks.Error content={serverErrorData} />;
    }

    if (dada != null) {
      VideoHeader = SelectedVideoListHeader + ": " + dada;
    }

    function renderReady(videos) {
    

      var videox;
      if (categorySelection(window.location.search) === null) {
        videox = videos;
      } else {
        videox = videos.filter(function (hero) {
          return (
            hero.data.category.find((element) => element == categorySelection(window.location.search)) ===
            categorySelection(window.location.search)
          );
        });
      }
      return (
        <>
          <VideoCreate onCreate={handleCreateVideo} />
          <UU5.Bricks.Section>
            <div>
              <UU5.Bricks.Container>
                <UU5.Bricks.Header level={3} content={VideoHeader} underline={true} />
                <Uu5Tiles.ControllerProvider data={videox}>
                  <Uu5Tiles.InfoBar />
                </Uu5Tiles.ControllerProvider>
                <VideoList
                  videos={videox}
                  onDelete={handleDeleteVideo}
                  onUpdate={handleUpdateVideo}
                  onRating={handleRatingVideo}
                />
              </UU5.Bricks.Container>
            </div>
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
            ratingVideoRef.current = handlerMap.ratingVideo;
            updateVideoRef.current = handlerMap.updateVideo;

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
                data.sort((a, b) => (a.data.code < b.data.code ? 1 : -1));
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
