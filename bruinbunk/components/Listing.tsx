import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import arrowLeft from "../public/left.svg"; // used for local images
import arrowRight from "../public/right.svg"; // used for local images

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

interface propsInterface {
    listingInfo: ListingType
    setModalShown: any
    setSelectedListing: any
    onListingClick: any
}

const externalImageLoader = ({ src }: { src: string }) =>
  `${src}`;

const websiteImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;

const Listing = (props: propsInterface) => {
    const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);

    let { address, rent, images, type, months, num } = props.listingInfo;
    let { setModalShown, setSelectedListing, onListingClick } = props;

    const monthMapping = (shortMonth: any) => {
        if (shortMonth == "jan") return "January";
        if (shortMonth == "feb") return "February";
        if (shortMonth == "mar") return "March";
        if (shortMonth == "apr") return "April";
        if (shortMonth == "may") return "May";
        if (shortMonth == "jun") return "June";
        if (shortMonth == "jul") return "July";
        if (shortMonth == "aug") return "August";
        if (shortMonth == "sep") return "September";
        if (shortMonth == "oct") return "October";
        if (shortMonth == "nov") return "November";
        if (shortMonth == "dec") return "December";
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


    const onClickPrevImage = () => {
        let numImages: number = images.length;

        if (currentPictureIndex == 0) {
            setCurrentPictureIndex((prevState: number) => numImages-1);
        } else {
            setCurrentPictureIndex((prevState: number) => prevState-1);
        }
        
    }

    const onClickNextImage = () => {
        let numImages: number = images.length;

        if (currentPictureIndex == numImages-1) {
            setCurrentPictureIndex((prevState: number) => 0);
        } else {
            setCurrentPictureIndex((prevState: number) => prevState+1);
        }
    }

    return (
        <div className="md:w-80 md:h-120 m-4 mb-6 rounded-[12px] ">
            {/*
            <img className="rounded-[12px] object-cover" 
                src={images[0]} 
                onClick={() => {setSelectedListing(num); setModalShown(true);}}
                height={200}
            />
            */}
            <div className="relative w-12/12 h-80">
                <div className="z-20 absolute h-80 w-10">
                    <div className="flex h-80">
                        <div 
                            className={"m-auto bg-white cursor-pointer" + (currentPictureIndex != 0 ? " " : " hidden")} 
                            onClick={() => {onClickPrevImage()}}
                        >
                            {/*
                            <Image src={arrowLeft} loader={websiteImageLoader}  alt="L" className="w-fit h-fit z-20" width={10} height={10}/>
                            */}
                            <Image src={arrowLeft} width={20} height={20} loader={websiteImageLoader} alt="Bruin Bunk"  className=""/>

                        </div>
                    </div>
                </div>
                <div className="z-20 absolute h-80 w-10 right-0">
                    <div className="flex h-80">
                        <div 
                            className={"m-auto bg-white cursor-pointer" + (currentPictureIndex != images.length-1 ? " " : " hidden")}
                            onClick={() => {onClickNextImage()}}
                        >
                            {/*
                            <Image src={arrowRight} loader={websiteImageLoader} alt="R" className="w-fit h-fit z-20" width={10} height={10}/>
                            */}
                            <Image src={arrowRight} width={20} height={20} loader={websiteImageLoader} alt="Bruin Bunk"  className=""/>

                        </div>
                    </div>
                </div>
                <Image 
                    src={images[currentPictureIndex]}  
                    alt="Bruin Bunk" 
                    loader={externalImageLoader} 
                    className="w-fit rounded-[12px] cursor-pointer"
                    fill={true}
                    objectFit="cover"
                    onClick={() => {
                        setSelectedListing(num); 
                        onListingClick()
                    }}
                />
                <div className="z-20 absolute bottom-0 m-auto py-2 w-full text-center">
                    {
                        images.map(function(image: string, index: number){
                            return (
                                <div key={index}
                                    className={"inline-block z-20 w-3 h-3 rounded-full w-3 h-3 mx-1 text-xs cursor-pointer" + (currentPictureIndex == index ? " bg-white text-white" : " bg-gray-400 text-gray-400")}
                                    onClick={() => {
                                        setCurrentPictureIndex((prevState: number) => index);
                                    }}
                                >
                                    
                                </div>
                            );
                        })
                    }  
                </div>
                
            </div>

            
            <div className="pt-2.5 px-2">
                <div className="font-bold" style={{fontFamily:'Montserrat'}}>
                    {address}
                </div>
                <div className="" style={{fontFamily:'Montserrat'}}>
                    {roomMapping(type)}
                </div>
                <div className="" style={{fontFamily:'Montserrat'}}>
                    {monthMapping(months[0])} - {monthMapping(months[months.length-1])}
                </div>
                { rent != -1 ?
                    (
                    <div className="" style={{fontFamily:'Montserrat'}}>
                        <b>${Math.floor(rent).toLocaleString("en-US").toString()}</b> / month
                    </div>   
                    )
                    :
                    (
                    <div className="font-bold" style={{fontFamily:'Montserrat'}}>
                        Rent negotiable
                    </div>   
                    )  
                }    
            </div>   
        </div>
    );
}

export default Listing;