import express from "express"
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv"
import adminRouter from "./routes/adminRoute.js";
import studentRouter from "./routes/studentRoute.js";
import teacherRouter from "./routes/teacherRoute.js";


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

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

//app.use("/home", homeRouter)
app.get("/home", (req,res) => {
    res.render("Home", {layout: false})
})
app.use("/student",studentRouter)

app.use("/teacher",teacherRouter)

app.use("/admin",studentRouter)



app.listen(process.env.port)