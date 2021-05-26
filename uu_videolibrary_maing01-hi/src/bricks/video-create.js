//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useLsi } from "uu5g04-hooks";
import validator from 'validator'
import Config from "./config/config";
import VideoCreateForm from "./video-create-form";
import Form from "../config/createForm";
import Errors from "../config/errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoCreate",
  //@@viewOff:statics
};

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const CLASS_NAMES = {
  addVideoUse: () => Config.Css.css`
    text-align:right;
    margin: 26px;
  `,
};

export const VideoCreate = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    onCreate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render({ onCreate }) {
    const addBtn = Form.addButtonCgi || {};
    let addButton = useLsi(addBtn);

    const urlValid = Errors.validURL || {};
    let validURL =  useLsi(urlValid);
    const titleValid = Errors.validDescription || {};
    let validTitle =  useLsi(titleValid);
    const descValid = Errors.validTitle || {};
    let validDescription =  useLsi(descValid);

    const errorTtl = Errors.titleError || {};
    let headerError =  useLsi(errorTtl);

    //@@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);
    //@@viewOff:hooks

    //@@viewOn:private
    function handleClick() {
      setMode(Mode.FORM);
    }
    function handleSave({ values }) {
      if (
        !values.title ||
        !values.category[0] ||
        !values.videoUrl ||
        !values.description ||
        !values.authorName ||
        !values.authorSurname
      ) {
        return null;
      }
let errorMessage = "";

if (!validator.isURL(values.videoUrl)) {
  errorMessage = errorMessage + validURL;
   UU5.Environment.getPage().getAlertBus().addAlert({
    content: validURL,
    colorSchema: "red",
    closeTimer: 3000,
    header: headerError,
    block: true,
    stacked: true,
  });
}

if (values.title.length < 3 || values.title.length > 100) {
  errorMessage = errorMessage + validTitle;
  UU5.Environment.getPage().getAlertBus().addAlert({
    content: validTitle,
    colorSchema: "red",
    closeTimer: 3000,
    header: headerError,
    block: true,
    stacked: true,
  });
}
if (values.description.length < 3 || values.description.length > 500) {
  errorMessage = errorMessage + validDescription;
  UU5.Environment.getPage().getAlertBus().addAlert({
    content: validDescription,
    colorSchema: "red",
    closeTimer: 3000,
    header: headerError,
    block: true,
    stacked: true,
  });
}

if (errorMessage != "") {
  return null;
}

      let video = {
        code: new Date().getTime().toString(),
        authorName: values.authorName,
        authorSurname: values.authorSurname,
        title: values.title,
        videoUrl: values.videoUrl,
        description: values.description,
        category: values.category,
        visible: true,
        averageRating: 0,
        ratingCount: 0,
        rating: 0,
      };

      onCreate(video);
      setMode(Mode.BUTTON);
    }
    function handleCancel() {
      setMode(Mode.BUTTON);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    function renderButton() {
      return (
        <UU5.Bricks.Div className={CLASS_NAMES.addVideoUse()}>
          <UU5.Bricks.Button onClick={handleClick} content={addButton} colorSchema="blue" />
        </UU5.Bricks.Div>
      );
    }
    function renderForm() {
      return (
        <UU5.Bricks.Modal size="l" offsetTop={100} shown={true}>
          <VideoCreateForm onSubmit={handleSave} onCancel={handleCancel} />
        </UU5.Bricks.Modal>
      );
    }

    if (mode === Mode.BUTTON) {
      return renderButton();
    } else {
      return renderForm();
    }
    //@@viewOff:render
  },
});

export default VideoCreate;
