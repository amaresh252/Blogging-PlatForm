const Blog = require("../model/Blog");
const User = require("../model/User");

exports.fetchAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ result: blogs });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error in Blog list fetching" });
  }
};
exports.fetchBlogById = async (req, res) => {
  const { _id } = req.params;
  try {
    const blog = await Blog.findById({ _id });
    res.status(200).json({ result: blog });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error in Blog  fetching" });
  }
};

exports.postBlog = async (req, res) => {
  try {
    const userId = req.user.userId;
    const blog = new Blog({ ...req.body, User: userId });
    const doc = await blog.save();
    await User.findOneAndUpdate({ _id: userId }, { $push: { list: doc._id } });
    res.status(201).json({ result: doc });
  } catch (err) {
    res.status(400).json({ message: "error in post blog" });
  }
};

exports.updateBlog = async (req, res) => {
  const { _id } = req.params;
  var data = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(_id, data, { new: true });
    if (updatedBlog) {
      res.status(200).json({ result: updatedBlog });
    } else {
      res.status(400).json({ message: "not updated" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(_id);
    if (deletedBlog) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      throw new Error("not deleted");
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
