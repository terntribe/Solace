const User = require("../models/user.model");
const Session = require("../models/session.model");
const guestSession = require("../models/guestSession.model")
const { updateStreak } = require("../utils/streak");
const { successResponse, errorResponse } = require("../utils/responses");
const { StatusCodes } = require("http-status-codes");
const { createAccessToken, generateHashedValue, isPasswordCorrect, createRefreshToken } = require("../utils/userAuth");




const createAccount = async (req, res, next)  => {
    try{
        const {username, email, password, role, isVerified, lastLogin} = req.validatedUser

        const existingUser = await User.findOne({ $or: [{ username }, { email }] })

        if (existingUser){
            return errorResponse(res, StatusCodes.BAD_REQUEST, `User already exists. Log in instead`)
        }

        const newUser = await User.create({
            username,
            email,
            password: generateHashedValue(password),
            role,
            isVerified,
            lastLogin
        })
        const newUserId = newUser.id;
        const accessToken = createAccessToken(newUserId)
        const refreshToken = createRefreshToken(newUserId)


        const newSession = await Session.create({
            userId: newUserId,
            accessToken,
            refreshToken,
        })
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: 'Strict'
        })
        
        res.cookie("sessionId", newSession.id, {
            httpOnly: true,
            sameSite: 'Strict'
        })
        
        await updateStreak(newUserId)
        successResponse(res, StatusCodes.CREATED, `Successfully created an account`, {user: newUser, token: accessToken})

    }catch(error){
        if (error.code === 11000) {
            next(error)
            return errorResponse(res, StatusCodes.CONFLICT, "Username already exists. Try another username.")
        }
        console.log(error)
        next(error)
    }

}


const loginAccount = async (req, res, next) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {

            return errorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, "missing parameter(s): input password and username")
        }

        const existingUser = await User.findOne({username: username}).select("+password")

        if (!existingUser) {
            return errorResponse(res, StatusCodes.BAD_REQUEST, "User does not exist. Create an account instead.")
        }

        if (!isPasswordCorrect(password, existingUser.password)) {
            return errorResponse(res, StatusCodes.BAD_REQUEST, "You have entered the wrong username or password.")
        }

        const existingUserId = existingUser.id;
        const accessToken = createAccessToken(existingUserId)
        const refreshToken = createRefreshToken(existingUserId)


        const newSession = await Session.create({
            userId: existingUserId,
            accessToken,
            refreshToken,
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true, 
            sameSite: 'Strict'
        })
        
        res.cookie("sessionId", newSession.id, {
            httpOnly: true,
            sameSite: 'Strict'
        })
        await updateStreak(existingUserId)
        successResponse(res, StatusCodes.OK, `Log in succcessful`)
    }

    catch(error) {
        console.log(error);
        next(error)
    }
}


const logoutAccount = async (req, res, next) => {
    //Get tokens and details 
    const accessToken = req.cookies.accessToken;
    const sessionId = req.cookies.sessionId;

    
    
    // find the session and delete it
    let session;
    try {
      session = await Session.findById(sessionId);
      if (!session) {
        next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Login required.'));
      }
      // Proceed with token validation...
    } catch (error) {
        next(errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred.'));
    }
    await session.deleteOne();

    //delete the cookies
    res.clearCookie("accessToken",{
        httpOnly: true,
        sameSite: 'Strict'
    });
    res.clearCookie("sessionId",{
        httpOnly: true,
        sameSite: 'Strict'
    });

    //send a response
    successResponse(res, StatusCodes.OK, `logged out successfully`);

}

const createGuestAccount = async (req, res, next)  => {
    try {
         
        const randomString = Math.random().toString(36).substring(2, 7);

            
        
        const accessToken = createAccessToken(randomString)

        const newGuestSession = await guestSession.create({
            accessToken,
        })
       
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: 'Strict'
        })
        
        res.cookie("guestId", newGuestSession.id, {
            httpOnly: true,
            sameSite: 'Strict'
        })
        

        successResponse(res, StatusCodes.CREATED, "Guest login successful")
    } catch (error) {
        console.log(error);
        return next(error)

    }
       

}

// export const changePassword = async (req, res, next) => {
//     // user is loggedin

//     try {
//         const {password} = req.body

//         const updateUser = await User.findOneAndUpdate(
//             { email: "user@example.com" }, // Filter condition (find by email)
//             { password: "newHashedPassword" }, // Update fields
//             { new: true } // Options: return the updated document
//         );

//         if (!password) {
//             return errorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, "nothing to update here")
//         }

//         return successResponse(res, StatusCodes.OK, "Password changed successfully")
//     } catch (error) {
//         next(error)
//     }
    
// }



module.exports ={createAccount , loginAccount, logoutAccount, createGuestAccount }