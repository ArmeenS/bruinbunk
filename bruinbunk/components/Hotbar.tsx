import Link from 'next/link';
import Image from 'next/image';
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../backend/index.js"

const externalImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;


function Hotbar() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    console.log(auth.currentUser);

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
        <div id={"home"} className="hidden md:block absolute w-full sm:top-0 z-20">
            <div className="sm:fit p-6 sm:flex m-auto sm:flex-row ">
                <div className="sm:flex w-1/2 h-full">                         
                    <Image src="BruinBunkLogo.svg" width={500} height={500} loader={externalImageLoader} alt="Bruin Bunk" className="h-48 -mt-5 w-fit"/>
                        
                        {/* 
                        <Image src={BruinBunkLogo} width={500} height={500} alt="Bruin Bunk" className=" h-48 -mt-5 w-fit"/>
                        */}
                    
                </div>
                
                <div>
                    Search
                </div>
                
                <div className="sm:flex w-1/2 place-content-end space-x-10  h-full">
                    
                    <a 
                        className="my-auto text-gray-300 cursor-pointer hover:text-white"
                        onClick={googleLogin}
                    >
                        Sign in
                    </a>
                </div>
                
            </div>
        </div>
    );
}

export default Hotbar;
