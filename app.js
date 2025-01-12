const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog.js");
const blogRoutes = require("./routes/blogRoutes.js");

const app = express();
const uri =
  "mongodb+srv://pankajgupta1063:Pankaj026@cluster0.ne6kq.mongodb.net/NodeTuts?retryWrites=true&w=majority&appName=Cluster0";

// todo: if new user this 2nd args {useNewUrlParser: true, useUnifiedTopology: true}
mongoose
  .connect(uri)
  .then((result) => {
    app.listen(3000);
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//! Mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "Yohohoho",
//     snippet: "about my new blog",
//     body: "more abot my new blog and this will be great and bigggggggggggggg",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById('677a669fed060f2ddaa7c6a1')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Main

app.get("/", (req, res) => {
  // const blogs = [
  //   { title: "Bankai", snippets: "Senbonzakura kageyoshi" },
  //   { title: "Sun God Nika", snippets: "Gomu Gomu no Backend" },
  //   { title: "Kha me han me AAAA", snippets: "Super Saiyan Ultra Instincts" },
  //   { title: "Khathon", snippets: "Shadow Clone Jutsu" },
  // ];

  // res.send('<h1>Namaste Express</h1>');
  // res.sendFile("./views/index.html", { root: __dirname });
  // res.render("index", { title: "Home", blogs });

  res.redirect("/blogs");
});

// blogs
app.use(blogRoutes)

// about
app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: 404 });
});
