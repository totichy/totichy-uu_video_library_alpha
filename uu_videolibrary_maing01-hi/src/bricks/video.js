//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useScreenSize, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import { nl2br } from "../helpers/string-helper";
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
  align-items: center;
  padding: 16px;
  cursor: pointer;
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
  height: 80px;
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
      averageRating: UU5.PropTypes.number.isRequired,
      rating: UU5.PropTypes.number,
    }),
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    video: null,
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ video, onDelete }) {
    //@@viewOn:hooks
    const date = new Date(Number(video.code)).toLocaleDateString("cs-CZ");
    const { identity } = useSession();
    //@@viewOff:hooks

    //@@viewOn:private
    function handleDelete() {
      onDelete(video);
    }


    //@@viewOff:private

    //@@viewOn: hooks
    const screenSize = useScreenSize();
    //@@viewOff: hooks
    //@@viewOn:interface
    function renderHeader() {
      return (
        <UU5.Bricks.Div level={6} content={video.title} className={CLASS_NAMES.header()}>
        </UU5.Bricks.Div>
      );
    }
    let nameAuthor = video.authorName + " " + video.authorSurname;
    function renderRating() {
      if (screenSize === "xs") {
        return null;
      }
      let ratingSize = screenSize === "s" ? null : "s";

      return (
        <UU5.Bricks.Section>
          <UU5.Bricks.Rating
            value={video.averageRating}
            size={ratingSize}
            colorSchema="orange"
            onClick={(i, e, icon) => handleRating(i, e, icon)}
          />
        </UU5.Bricks.Section>
      );
    }

   const isValidUrl = (url) => {
      try {
        new URL(url);
      } catch (e) {
        console.error(e);
        return false;
      }
      return true;
    };

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
              height="100%"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowfullscreen
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
            frameborder="0"
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        );
      }
      return (
      <UU5.Bricks.Div  className={CLASS_NAMES.video()}>
      <UU5.Bricks.Video src={video.videoUrl} poster={"/assets/logo.png"} autoPlay={false} />
      </UU5.Bricks.Div>);
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
if (!isValidUrl(video.videoUrl)) {
  return null;
}
    return (
      <UU5.Bricks.Column colWidth="xs-12 m-6 l-4">
        <UU5.Bricks.Card className={CLASS_NAMES.main()} colorSchema="green" header={renderHeader()}>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            <UU5.Bricks.Div>{viodeShow()}</UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.textContent()}>
              {descriptionLength()}
            </UU5.Bricks.Div>
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
