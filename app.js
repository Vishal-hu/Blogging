const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { render } = require("ejs");
const blogRoutes = require("./routes/blogroutes");

// CONNECTION_STRING='mongodb+srv://cluster0.5xmnw.mongodb.net/<dbname>?retryWrites=true&w=majority'
// DBNAME=chetu_app
// USER=users_db
// PASS=Dinh64qjk6Exvl58

const PORT = process.env.PORT || 3000;
// const dbURL = "mongodb://127.0.0.1:27017/newBlog";
mongoose.connect('mongodb+srv://cluster0.5xmnw.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    dbName: 'blog-data',
    user:'users_db',
    pass: 'Dinh64qjk6Exvl58',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('mongodb connected...')
}).catch(err => console.log(err.message))


const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.redirect("/blogs");
});
// const blogs = [
//     { title: "hey", snippet: "hello" },
//     { title: "hello", snippet: "haye" },
// ];

// res.render("index", { title: "Home", blogs });
// });

// app.get("/new-blog", (req, res) => {
//     const blog = new Blog({
//         title: "new blog",
//         snippet: "writing new blog",
//         body: "this is the body of the blog",
//     });
//     blog
//         .save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);
app.use((req, res) => {
    res.status(404).render("404", { title: "Error" });
});

app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`);
})