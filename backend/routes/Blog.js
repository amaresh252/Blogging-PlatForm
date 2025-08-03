const express = require("express");
const {
  fetchAllBlog,
  fetchBlogById,
  postBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/Blog");
const { isAuth, isAuthorizeToUpdateBlog } = require("../utils");
const router = express.Router();

router.get("/", isAuth, fetchAllBlog);
router.get("/:_id", isAuth, fetchBlogById);
router.post("/", isAuth, postBlog);
router.put("/:_id", isAuth, isAuthorizeToUpdateBlog, updateBlog);
router.delete("/:_id", isAuth, isAuthorizeToUpdateBlog, deleteBlog);

module.exports = router;
