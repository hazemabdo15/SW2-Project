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
        department: department,
    })
    console.log(req.body)
    res.redirect('/subjects')
};


export const testShow = async (req, res) => {
    const { _id } = req.params;
    console.log("Id : ", _id)
    return subjectModel.findById({ _id }, { students: 1 })
        .lean()
        .populate("students")
        .exec()
        .then((subjects) => {
            console.log("subjects :", subjects)
            if (subjects) {
                const arrayOfStudents = subjects.students
                const arrayOfStudentsNames = arrayOfStudents.map((singleStudent) => singleStudent.name)
                return arrayOfStudentsNames
            } else {
                console.log("there is no subjects")
            }

        })
        .then((arrayOfStudentsNames) => {
            if (arrayOfStudentsNames.length > 0) {
                console.log("array of student names: ", arrayOfStudentsNames)
                res.render('subject/show_subject', { layout: false, arrayOfStudentsNames })

            }
            else {
                console.log("array is empty")
            }
        })
        .catch((error) => {
            console.log("error", error)
        })
}
export const edit = async (req, res) => {
    const { _id } = req.params;
    const editFormSubject = await subjectModel.findById(_id).lean();
    const departments = await departmentModel.find().lean();
    res.render("subject/edit_subject", { layout: false, departments, subject: editFormSubject })
};
export const update = async (req, res) => {
    const name = req.body.name
    const code = req.body.code
    const department = req.body.department
    const { _id } = req.params
    await subjectModel.findByIdAndUpdate(_id, { $set: { name: name, code: code, department: department } })
    console.log(req.body)
    res.redirect('/subjects')
};
export const deleteone = async (req, res) => {
    const { _id } = req.params
    await subjectModel.findByIdAndDelete(_id)
    res.redirect('/subjects')
}