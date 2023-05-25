import jwt from "jsonwebtoken"

export const authenticationD = (req, res, next) => {
    console.log(req.cookies)
    const { token } = req.cookies
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.doctor = decoded
        next()
    } catch (error) {
        return res.redirect("/login")
    }

}
export default authenticationD