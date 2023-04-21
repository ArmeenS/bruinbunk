import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { app } from "../backend/index.js";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { Dimensions } from 'react-native';

const db = getFirestore(app);

// Set the user in the database
export const setEmail = async (email: string) => {
    const docRef = await addDoc(collection(db, "email_waitlist"), {
        email: email,
    });
}

import Hotbar from './Hotbar';
import Contact from './Contact';
import Waffle from './Waffle';
import Image from 'next/image'

const externalImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;

const EmailSignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Invalid email'),
});

interface EmailSignUpData {
    email: string;
};
  

function Portfolio() {
    const initialValues: EmailSignUpData = { email: '' };

    return (
        <div className="bg-black">
            <Hotbar/>
            <Waffle/>
            <div className="h-fit pt-24 mb-4 ">
                <div className="sm:w-full md:w-8/12 m-auto flex flex-col text-center space-x-2 ">
                    <div className=" p-2 w-fit m-auto">
                        <Image src="BruinBunkCroppedLogo.png" width={500} height={500} loader={externalImageLoader} alt="Bruin Bunk"  className="w-fit"/>
                    </div>
                    
                    <div className="text-4xl font-medium mb-4 text-center text-white ">UCLA's One-Stop Sublease Shop</div>
                    <div className="text-2xl font-medium mb-2 text-xl text-center text-white ">Congrats, you can finally delete Facebook</div>
                        
                </div>
                        
            </div>
            <div className="w-full py-10">
                <div className="flex justify-center m-auto ">
                    <div id={"about"} className="text-center max-w-7xl flex flex-col items-center">
                        <div className="grid grid-cols-2 md:w-8/12">
                            <div className="mb-20 flex flex-col items-center">
                                <Image src="SubleaseCycle.png" width={300} height={300} loader={externalImageLoader}  alt="Sublease Cycle"  className=" "/>
                                <div className="text-white text-2xl font-medium">
                                    Break the sublease scramble
                                </div>
                            </div>

                            <div>
                                <div className=" mb-20">
                                    <div className="m-auto text-white font-medium text-2xl mb-4">
                                        Your Summer Bunk Awaits: Get Exclusive Access to UCLA Sublet Listings Now!
                                    </div>
                                    <div className="sm:w-full m-auto">

                                        
                                        <Formik
                                            initialValues = {initialValues}
                                            validationSchema={EmailSignupSchema}
                                            onSubmit={(values, { setSubmitting }) => {
                                                setTimeout(() => {
                                                //setSubmitting(false); only wants users to submit once
                                                setEmail(values.email);
                                                }, 400);
                                            }}
                                        >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <Field placeholder="Email" className="w-fit  inline-block border border-0 rounded-l-lg px-2 text-gray-600 select-none focus:outline-none  py-1 text-sm" type="email" name="email" />
                                                <button className="w-fit px-4  text-sm bg-brand rounded-r-lg py-1 text-gray-100" type="submit" disabled={isSubmitting}>
                                                    Sign up
                                                </button>
                                                <ErrorMessage className="text-red-600 text-s" name="email" component="div" />

                                            
                                            </Form>
                                        )}
                                        </Formik>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="text-white font-medium text-3xl mb-6">
                                        Have a Bunk to Sublet? 
                                    </div>
                                    <a className="text-white text-2xl bg-brand rounded-lg px-6 py-1" href="" target="_blank">
                                        Enter Info
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className="bg-brand">
                <div className="w-8/12 m-auto pb-20 pt-20">
                    <Contact/>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;