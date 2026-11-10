import jwt from 'jsonwebtoken'

const authenticate = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(200).json({ message: "token not found!", success: false })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECTRET)

    if (!decoded) {
        return res.status(401).json({ message: "invalide token", success: false })
    }

    next()
}

export default authenticate