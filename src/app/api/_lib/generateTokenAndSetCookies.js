import jwt from 'jsonwebtoken'
export const generateToken = (id, name) => {
    const token = jwt.sign({id, name}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}