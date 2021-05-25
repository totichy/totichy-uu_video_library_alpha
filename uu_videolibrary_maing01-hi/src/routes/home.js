//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent, useRef, useLsi, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config.js";
import VideoList from "../bricks/video-list.js";
import VideoProvider from "../bricks/video-provider.js";
import VideoCreate from "../bricks/video-create.js";
import VideoLsi from "../config/video";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

function categorySelection(queryString) {
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get("category");
}

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
      });
    }

    function showSuccess(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "green",
        closeTimer: 3000,
      });
    }

    async function handleCreateVideo(video) {
      try {
        await createVideoRef.current(video);
        showSuccess(`${videoWithTitle} ${video.title} ${wasCreatedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`ERROR: ${e.response.data.message}`);
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
          showError(`ERROR: ${e.response.data.message}`);
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
          showError(`ERROR: ${e.response.data.error_message}`);
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
      videos.sort((a, b) => (a.code < b.code ? 1 : -1));
      console.log(videos);
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
        console.log(videox);
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
