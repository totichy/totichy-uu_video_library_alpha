//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useLsi, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import VideoLsi from "../config/video";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoProvider",
  //@@viewOff:statics
};

export const VideoProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render({ children }) {
    //@@viewOn:hooks
    const [isLoaded, setIsLoaded] = useState(false);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchData() {
        let data = await fetch("http://localhost:3000/video/list");
        setIsLoaded(true);
        if (data.status >= 200 && data.status < 300) {
          let response;
          try {
            response = await data.json();
          } catch (e) {
            setError("Unable to parse response.");
          }
          setVideos(response);
        } else {
          setError("Unable to load data.");
        }
      }
      fetchData();
    }, []);

    const delVideoText = VideoLsi.delVideo || {};
    const wasDeleted = VideoLsi.wasDeleted || {};
    const createError = VideoLsi.errorCreate || {};

    let VideoWithTitle = useLsi(delVideoText);
    let WasDeleted = useLsi(wasDeleted);
    let errorCreated = useLsi(createError);

    //@@viewOff:hooks

    //@@viewOn:private
    async function handleDelete(video) {
      await fetch("http://localhost:3000/video/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(video),
      });

      setVideos((prevVideos) => {
        return prevVideos.filter((item) => item.code !== video.code);
      });
      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: `${VideoWithTitle} ${video.title} ${WasDeleted}`,
        });
    }

    async function handleCreate(video) {
      let response = await fetch("http://localhost:3000/video/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(video),
      });
      if (response.status >= 200 && response.status < 300) {
        setVideos((prevVideos) => prevVideos.concat([video]));
      } else {
        UU5.Environment.getPage()
          .getAlertBus()
          .addAlert({
            content: `${errorCreated}`,
            colorSchema: "red",
          });
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return children({ error, isLoaded, videos, handleDelete, handleCreate });
    //@@viewOff:render
  },
});

export default VideoProvider;
