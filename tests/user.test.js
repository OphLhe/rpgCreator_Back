import request from "supertest";
import app from "../index.js";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import dotenv from "dotenv";

dotenv.config();

describe("test user routes", () => {
  let token = null;
  let idUser = null;

  it("must create a user", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({
        email: "supertest6@supertest",
        firstName: "supertest",
        lastName: "supertest",
        nickname: "supertest6",
        dateOfBirth: "2025-09-02",
        password: "supertest",
      });

    expect(response.status).toBe(200);
    expect(response.body.user[0].affectedRows).toBe(1);
  });

  it("must connect a user and create a token", async () => {
    const response = await request(app).post("/api/login").send({
      email: "supertest6@supertest",
      password: "supertest",
    });
    console.log(response.body.token);
    token = response.body.token;
    expect(response.status).toBe(200);
  });

  it("must get idUser", async () => {
    const response = await request(app)
      .get("/api/profile")
      .set("Authorization", `${token}`);
    idUser = response.body[0].idUser;
    expect(response.status).toBe(200);
    expect(response.body[0]).toBeDefined();
  });

  it("must delete user by id", async () => {
    const response = await request(app)
      .delete(`/api/profile/${idUser}`)
      .set("Authorization", `${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User account deleted successfully");
  });

});