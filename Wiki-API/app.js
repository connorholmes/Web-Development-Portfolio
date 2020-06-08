const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:4000/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// Chained Articles Route
app.route("/articles").get(function(req, res) { //GET Route
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        };
    });
}).post(function(req, res) { //POST Route
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully added new article.");
        };
    });
}).delete(function(req, res) { //DELETE Route
    Article.deleteMany(function(err) {
        if (!err) {
            res.send("Successfully deleted all articles.")
        } else {
            res.send(err);
        };
    });
});

//Targeting a specific article
app.route("/articles/:articleTitle")
.get(function(req, res) {
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
        if (foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("Article not found.")
        };
    });
})
.put(function(req, res) {
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err) {
            if (!err) {
                res.send("Successfully updated article.")
            } else {
                res.send("Error updating article.")
            };
        }
    );
})
.patch(function(req, res) {
    Article.update(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err) {
            if (!err) {
                res.send("Successfully updated article.")
            } else {
                res.send(err);
            };
        }
    );
})
.delete(function(req, res) {
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err) {
            if (!err) {
                res.send("Successfully deleted article.");
            } else {
                res.send(err);
            };
        }
    );
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});