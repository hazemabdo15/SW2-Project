import departmentModel from "../models/department.js";
import subjectModel from "../models/subject.js";
export const getAll = async (req, res) => {
    const subjects = await subjectModel.find({}, { name: 1 }).lean();
    res.render("subject/all_subjects", { layout: false, subjects: subjects });
};

export const create = async (req, res) => {
    const departments = await departmentModel.find().lean();
    res.render("subject/create_subject", { layout: false, departments })
};
export const store = async (req, res) => {
    const name = req.body.name
    const code = req.body.code
    const department = req.body.department
    await subjectModel.create({
        name: name,
        code: code,
        department: department
    })
    console.log(req.body)
    res.redirect('/subjects')
};
export const show = async (req, res) => {
    const { _id } = req.params;
    const oneSubject = await subjectModel.findById(_id)
        .populate('department')
        .lean();
    console.log(oneSubject);
    res.render('subject/show_subject', { layout: false, subject: oneSubject })
};