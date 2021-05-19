const express = require('express');
const router = express.Router()
const uuVideo = require('../../mongoDB/uuVideoSchema')
const app = express();

app.use(express.json());



//GET all videos routy
router.get('/list', async(req, res) => {
    uuVideo.find({}, function(err, videos) {
        if (err) return res.status(400).json(err);
        //console.log(videos);
        res.json(videos);
    })
});

//GET single video by code
router.get('/code/:code', async(req, res) => {
    uuVideo.find({ code: parseInt(req.params.code) }, function(err, videoArray) {
        if (err) {
            return res.json(err)
        } else if (videoArray.length < 1) {
            res.json({
                message: `There is no video with code: ${req.params.code} in database`
            })

        } else {
            return res.json(videoArray)
        }
    })
});

//GET Search for single video by query
router.get('/search/title', async(req, res) => {
    uuVideo.find({ "title": { $regex: req.body.fullText, '$options': 'i' } }, (err, data) => {
        if (err) {
            return res.status(400).json(err);

        }
        if (data.length === 0) {
            return res.json({
                error_message: `no data with input "${req.body.fullText}" were found`
            })
        } else {
            res.json(data)
        }
    })
})

module.exports = router;