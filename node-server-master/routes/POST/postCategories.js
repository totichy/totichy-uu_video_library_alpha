const express = require('express');
const router = express.Router()

const uuCategory = require('../../mongoDB/uuVideoCategorySchema');
const uuVideo = require('../../mongoDB/uuVideoSchema')
const app = express();

app.use(express.json());

router.post('/create', async(req, res) => {
    const newCategory = new uuCategory({
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName
    })
    uuCategory.find({}, (err, data) => {
        let check = data.some((element) => {
                if (element.categoryName.toLowerCase() === req.body.categoryName.toLowerCase()) {
                    return true;
                }
                if (element.categoryId === parseInt(req.body.categoryId)) {
                    return true;
                } else return false;
            })
            //console.log(data.code)
            //console.log(newVideo)
        if (err) {
            return res.status(400).json({
                error_message: 'Server not responding or something bad happened'
            })
        }
        if (check) {
            res.status(400).json({
                error_message: 'Category with this name/code already exists!'
            })
        } else {
            newCategory.save(function(err, data) {
                if (err) return res.status(400).json(err);
                //newVideo.confirm();
                res.json(
                 data
                ); // prints category after successful creation
            });
        }

    })

})

//DELETE a category
router.post('/delete', async(req, res) => {
    const categoryCheck = await uuCategory.find({ categoryId: req.body.categoryId }).exec();
    const videoCheck = await uuVideo.find({ category: req.body.categoryId }).exec();
    //console.log(categoryCheck);
    //console.log(videoCheck);
    if (videoCheck.length !== 0) {
        return res.status(400).json({
            error_message: "This category still contains videos! Please remove videos or change their categries before deleting a category"
        })
    }

    if (categoryCheck.length === 0) {
        return res.status(400).json({
            error_message: "Category with id " + req.body.categoryId + " does not exist!"
        })
    } else {
        uuCategory.findOneAndDelete({ categoryId: req.body.categoryId }, function(err, data) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json({})

            }
        })

    }

});

module.exports = router;