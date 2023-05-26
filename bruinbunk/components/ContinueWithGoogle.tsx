// Component responsible for signing in with Google
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../backend/index.js"
import Image from 'next/image';
import Google from "../public/googlebutton.svg"

interface ContinueWithGooglePropsType {
    setUserAuthStatus: any
    callback: any
}

const ContinueWithGoogle = (props: ContinueWithGooglePropsType) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    
    const { setUserAuthStatus, callback } = props;


    function googleLogin() {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          setUserAuthStatus((prevState: boolean) => (!prevState));
          callback();
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          
          // ...
        });
        console.log("Signing in with Google");
    }

    
    return (
        <div className={"flex h-12/12"}>
            <div className="m-auto">
                <Image src={Google} height={40} alt="Google " className="cursor-pointer" onClick={googleLogin} content="Google"/>
            </div>
        </div>
    );
}

export default ContinueWithGoogle;