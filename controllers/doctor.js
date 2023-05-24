import doctorModel from "../models/doctor.js";
import bcrypt from "bcryptjs"
export const all = async (req, res) => {
  const doctors = await doctorModel.find({}, { name: 1 }).lean()
  res.render("doctor/all_doctor", { layout: false, doctors })
}
export const create = async (req, res) => {
  res.render("doctor/create_doctor", { layout: false })
}
export const store = async (req, res) => {
  const { name, email, password } = req.body
  console.log(name, email, password)
  const salt = bcrypt.genSaltSync(10);
  const encryptedpassword = bcrypt.hashSync(password, salt);

  console.log(encryptedpassword)
  await doctorModel.create({ name, email, password: encryptedpassword })
  res.redirect("/doctor_admin")
}
export const show = async (req, res) => {
  const { _id } = req.params;
  const onedoctor = await doctorModel.findById(_id).lean();
  console.log(onedoctor);
  res.render('doctor/show_doctor', { layout: false, doctor: onedoctor })
};



