//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import CategoryCreateForm from "./category-create-form.js";
import Form from "../config/createForm.js";
import Errors from "../config/errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryCreate",
  //@@viewOff:statics
};

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const CLASS_NAMES = {
  addCategoryUse: () => Config.Css.css`
    text-align:right;
    margin: 26px;
  `,
};
const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

export const CategoryCreate = createVisualComponent({
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
    const addBtn = Form.addButtonCatCgi || {};
    let addButton = useLsi(addBtn);

    const shortNameCat = Errors.shortName || {};
    let errorName = useLsi(shortNameCat);

    const errorTtl = Errors.titleError || {};
    let headerError = useLsi(errorTtl);

    //@@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);
    //@@viewOff:hooks

    //@@viewOn:private
    function handleClick() {
      setMode(Mode.FORM);
    }
    function handleSave({ values }) {
      if (!values.categoryName) {
        return null;
      }
      if (values.categoryName.length < 2) {
        return UU5.Environment.getPage().getAlertBus().addAlert({
          content: errorName,
          colorSchema: "red",
          closeTimer: 3000,
          header: headerError,
          block: true,
        });
      }

      function generateString(length) {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

      let category = {
        categoryId: generateString(3),
        categoryName: values.categoryName,
      };

      onCreate(category);
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
        <UU5.Bricks.Div className={CLASS_NAMES.addCategoryUse()}>
          <UU5.Bricks.Button onClick={handleClick} content={addButton} colorSchema="blue" />
        </UU5.Bricks.Div>
      );
    }
    function renderForm() {
      return <CategoryCreateForm onSubmit={handleSave} onCancel={handleCancel} />;
    }

    if (mode === Mode.BUTTON) {
      return renderButton();
    } else {
      return renderForm();
    }
    //@@viewOff:render
  },
});

export default CategoryCreate;
