
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../backend/index.js"

import Dropdown from "./Dropdown";

const externalImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;

interface ListingType {
    address: string;
    contact: string;
    images: Array<string>;
    months: Array<string>;
    notes: string;
    rent: number;
    type: string;
}

interface propsType {
    masterListing: Array<ListingType>
    setShownListings: any
    isSearchMode: any
    setSearchMode: any
}

function Hotbar(props: propsType) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    console.log(auth.currentUser);
    const [ selectedRoomOptionsIndex, setSelectedRoomOptionsIndex ] = useState([]);
    const [ selectedMonthOptionsIndex, setSelectedMonthOptionsIndex ] = useState([]);

    

    const { setShownListings, masterListing, isSearchMode, setSearchMode } = props;

    let roomOptions: Array<string> = [
        "1B/1B",
        "2B/1B",
        "2B/2B",
        "3B/2B",
        "3B/3B",
    ];

    let monthOptions: Array<string> = [          
        "jun", 
        "jul", 
        "aug", 
        "sep"             
    ];

    const filterListings = (listings: any, type: string[], months: string[], min: number, max: number) => {

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

    const onSearch = () => {
        let options: Array<string> = [];
        selectedRoomOptionsIndex.map((idx: number) => {options.push(roomOptions[idx])})

        let months: Array<string> = [];
        selectedMonthOptionsIndex.map((idx: number) => {months.push(monthOptions[idx])})

        let currentListings = filterListings(masterListing, options, months, 0, 10000);

        if (options.length == 0 && months.length == 0) currentListings = props.masterListing;
        setShownListings(currentListings);
        setSearchMode(false);
    }

    /*
    useEffect(() => { // Fetch listings from Firebase
        console.log(selectedMonthOptionsIndex);
    }, [selectedMonthOptionsIndex]);
    */

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
        <div id={"home"} className="hidden bg-white border-b md:block sticky top-0 w-full sm:top-0 z-20">
            <div className="sm:fit sm:flex m-auto sm:flex-row ">
                <div className="sm:flex w-1/2 h-full">         
                    {/*    
                    <Image src="BruinBunkLogo.svg" width={500} height={500} loader={externalImageLoader} alt="Bruin Bunk" className="h-48 -mt-5 w-fit"/>
                    */}      
                        
                    <Image src={BruinBunkLogo} width={500} height={500} alt="Bruin Bunk" className="ml-4 h-20 w-fit"/>
                        
                    
                </div>

                {
                    !isSearchMode ? 
                    (
                    <div className="flex h-12/12">
                        <div className="m-auto ">
                            <button className="rounded-full py-2 px-10 border border-2 shadow-md border-blue-600 hover:border-blue-400 text-blue-600 hover:text-blue-400 font-bold cursor-pointer hover:text-blue-400" style={{fontFamily:'Montserrat'}} onClick={() => {setSearchMode(true)}}>
                                Search
                            </button>
                        </div>
                    </div>
                    )
                    :
                    (
                    <div className="flex h-12/12 ">
                        <div className="m-auto">
                            <div className="py-2 flex flex-row border border-2 shadow-md border-blue-600 rounded-full px-2" style={{fontFamily:'Montserrat'}}>

                                <div className="flex h-12/12">
                                    <div className="m-auto">
                                        <Dropdown
                                            width="8em"
                                            options={roomOptions}
                                            multiselect={true}
                                            selectedOptions={selectedRoomOptionsIndex}
                                            setSelectedOptions={setSelectedRoomOptionsIndex}
                                            tag={"Room Type"}
                                        />
                                    </div>
                                </div>

                                <div className="flex h-12/12 ">
                                    <div className="m-auto">
                                        <Dropdown
                                            width="8em"
                                            options={monthOptions}
                                            multiselect={true}
                                            selectedOptions={selectedMonthOptionsIndex}
                                            setSelectedOptions={setSelectedMonthOptionsIndex}
                                            tag={"When"}
                                        />
                                    </div>
                                </div>
                                <div className="flex h-12/12">
                                    <div className="m-auto ">
                                        <button className="rounded-full py-2 px-10   hover:border-blue-400 text-blue-600 hover:text-blue-400 font-bold cursor-pointer hover:text-blue-400" onClick={() => {onSearch()}}>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                    

                }
                
                

                
                

                        
                
                <div className="sm:flex w-1/2 place-content-end space-x-10 h-12/12 mr-4">
                    <div className="flex h-12/12">
                        <div className="m-auto">
                            <a 
                                className="rounded-full py-2 px-3 border border-blue-600 border-2 shadow-md hover:border-blue-400 text-blue-600 hover:text-blue-400 font-bold cursor-pointer hover:text-blue-400"
                                style={{fontFamily:'Montserrat'}}
                                href="https://docs.google.com/forms/d/e/1FAIpQLScIaUS8PM8nP6N0DbzC25FR3rpqiM_aVlUX3dxtFq2R1yaBiw/viewform?usp=sf_link"
                                target="#"
                            >
                                List Sublet
                            </a>
                        </div>
                    </div>
                    <div className="flex h-12/12">
                        <div className="m-auto">
                            
                            <a 
                                className="my-auto hover:text-gray-300 text-gray-500 cursor-pointer hover:text-white"
                                onClick={googleLogin}
                            >
                                Log out
                            </a>
                        </div>
                    </div>
                        
                </div>
                
            </div>
        </div>
    );
}

export default Hotbar;
