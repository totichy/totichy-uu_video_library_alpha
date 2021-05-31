//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useSession, useDataList } from "uu5g04-hooks";
import "uu5g04-forms";
import "uu5g04-block-layout";
import Config from "./config/config";
import Calls from "../calls";
import Form from "../config/createForm.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoCreateForm",
  //nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const VideoCreateForm = createVisualComponent({
  ...STATICS,

  getInitialState() {
    return {
      bgStyle: "filled",
      colorSchema: "default",
      elevation: "0",
      borderRadius: 0,
      width: 360,
      padding: "5",
      margin: 0,
    };
  },

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render({ onSubmit, onCancel }) {
    //@@viewOn:hooks
    const { identity } = useSession();

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

    //@@viewOff:hooks

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

    //@@viewOn:private
    function renderCategories() {
      return myDaata.map((category) => (
        <UU5.Forms.Select.Option value={category.categoryId} key={category.categoryId}>
          {category.categoryName}
        </UU5.Forms.Select.Option>
      ));
    }

    function renderAuthorName() {
      let authorN = "";
      if (identity) {
        authorN = identity.name.split(" ")[0];
      }
      return (
        <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="authorName" label={autorName} value={authorN} required />
      );
    }

    function renderAuthorSurname() {
      let authorS = "";
      if (identity) {
        authorS = identity.name.split(" ")[1];
      }
      return (
        <UU5.Forms.Text
          inputAttrs={{ maxLength: 255 }}
          name="authorSurname"
          label={autorSurname}
          value={authorS}
          required
        />
      );
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <>
        <UU5.Bricks.Header level={5} content={headerAdd} underline={true} />
        <UU5.Bricks.Card className="padding-s" colorSchema="indigo">
          <UU5.Forms.Form onSave={onSubmit} onCancel={onCancel} labelColWidth="xs-12 m-3" inputColWidth="xs-12 m-9">
            <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="title" label={titles} required />
            <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="videoUrl" label={videoUrl} required />
            <UU5.Forms.Select label={categoriesCg} name="category" multiple required>
              {renderCategories()}
            </UU5.Forms.Select>
            {renderAuthorName()}
            {renderAuthorSurname()}
            <UU5.Forms.TextArea inputAttrs={{ maxLength: 500 }} name="description" label={description} required />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Card>
      </>
    );
    //@@viewOff:render
  },
});

export default VideoCreateForm;
