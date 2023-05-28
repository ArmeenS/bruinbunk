
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BruinBunkLogo from "../public/bruinbunk.svg"; // used for local images
import { app } from "../backend/index.js"
import { getAuth, signOut } from "firebase/auth";
import Dropdown from "./Dropdown";
import ContinueWithGoogle from './ContinueWithGoogle';
import MagnifyingGlass from "../public/MagnifyingGlass.svg"; // used for local images
import { type } from 'os';


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
    
    //const isUserSignedIn: boolean = (auth.currentUser != null);


    const { setShownListings, masterListing, isSearchMode, setSearchMode, setUserAuthStatus } = props;

    const monthMapping = (shortMonth: any) => {
        if (shortMonth == "jan") return "Jan";
        if (shortMonth == "feb") return "Feb";
        if (shortMonth == "mar") return "Mar";
        if (shortMonth == "apr") return "Apr";
        if (shortMonth == "may") return "May";
        if (shortMonth == "jun") return "Jun";
        if (shortMonth == "jul") return "Jul";
        if (shortMonth == "aug") return "Aug";
        if (shortMonth == "sep") return "Sep";
        if (shortMonth == "oct") return "Oct";
        if (shortMonth == "nov") return "Nov";
        if (shortMonth == "dec") return "Dec";
    }

    const roomMapping = (shortRoom: any) => {
        if (shortRoom == "1B/1B") return "1 Bed / 1 Bath";
        if (shortRoom == "2B/1B") return "2 Bed / 1 Bath";
        if (shortRoom == "1B/2B") return "1 Bed / 2 Bath";
        if (shortRoom == "2B/2B") return "2 Bed / 2 Bath";
        if (shortRoom == "3B/2B") return "3 Bed / 2 Bath";
        if (shortRoom == "3B/1B") return "3 Bed / 1 Bath";
        if (shortRoom == "4B/2B") return "4 Bed / 2 Bath";
        if (shortRoom == "4B/3B") return "4 Bed / 3 Bath";
        if (shortRoom == "4B/4B") return "4 Bed / 4 Bath";
        if (shortRoom == "5B/3B") return "5 Bed / 3 Bath";
        if (shortRoom == "5B/5B") return "5 Bed / 5 Bath";
        if (shortRoom == "6B/6B") return "6 Bed / 6 Bath";
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

    
    
    const filterListings = (listings: Array<ListingType>, types: string[], months: string[]) => {

        let filtered: any = [];
        for (let i = 0; i < listings.length; i++) {
            // Find any listing that has the room type the user chose
            if (!types.includes(listings[i].type)) {
                continue;
            }
            
            let listingMonths: any = listings[i].months.map(monthMapping);
            // Find any listing that has *all* of the months the user chose
            let missing = false;
            months.map((month: string) => {
                if (!listingMonths.includes(month)) {
                    missing = true;
                }
            })
            if (missing) continue;
            
            filtered.push(listings[i]);
        }
        return filtered;
    }

    const onSearch = () => {
        let options: Array<string> = [];
        selectedRoomOptionsIndex.map((idx: number) => {options.push(roomOptions[idx])})

        // if options is empty we want all possible room options to be used
        if (options.length == 0) options = roomOptions;

        let months: Array<string> = [];
        selectedMonthOptionsIndex.map((idx: number) => {months.push(monthOptions[idx])})

        // if months is empty we want all possible months to be used
        if (months.length == 0) months = [];

        let currentListings = filterListings(masterListing, options, months);
        /*
        console.log(masterListing);
        console.log(currentListings);
        console.log(options.length);
        console.log(months.length);
        */
        
        setShownListings(currentListings);
        //setShownListings(masterListing);
        setSearchMode(false);
        // Reset the indices
        setSelectedRoomOptionsIndex([]);
        setSelectedMonthOptionsIndex([]);
    }

    /*
    useEffect(() => { // Fetch listings from Firebase
        console.log(selectedMonthOptionsIndex);
    }, [selectedMonthOptionsIndex]);
    */

    


    return (
        <div id={"home"} className="block bg-white md:border-b sticky top-0 w-full py-2 sm:top-0 z-30">
            <div className="block sm:fit sm:flex m-auto sm:flex-row ">
                
                <div className={"hidden sm:flex h-12/12 w-1/2" }>
                    {/*
                    <Image src={BruinBunkLogo} alt="Bruin Bunk" className={" w-40 ml-4"}/>
                    */}
                    <Image src="BruinBunkLogo.svg" width={100} height={100} loader={externalImageLoader} alt="Bruin Bunk"  className={" w-40 ml-4"}/>

                </div>
                <div className={"flex flex-row sm:hidden h-12/12 border-b top-0 " }>
                    {/*
                    <Image src={BruinBunkLogo} alt="Bruin Bunk" className={" w-40 ml-4"}/>
                    */}
                    <Image src="BruinBunkLogo.svg" width={100} height={100} loader={externalImageLoader} alt="Bruin Bunk"  className={"  ml-4 w-5/12"}/>
                    {
                        (auth.currentUser != null) ?
                        (
                            <div className="flex flex-row w-7/12 text-center md:hidden"> 
                                <div className="m-auto flex-row flex">
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
                                                onClick={ () => {googleSignOut()}} 
                                                className="cursor-pointer text-gray-400 hover:text-gray-600"
                                            > 
                                                Log out
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="flex flex-row w-7/12 text-center md:hidden">
                                <ContinueWithGoogle callback={() => {}} setUserAuthStatus={setUserAuthStatus}/>
                            </div>
                        )
                    }
                </div>

                {
                    !isSearchMode ? 
                    (
                    <div className="mt-2 md:m-auto flex h-fit block">
                        <div className="m-auto">
                            {/* I removed the hover effects from below because we don't have a different shade for the magnifying glass */}
                            {/* hover:border-blue-400 hover:text-blue-400 hover:text-blue-400 */}
                            <button className="flex rounded-full px-5 md:px-8 border border-2 shadow-md border-blue-600 text-blue-600 font-bold cursor-pointer " style={{fontFamily:'Montserrat', fontSize: 20}} onClick={() => {setSearchMode(true)}}>
                                <div className="py-2">
                                    Search
                                </div>
                                
                                <div className="m-auto">
                                    <Image src={MagnifyingGlass} alt="Bruin Bunk" className={" w-8 md:w-14 ml-2"}/>
                                </div>
                            </button>
                            
                        </div>
                    </div>
                    )
                    :
                    (
                    <div className=" flex h-fit md:h-10 ">
                        <div className="m-auto">
                            <div className=" py-1 px-8 flex flex-row border border-2 shadow-md border-blue-600 rounded-full px-2" style={{fontFamily:'Montserrat'}}>

                                <div className="flex h-12/12">
                                    <div className="m-auto">
                                        <Dropdown
                                            width={"9em"}
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
                                
                                <button className=" w-11 md:w-9 font-bold cursor-pointer" style={{fontFamily:'Montserrat', fontSize: 18}} onClick={() => {onSearch()}}>
                                    <Image src={MagnifyingGlass} alt="Bruin Bunk" className={" "}/>
                                </button>
                                   
                            </div>
                        </div>
                    </div>
                    )
                    

                }
                
                <div className="block w-full mt-4 pb-4 md:pb-0 md:m-auto  sm:flex md:w-1/2 place-content-end space-x-10 h-12/12 md:mr-4">
                    <div className={"flex h-12/12"}>
                        <div className={"m-auto" + (isSearchMode ? " md:hidden" : "")}>
                            {/* I removed the hover effects from below because we don't have a different shade for the magnifying glass */}
                            {/* hover:border-blue-400 hover:text-blue-400 hover:text-blue-400 */}
                            <a 
                                className="rounded-full py-3 px-4 border border-blue-600 border-2 shadow-md text-blue-600 font-bold cursor-pointer "
                                style={{fontFamily:'Montserrat'}}
                                href="https://docs.google.com/forms/d/e/1FAIpQLScIaUS8PM8nP6N0DbzC25FR3rpqiM_aVlUX3dxtFq2R1yaBiw/viewform?usp=sf_link"
                                target="#"
                            >
                                List Sublet
                            </a>
                        </div>
                    </div>

                    {
                        (auth.currentUser != null) ?
                        (
                            <div className="hidden md:flex">   
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
                                        onClick={() => {googleSignOut}} 
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
                            <div className={"flex h-12/12"}>
                                <div className={"m-auto"}>
                                    <div className="hidden flex flex-row w-fit text-center md:block">
                                        <ContinueWithGoogle callback={() => {}} setUserAuthStatus={setUserAuthStatus}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                    

                        
                </div>
                
            </div>
        </div>
    );
}

export default Hotbar;
