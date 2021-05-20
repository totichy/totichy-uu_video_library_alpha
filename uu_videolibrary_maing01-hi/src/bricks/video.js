//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useScreenSize, useSession, useState } from "uu5g04-hooks";
import Config from "./config/config";
import { nl2br } from "../helpers/string-helper";
import VideoDetail from "./video-detail";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Video",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  footer: () => Config.Css.css`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 93, 167, 0.12);
  padding: 0 8px;
  margin: 0 8px;
  height: 48px;
  justify-content: space-between;
`,
  main: () => Config.Css.css`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`,
  video: () => Config.Css.css`
  margin 0 16px 0 16px;
  `,
  header: () => Config.Css.css`
  font-size: 20px;
  color: #005da7;
  font-family: ClearSans-Medium, ClearSans, sans-serif;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px;
  line-height: 20px;
  `,
  right: () => Config.Css.css`
  float:right;
  `,
  content: () => Config.Css.css`
  padding: 0 16px;
  overflow: hidden;
  `,
  textContent: () => Config.Css.css`
  overflow: hidden;
  height: 90px;
  color: black;
  `,
};

export const Video = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    video: UU5.PropTypes.shape({
      code: UU5.PropTypes.string.isRequired,
      title: UU5.PropTypes.string.isRequired,
      authorName: UU5.PropTypes.string.isRequired,
      authorSurname: UU5.PropTypes.string.isRequired,
      category: UU5.PropTypes.any.isRequired,
      videoUrl: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string.isRequired,
      visible: UU5.PropTypes.bool,
      ratingCount: UU5.PropTypes.number,
      averageRating: UU5.PropTypes.number,
      rating: UU5.PropTypes.number,
    }),
    onDelete: UU5.PropTypes.func,
    onRating: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    video: null,
    onDelete: () => {},
    onRating: () => {},
  },
  //@@viewOff:defaultProps

  render({ video, onDelete, onRating }) {
    //@@viewOn:hooks
    const date = new Date(Number(video.code)).toLocaleDateString("cs-CZ");
    const { identity } = useSession();
    const [mrating, setRating] = useState(video.averageRating);
    const handleChange = (value) => {
      setRating(Number(value));
    }
    const nameAuthor = video.authorName + " " + video.authorSurname;
    const videoDetailModal = <VideoDetail video={video} />;
    //@@viewOff:hooks
    
    //@@viewOn:private

    function handleDelete() {
      onDelete(video);
    }

    function handleRating(i) {
      let ratingAverage = ((Number(video.ratingCount) + i) / (Number(video.rating) + 1)).toFixed(1); 
      handleChange(ratingAverage);
      onRating(video, Number(i));

    }
    //@@viewOff:private

    //@@viewOn: hooks
    const screenSize = useScreenSize();
    //@@viewOff: hooks
    //@@viewOn:interface
    function renderHeader() {
      return (
        <UU5.Bricks.Div level={6} className={CLASS_NAMES.header()}>
          <UU5.Bricks.LinkModal
            children={video.title}
            hidden={false}
            modalProps={{ size: "l" }}
            component={videoDetailModal}
          />
        </UU5.Bricks.Div>
      );
    }
   
    function renderRating() {
      if (screenSize === "xs") {
        return null;
      }
     
      let ratingSize = screenSize === "s" ? null : "s";
      return (
        <UU5.Bricks.Section>
          <UU5.Bricks.Rating
            count={5}
            value={mrating}
            size={ratingSize}
            colorSchema="orange"
            onChange={handleChange}
            onClick={(i) => handleRating(i)}
          />
        </UU5.Bricks.Section>
      );
    }

    // const isValidUrl = (url) => {
    //   try {
    //     new URL(url);
    //   } catch (e) {
    //     console.error(e);
    //     return false;
    //   }
    //   return true;
    // };

    function descriptionLength() {
      if (video.description.length > 110) {
        return nl2br(video.description.slice(0, 110) + "...");
      } else {
        return nl2br(video.description);
      }
    }

    function viodeShow() {
      var videoId = "";
      if (video.videoUrl.indexOf("youtube") !== -1) {
        var urlParts = video.videoUrl.split("?v=");
        videoId = "https://www.youtube.com/embed/" + urlParts[1].substring(0, 11);
      } else if (video.videoUrl.indexOf("youtu.be") !== -1) {
        var urlParts2 = video.videoUrl.replace("//", "").split("/");
        videoId = "https://www.youtube.com/embed/" + urlParts2[1].substring(0, 11);
      }
      if (videoId !== "") {
        return (
          <iframe
            src={videoId}
            title="YouTube video player"
            width="100%"
            style={{border: 0}}
            height="100%"
            allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          ></iframe>
        );
        //@@return  <UU5.Bricks.Iframe src={videoId} height={168} allow="fullscreen" allowfullscreen />;
      } else {
        if (video.videoUrl.indexOf("vimeo") !== -1) {
          var urlParts3 = video.videoUrl.replace("//", "").split("/");
          videoId = "https://player.vimeo.com/video/" + urlParts3[1].substring(0, 11) + "?title=0&byline=0&portrait=0";
        }
      }
      if (videoId !== "") {
        return (
          <iframe
            src={videoId}
            width="100%"
            style={{border: 0}}
            height="100%"
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        );
      }
      return (
        <UU5.Bricks.Div className={CLASS_NAMES.video()}>
          <UU5.Bricks.Video src={video.videoUrl} poster={"/assets/logo.png"} autoPlay={false} />
        </UU5.Bricks.Div>
      );
    }

    function renderDelete() {
      if (nameAuthor === identity.name) {
        return (
          <UU5.Bricks.Button onClick={handleDelete} bgStyle="transparent" colorSchema="red">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        );
      } else {
        return null;
      }
    }
    function renderUpdate() {
      if (nameAuthor === identity.name) {
        return (
          <UU5.Bricks.Button bgStyle="transparent" colorSchema="blue">
            <UU5.Bricks.Icon icon="mdi-pencil" />
          </UU5.Bricks.Button>
        );
      } else {
        return null;
      }
    }

    //@@viewOff:interface

    //@@viewOn:render
    if (!video) {
      return null;
    }
    if (video.videoUrl.indexOf("https://") === -1) {
      return null;
    }

    return (
      <UU5.Bricks.Column colWidth="xs-12 m-6 l-4">
        <UU5.Bricks.Card className={CLASS_NAMES.main()} colorSchema="green" header={renderHeader()}>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            <UU5.Bricks.Div>{viodeShow()}</UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.textContent()}>{descriptionLength()}</UU5.Bricks.Div>
            <UU5.Bricks.Div>{nameAuthor + " | " + date}</UU5.Bricks.Div>
          </UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.footer()}>
            {renderRating()}
            <UU5.Bricks.Div className={CLASS_NAMES.right()}>
              {renderUpdate()}
              {renderDelete()}
            </UU5.Bricks.Div>
          </UU5.Bricks.Div>
        </UU5.Bricks.Card>
      </UU5.Bricks.Column>
    );
    //@@viewOff:render
  },
});

export default Video;
