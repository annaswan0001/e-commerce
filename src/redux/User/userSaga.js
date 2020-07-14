import { call, put, takeLatest, all, take } from "redux-saga/effects";
import userTypes from "./userTypes";
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from "../../firebase/utils";
import {
  signInSuccess,
  signOutSuccess,
  signUpError,
  resetPasswordSuccess,
  resetPasswordError,
} from "./userActions";
import { resetPasswordApi } from "./userHelper";

//sign in
export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  const userRef = yield call(handleUserProfile, {
    userAuth: user,
    additionalData,
  });
  const snapshot = yield userRef.get();
  yield put(
    signInSuccess({
      id: snapshot.id,
      ...snapshot.data(),
    })
  );
}

export function* signIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.log(error.message);
  }
}

export function* onSignInStart() {
  yield takeLatest(userTypes.SIGN_IN_START, signIn);
}

//google sign in 

export function* googleSignIn(){
  try {
    const {user}= yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);

  } catch (error) {
    
  }

}
export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);

}

//check user session (auth)

export function* checkUserAuth() {
  try {
    const userAuth = yield getCurrentUser();
    
    if (!userAuth) return;
    else {
      yield getSnapshotFromUserAuth(userAuth);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* onCheckUserSessionStart() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, checkUserAuth);
}

//sign out user

export function* signOut() {
  yield auth.signOut();

  yield put(signOutSuccess());
}
export function* onSignOutStart() {
  yield takeLatest(userTypes.SIGN_OUT_START, signOut);
}

//sign up user

export function* signUp({
  payload: { displayName, email, password, confirmPassword },
}) {
  if (password != confirmPassword) {
    const error = ["Password doesnt match"];
    yield put(signUpError(error));
    return;
  }
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (error) {
    console.log(error.message);
  }
}

export function* onSignUpStart() {
  yield takeLatest(userTypes.SIGN_UP_START, signUp);
}



export function* resetPassword({payload:{email}}){
    try {
        yield call (resetPasswordApi, email)
        yield put(resetPasswordSuccess())
    } catch (error) {
         console.log(error)
        yield put(resetPasswordError(error))
    }
    
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}
// all users sagas
export default function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSessionStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
  ]);
}
