import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { app } from "../backend/index.js";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { BsArrowRight } from "react-icons/bs";
import BruinBunkSublet from "../public/BruinBunkSublet.svg"; // used for local images
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images


const db = getFirestore(app);

// Set the email in the database
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
        <div className="bg-background">
            <div className="">
                <Hotbar/>
                {/*<Waffle/>*/}
                <div className="md:hidden absolute w-full">
                    
                    <div className="w-fit m-auto">
                        
                        <Image src="BruinBunkLogo.svg" width={300} height={300} loader={externalImageLoader} alt="Bruin Bunk"  className=""/>
                        
                        {/*
                        <Image src={BruinBunkLogo} width={300} height={300} alt="Bruin Bunk"  className=""/>
                        */}
                    </div>

                </div>
                <div className="md:grid md:grid-cols-5 md:px-8">
                    <div className="md:col-span-3 md:h-full">

                        <div className="h-fit pt-24 mb-4 ">
                            <div className="w-screen md:w-8/12 m-auto flex flex-col text-center items-center space-x-2 ">
                                <div className=" p-2 w-max">
                                    { /* We need our images to be responsive to the different screen sizes. This is lazy but it works. */ }
                                    {/* 
                                    <div className="hidden md:block">
                                        <Image src="BruinBunkCroppedLogo.png" width={750} height={750} loader={externalImageLoader} alt="Bruin Bunk"  className=""/>
                                    </div>
                                    <div className="md:hidden">
                                        <Image src="BruinBunkCroppedLogo.png" width={300} height={300} loader={externalImageLoader} alt="Bruin Bunk"  className=""/>
                                    </div>
                                    */}
                                    
                                </div>
                                
                                <div className="text-3xl md:text-6xl font-medium mb-4  text-center ">Find your perfect UCLA sublet</div>
                                <div className="text-3xl md:text-3xl font-medium mb-2  text-center mt-4 ">Get sublet listings</div>
                                <div className="text-md md:text-md font-medium mb-2 text-center ">Sign up for frequent updates</div>
                            </div>
                        </div>
                        <div className="w-full pb-10">
                            <div className="flex justify-center m-auto ">
                                <div id={"about"} className="text-center max-w-7xl flex flex-col items-center">
                                    <div className="w-full">
                                        <div>
                                            <div className="w-full">                                        
                                                <div className="sm:w-full m-auto">                                
                                                    <Formik
                                                        initialValues = {initialValues}
                                                        validationSchema={EmailSignupSchema}
                                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                                            
                                                            //setSubmitting(false); only wants users to submit once
                                                            setEmail(values.email);
                                                            resetForm({ values: {email: ""} })
                                                            
                                                        }}
                                                    >
                                                        {({ isSubmitting }) => (
                                                            <Form>
                                                                <Field placeholder="Email" className="w-fit bg-background py-2 font-medium inline-block border border-black rounded-full pl-4 pr-12 select-none focus:outline-none py-1" type="email" name="email" />
                                                                <button className="font-medium w-fit px-6 bg-bruinblue rounded-full py-2 text-gray-100 -ml-10 border border-bruinblue" type="submit" disabled={isSubmitting}>
                                                                    Sign up
                                                                </button>
                                                                <ErrorMessage className="text-red-600 text-xs" name="email" component="div" />

                                                            
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                                
                                            </div>
                                            
                                            <div className="font-medium text-3xl mb-4 mt-4">
                                                List your sublet 
                                            </div>
                                            <div className="m-auto w-fit">
                                                <a className="text-white font-medium bg-bruinblue w-fit rounded-full px-4 py-2 flex flex-row " href="https://docs.google.com/forms/d/e/1FAIpQLScIaUS8PM8nP6N0DbzC25FR3rpqiM_aVlUX3dxtFq2R1yaBiw/viewform?usp=sf_link">
                                                    <div className="">
                                                        Enter your information here

                                                    </div>
                                                    {/* Center the arrow vertically */}
                                                    <div className="ml-1 flex bg-bruinblue">
                                                        <div className="m-auto">
                                                            <BsArrowRight className=""/>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                           
                                            
                                        </div>
                                        
                                    </div>                      
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="w-full col-span-2 md:h-full ">
                                             
                        <div className="hidden md:block mt-6 ">
                            
                            <Image src="BruinBunkSublet.svg" width={750} height={750} loader={externalImageLoader} alt="Bruin Bunk"  className=""/>
                            
                            {/* 
                            <Image src={BruinBunkSublet} width={750} height={750} alt="Bruin Bunk"  className=""/>
                            */}
                        </div>
                        <div className="md:hidden m-auto w-fit">
                            
                            <Image src="BruinBunkSublet.svg" width={300} height={300} loader={externalImageLoader} alt="Bruin Bunk"  className=""/>
                            
                            {/*
                            <Image src={BruinBunkSublet} width={300} height={300} alt="Bruin Bunk"  className=""/>
                            */}
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="bg-bruinblue">
                <div className="w-8/12 m-auto pb-10 pt-10">
                    <Contact/>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;