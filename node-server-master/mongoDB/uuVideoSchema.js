const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
        code: { type: Number },
        authorName: { type: String, minLength: 3 },
        authorSurname: { type: String, minLength: 3 },
        title: { type: String, minLength: 3 },
        videoUrl: { type: String, minLength: 1 },
        description: { type: String, minLength: 3 },
        category: [{ type: String, maxLength: 3, required: true }],
        visible: Boolean,
        averageRating: { type: Number, max: 5, min: 0 },
        ratingCount: { type: Number, min: 0 },
        rating: { type: Number, max: 5, min: 0 },
    })
    //confirm method
videoSchema.methods.confirm = function() {
    return console.log(`Video with code: ${this.code} name: "${this.title}" author: "${author.authorName} ${this.authorSurname}" Successfully put into database`);
}
videoSchema.methods.updated = function() {
    return console.log(`Video with code: ${this.code} author: "${this.authorName} ${this.authorSurname} Successfully updated in database`)
}
const videoModel = mongoose.model('uuVideo', videoSchema);

module.exports = videoModel;