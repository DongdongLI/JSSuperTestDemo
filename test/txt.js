var app = require("../app");
var supertest = require("supertest");

describe("plain text response", function () {
    var request;
    beforeEach(function(){
        request = supertest(app)
            .get("/")
            .set("User-Agent","Don's MacBook Air")
            .set("Accept","text/plain");
    })

    it("returns a plain text response", function (done) {
        request
            .expect("Content-Type",/text\/plain/)//regular expression
            .expect(200)
            .end(done);
    });

    it("returns user agent", function (done) {
        request
            .expect(function (res) {
                if (res.text !== "Don's MacBook Air")
                    throw new Error("Response user agent wrong");
            })
            .end(done);
    });
});