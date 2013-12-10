'use strict';

var _ = require("lodash"),
    EventEmitter = require("events").EventEmitter,
    fs = require("fs"),
    simplator = require("simplator");


var template = fs.readFileSync(__dirname + "/../templates/pager.html","utf8");
var pagerTemplate = simplator.compile(template);

function PagerView($) {
    this.$ = $;
    this.events = new EventEmitter();


}

module.exports = PagerView;

PagerView.prototype.run = function () {
    var _this = this;
    _this.running = true;

    _this.$("#firstPage a").click(function () {
        _this.events.emit('firstPage');
    });

    _this.$("#lastPage a").click(function () {
        _this.events.emit('lastPage');
    });

    _this.$("#prevPage a").click(function () {
        _this.events.emit('prevPage');
    });

    _this.$("#nextPage a").click(function () {
        _this.events.emit('nextPage');
    });

};


PagerView.prototype.show = function (currPage, totalPages) {
    var _this = this;

    if (!_this.running) {

        var pagerContext = {
            currPage: currPage,
            firstPageClass: currPage == 1 ? "disabled" : "",
            prevPageClass: currPage == 1 ? "disabled" : "",
            nextPageClass: currPage == totalPages ? "disabled" : "",
            lastPageClass: currPage == totalPages ? "disabled" : "",
            totalPages: totalPages
        };

        return pagerTemplate(pagerContext);


    } else {
        this.$("#firstPage").attr("class", currPage == 1 ? "disabled" : "");
        this.$("#prevPage").attr("class", currPage == 1 ? "disabled" : "");
        this.$("#nextPage").attr("class", currPage == totalPages ? "disabled" : "");
        this.$("#lastPage").attr("class", currPage == totalPages ? "disabled" : "");
        this.$("#currPage a").html(currPage + " di " + totalPages);

        return null;
    }
};