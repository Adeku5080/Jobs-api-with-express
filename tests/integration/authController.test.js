const request = require("supertest");
const app = require("../../server");
const User = require("../../src/models/User");

describe("AuthController", () => {
  describe("register", () => {
    it("should return a validation error if email is not provided", async () => {
      const response = await request(app).post("/register").send({
        name: "ali adeku",
      });
      expect (response.status).toBe()
    });
  });
});
