import{ getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const auth = getAuth();

//Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '622398171108-43vl97fcsbuhpso861uq71i0vu919gq6.apps.googleusercontent.com',
});

//SignUp with email and password
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth,
      email,
      password,
    );
    console.log('User detail ',userCredential.user);
    return {user: userCredential.user, error: null};
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email is already in use.Try logged In instead .';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid Email Format.Please a valid email.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters long.';
        break;
      default:
        errorMessage = 'Something went wrong. Please try again.';
    }
    return {user: null, error: errorMessage};
  }
};

//Login with Email and Password
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth,
      email,
      password,
    );
    return {user: userCredential.user, error: null};
  } catch (error) {
     //let errorMessage = 'Something went wrong. Please try again.';
     let errorMessage;
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid Credentials. Please try again.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format.';
    } else {
      errorMessage = error.code;
    }
    return {user: null, error: errorMessage};
  }
};



//SignIn with Google
export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, googleCredential);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.log(error);
    return {user: null, error: 'Google Sign-In failed. Please try again.'};
  }
};

//Logout Feature
export const logout = async () => {
  try {
    await signOut(auth);
    await GoogleSignin.signOut();
    return {success: true, error: null};
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred while logging out. Please try again.',
    };
  }
};


//Password Reset link
export const resetPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return {success: true};
  } catch (error) {
    return{success : false, error:error.code};
  }
};

//Delete the User
export const deleteUser = async () => {
  try {
    const user = auth().currentUser;
    if(user) {
      await user.delete();
      console.warn('User Deleted from firebase auth');
    }
  } catch (error) {
    console.error('Error deleting the user ',error);
  }
};

