import jwt from "jsonwebtoken"

export const authenticationSTU = (req, res, next) => {
    console.log(req.cookies)
    const { token } = req.cookies
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.student = decoded
        next()
    } catch (error) {
        return res.redirect("/loginStudent")
    }

}
export default authenticationSTU