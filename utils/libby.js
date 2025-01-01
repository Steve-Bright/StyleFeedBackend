import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

let hashSalt =  Number(process.env.SALT)
export const fMsg = (res, msg, result = {}, statusCode = 200) => {
    return res.status(statusCode).json({con: true, msg, result})
}

export const fError = (res, msg, statusCode = 500) => {
    return res.status(statusCode).json({con: false, msg})
}

export const encode = (payload) => {
    return bcrypt.hashSync(payload, hashSalt);
};

//you can decode the password
export const decode = (payload, hash) => {
    return bcrypt.compareSync(payload, hash);
};

export const genToken = (payload) => {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            data: payload,
        },
        process.env.SECRET_KEY
    )
}

export let validateToken = () => {
    return async (req, res, next) => {
      if (!req.headers.authorization) {
        return next(new Error("Unauthorized"));
      }
  
      let token = req.headers.authorization.split(" ")[1];

      try {
        const tokenUser = jwt.verify(token, process.env.SECRET_KEY);
        req.user = tokenUser.data;
  
        next();
      } catch (error) {
        return next(new Error("Invalid token"));
      }
    };
  };