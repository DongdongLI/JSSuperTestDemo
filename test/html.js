var app = require("../app.js");
var superTest = require("supertest");
var cheerio = require("cheerio");

describe("html response", function () {
    var request;
    beforeEach(function () {
        request = superTest(app)
            .get("/")
            .set("User-Agent", "Don MacBook Air")
            .set("Accept","text/html");
    });

    it("returns an HTML response", function (done) {
        request
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });

    it("returns my User Agent", function (done) {
        request
            .expect(function (res) {
                var htmlRes = res.text;
                var $ = cheerio.load(htmlRes);
                var userAgent = $(".user-agent").html().trim();
                if(userAgent!=="Don MacBook Air"){
                    throw new Error("User Agent wrong");
                }
            })
            .end(done);
    });
});