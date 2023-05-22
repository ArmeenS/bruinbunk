import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { app } from "../backend/index.js";
import { collection, addDoc, getFirestore } from "firebase/firestore";


import { BsArrowRight } from "react-icons/bs";
import BruinBunkSublet from "../public/BruinBunkSublet.svg"; // used for local images
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images
import React, { useState, useEffect } from 'react'
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";

import ListingManager from './ListingManager';
import Hotbar from './Hotbar';
import Contact from './Contact';
import Waffle from './Waffle';
import Image from 'next/image'
import Modal from './Modal';

const db = getFirestore(app);

async function getAllListings() {

    let listings: any = [];
    const querySnapshot = await getDocs(collection(db, "listings"));
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        listings.push(doc.data());
    });

    listings.map((value: any, index: number) => {
        listings[index]["num"] = index;
    })
    return listings;

}

/* 
    Input:
        type – room type [string array]
        months – [string array]
        min [int] (input 0 if no min is specified)
        max [int] (input 10000 if no max is specified)
*/


// Set the email in the database
export const setEmail = async (email: string) => {
    const docRef = await addDoc(collection(db, "email_waitlist"), {
        email: email,
    });
}



const externalImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;

const EmailSignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
});

interface EmailSignUpData {
    email: string;
};
  

interface ListingType {
    address: string;
    contact: string;
    images: Array<string>;
    months: Array<string>;
    notes: string;
    rent: number;
    type: string;
}

function Portfolio() {
    const initialValues: EmailSignUpData = { email: '' };
    const [successfulEmailSubmission, setSuccessfulEmailSubmission] = useState<boolean>(false);
    const [shownlistings, setShownListings] = useState<Array<ListingType>>([]);
    const [masterListings, setMasterListings] = useState<Array<ListingType>>([]);
    const [isModalShown, setModalShown] = useState<boolean>(false);
    const [selectedListing, setSelectedListing] = useState<number>(-1);
    const [isSearchMode, setSearchMode] = useState<boolean>(false);

    

    useEffect(() => { // Fetch listings from Firebase
        const getListings = async () => {
            const masterListings = await getAllListings();
            console.log("All Listings: ", masterListings);
            //const currentListings = filterListings(masterListings, ["2B/2B"], ["jun", "jul", "aug", "sep"], 0, 10000);
            //console.log("Filtered Listings: ", currentListings);
            setMasterListings(masterListings);
            setShownListings(masterListings);
        }

        getListings().catch(console.error);
    }, []);

    return (
        <div className="">
            <div className="">
                <div className={ isModalShown ? "" : "hidden" }>
                    <Modal setModalShown={setModalShown}/>
                </div>
                <div className="hidden md:flex bg-gray-200 w-full py-4 border-b flex-row ">
                    <div className="w-1/2 pl-4">
                        Introducing BruinBunk, UCLA's Sublease Marketplace
                    </div>
                    <div className="w-1/2 text-right pr-4">
                        bruin@bruinbunk.com
                    </div>
                </div>
                <Hotbar 
                    masterListing={masterListings} setShownListings={setShownListings}
                    isSearchMode={isSearchMode} setSearchMode={setSearchMode}
                />
                
                <div className="md:hidden md:absolute bg-gray-200 w-full">
                    
                    <div className="w-fit m-auto">
                        {/*
                        <Image src="BruinBunkLogo.svg" width={300} height={300} loader={externalImageLoader} alt="Bruin Bunk"  className=""/>
                        */}
                        
                        <Image src={BruinBunkLogo} width={300} height={300} alt="Bruin Bunk"  className=""/>
                        
                        <div className="px-4 font-bold w-fit m-auto pb-2">
                            UCLA's Sublease Marketplace
                        </div>
                        
                    </div>

                </div>
                
                <ListingManager listings={shownlistings}/>
                {/*<Waffle/>*/}
                
            </div>
            
        </div>
    );
}

export default Portfolio;