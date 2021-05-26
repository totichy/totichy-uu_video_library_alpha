//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useScreenSize, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import { nl2br } from "../helpers/string-helper";
import VideoLsi from "../config/video";
import Form from "../config/createForm";
//@@viewOff:imports

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
  vimeo: () => Config.Css.css`
  margin: 16px;
  padding: 57% 0 0 0;
  position:relative;
  `,
  novideo: () => Config.Css.css`
  margin-bottom: 5px;
  border:0;
  width: 100%;
  height: 100%;
  `,
  vimeoframe: () => Config.Css.css`
  position: absolute;
  border:0;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
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
  padding: 16px;
  `,
  textContent: () => Config.Css.css`
  color: black;
  padding: 16px 0;
  `,
};

export const VideoDetail = createVisualComponent({
  displayName: Config.TAG + "VideoDetail",

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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    video: null,
  },
  //@@viewOff:defaultProps

  render({ video }) {
    const date = new Date(Number(video.code)).toLocaleDateString("cs-CZ");
    //@@viewOff:hooks

    //@@viewOn:private
    const titleCg = Form.titleCgi || {};
    const descCg = Form.descriptionCgi || {};
    const urlCg = Form.urlCgi || {};
    const autorNameCg = Form.autorNameCgi || {};
    const autorSurnameCg = Form.autorLastNameCgi || {};
    const addVideoCg = Form.addVideo || {};
    const categoryCg = Form.category || {};
    let titles = useLsi(titleCg);
    let description = useLsi(descCg);
    let videoUrl = useLsi(urlCg);
    let autorName = useLsi(autorNameCg);
    let autorSurname = useLsi(autorSurnameCg);
    let headerAdd = useLsi(addVideoCg);
    let categoriesCg = useLsi(categoryCg);
    //@@viewOff:private

    //@@viewOn: hooks
    const screenSize = useScreenSize();
    //@@viewOff: hooks
    //@@viewOn:interface

    let nameAuthor = video.authorName + " " + video.authorSurname;

    function renderRating() {
      if (screenSize === "xs") {
        return null;
      }

      let ratingSize = screenSize === "s" ? null : "s";
      return (
        <>
          <UU5.Bricks.Section>
            <UU5.Bricks.Rating count={5} value={video.averageRating} size={"m"} colorSchema="orange" />{" "}
            <UU5.Bricks.Lsi lsi={VideoLsi.vote} /> {video.rating}
          </UU5.Bricks.Section>
        </>
      );
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
          <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
            <iframe
              className={CLASS_NAMES.vimeoframe()}
              src={videoId}
              title="YouTube video player"
              width="100%"
              style={{ border: 0 }}
              height="100%"
              allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            ></iframe>
          </UU5.Bricks.Div>
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
          <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
            <iframe
              className={CLASS_NAMES.vimeoframe()}
              src={videoId}
              allow="autoplay; fullscreen; picture-in-picture"
            ></iframe>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </UU5.Bricks.Div>
        );
      }

      if (video.videoUrl.includes(".mp4") || video.videoUrl.includes(".ogg")) {
        return (
          <UU5.Bricks.Div className={CLASS_NAMES.video()}>
            <UU5.Bricks.Video src={video.videoUrl} height="30em" poster={"/assets/logo.png"} autoPlay={false} />
          </UU5.Bricks.Div>
        );
      } else {
        return (
          <UU5.Bricks.Div className={CLASS_NAMES.video()}>
            {" "}
            <UU5.Bricks.Link href={video.videoUrl} target="_blank">
              <UU5.Bricks.Image src={"/assets/novideo.png"} className={CLASS_NAMES.novideo()} />
            </UU5.Bricks.Link>
          </UU5.Bricks.Div>
        );
      }
    }

    //@@viewOn:render
    if (!video) {
      return null;
    }
    return (
      <UU5.Bricks.Div>
        <UU5.Bricks.Div className={CLASS_NAMES.content()}>
          <UU5.Bricks.Div>{viodeShow()}</UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            <strong>{videoUrl}</strong>:{" "}
            <UU5.Bricks.Link href={video.videoUrl} target="_blank">
              {video.videoUrl}
            </UU5.Bricks.Link>
          </UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            <strong>{description}</strong>: <br />
            {nl2br(video.description)}
          </UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>{nameAuthor + " | " + date}</UU5.Bricks.Div>
        </UU5.Bricks.Div>
        <UU5.Bricks.Div className={CLASS_NAMES.footer()}>{renderRating()}</UU5.Bricks.Div>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default VideoDetail;
