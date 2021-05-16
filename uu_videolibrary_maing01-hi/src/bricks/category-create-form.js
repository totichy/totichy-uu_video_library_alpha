//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import "uu5g04-block-layout";
import "uu5g04-forms";
import Config from "./config/config";
import Form from "../config/createForm.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryCreateFrom",
  //nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const CategoryCreateFrom = createVisualComponent({
  ...STATICS,

  getInitialState() {
    return {
      bgStyle: "filled",
      colorSchema: undefined,
      elevation: "0",
      borderRadius: 0,
      width: 360,
      padding: undefined,
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
    //@@viewOn:private
    const titleCg = Form.titleCategoryCgi || {};
    const addCategoryCg = Form.addCategory || {};
    let titles = useLsi(titleCg);
    let headerAdd = useLsi(addCategoryCg);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Bricks.Container>
        <UU5.Bricks.Modal offsetTop={100} shown={"category"}>
        <UU5.Bricks.Header level={3} content={headerAdd} underline={true} />
        <UU5.Bricks.Card className="padding-s" colorSchema="indigo">
          <UU5.Forms.Form onSave={onSubmit} onCancel={onCancel} labelColWidth="xs-12 m-2" inputColWidth="xs-12 m-8">
            <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="categoryName" label={titles} required />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Card>
        </UU5.Bricks.Modal>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default CategoryCreateFrom;
