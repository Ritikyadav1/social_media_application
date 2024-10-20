const express = require('express');
const app = express();
const UserModel = require("./models/user");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postModel = require("./models/post");
const crypto = require('crypto');
const path = require('path');

const upload = require('./config/multerconfig');
const { profile } = require('console');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));







app.get("/", (req, res) => {  //homepage routes to index.ejs 
    res.render("index.ejs");
})


//here we can register the user and also verify the user 
app.post("/register", async (req, res) => {
    let { email, password, username, name, age } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).send({ message: "Email already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {  // it can be used to make the user password into hash so that it can't be seen on the database.  
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await UserModel.create({
                username,
                email,
                age,
                name,
                password: hash
            });

            let token = jwt.sign({ email: email, userid: user._id }, "shhhhh"); // here we can encrypt the email and user id in to token and store it using the JWT token 
            res.cookie("token", token);
            res.send("registered");

        });
    });

});



// this is login routes 
app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.use((req, res, next) => {
    res.status(404).render('404');  // This will render the 404.ejs file
});

app.get("/profile/upload", (req, res) => {
    res.render("profileupload.ejs");
})




// This is upload route where we can upload the image for the profile picture 
app.post("/upload",isLoggedIn , upload.single("image"),async(req, res) => {
   let user = await UserModel.findOne({email: req.user.email}); 
   user.profilepic = req.file.filename;  // we have the image and the default value is set to be the default.jpg  
   await user.save();
   res.redirect('/profile'); 

})

//we have the login route where we can manage the login 
app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).send({ message: "Something went wrong" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {

            let token = jwt.sign({ email: email, userid: user._id }, "shhhhh");
            res.cookie("token", token);
            res.redirect("/profile");

        } else {
            res.redirect("/login");
        }

    });

});

//here we can logout the cookie as when we clear it 
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
})


//profile section using the logged in middleware 
app.get("/profile", isLoggedIn, async (req, res) => {
    let user = await UserModel.findOne({ email: req.user.email }).populate("posts")

    res.render("profile.ejs", { user });
})
// we have the like section where we can get the like 
app.get("/like/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }

    await post.save();

    res.redirect("/profile");
})

//edit the user and the middleware which is just a async function where there is the post model and the model which can be used as middleware 
app.get("/edit/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render("edit.ejs", { post });
})

app.post("/update/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
    res.redirect("/profile");
})

app.post("/post", isLoggedIn, async (req, res) => {
    let user = await UserModel.findOne({ email: req.user.email });
    let { content } = req.body;
    let post = await postModel.create({
        user: user._id,
        content: content

    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");

});

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const data = jwt.verify(token, "shhhhh");
        req.user = data;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.clearCookie("token"); // Clear the invalid token
        return res.status(401).send("Invalid token. Please login again.");
    }
}



app.listen(3000);