import request from 'supertest'
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/models/user.js";


beforeAll(async () => {
    await mongoose.connect("mongodb+srv://sundarsharmaspk2023:sundarsharmaspk2023@cluster0.k8zqvvn.mongodb.net/crudTest", {})
})


afterEach(async () => {
    await User.deleteMany();
})

afterAll(async () => {
    await mongoose.connection.close()
})


describe("User API", () => {
    test("Should create a user", async () => {
        const res = await request(app).post("/users/create").send({ name: "sunder", email: "sunder@sunder.com" })
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe("sunder")
    })
}
)