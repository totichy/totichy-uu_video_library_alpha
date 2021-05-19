const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// update video - accepts all parameters
async function RatingAbl(req, res) {
  let { code, mrating } = req;

  if (code) {
     
    let video = await dao.getVideo(code);
    let newRating = ((Number(video.ratingCount) + mrating) / (Number(video.rating) + 1)).toFixed(1); 
      video.ratingCount += mrating;
      video.rating += 1;
      video.averageRating = newRating;


   
    try {
        let result = await dao.updateVideo(video);

      res.status(200).json(result);
    } catch (e) {
      if (e.code === "FAILED_TO_GET_VIDEO") {
        res.status(400).json({ error: e });
      } else if (e.code === "FAILED_TO_UPDATE_VIDEO") {
        res.status(401).json({ error: e });
      } 
    }
  } else {
    res.status(400).json({
      error: "Invalid dtoIn",
    });
  }
}

module.exports = RatingAbl;
