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
  header: () => Config.Css.css`
  font-size: 20px;
  color: #005da7;
  font-family: ClearSans-Medium, ClearSans, sans-serif;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  line-height: 25px;
  `,
  right: () => Config.Css.css`
  float:right;
  `,
  content: () => Config.Css.css`
  padding: 16px;
  overflow: hidden;
  `,
  textContent: () => Config.Css.css`
  overflow: hidden;
  height: 150px;
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
    onUpdate: () => {},
  },
  //@@viewOff:defaultProps

  render({ video, onDelete, onUpdate }) {
    //@@viewOn:hooks
    const date = new Date(Number(video.code)).toLocaleDateString("cs-CZ");
    const { identity } = useSession();
    //@@viewOff:hooks

    //@@viewOn:private
    function handleDelete() {
      onDelete(video);
    }

    function handleDetail() {
      //TO-DO: zobrazit detail videa.
    }

    function handleUpdate() {
      //TO-DO: zobrazit detail videa.
    }
    //@@viewOff:private

    //@@viewOn: hooks
    const screenSize = useScreenSize();
    //@@viewOff: hooks
    //@@viewOn:interface
    function renderHeader() {
      return (
        <UU5.Bricks.Div level={6} className={CLASS_NAMES.header()} onClick={handleDetail}>
          <UU5.Bricks.Link
            content={video.title}
            href={"video/get/" + video.code}
            target="_self"
          ></UU5.Bricks.Link>
        </UU5.Bricks.Div>
      );
    }
    let nameAuthor = video.authorName + " " + video.authorSurname;
    function renderRating() {
      if (screenSize === "xs") {
        return null;
      }
      let ratingSize = screenSize === "s" ? "m" : "s";
      return <UU5.Bricks.Rating value={video.averageRating} size={ratingSize} colorSchema="orange" />;
    }

    function descriptionLength() {
      if (video.description.length > 200) {
        return nl2br(video.description.slice(0, 200) + "...");
      } else {
        return nl2br(video.description);
      }
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
          <UU5.Bricks.Button onClick={handleUpdate} bgStyle="transparent"  colorSchema="blue">
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

    return (
      <UU5.Bricks.Column colWidth="xs-12 m-6 l-4 xl-4">
        <UU5.Bricks.Card className={CLASS_NAMES.main()} colorSchema="green" header={renderHeader()}>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            <UU5.Bricks.Div className={CLASS_NAMES.textContent()} onClick={handleDetail}>
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
