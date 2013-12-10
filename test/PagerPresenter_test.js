var assert = require("assert"),
    expect = require("expect.js"),
    EventEmitter = require('events').EventEmitter,

    PagerPresenter = require("../lib/PagerPresenter");


describe("page-presenter", function () {
    var currentPage;
    var pager = {
        currPage:1,
        totalPages:10,
        gotoPage: function(page){
            this.currPage = page;
            currentPage = page;
        }
    };
    var view = {
       events: new EventEmitter()
    };
    var pagerPresenter = new PagerPresenter(pager,view);
    pagerPresenter.start();


    it("is defined", function () {
        expect(PagerPresenter).to.be.an('function');
    });

    it("is creatable", function () {
        expect(pagerPresenter).to.be.an('object');
    });

    describe("start", function () {
        it("is defined", function () {
            expect(pagerPresenter.start).to.be.an('function');
        });
    });

    it("go to first page on event",function(){
        view.events.emit('firstPage');
        expect(currentPage).to.be.equal(1);
    });

    it("go to next page on event",function(){
        view.events.emit('nextPage');
        expect(currentPage).to.be.equal(2);
    });

    it("go to last page on event",function(){
        view.events.emit('lastPage');
        expect(currentPage).to.be.equal(10);
    });

    it("go to prev page on event",function(){
        view.events.emit('prevPage');
        expect(currentPage).to.be.equal(9);
    });

    var raised;
    pagerPresenter.events.on('pageChanged',function(){
        raised = true
    });
    function emitPageChangedOn(event){
        it("emit pageChanged on " +event,function(){
            raised = false
            view.events.emit(event);
            expect(raised).to.be.equal(true);

        });
    }

    emitPageChangedOn("prevPage");
    emitPageChangedOn("lastPage");
    emitPageChangedOn("nextPage");
    emitPageChangedOn("firstPage");
});
