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
            members: ['super', 'normal2'],
            selectedAssis: 'normal2',
            groupAdmin: 'super'

         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })


   it("creating  a channel", function () {
      request(app)
         .post("/api/register")
         .send({
            email: 'testing1@test.com',
            password: '1',
            username: 'testing2',
            birthday: '0001-01-01',
            type: 'normal',
            imageName: 'Picture1.png'
         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })



   it("delete  a channel", function () {
      request(app)
         .post("/api/register")
         .send({
            email: 'testing1@test.com',
            password: '1',
            username: 'testing2',
            birthday: '0001-01-01',
            type: 'normal',
            imageName: 'Picture1.png'
         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })


   it("delete a group", function () {
      request(app)
         .post("/group/delete")
         .send({ group: 'testing' })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })

   it("delete user", function () {
      request(app)
         .post("/api/delete")
         .send({ username: 'testing' })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");

         })
   })




   it("user authentication", function () {
      request(app)
         .post("/api/auth")
         .send({ username: 'normal2', password: '1' })
         .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a("object");
         })
   })



   it("register a new user", function () {
      request(app)
         .post("/api/register")
         .send({
            email: 'testing2@test.com',
            password: '1',
            username: 'testing2',
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
            email: 'testing2@test.com',
            password: '1',
            username: 'testing2',
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
            group: 'testing2',
            members: ['super', 'normal2'],
            selectedAssis: 'normal2',
            groupAdmin: 'super'

         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })


   it("creating  a channel", function () {
      request(app)
         .post("/api/register")
         .send({
            email: 'testing1@test.com',
            password: '1',
            username: 'testing3',
            birthday: '0001-01-01',
            type: 'normal',
            imageName: 'Picture1.png'
         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })

   it("delete  a channel", function () {
      request(app)
         .post("/api/register")
         .send({
            email: 'testing1@test.com',
            password: '1',
            username: 'testing3',
            birthday: '0001-01-01',
            type: 'normal',
            imageName: 'Picture1.png'
         })
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");

         })
   })


   it("delete a group", function () {
      request(app)
         .post("/group/delete")
         .send({ group: 'testing2' })
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

   // it("invite a group member", function () {
   //    request(app)
   //       .post("/groups/group/invite")
   //       .send({ member: 'testing', group: 'testing' })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("array");

   //       })
   // })

   // it("invite a group member", function () {
   //    request(app)
   //       .post("/groups/group/invite")
   //       .send({ member: 'normal1', group: 'testing' })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("array");

   //       })
   // })

   // it("delete a group member", function () {
   //    request(app)
   //       .post("/group/deleteMember")
   //       .send({ member: 'normal1', group: 'testing' })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("array");

   //       })
   // })

   // it("create a channel", function () {
   //    request(app)
   //       .post("/createChannel")
   //       .send({ channel: 'testing', group: 'testing' })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("boolean");

   //       })
   // })

   // it("invite a user to channel", function () {
   //    request(app)
   //       .post("/channel/invite")
   //       .send({ group: 'testing', channel: 'testing', member: 'testing' }
   //       )
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("array");


   //       })
   // })

   // it("delete a channel member", function () {
   //    request(app)
   //       .post("/channel/deleteMember")
   //       .send({ group: 'testing', channel: 'testing', member: 'testing' })
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a("array");

   //       })
   // })

   // it("delete a channel", function () {
   //    request(app)
   //       .post("/deleteChannel")
   //       .send({ channel: 'testing', group: 'testing' })
   //       .end((err, res) => {
   //          // res.should.have.status(200);
   //          res.body.should.be.a("array");

   //       })
   // })
























})







