const request = require("supertest");
const app = require("../../app");
const Job = require("../../src/models/Job");
const User = require("../../src/models/User");

let user;
let token;
describe("JobController", () => {
  beforeEach(async () => {
    user = User.create({
      email: "aliadeku@gmail.com",
      name: "ali adeku",
      password: "Adeku1997",
    });

    const response = await request(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: "aliadeku@gmail.com",
        password: "Adeku1997",
      });
    token = response.body.token;
  });

  describe("get jobs", () => {});

  describe("create job", () => {
    
  });

  describe("get job", () => {});

  describe("update job", () => {});

  describe("delete  job", () => {});
});
