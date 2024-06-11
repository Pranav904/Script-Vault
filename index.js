import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let blogs = {};
let bId = 0; // global blog id for the current session

app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs", {
    blogList: blogs,
  });
});

app.post("/allblogs", (req, res) => {
  let blogId = bId++;
  blogs[blogId] = {
    title: req.body["title"],
    content: req.body["content"],
  };
  res.render(__dirname + "/views/index.ejs", {
    blogList: blogs,
  });
});

app.post("/deleteblog", (req, res) => {
  const blogId = req.body.delBlogId;
  delete blogs[blogId];
  res.redirect("/");
});

app.post("/editblog", (req, res) => {
  const blogId = req.body.editBlogId;
  blogs[blogId].title = req.body.editTitle;
  blogs[blogId].content = req.body.editContent;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
