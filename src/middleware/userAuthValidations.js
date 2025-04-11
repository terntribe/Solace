const  { z } = require("zod");
const { StatusCodes } = require("http-status-codes");
const { errorResponse} = require("../utils/responses.utils");

const userSchema = z.object({
    username: z.string({
                    required_error: "Username is required",
                    invalid_type_error: "Username must be a string"
                })
                .min(3, {message: "Username must be at least 3 Characters long"})
                .trim()
                .toLowerCase(),

    email: z.string({
                required_error: "Email is required"
            })
            .email({message: "Invalid email address"})
            .trim()
            .toLowerCase(),

    password: z.string({
                    required_error: "Password is required"
                })
               .trim(),
    
    role: z.enum(['admin', 'user'], {
        required_error: "Role is required",
        invalid_type_error: "Role must be either 'admin' or 'user'"
    })
    .optional(),
    isVerified: z.boolean().default(false),
    lastLogin: z.date().optional()

})




const signUpValidation = async(req, res, next) =>{
    try{
    const signUpData = userSchema.safeParse(req.body)
    
    if(!signUpData.success){
        const validationErrors = signUpData.error.errors.map(err => ({
            field: err.path[0],
            message: err.message,
        }));
  
        return errorResponse(res,StatusCodes.BAD_REQUEST,{
            message : "Validation Failed, Try again!",
            validationErrors
        })
    }

    req.validatedUser = signUpData.data
    next()
    }
    catch(error){
        console.log(error)
        next(error)
    }
}


module.exports= {signUpValidation};