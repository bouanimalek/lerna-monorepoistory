const mongoose = require("mongoose");
const { Schema } = mongoose;


const tagSchema = new Schema({
    name: String,
    description: String
}
,
  {
    timestamps: true,
    versionKey: false,
  }
);

const Tag = mongoose.model("Tags", tagSchema);

module.exports = Tag;