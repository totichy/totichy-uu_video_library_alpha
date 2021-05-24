//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useSession, useState,useDataList, useEffect } from "uu5g04-hooks";
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
    const [categories, setCategories] = useState([]);

    //@@viewOff:hooks

    useEffect(() => {
      async function fetchData() {
        let data = await fetch(Calls.APP_BASE_URI + "category/list");
        if (data.status >= 200 && data.status < 300) {
          let response;
          try {
            response = await data.json();
          } catch (e) {
            //@@ setError("Unable to parse response.");
          }
          setCategories(response);
        } else {
          //@@ setError("Unable to load data.");
        }
      }
      fetchData();
    }, []);

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
      return categories.map((category) => (
        <UU5.Forms.Select.Option value={category.categoryId} key={category.categoryId}>
          {category.categoryName}
        </UU5.Forms.Select.Option>
      ));
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <UU5.Bricks.Container>
        <UU5.Bricks.Header level="1" content={headerAdd} underline={true} />
        <UU5.Bricks.Card className="padding-s" colorSchema="indigo">
          <UU5.Forms.Form onSave={onSubmit} onCancel={onCancel} labelColWidth="xs-12 m-3" inputColWidth="xs-12 m-9">
            <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="title" label={titles} required />
            <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="videoUrl" label={videoUrl} required />
            <UU5.Forms.Select label={categoriesCg} name="category" multiple required>
              {renderCategories()}
            </UU5.Forms.Select>
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="authorName"
              label={autorName}
              value={identity.name.split(" ")[0]}
              required
            />
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="authorSurname"
              label={autorSurname}
              value={identity.name.split(" ")[1]}
              required
            />
            <UU5.Forms.TextArea inputAttrs={{ maxLength: 400 }} name="description" label={description} required />

            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Card>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default VideoCreateForm;
