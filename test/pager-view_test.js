var assert = require("assert"),
    expect = require("expect.js"),
    cheerio = require('cheerio'),
    PagerView = require("../lib/PagerView");


describe("page-view", function () {
    var $ = cheerio.load(' <div id="content"></div>');
    var pageView = new PagerView($);

    var handlers={};

    var $a = $("a");
    $a.__proto__.click = function(handler){
        var key = $(this).parent("li").attr("id");
        if (key in handler)
            throw new Error("handler already present for "+key);
        handlers[ key] = handler;
    };
    $a.__proto__.submit =function(handler){

    };

    it("is defined", function () {
        expect(PagerView).to.be.an('function');
    });

    it("is creatable", function () {
        expect(pageView).to.be.an('object');
    });

    describe("show", function () {
        it("is creatable", function () {
            expect(pageView.show).to.be.an('function');
        });
        describe("onFirstCall", function () {
            before(function(){
                $("#content").html(pageView.show(1,1));
                pageView.run();

            });

            it("render currPage and totalPage", function () {
                expect($("#currPage").find("a").html()).to.be.equal("1 di 1");
            });

            it("register function handlers", function () {
                expect(handlers.nextPage).to.be.a("function");
            });

            it("register all handlers", function () {
                expect(Object.keys(handlers).length).to.be.equal(4);
            });

            it("disable prevPage", function () {

                expect($("#prevPage").hasClass("disabled")).to.be.equal(true);
            });

            it("disable firstPage", function () {
                expect($("#firstPage").hasClass("disabled")).to.be.equal(true);
            });

            it("disable nextPage", function () {
                expect($("#nextPage").hasClass("disabled")).to.be.equal(true);
            });

            it("disable lastPage", function () {
                expect($("#lastPage").hasClass("disabled")).to.be.equal(true);
            });

        });

        describe("emit events on page link clicks", function () {
            var events;

            function on(event){
                pageView.events.on(event,function(){
                    events.push(event);
                });
            }
            function check(event){
                it("emit "+event, function () {
                    events=[];
                    handlers[event]();
                    expect(events.length).to.be.equal(1);
                    expect(events[0]).to.be.equal(event);
                });
            }
            before(function(){

                on("firstPage");
                on("prevPage");
                on("nextPage");
                on("lastPage");

            });


            check("firstPage");
            check("prevPage");
            check("nextPage");
            check("lastPage");

        });

        describe("onSubsequentCalls", function () {
            before(function(){
                pageView.show(2,4);


            });

            it("render currPage and totalPage", function () {
                expect($("#currPage").find("a").html()).to.be.equal("2 di 4");
            });



            it("don't register handlers again", function () {
                expect(Object.keys(handlers).length).to.be.equal(4);
            });

            it("upgrade prevPage class", function () {

                expect($("#prevPage").hasClass("disabled")).to.be.equal(false);
            });

            it("upgrade firstPage class", function () {
                expect($("#firstPage").hasClass("disabled")).to.be.equal(false);
            });

            it("upgrade nextPage class", function () {
                expect($("#nextPage").hasClass("disabled")).to.be.equal(false);
            });

            it("upgrade lastPage class", function () {
                expect($("#lastPage").hasClass("disabled")).to.be.equal(false);
            });

        });

        describe("onAnotherSubsequentCalls", function () {
            before(function(){
                pageView.show(1,1);


            });


            it("disable prevPage", function () {

                expect($("#prevPage").hasClass("disabled")).to.be.equal(true);
            });

            it("disable firstPage", function () {
                expect($("#firstPage").hasClass("disabled")).to.be.equal(true);
            });

            it("disable nextPage", function () {
                expect($("#nextPage").hasClass("disabled")).to.be.equal(true);
            });

            it("disable lastPage", function () {
                expect($("#lastPage").hasClass("disabled")).to.be.equal(true);
            });

        });

    });
});
