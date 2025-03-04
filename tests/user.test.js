import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/models/user.js";
// import dotenv from "dotenv";
// dotenv.config();
//mongodb+srv://sundarsharmaspk2023:sundarsharmaspk2023@cluster0.k8zqvvn.mongodb.net/crudTest
//mongodb://localhost:27017/crudTest
beforeAll(async () => {
    await mongoose.connect("mongodb+srv://sundarsharmaspk2023:sundarsharmaspk2023@cluster0.k8zqvvn.mongodb.net/crudTest", {
    });
});

afterEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User API", () => {
    test("Should create a user", async () => {
        const res = await request(app)
            .post("/users/create")
            .send({ name: "John Doe", email: "john@example.com" });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("John Doe");
    });

    test("Should get all users", async () => {
        await User.create({ name: "Alice", email: "alice@example.com" });
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test("Should get a user by ID", async () => {
        const user = await User.create({ name: "Bob", email: "bob@example.com" });
        const res = await request(app).get(`/users/${user._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Bob");
    });

    test("Should update a user", async () => {
        const user = await User.create({ name: "Charlie", email: "charlie@example.com" });
        const res = await request(app)
            .put(`/users/${user._id}`)
            .send({ name: "Charlie Updated" });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Charlie Updated");
    });

    test("Should delete a user", async () => {
        const user = await User.create({ name: "David", email: "david@example.com" });
        const res = await request(app).delete(`/users/${user._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User deleted");
    });
});
