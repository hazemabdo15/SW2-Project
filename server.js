import express from "express"
import { engine } from "express-handlebars";
import methodOverride from "method-override"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import adminRouter from "./routes/adminRoute.js"
import studentRouter from "./routes/studentRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import authDoctor from "./routes/authDoctor.js"
import authStudent from "./routes/authStudent.js"
import subjectsRouter from "./routes/subjectsRoute.js";
import departmentsRouter from "./routes/departmentsRoute.js";



dotenv.config();

mongoose.connect(process.env.mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log('successfully connected');
}).catch((e) => {
    console.log('not connected');
    console.log(e);
})


const app = express();
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.get("/", (req, res) => {
    res.redirect("/home")
})
app.get("/home", (req, res) => {
    res.render("Home", { layout: false })
})
app.use("/student_admin", studentRouter)
app.use("/doctor_admin", doctorRouter)
app.use("/admin", adminRouter)
app.use("/subjects", subjectsRouter)
app.use("/departments", departmentsRouter)
app.use("/loginDoctor", authDoctor)
app.use("/loginStudent", authStudent)


app.use((req, res) => {
    res.status(404).send('Sorry not found')
})
app.listen(process.env.port, () => {
    console.log(`Example app listening at http://localhost:${process.env.port}`)
})