//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import Config from "./config/config.js";
import CategoryList from "../bricks/category-list.js";
import CategoryProvider from "../bricks/category-provider.js";
import CategoryCreate from "../bricks/category-create.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Categories",
  //@@viewOff:statics
};

export const Categories = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOn:propTypes

  //@@viewOff:propTypes

  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div>
        <CategoryProvider>
          {({ error, isLoaded, categories, handleDelete, handleCreate }) => {
            if (error) {
              return (
                <div>
                  <UU5.Bricks.Container>
                    <UU5.Common.Error content={error} />
                  </UU5.Bricks.Container>
                </div>
              );
            } else if (!isLoaded) {
              return (
                <div>
                  <UU5.Bricks.Container>
                    <UU5.Common.Div content="Loading..." />
                  </UU5.Bricks.Container>
                </div>
              );
            } else {
              return (
                <>
                  <CategoryCreate onCreate={handleCreate} />
                  <UU5.Bricks.Section>
                    <CategoryList categories={categories} onDelete={handleDelete} />
                  </UU5.Bricks.Section>
                </>
              );
            }
          }}
        </CategoryProvider>
      </div>
    );
    //@@viewOff:render
  },
});

export default Categories;
