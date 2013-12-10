function Pager(data, pageLen) {
    this.data = data;
    this.pageLen = pageLen;
    this.currPage = 1;
    this.totalPages = Math.ceil(data.length / pageLen);

    this.currPageData = data.slice(0, pageLen);

}

Pager.prototype.gotoPage = function (page) {
    if (page >=1 && page <= this.totalPages) {
        this.currPage = page;

        this.currPageData = this.data.slice((page - 1) * this.pageLen, page * this.pageLen);

    }

};


Pager.prototype.sort = function (propertyName) {
    var _this = this;
    if (_this.sortProperty == propertyName)
        _this.direction = _this.direction == "ascending" ? "descending" : "ascending";
    else
        _this.direction = "ascending";

    _this.sortProperty = propertyName;

    _this.data.sort(function (row1, row2) {
        var val1 = (row1 && row1[propertyName]) || 0;
        var val2 = (row2 && row2[propertyName]) || 0;
        if (val1 == val2)
            return 0;
        var result = _this.direction == "ascending" ? val1 > val2 : val1 < val2;
        return result ? 1 : -1;
    });


    _this.gotoPage(_this.currPage);

};


module.exports = Pager;
