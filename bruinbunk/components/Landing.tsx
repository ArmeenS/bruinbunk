import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { app } from "../backend/index.js";
import { collection, addDoc, getFirestore } from "firebase/firestore";


import { BsArrowRight } from "react-icons/bs";
import BruinBunkSublet from "../public/BruinBunkSublet.svg"; // used for local images
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images
import React, { useState, useEffect } from 'react'
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import ListingManager from './ListingManager';
import Hotbar from './Hotbar';
import Contact from './Contact';
import Waffle from './Waffle';
import Image from 'next/image'
import Modal from './Modal';
import SignInPopup from './SignInPopup';

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
    num: number;
}

function Portfolio() {
    const auth = getAuth(app);

    const initialValues: EmailSignUpData = { email: '' };
    const [successfulEmailSubmission, setSuccessfulEmailSubmission] = useState<boolean>(false);
    const [shownlistings, setShownListings] = useState<Array<ListingType>>([]);
    const [masterListings, setMasterListings] = useState<Array<ListingType>>([]);
    const [isModalShown, setModalShown] = useState<boolean>(false);
    const [selectedListing, setSelectedListing] = useState<number>(0);
    const [isSearchMode, setSearchMode] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isShowingSignUpPopup, setShowingSignUpPopup] = useState<boolean>(false);
    const [ userAuthStatus, setUserAuthStatus] = useState<Boolean>(false);

    // DO FULL MONTH NAME IN CAPS

    // when a listing is clicked determine if the user is signed in
    const onListingClick = () => {
        if (auth.currentUser) {
            setModalShown(true);
        } else {
            //setModalShown(true);
            setShowingSignUpPopup(true);
        }

    }
    

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

    useEffect(() => {
        setSelectedImageIndex(0);
    }, [selectedListing])

    return (
        <div className="">
            <div className="">
                <div className={ isModalShown ? "" : "hidden" }>
                    <Modal 
                        setModalShown={setModalShown} 
                        selectedListing={selectedListing} 
                        masterListings={masterListings}
                        setSelectedImageIndex={setSelectedImageIndex}
                        selectedImageIndex={selectedImageIndex}
                    />
                </div>
                <div className={ isShowingSignUpPopup ? "" : "hidden"}>
                    <SignInPopup setUserAuthStatus={setUserAuthStatus} setShowingSignUpPopup={setShowingSignUpPopup}/>
                </div>
                
                <div className="font-figmaMonts hidden md:flex bg-gray-200 w-full py-4 border-b flex-row" style={{fontFamily:'Montserrat'}}>
                    <div className="w-1/2 pl-8">
                        Introducing BruinBunk, UCLA's Sublease Marketplace
                    </div>
                    <div className="w-1/2 text-right pr-4">
                        <a href="mailto:bruin@bruinbunk.com">bruin@bruinbunk.com</a>
                    </div>
                </div>
                <Hotbar 
                    masterListing={masterListings} setShownListings={setShownListings}
                    isSearchMode={isSearchMode} setSearchMode={setSearchMode}
                    setUserAuthStatus={setUserAuthStatus}
                />
                
                {/*
                <div className="md:hidden md:absolute bg-white mt-4 border-b w-full">
                    
                    <div className="w-fit m-auto">
                        
                        <Image src="BruinBunkLogo.svg" width={300} height={300} loader={externalImageLoader} alt="Bruin Bunk"  className=""/>                     
                        
                    </div>
                </div>
                */}
                
                <ListingManager 
                listings={shownlistings} 
                setModalShown={setModalShown} 
                setSelectedListing={setSelectedListing}
                onListingClick={onListingClick}
                />
                {/*<Waffle/>*/}

                <div className="bg-bruinblue md:hidden py-4 text-white">
                    <div className="m-auto w-fit font-bold text-3xl"> Contact </div>
                    <div className="m-auto w-fit"> bruin@bruinbunk.com</div>
                </div>
                
            </div>
            
        </div>
    );
}

export default Portfolio;