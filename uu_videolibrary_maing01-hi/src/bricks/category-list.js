//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import Category from "./category";
import CategoryLsi from "../config/category";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const CategoryList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categories: UU5.PropTypes.array,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categories: [],
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ categories, onDelete }) {
    //@@viewOn:private
    const noCategory = CategoryLsi.noCategory || {};
    const AllCategories = CategoryLsi.AllCategories || {};

    let noCategoryCgi = useLsi(noCategory);
    let CatetegoryListHeader = useLsi(AllCategories);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (categories.length === 0) {
      return (
        <div>
          <UU5.Bricks.Container>
            <UU5.Bricks.Header level={3} content={CatetegoryListHeader} underline={true} />
            <UU5.Common.Error content={noCategoryCgi} />
          </UU5.Bricks.Container>
        </div>
      );
    }
    return (
      <div>
        <UU5.Bricks.Container>
          <UU5.Bricks.Header level={3} content={CatetegoryListHeader} underline={true} />
          {categories.map((category, index) => {
            return (
              <UU5.Bricks.Div key={index}>
                <Category category={category.data} onDelete={onDelete} />
              </UU5.Bricks.Div>
            );
          })}
        </UU5.Bricks.Container>
      </div>
    );
    //@@viewOff:render
  },
});

export default CategoryList;
