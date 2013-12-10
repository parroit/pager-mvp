var assert = require("assert"),
    expect = require("expect.js"),
    _ = require("lodash"),
    Pager = require("../lib/pager");

var data = [
    {
        nome: "giorgio",
        cognome: "verdi"
    },{
        nome: "gino",
        cognome: "gialli"
    },{
        nome: "pino",
        cognome: "rossi"
    },{
        nome: "ludovico",
        cognome: "bianchi"
    },{
        nome: "andrea",
        cognome: "parodi"
    }
];
var pager = new Pager(data,2);


describe("Pager", function () {
    it("is defined", function () {
        expect(Pager).to.be.an('function');
    });

    it("is is instantiable", function () {
        expect(pager).to.be.an('object');
    });

    it("save data", function () {
        expect(pager.data).to.be.an('object');
    });

    it("save pageLen", function () {
        expect(pager.pageLen).to.be.equal(2);
    });

    it("start on currPage", function () {
        expect(pager.currPage).to.be.equal(1);
    });

    it("calculate totalPages on start", function () {
        expect(pager.totalPages).to.be.equal(3);
    });



    it("contains data of first page of elements at start",function(){
        var expected = [
            {
                nome: "giorgio",
                cognome: "verdi"
            },{
                nome: "gino",
                cognome: "gialli"
            }];

        expect(_(pager.currPageData).isEqual(expected)).to.be.equal(true);
    });

    describe("gotoPage",function(){
        before(function(){
            pager.gotoPage(2);
        });


        it("update currPage", function () {
            expect(pager.currPage).to.be.equal(2);
        });

        it("currPageData contains right data",function(){
            var expected = [
                {
                    nome: "pino",
                    cognome: "rossi"
                },{
                    nome: "ludovico",
                    cognome: "bianchi"
                }];

            expect(_(pager.currPageData).isEqual(expected)).to.be.equal(true);
        });
    });


    describe("sort",function(){
        before(function(){
            pager.sort('nome');
        });

        it("keep currPage", function () {
            expect(pager.currPage).to.be.equal(2);
        });

        it("currPageData contains right data",function(){
            var expected = [
                {
                    nome: "giorgio",
                    cognome: "verdi"
                },{
                    nome: "ludovico",
                    cognome: "bianchi"
                }];

            expect(_(pager.currPageData).isEqual(expected)).to.be.equal(true);
        });

        it("save sort property", function () {
            expect(pager.sortProperty).to.be.equal("nome");
        });

        it("save sort direction", function () {
            expect(pager.direction).to.be.equal("ascending");
        });

        it("descending order on reapply same property", function () {
            pager.sort('nome');
            var expected = [
                {
                    nome: "giorgio",
                    cognome: "verdi"
                },{
                    nome: "gino",
                    cognome: "gialli"
                }];

            expect(_(pager.currPageData).isEqual(expected)).to.be.equal(true);
            expect(pager.sortProperty).to.be.equal("nome");
            expect(pager.direction).to.be.equal("descending");
        });

        it("ascending order on re-reapply same property", function () {
            pager.sort('nome');
            var expected = [
                {
                    nome: "giorgio",
                    cognome: "verdi"
                },{
                    nome: "ludovico",
                    cognome: "bianchi"

                }];

            expect(_(pager.currPageData).isEqual(expected)).to.be.equal(true);
            expect(pager.sortProperty).to.be.equal("nome");
            expect(pager.direction).to.be.equal("ascending");
        });
    });

});
