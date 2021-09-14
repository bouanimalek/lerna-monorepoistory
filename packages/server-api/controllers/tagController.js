const Tag = require("../models/tagSchema");

// get all tags
exports.getAlltags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// create new tag
exports.createTag = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get tag by id
exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    res.json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// modify tag
exports.modifyTag = async (req, res) => {
  try {
    const modifiedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(modifiedTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// delete tag
exports.deleteTag = async (req, res) => {
  try {
    const deletedtag = await Tag.findByIdAndDelete(req.params.id);
    res.json({ message: "tag deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};
