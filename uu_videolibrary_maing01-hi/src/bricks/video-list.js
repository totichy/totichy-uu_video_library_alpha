//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-block-layout";
import { createVisualComponent, useLsi, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Video from "./video";
import VideoLsi from "../config/video";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "VideoList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};



function categorySelection(queryString)  {
 let urlParams = new URLSearchParams(queryString);
return urlParams.get('category');
}






const FILTERS = [
  {
    key: "kategorie",
    label: { cs: "Kategorie", en: "Category" },
    //TODO - Pochopit jak to funguje, plus, Namiesto litu je tam input
    filterFn: (item, value) => {
      let fragments = value.split(/[\s,.-;:_]/);
      return fragments.some((frag) => {
        let itemValue =
          typeof item.category === "object" ? UU5.Common.Tools.getLsiItemByLanguage(item.category) : item.category;
        return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
      });
    },
  },
  {
    key: "title",
    label: { cs: "Název", en: "Title" },
    filterFn: (item, value) => {
      let fragments = value.split(/[\s,.-;:_]/);
      return fragments.some((frag) => {
        let itemValue = typeof item.title === "object" ? UU5.Common.Tools.getLsiItemByLanguage(item.title) : item.title;
        return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
      });
    },
  },
];






export const VideoList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    videos: UU5.PropTypes.array,
    onDelete: UU5.PropTypes.func,
    onRating: UU5.PropTypes.func, 
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    videos: [],
    onDelete: () => {},
    onRating: () => {},
  },
  //@@viewOff:defaultProps

  render({ videos, onDelete, onRating }) {




    const categoryListResult = useDataList({
      handlerMap: {
          load: Calls.listCategory,
      },
      initialDtoIn: {data: {}}
  });
  const categoryMap = {};
  if (categoryListResult.data) {
    categoryListResult.data.forEach(category => categoryMap[category.data.categoryId] = category.data )
  }
let dada = categoryMap[categorySelection(window.location.search)];
console.log(dada);
    //@@viewOn:private
    const noVideo = VideoLsi.noVideo || {};
    
    const AllVideos = VideoLsi.AllVideos || {};
    const SelectedVideos = VideoLsi.SelectedVideos || {};

    let noVideoCgi = useLsi(noVideo);
    let VideoListHeader = useLsi(AllVideos);
    let SelectedVideoListHeader = useLsi(SelectedVideos);
    let countVideo = 0;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    let VideoHeader = "";

    if (categorySelection(window.location.search) === null) { VideoHeader = VideoListHeader;} 
    else {
  

      VideoHeader = SelectedVideoListHeader + ": "  } 
    //@@viewOn:render
    if (videos.length === 0) {
      return (
        <div>
          <UU5.Bricks.Container>
            <UU5.Bricks.Header level={1} content={VideoHeader} underline={true} />
            <UU5.Common.Error content={noVideoCgi} />
          </UU5.Bricks.Container>
        </div>
      );
    }
    return (
      <div>
        <UU5.Bricks.Container>
          <UU5.Bricks.Header level={1} content={VideoHeader } underline={true} />
{/* + " z vybrané kategorie " + getCategoryNameByUrlQuery(categorySelection(window.location.search)) */}

         {/*  <Uu5Tiles.ControllerProvider data={videos.data} filters={FILTERS}>
            <Uu5Tiles.FilterBar /> 
          </Uu5Tiles.ControllerProvider> */}
          <br />
          
          
          {videos.map((video,index) => {
          
            if (video.data.category.find(element => element == categorySelection(window.location.search)) === categorySelection(window.location.search) ) {
              countVideo ++;
            return (

              <UU5.Bricks.Div key={index}>
                <Video video={video.data} onDelete={onDelete} onRating={onRating} />
              </UU5.Bricks.Div>
            );
          } else if (categorySelection(window.location.search) === null) {
            countVideo = 1;
            return (
              <UU5.Bricks.Div key={index}>
                <Video video={video.data} onDelete={onDelete} onRating={onRating} />
              </UU5.Bricks.Div>
            );
          } else if (countVideo === 0 && index === videos.length-1) {
            return (
              <div>
              
                  <UU5.Common.Error content={noVideoCgi} />
               
              </div>
            );
          } 


          }
          
          )
          
          }


        </UU5.Bricks.Container>
      </div>
    );
    //@@viewOff:render
  },
});

export default VideoList;
