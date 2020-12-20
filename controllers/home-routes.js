const router = require("express").Router();
const { Post, Comment, User, Image } = require("../models/");

// GET route for all posts
router.get("/", (req, res) => {
    Post.findAll({
        include: [
            User,
            Image
        ],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            
                // post.imageURL = 'data:image/jpg;base64,' + Buffer.from(imageData, 'binary').toString('base64')

            res.render("all-posts", { posts });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// GET route for a single post (by ID)
router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [
                    User
                ],
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("single-post", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// GET '/' show login page if not logged in and dashboard if logged in
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

// GET '/signup' show signup page if not logged in and dashboard if logged in
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});


function imageConvert(data) {
    const imageURL = 'data:image/jpg;base64,' + Buffer.from(data, 'binary').toString('base64');
    return imageURL
}

module.exports = router;