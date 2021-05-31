//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useDataList } from "uu5g04-hooks";
import validator from "validator";
import Config from "./config/config";
import Calls from "../calls";
import Form from "../config/createForm";
import Errors from "../config/errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoUpdateForm",
  //@@viewOff:statics
};

export const VideoUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    selectedVideo: UU5.PropTypes.object,
    setSelectedVideo: UU5.PropTypes.func,
    selectedVideoShow: UU5.PropTypes.bool,
    onUpdateVideo: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    selectedVideo: {},
    setSelectedVideo: () => {},
    onUpdateVideo: () => {},
    onCancel: () => {},
    selectedVideoShow: true,
  },
  //@@viewOff:defaultProps

  render({ onCancel, onUpdateVideo, setSelectedVideo, selectedVideo, selectedVideoShow }) {
    //@@viewOn:private
    function validateText(opt) {
      let result = { feedback: "initial", value: opt.value };
      // when there is no event, validation comes from "isValid" method
      if (opt.event === undefined) {
        // text is empty, check file
        if (!opt.value) {
          result.feedback = "error";
          result.message = "error";
          opt.component.setFeedback(result.feedback, result.message);
        }
      }
      return result;
    }

    const urlValid = Errors.validURL || {};
    let validURL = useLsi(urlValid);
    const titleValid = Errors.validDescription || {};
    let validTitle = useLsi(titleValid);
    const descValid = Errors.validTitle || {};
    let validDescription = useLsi(descValid);
    const errorTtl = Errors.titleError || {};
    let headerError = useLsi(errorTtl);

    //@@viewOff:private
    function onSave({ values }) {
      if (
        !values.code ||
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
        code: values.code,
        authorName: values.authorName,
        authorSurname: values.authorSurname,
        title: values.title,
        videoUrl: values.videoUrl,
        description: values.description,
        category: values.category,
        visible: true,
        averageRating: selectedVideo.averageRating,
        ratingCount: selectedVideo.ratingCount,
        rating: selectedVideo.rating,
      };
      setSelectedVideo(null);
      onUpdateVideo(video);
    }

    //@@viewOn:interface
    const categoryResult = useDataList({
      handlerMap: {
        load: Calls.listCategory,
      },
      initialDtoIn: { data: {} },
    });

    const categoryMap = {};
    if (categoryResult.data) {
      categoryResult.data.forEach((category) => (categoryMap[category.data.categoryId] = category.data.categoryName));
    }
    let myDaata = Object.keys(categoryMap).map((key) => ({ categoryId: key, categoryName: categoryMap[key] }));
    //@@viewOff:interface

    const titleCg = Form.titleCgi || {};
    const descCg = Form.descriptionCgi || {};
    const urlCg = Form.urlCgi || {};
    const autorNameCg = Form.autorNameCgi || {};
    const autorSurnameCg = Form.autorLastNameCgi || {};
    const addVideoCg = Form.updateVideo || {};
    const categoryCg = Form.category || {};
    let titles = useLsi(titleCg);
    let description = useLsi(descCg);
    let videoUrl = useLsi(urlCg);
    let autorName = useLsi(autorNameCg);
    let autorSurname = useLsi(autorSurnameCg);
    let headerAdd = useLsi(addVideoCg);
    let categoriesCg = useLsi(categoryCg);

    function renderCategories() {
      return myDaata.map((category) => (
        <UU5.Forms.Select.Option value={category.categoryId} key={category.categoryId}>
          {category.categoryName}
        </UU5.Forms.Select.Option>
      ));
    }

    //@@viewOn:render

    if (selectedVideoShow === false) {
      return null;
    }
    selectedVideo = selectedVideo || {};
    return (
      <UU5.Bricks.Modal size="l" offsetTop={100} shown={true}>
        <UU5.Bricks.Header level={5} content={headerAdd} underline={true} />
        <UU5.Bricks.Card className="padding-s" colorSchema="indigo">
          <UU5.Forms.Form onSave={onSave} onCancel={onCancel} labelColWidth="xs-12 m-3" inputColWidth="xs-12 m-9">
            <UU5.Forms.Text
              name="code"
              label="Code"
              required
              value={selectedVideo && selectedVideo.code}
              readOnly={true}
            />
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="title"
              value={selectedVideo && selectedVideo.title}
              label={titles}
              required
            />
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="videoUrl"
              label={videoUrl}
              value={selectedVideo && selectedVideo.videoUrl}
              required
            />
            <UU5.Forms.Select
              label={categoriesCg}
              name="category"
              value={selectedVideo && selectedVideo.category}
              multiple
              required
            >
              {renderCategories()}
            </UU5.Forms.Select>
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="authorName"
              label={autorName}
              value={selectedVideo && selectedVideo.authorName}
              required
            />
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="authorSurname"
              label={autorSurname}
              value={selectedVideo && selectedVideo.authorSurname}
              required
            />
            <UU5.Forms.TextArea
              inputAttrs={{ maxLength: 500 }}
              name="description"
              label={description}
              onValidate={validateText}
              value={selectedVideo && selectedVideo.description}
              required
            />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Card>
      </UU5.Bricks.Modal>
    );
    //@@viewOff:render
  },
});

export default VideoUpdateForm;
