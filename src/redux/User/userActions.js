import userTypes from "./userTypes";


//sign in
export const signInStart = (userCredentials) =>({
    type: userTypes.SIGN_IN_START,
    payload : userCredentials
})

export const signInSuccess = (user) => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload:user
});


export const googleSignInStart = () =>({
    type: userTypes.GOOGLE_SIGN_IN_START,
    
})

// checkSign in
export const checkUserSessionStart= () =>({
    type: userTypes.CHECK_USER_SESSION
})

//sign Up
export const signUpStart = (userCredentials) =>({
    type: userTypes.SIGN_UP_START,
    payload : userCredentials
})



export const signUpError = (error) => ({
    type: userTypes.SIGN_UP_ERROR,
    payload:error
});

//Sign out
export const signOutStart = () =>({
    type: userTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: userTypes.SIGN_OUT_SUCCESS
});

// reset password
export const resetPasswordStart = (userCredentials) =>({
    type: userTypes.RESET_PASSWORD_START,
    payload:userCredentials
})

export const resetPasswordSuccess = () => ({
    type: userTypes.RESET_PASSWORD_SUCCESS
});

export const resetPasswordError = (error) => ({
    type: userTypes.RESET_PASSWORD_ERROR,
    payload:error
});

export const resetUserState= () =>({
    type: userTypes.RESET_USER_STATE
})








