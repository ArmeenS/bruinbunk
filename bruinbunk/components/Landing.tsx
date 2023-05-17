import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { app } from "../backend/index.js";
import { collection, addDoc, getFirestore } from "firebase/firestore";


import { BsArrowRight } from "react-icons/bs";
import BruinBunkSublet from "../public/BruinBunkSublet.svg"; // used for local images
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images
import React, { useState, useEffect } from 'react'


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
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
});

interface EmailSignUpData {
    email: string;
};
  

function Portfolio() {
    const initialValues: EmailSignUpData = { email: '' };
    const [successfulEmailSubmission, setSuccessfulEmailSubmission] = useState<boolean>(false);
   

    return (
        <div className="bg-bruinblue">
            <div className="bg-background">
                <div className="bg-gray-200 w-full p-2 border">
                    <div className="float-right">
                        bruin@bruinbunk.com
                    </div>
                    <div className="">
                        Introducing BruinBunk, UCLA's Sublease Marketplace
                    </div>
                    
                </div>
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
                
            </div>
            
        </div>
    );
}

export default Portfolio;