//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryProvider",
  //@@viewOff:statics
};

export const CategoryProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render({ children }) {
    //@@viewOn:hooks
    let listCategoryData = useDataList({
      itemIdentifier: "categoryId",
      handlerMap: {
        load: Calls.listCategory,
        createCategory: Calls.createCategory,
        deleteCategory: Calls.deleteCategory,
        updateCategory: Calls.updateCategory,
      },
    });

    let { state, data, newData, pendingData, errorData, handlerMap } = listCategoryData;
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return children({ state, data, newData, pendingData, errorData, handlerMap });
    //@@viewOff:render
  },
});

export default CategoryProvider;
