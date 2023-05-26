import React from "react";
import ContinueWithGoogle from "./ContinueWithGoogle";

interface SignInPopupPropsType {
    setUserAuthStatus: any;
    setShowingSignUpPopup: any;
}

const SignInPopup = (props: SignInPopupPropsType) => {
    const { setShowingSignUpPopup, setUserAuthStatus } = props;

    return (
        <>
            <div className="z-40 bg-black fixed h-screen w-screen opacity-60">
                
            </div>
            <div className="fixed h-screen w-screen z-50 flex">
                <div className={"m-auto h-12/12"}>
                    <div className=" relative w-fit m-auto bg-white px-12 py-10 font-bold">
                        <div className="absolute top-0 right-2 cursor-pointer" onClick={() => {setShowingSignUpPopup(false)}}>
                            x
                        </div>
                        <div className="w-fit m-auto">
                            Sign up to view listings!
                        </div>
                        <ContinueWithGoogle callback={() => {setShowingSignUpPopup(false)}} setUserAuthStatus={setUserAuthStatus}/>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default SignInPopup;