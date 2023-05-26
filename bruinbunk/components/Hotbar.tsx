
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import BruinBunkLogo from "../public/bruinbunk.svg"; // used for local images
import { app } from "../backend/index.js"
import { getAuth, signOut } from "firebase/auth";
import Dropdown from "./Dropdown";
import ContinueWithGoogle from './ContinueWithGoogle';

const externalImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;

const externalGoogleImageLoader = ({ src }: { src: string }) =>
  `${src}`;

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
    setUserAuthStatus: any
}

function Hotbar(props: propsType) {
    const auth = getAuth(app);
    
    const [ selectedRoomOptionsIndex, setSelectedRoomOptionsIndex ] = useState([]);
    const [ selectedMonthOptionsIndex, setSelectedMonthOptionsIndex ] = useState([]);

    // userAuthStatus is just a boolean used to cause our page to update its state

    console.log(auth);
    const isUserSignedIn: boolean = (auth.currentUser != null);

    const { setShownListings, masterListing, isSearchMode, setSearchMode, setUserAuthStatus } = props;

    const monthMapping = (shortMonth: any) => {
        if (shortMonth == "jan") return "JANUARY";
        if (shortMonth == "feb") return "FEBURARY";
        if (shortMonth == "mar") return "MARCH";
        if (shortMonth == "apr") return "APRIL";
        if (shortMonth == "may") return "MAY";
        if (shortMonth == "jun") return "JUNE";
        if (shortMonth == "jul") return "JULY";
        if (shortMonth == "aug") return "AUGUST";
        if (shortMonth == "sep") return "SEPTEMBER";
        if (shortMonth == "oct") return "OCTOBER";
        if (shortMonth == "nov") return "NOVEMBER";
        if (shortMonth == "dec") return "DECEMBER";
    }

    const roomMapping = (shortRoom: any) => {
        if (shortRoom == "1B/1B") return "1 Bed 1 Bath";
        if (shortRoom == "2B/1B") return "2 Bed 1 Bath";
        if (shortRoom == "1B/2B") return "1 Bed 2 Bath";
        if (shortRoom == "2B/2B") return "2 Bed 2 Bath";
        if (shortRoom == "3B/2B") return "3 Bed 2 Bath";
        if (shortRoom == "3B/1B") return "3 Bed 1 Bath";
        if (shortRoom == "4B/2B") return "4 Bed 2 Bath";
        if (shortRoom == "4B/3B") return "4 Bed 3 Bath";
        if (shortRoom == "4B/4B") return "4 Bed 4 Bath";
        if (shortRoom == "5B/3B") return "5 Bed 3 Bath";
        if (shortRoom == "5B/5B") return "5 Bed 5 Bath";
        if (shortRoom == "6B/6B") return "6 Bed 6 Bath";
    }

    let roomOptions: Array<string> = [
        "1B/1B",
        "2B/1B",
        "2B/2B",
        "1B/2B",
        "3B/1B",
        "3B/2B",
        "3B/3B",
        "4B/2B",
        "4B/3B",
        "4B/4B",
        "5B/3B",
        "5B/5B",
        "6B/6B"
    ];

    //roomOptions = roomOptions.map((value: string) => (roomMapping(value)))

    let monthOptions: Array<string> = [          
        "jun", 
        "jul", 
        "aug", 
        "sep"             
    ];
    monthOptions = monthOptions.map((value: string) => (monthMapping(value)))


    const googleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out");
            setUserAuthStatus((prevState: boolean) => (!prevState));

        }).catch((error) => {
            // An error happened.
        });
    }

    
    
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

    


    return (
        <div id={"home"} className="hidden bg-white border-b md:block sticky top-0 w-full py-2 sm:top-0 z-30">
            <div className="sm:fit sm:flex m-auto sm:flex-row ">
                
                <div className={"sm:flex h-12/12 w-1/2" }>
                    {/*
                    <Image src={BruinBunkLogo} alt="Bruin Bunk" className={" w-40 ml-4"}/>
                    */}
                    <Image src="BruinBunkLogo.svg" width={100} height={100} loader={externalImageLoader} alt="Bruin Bunk"  className={" w-40 ml-4"}/>

                </div>

                {
                    !isSearchMode ? 
                    (
                    <div className="flex h-10 ">
                        <div className="m-auto">
                            <button className="rounded-full py-2 px-10 border border-2 shadow-md border-blue-600 hover:border-blue-400 text-blue-600 hover:text-blue-400 font-bold cursor-pointer hover:text-blue-400" style={{fontFamily:'Montserrat', fontSize: 20}} onClick={() => {setSearchMode(true)}}>
                                Search
                            </button>
                        </div>
                    </div>
                    )
                    :
                    (
                    <div className="flex h-10">
                        <div className="m-auto">
                            <div className="py-1 px-8 flex flex-row space-x-5 border border-2 shadow-md border-blue-600 rounded-full px-2" style={{fontFamily:'Montserrat'}}>

                                <div className="flex h-12/12">
                                    <div className="m-auto">
                                        <Dropdown
                                            width="12em"
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
                                            width="12em"
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
                                        <button className="rounded-full py-2 px-10   hover:border-blue-400 text-blue-600 hover:text-blue-400 font-bold cursor-pointer hover:text-blue-400" style={{fontFamily:'Montserrat', fontSize: 18}} onClick={() => {onSearch()}}>
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
                    <div className={"flex h-12/12"}>
                        <div className={"m-auto" + (isSearchMode ? " hidden" : "")}>
                            <a 
                                className="rounded-full py-3 px-4 border border-blue-600 border-2 shadow-md hover:border-blue-400 text-blue-600 hover:text-blue-400 font-bold cursor-pointer hover:text-blue-400"
                                style={{fontFamily:'Montserrat'}}
                                href="https://docs.google.com/forms/d/e/1FAIpQLScIaUS8PM8nP6N0DbzC25FR3rpqiM_aVlUX3dxtFq2R1yaBiw/viewform?usp=sf_link"
                                target="#"
                            >
                                List Sublet
                            </a>
                        </div>
                    </div>

                    {
                        isUserSignedIn ?
                        (
                            <div className="flex">   
                            <div className={"flex h-12/12 pr-4"}>
                                <div className="m-auto">
                                    <Image 
                                        src={auth.currentUser.photoURL}
                                        className="h-10 w-10 rounded-full"
                                        loader={externalGoogleImageLoader}
                                        width={100}
                                        height={100}
                                        alt="pfp"
                                    />

                                </div>
                            </div>
                            <div className={"flex h-12/12 pr-4" }>
                                <div className="m-auto">
                                    <div 
                                        onClick={googleSignOut} 
                                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                                    > 
                                        Log out
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                        :
                        (
                            <ContinueWithGoogle callback={() => {}} setUserAuthStatus={setUserAuthStatus}/>
                        )
                    }
                    
                    

                        
                </div>
                
            </div>
        </div>
    );
}

export default Hotbar;
