const express = require('express');
const router = express.Router()

const uuCategory = require('../../mongoDB/uuVideoCategorySchema')
const app = express();

app.use(express.json());

router.post('/create', async(req, res) => {
    const newCategory = new uuCategory({
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName
    })
    uuCategory.find({}, (err, data) => {
        let check = data.some((element) => {
            if(element.categoryName.toLowerCase() === req.body.categoryName.toLowerCase()) {
                return true;
            }
            if(element.categoryId === parseInt(req.body.categoryId)) {
                return true;
            }
            else return false; 
         })
        //console.log(data.code)
        //console.log(newVideo)
        if (err) {
            return res.json({
                error_message: 'Server not responding or something bad happened'
            })
        }
        if (check) {
            res.json({
                error_message: 'Category with this name/code already exists!'
            })
        } else {
            newCategory.save(function(err, data) {
                if (err) return res.status(400).json(err);
                //newVideo.confirm();
                res.json({
                    post_message: `Category with code: ${newCategory.categoryId} name: "${newCategory.categoryName}" Successfully put into database`,
                    new_category: data
                }); // prints video after successful creation
            });
        }

    })

})

module.exports = router;
