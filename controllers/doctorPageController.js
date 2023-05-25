import jwt from "jsonwebtoken"
import subject from "../models/subject.js"
import pdfFile from "../models/pdfFilesModel.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


export const previewSubjects = (req, res) => {
    const { token } = req.cookies
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:", decoded)
        req.doctor = decoded
    }
    catch (error) {
        return res.redirect("/loginDoctor")
    }

    // subject.updateOne({name: "Machine Learning"},{$set: {doctors: req.doctor._id}})
    // .then((ack)=> {
    //     console.log("acknowledgment", ack)
    // })
    // .catch((error)=> {
    //     console.log("error",error)
    // })



    subject.find({ doctors: req.doctor._id }, { name: 1 }).lean()
        .then((subjects) => {
            if (subjects) {
                console.log(typeof (subjects))
                console.log(subjects)
                const arrayOfSubjects = subjects
                return arrayOfSubjects
            } else {
                console.log("there are no subjects")
            }
        })
        .then((subjects) => {
            console.log("subjects :", subjects)
            const subjectIds = subjects.map((singleSubject) => singleSubject._id)
            const subjectName = subjects.map((singleSubject) => singleSubject.name)
            res.render("doctor/PreviewSubjects", { layout: false, subjects })

        })
        .catch((error) => {
            console.log("error", error)
        })


}

export const viewUpload = (req, res) => {
    const subjectId = req.params._id
    res.render("pdfUploader", { layout: false, subjectId })
}

export const pdfUpload = (req, res) => {
    const { token } = req.cookies
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded:", decoded)
        req.doctor = decoded
    }
    catch (error) {
        return res.redirect("/loginDoctor")
    }

    const subjectId = req.params._id
    // console.log("id from url = : ", subjectId)

    if (req.files) {
        // Retrieve the uploaded file from the request object
        const file = req.files.file;

        // Move the uploaded file to a specified directory
        file.mv('./public/uploads/' + file.name, function (err) {
            if (err)
                return res.status(500).send(err);
            pdfFile.create({filename: file.name, filePath: `./public/uploads/${file.name}`, subjectId: subjectId, uploaderId: req.doctor._id })
            res.redirect('/doctorPage');
        });
    }


}