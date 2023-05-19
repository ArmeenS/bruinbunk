import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { app } from "../backend/index.js";
import { collection, addDoc, getFirestore } from "firebase/firestore";


import { BsArrowRight } from "react-icons/bs";
import BruinBunkSublet from "../public/BruinBunkSublet.svg"; // used for local images
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images
import React, { useState, useEffect } from 'react'
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";


const db = getFirestore(app);

async function getAllListings() {

    let listings: any = [];
    const querySnapshot = await getDocs(collection(db, "listings"));
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        listings.push(doc.data());
    });
    return listings;

}

/* 
    Input:
        type – room type [string array]
        months – [string array]
        min [int] (input 0 if no min is specified)
        max [int] (input 10000 if no max is specified)
*/
async function filterListings(listings: any, type: string[], months: string[], min: number, max: number) {

    let filtered: any = [];
    for (let i = 0; i < listings.length; i++) {

        if (!type.includes(listings[i].type)) {
            continue;
        }

        let missing = false;
        for (let j = 0; j < months.length; j++) {
            if (!listings[i].months.includes(months[j])) {
                missing = true;
                break;
            }
        }
        if (missing) {
            continue;
        }

        if (listings[i].rent != -1) {
            if (listings[i].rent < min || listings[i].rent > max) {
                continue;
            }
        }

        filtered.push(listings[i]);
    }
    return filtered;
}

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

    useEffect(() => { // Fetch listings from Firebase
        const getListings = async () => {
            const masterListings = await getAllListings();
            console.log("All Listings: ", masterListings);
            const currentListings = await filterListings(masterListings, ["2B/2B"], ["jun", "jul", "aug", "sep"], 0, 10000);
            console.log("Filtered Listings: ", currentListings);
        }

        getListings().catch(console.error);
      }, []);

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