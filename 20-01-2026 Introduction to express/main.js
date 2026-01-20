const express = require('express');
const { USERS, findById } = require('./db');

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/users", (request, response) => {
    response.json(USERS);
});

app.post("/users", (req, res) => {

    const { id, name, phone } = req.body;
    if (!id || !name || !phone) {
        return res
            .status(400)
            .json({ massage: 'Please enter id, name and phone !!!'});
    }

    USERS.push({ id, name, phone,
        created_at: new Date()
    })

    res.status(201).json({ message: "Created Ok !!!" });
});

app.get("/users/:id", (req, res) => {
    //  const id = req.params.id;
    const { id } = req.params;
    
    const user = findById(id);
    if (user) {
        return res.json(user);
    }

    return res.status(404).json({ message: "User with id " + id + " not found" });
});

app.listen(PORT, () => {
    console.log("Application running on http://localhost:" + PORT);
});