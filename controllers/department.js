import departmentModel from "../models/department.js";
export const getAll = async (req, res) => {
    const departments = await departmentModel.find().lean();
    res.render("department/all_departments", { layout: false, departments })
};

export const create = (req, res) => {
    res.render("department/create_department", { layout: false })
};
export const store = async (req, res) => {
    const name = req.body.name
    const code = req.body.code
    await departmentModel.create({
        name: name,
        code: code
    })
    console.log(req.body)
    res.redirect('/departments')
};
export const show = async (req, res) => {
    const { _id } = req.params;
    const oneDep = await departmentModel.findById(_id).lean();
    console.log(oneDep);
    res.render('department/show_department', { layout: false, department: oneDep })
};