const request = require("supertest");
const app = require("../../app");
const User = require("../../src/models/User");

describe("AuthController", () => {
  describe("register", () => {
    it("should return a validation error if email,password or name  is not provided", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        name: "ali adeku",
      });
      expect(response.status).toBe(400);
      expect(response.body.msg).toEqual("invalid credentials");
    });

    it("should return 201 ,the registered user and the token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .set("content-type", "application/json")
        .send({
          name: "ali Adeku",
          password: "Adeku1997",
          email: "aliadeku@gmail.com",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("token");
    });
  });

  describe("login", () => {
    let user;
    beforeEach(async () => {
      user = await User.create({
        name: "Jumai",
        password: "JumaiAdeku",
        email: "jumaiadeku@gmail.com",
      });
      console.log(user, "beforeEach");
    });

    it("should return 400 if email or password is not provided", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        name: "ali adeku",
      });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe("Please provide email and password");
    });

    it("should return 401 if the user with the given email doesn't exist", async () => {
      const email = "test@gmail.com";
      const response = await User.findOne({ email });
      console.log(response, "ali");

      expect(response.status).toBe(401);
      expect(response.body.msg).toBe("invalid credentials");
    });

    it("should return 200 ,the user and token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .set("content-type", "application/json")
        .send({
          email: "jumaiadeku@gmail.com",
          password: "JumaiAdeku",
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
    });
  });
});
