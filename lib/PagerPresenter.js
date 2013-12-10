'use strict';

var _ = require("lodash"),
    EventEmitter = require("events").EventEmitter;



function PagerPresenter(pager,pagerView) {
    this.pager= pager;
    this.pagerView = pagerView;
    this.events = new EventEmitter();


}

PagerPresenter.prototype.start = function(){
    var _this = this;
    _this.pagerView.events.on('nextPage',function(){
        _this.pager.gotoPage(_this.pager.currPage+1);
        _this.events.emit("pageChanged")
    });

    _this.pagerView.events.on('prevPage',function(){
        console.log(_this.pager.currPage)
        _this.pager.gotoPage(_this.pager.currPage-1);
        _this.events.emit("pageChanged")
    });

    _this.pagerView.events.on('firstPage',function(){
        _this.pager.gotoPage(1);
        _this.events.emit("pageChanged")
    });
    _this.pagerView.events.on('lastPage',function(){
        _this.pager.gotoPage(_this.pager.totalPages);
        _this.events.emit("pageChanged")
    });

};

module.exports = PagerPresenter;
