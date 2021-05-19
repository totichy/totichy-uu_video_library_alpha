const express = require('express');
const router = express.Router()
const uuVideo = require('../../mongoDB/uuVideoSchema')
const app = express();

app.use(express.json());

//UPDATE a video
router.put('/update/:id', (req, res) => {

    uuVideo.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, uVideo) {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.json({
                msg: `Video with id ${req.params.id} was successfully updated.`,
                changedVideo: uVideo
            })
        }
    });
});


module.exports = router;