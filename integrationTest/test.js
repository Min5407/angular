var request = require("supertest")
const expect = require('chai').expect;


//    , app = require("../server2.js")
// var assert = require("assert")
var http = require("http");
var chai = require("chai");
var chaiHttp = require("chai-http")
let should = chai.should();

chai.use(chaiHttp)

let app = "http://localhost:3000"
describe('server test', () => {

   it("get users", function () {
      request(app)
         .get('/users')
         .end((err, res) => {
            // res.should.have.status(200);
            res.body.should.be.a("array");

         })

   })

   it("get channels", function () {
      request(app)
         .post("/getChannels")
         .send({ group: "test" })
         .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a("object");
         })
   })

   it("user authentication", function () {
      request(app)
         .post("/api/auth")
         .send({ username: 'normal1', password: '1' })
         .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a("object");
         })
   })

   it("get groups", function () {
      request(app)
         .get("/groups")
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

            // res.body.should.be.a("boolean");
         })
   })

   it("register a new user", function () {
      request(app)
         .post("/api/register")
         .send({
            email: 'testing@test.com',
            password: '1',
            username: 'testing',
            birthday: '0001-01-01',
            type: 'normal',
            imageName: 'Picture1.png'
         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })

   it("give a super", function () {
      request(app)
         .post("/giveSuper")
         .send({
            _id: '5d92f0aef43a367a0e0bfcf2',
            email: 'testing@test.com',
            password: '1',
            username: 'testing',
            birthday: '0001-01-01',
            type: 'normal',
            imageName: 'Picture1.png',
            valid: '',
            groups: []
         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })

   it("create a group", function () {
      request(app)
         .post("/group/create")
         .send({
            group: 'testing',
            members: ['normal2', 'normal1', 'super'],
            selectedAssis: 'normal1',
            groupAdmin: 'super'

         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })


   it("create a channel", function () {
      request(app)
         .post("/createChannel")
         .send({ channel: 'testing', group: 'testing' })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })

   // it("invite a user to channel", function () {
   //    request(app)
   //       .post("/channel/invite")
   //       .send({ group: 'testing', channel: 'testing', member: 'normal1' }
   //       )
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("array");


   //       })
   // })

   // it("delete a channel member", function () {
   //    request(app)
   //       .post("/channel/deleteMember")
   //       .send({ group: 'testing', channel: 'testing', member: 'normal1' })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("array");

   //       })
   // })

   it("delete a channel", function () {
      request(app)
         .post("/deleteChannel")
         .send({ channel: 'testing', group: 'testing' })
         .end((err, res) => {
            // res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })

   it("invite a group member", function () {
      request(app)
         .post("/groups/group/invite")
         .send({ member: 'testing', group: 'testing' })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })
   it("delete a group member", function () {
      request(app)
         .post("/group/deleteMember")
         .send({ member: 'testing', group: 'testing' })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })

   it("delete user", function () {
      request(app)
         .post("/api/delete")
         .send({ username: 'testing2' })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })

   it("/group/delete", function () {
      request(app)
         .post("/group/delete")
         .send({ group: 'testing' })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })




















   // it("add1", function () {
   //    chai.request(app)
   //       .post('/add')
   //       .send({ id: 206, name: "asd", description: "asd", price: 123, units: 112 })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("boolean")
   //          // expect(response.statusCode).to.equal(201);


   //          // res.should.have.status(200);
   //          // res.should.have.status(200);
   //          // console.log(res.body);
   //       })
   // })

   // it("add2", function () {
   //    chai.request(app)
   //       .post('/add')
   //       .send({ id: 205, name: "bsd", description: "bsd", price: 123, units: 1122 })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("boolean")
   //          // expect(response.statusCode).to.equal(201);


   //          // res.should.have.status(200);
   //          // res.should.have.status(200);
   //       })
   // })

   // it("delete1", function () {
   //    chai.request(app)
   //       .post('/delete')
   //       .send({ id: '5d832cc0a89a6b2f4bcbb8d0' })
   //       .end((err, res) => {
   //          res.should.have.status(200)
   //          res.body.should.be.a("array")
   //       })

   // })
   // it("delete2", function () {
   //    chai.request(app)
   //       .post('/delete')
   //       .send({ id: '5d832dfc60964e2f7eedbc90' })
   //       .end((err, res) => {
   //          res.should.have.status(200)
   //          res.body.should.be.a("array")
   //       })

   // })

   // it("update1", () => {
   //    chai.request(app)
   //       .post("/update")
   //       .send({ _id: "5d83319dc29ae83003f560e6", name: "update1", price: 100, description: "update1", units: 100 })
   //       .end((err, res) => {
   //          res.should.have.status(200)
   //          res.body.should.be.a("boolean")
   //       })
   // })
   // it("update2", () => {
   //    chai.request(app)
   //       .post("/update")
   //       .send({ _id: "5d83319dc29ae83003f560e5", name: "update2", price: 100, description: "update2", units: 100 })
   //       .end((err, res) => {
   //          res.should.have.status(200)
   //          res.body.should.be.a("boolean")
   //       })
   // })

   // it("getItem", () => {
   //    chai.request(app)
   //       .post("/getItem")
   //       .send({ _id: "5d83319dc29ae83003f560e5" })
   //       .end((err, res) => {
   //          res.should.have.status(200)
   //          res.body.should.be.a("array")
   //       })
   // })
})







