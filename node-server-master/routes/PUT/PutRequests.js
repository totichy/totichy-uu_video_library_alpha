const express = require('express');
const router = express.Router()
const uuVideo = require('../../mongoDB/uuVideoSchema')
const app = express();

app.use(express.json());

//UPDATE a video
router.put('/update', (req, res) => {

    uuVideo.findOneAndUpdate({ code: req.body.code }, req.body, function (err, uVideo) {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.json({
                msg: `Video with id ${req.body.code} was successfully updated.`,
                changedVideo: uVideo
            })
        }
    });
});


module.exports = router;