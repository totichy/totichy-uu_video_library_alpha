const { parse } = require('dotenv');
const express = require('express');
const router = express.Router()
const uuCategory = require('../../mongoDB/uuVideoCategorySchema')
const app = express();

app.use(express.json());

//GET all categories
router.get('/list', async(req, res) => {
    uuCategory.find({}, function(err, categories) {
        //console.log(unique)
        if (err) {
            return res.status(400).json(err)
        } else {
            return res.json(categories);
        }
        //console.log(videos);
    })
});

//GET single category by name
router.get('/search/name', async(req, res) => {
        uuCategory.find({ "categoryName": { $regex: req.body.fullText, '$options': 'i' } }, (err, data) => {
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
    //GET single video by categoryId
router.get('/search/id', async(req, res) => {
    uuCategory.findOne({ categoryId: parseInt(req.body.fullText) }, (err, data) => {
        if (err) {
            return res.status(400).json({
                msg: "Oooops something went wrong. Check your input and try again.",
                error: err
            });
        }
        if (data === null) {
            return res.json({
                error_message: `no data with category id: ${parseInt(req.body.fullText)} were found`
            })
        } else {
            res.json(data)
        }
    })
})

module.exports = router;