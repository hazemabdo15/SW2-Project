import express from "express"
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv"
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

app.get("/Home", (req,res) => {
    res.render("Home", {layout: false})
})






app.listen(process.env.port)