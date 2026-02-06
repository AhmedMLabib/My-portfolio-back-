require("dotenv").config();
const express = require("express");

const connectDB = require("./config/connectDB.config");

const homeRouter = require("./routes/home.router");
const aboutRouter = require("./routes/about.router");
const contactRouter = require("./routes/contact.router");
const skillsRouter = require("./routes/skills.router");
const projectsRouter = require("./routes/projects.router");

const loginRouter = require("./routes/login.router");

const certificateRouter = require("./routes/certificate.router");

const cors = require("cors");
const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use("/files", express.static("./files"));

app.use("/home", homeRouter);

app.use("/about", aboutRouter);

app.use("/contact", contactRouter);

app.use("/skills", skillsRouter);

app.use("/projects", projectsRouter);

app.use("/login", loginRouter);

app.use("/certificate" , certificateRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server Run At Port ${process.env.PORT}`);
});
