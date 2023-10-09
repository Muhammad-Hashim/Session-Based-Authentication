

const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoute = require("./routes/user");
const authRouter = require("./routes/auth");
const app = express();
const PORT = 3000;
const bcrypt = require("bcryptjs");
app.use(express.json());
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use("/auth", authRouter);
app.use("/user", userRoute);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerance API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000/" }],
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(
    "mongodb+srv://muhammadhashimsardar:0ZPht1gvQnAiazY1@cluster0.fapwmzq.mongodb.net/note-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conection  is establish ...........");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("server is running", PORT);
});
