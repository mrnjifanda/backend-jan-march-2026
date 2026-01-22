const express = require('express');
const { USERS, findById } = require('./db');

const PORT = 3000;

const app = express();

app.use(express.json());

const verifyCreateUserData = (req, res, next) => {
    const { id, name, phone } = req.body;
    const errors = [];

    if (!id) {
        errors.push({
            field: "id",
            message: "Please enter id"
        });
    } else if (typeof id !== "number") {
        errors.push({
            field: "id",
            message: "Please id must be a number"
        });
    }

    if (!name) {
        errors.push({
            field: "name",
            message: "Please enter name"
        });
    } else if (name.length < 2 && name.length > 50) {
        errors.push({
            field: "name",
            message: "Enter valid name (between 2 and 50 characters)"
        });
    }

    if (!phone) {
        errors.push({
            field: "phone",
            message: "Please enter phone"
        });
    } else if (phone.length !== 9) {
        errors.push({
            field: "phone",
            message: "Enter valid phone (Phone must have exactly 9 numbers)"
        });
    } else if (!phone.startsWith(6)) {
        errors.push({
            field: "phone",
            message: "Enter valid phone (Phone must start 6)"
        });
    }

    if (errors.length !== 0) {
        return res.status(400).json(errors);
    }

    next();
}

app.get("/users", (req, res) => {
    res.json(USERS);
});

app.post("/users", verifyCreateUserData, (req, res) => {

    const { id, name, phone } = req.body;
    USERS.push({ id, name, phone,
        created_at: new Date()
    })

    res.status(201).json({ message: "Created Ok !!!" });
});

app.get("/users/:id", (req, res) => {
    //  const id = req.params.id;
    const { id } = req.params;

    const find = findById(id);
    if (find) {
        return res.json(find.user);
    }

    return res.status(404).json({ message: "User with id " + id + " not found" });
});

app.put("/users/:id", (req, res) => {

    const { id } = req.params;
    const { name, phone } = req.body;

    const find = findById(id);
    if (!find) {
        return res.status(404)
                  .json({ message: "User not found" });
    }

    const { index, user } = find;
    if (name) {
        user.name = name;
    }
    if (phone) {
        user.phone = phone;
    }

    USERS[index] = user;
    return res.json({ message:  "user updated successfully !!!" })
});

app.delete("/users/:id", (req, res) => {

    const { id } = req.params;
    const find = findById(id);
    if (!find) {
        return res.status(404)
                  .json({ message: "User not found" });
    }

    const { index } = find;
    delete USERS[index];
    return res.json({ message:  "User deleted successfully !!!" })
});

app.listen(PORT, () => {
    console.log("Application running on http://localhost:" + PORT);
});