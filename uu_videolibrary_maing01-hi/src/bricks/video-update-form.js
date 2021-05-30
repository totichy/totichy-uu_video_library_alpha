//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Form from "../config/createForm";
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
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    video: null,
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render({ video, onSubmit, onCancel }) {
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
    //@@viewOff:private

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

    if (!video) {
      return null;
    }

    return (
      <UU5.Bricks.Container>
        <UU5.Bricks.Header level={5} content={headerAdd} underline={true} />
        <UU5.Bricks.Card className="padding-s" colorSchema="indigo">
          <UU5.Forms.Form onSave={onSubmit} onCancel={onCancel} labelColWidth="xs-12 m-3" inputColWidth="xs-12 m-9">
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="title"
              value={video.title}
              controlled={false}
              label={titles}
              required
            />
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="videoUrl"
              label={videoUrl}
              controlled={false}
              value={video.videoUrl}
              required
            />
            <UU5.Forms.Select label={categoriesCg} name="category" value={video.category} multiple required>
              {renderCategories()}
            </UU5.Forms.Select>
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="authorName"
              label={autorName}
              value={video.authorName}
              controlled={false}
              required
            />
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="authorSurname"
              label={autorSurname}
              value={video.authorSurname}
              controlled={false}
              required
            />
            <UU5.Forms.TextArea
              inputAttrs={{ maxLength: 500 }}
              name="description"
              label={description}
              onValidate={validateText}
              controlled={false}
              value={video.description}
              required
            />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Card>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default VideoUpdateForm;
