var express = require("express");
var path = require("path");
var app = new express();

app.set("port", process.env.PORT || 3000);

var viewPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewPath);

app.get("/", function(req, res){
    var userAgent = req.headers["user-agent"]||"none";
    if(req.accepts("html")){
        res.render("index", {userAgent: userAgent});
    }else{
        res.type("text");
        res.send(userAgent);
    }
});

app.listen(app.get("port"), function () {
    console.log("App started at port "+app.get("port"));
});

module.exports = app;