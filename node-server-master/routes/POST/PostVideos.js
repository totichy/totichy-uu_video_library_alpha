const express = require('express');
const router = express.Router()
const uuVideo = require('../../mongoDB/uuVideoSchema')
const uuCategory = require('../../mongoDB/uuVideoCategorySchema')
const app = express();

app.use(express.json());

//POST a new video into database
router.post('/create', async(req, res) => {
    const newVideo = new uuVideo({
        code: new Date().getTime(),
        authorName: req.body.authorName,
        authorSurname: req.body.authorSurname,
        title: req.body.title,
        videoUrl: req.body.videoUrl,
        description: req.body.description,
        category: req.body.category,
        visible: false,
        averageRating: req.body.averageRating,
        ratingCount: req.body.ratingCount,
        rating: req.body.ratingValue
    })
    uuVideo.findOne({ title: req.body.title }, (err, data) => {
        //console.log(data.title)
        //console.log(newVideo)
        if (err) {
            return res.json({
                error_message: 'Server not responding or something bad happened'
            })
        }
        if (data !== null) {
            res.json({
                error_message: 'Video with this title name already exists!'
            })
        } else {
            newVideo.save(function(err, newVideo) {
                if (err) return res.status(400).json(err);
                //newVideo.confirm();
                res.json({
                    post_message: `Video with code: ${newVideo.code} name: "${newVideo.title}" Successfully put into database`,
                    new_video: newVideo
                }); // prints video after successful creation
            });
        }

    })

})




module.exports = router;