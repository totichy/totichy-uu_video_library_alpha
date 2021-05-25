const express = require('express');
const router = express.Router()
const uuVideo = require('../../mongoDB/uuVideoSchema')
const app = express();

app.use(express.json());

//DELETE a video
router.delete('/delete', async (req, res) => {
    uuVideo.findOneAndDelete({ code: req.body.code }, function (err, delVideo) {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(200).json({ delete_message: `video with id: ${req.body.code} was sucessfully removed from database` })

        }
    })
});


module.exports = router;