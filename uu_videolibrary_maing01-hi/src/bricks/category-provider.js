//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useLsi, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import CategoryLsi from "../config/category";
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
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    //@@viewOff:hooks

    useEffect(() => {
      async function fetchData() {
        let data = await fetch("http://localhost:3000/category/list");
        setIsLoaded(true);
        if (data.status >= 200 && data.status < 300) {
          let response;
          try {
            response = await data.json();
          } catch (e) {
            setError("Unable to parse response.");
          }
          setCategories(response);
        } else {
          setError("Unable to load data.");
        }
      }
      fetchData();
    }, []);

    const delCategoryText = CategoryLsi.delCategory || {};
    const wasDeleted = CategoryLsi.wasDeleted || {};

    let CategoryWithTitle = useLsi(delCategoryText);
    let WasDeleted = useLsi(wasDeleted);

    //@@viewOn:private
    async function handleDelete(category) {
      await fetch("http://localhost:3000/category/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(category),
      });

      setCategories((prevCategories) => {
        return prevCategories.filter((item) => item.categoryId !== category.categoryId);
      });
      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: `${CategoryWithTitle} ${category.categoryName} ${WasDeleted}`,
        });
    }

    async function handleCreate(category) {
      await fetch("http://localhost:3000/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(category),
      });
      setCategories((prevCategories) => prevCategories.concat([category]));
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return children({ error, isLoaded, categories, handleDelete, handleCreate });
    //@@viewOff:render
  },
});

export default CategoryProvider;
