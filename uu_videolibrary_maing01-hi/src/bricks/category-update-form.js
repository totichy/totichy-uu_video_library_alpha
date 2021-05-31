//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import "uu5g04-forms";
import validator from "validator";
import Config from "./config/config";
import Form from "../config/createForm.js";
import Errors from "../config/errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const CategoryUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    selectedCategory: UU5.PropTypes.object,
    setSelectedCategory: UU5.PropTypes.func,
    selectedCategoryShow: UU5.PropTypes.bool,
    onUpdateCategory: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    selectedCategory: {},
    setSelectedCategory: () => {},
    onUpdateCategory: () => {},
    onCancel: () => {},
    selectedCategoryShow: true,
  },
  //@@viewOff:defaultProps

  render({ onCancel, onUpdateCategory, setSelectedCategory, selectedCategory, selectedCategoryShow }) {
    //@@viewOn:private
    const titleCg = Form.titleCategoryCgi || {};
    const addCategoryCg = Form.updateCategory || {};
    let titles = useLsi(titleCg);
    let headerUpdate = useLsi(addCategoryCg);
    const validcategoryNameCgi = Errors.validcategoryName || {};
    let validCategoryName = useLsi(validcategoryNameCgi);
    //@@viewOff:private

    //@@viewOn:interface
    function onSave({ values }) {
      if (!values.categoryId || !values.categoryName) {
        return null;
      }
      let errorMessage = "";


      if (values.categoryName.length < 2) {
        errorMessage = errorMessage + validDescription;
        UU5.Environment.getPage().getAlertBus().addAlert({
          content: validCategoryName,
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

      let category = {
        categoryId: values.categoryId,
        categoryName: values.categoryName,
      };
      setSelectedCategory(null);
      onUpdateCategory(category);
    }
    //@@viewOff:interface

    if (selectedCategoryShow === false) {
      return null;
    }
    setSelectedCategory = selectedCategory || {};
    //@@viewOn:render
    return (
      <UU5.Bricks.Modal offsetTop={100} shown={true}>
        <UU5.Bricks.Header level={5} content={headerUpdate} underline={true} />
        <UU5.Bricks.Card className="padding-s" colorSchema="indigo">
          <UU5.Forms.Form onSave={onSave} onCancel={onCancel} labelColWidth="xs-12 m-2" inputColWidth="xs-12 m-8">
            <UU5.Forms.Text
              name="categoryId"
              label="ID"
              required
              value={selectedCategory && selectedCategory.categoryId}
              readOnly={true}
            />
            <UU5.Forms.Text
              inputAttrs={{ maxLength: 255 }}
              name="categoryName"
              value={selectedCategory && selectedCategory.categoryName}
              label={titles}
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

export default CategoryUpdateForm;
