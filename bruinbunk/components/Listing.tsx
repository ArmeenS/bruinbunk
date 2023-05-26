import React, { useState, useEffect } from 'react'
import Image from 'next/image';

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
}

const externalImageLoader = ({ src }: { src: string }) =>
  `${src}`;

const Listing = (props: propsInterface) => {
    const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);

    let { address, rent, images, type, months, num } = props.listingInfo;
    let { setModalShown, setSelectedListing } = props;

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
        <div className="md:w-80 md:h-120 m-2 rounded-[12px] ">
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
                            className="m-auto bg-white cursor-pointer" 
                            onClick={() => {onClickPrevImage()}}
                        >
                            -1
                        </div>
                    </div>
                </div>
                <div className="z-20 absolute h-80 w-10 right-0">
                    <div className="flex h-80">
                        <div 
                            className="m-auto bg-white cursor-pointer"
                            onClick={() => {onClickNextImage()}}
                        >
                            +1
                        </div>
                    </div>
                </div>
                <Image 
                    src={images[currentPictureIndex]}  
                    alt="Bruin Bunk" 
                    loader={externalImageLoader} 
                    className="w-fit rounded-[12px]"
                    fill={true}
                    objectFit="cover"
                    onClick={() => {setSelectedListing(num); setModalShown(true);}}
                />
                
            </div>

            
            <div className="pt-2 px-4">
                <div className="font-bold">
                    {address}
                </div>
                <div className="">
                    {type}
                </div>
                <div className="">
                    {months[0]} - {months[months.length-1]}
                </div>
                { rent != -1 ?
                    (
                    <div className="font-bold">
                        ${rent}/month
                    </div>   
                    )
                    :
                    (
                    <div className="font-bold">
                        Rent negotiable
                    </div>   
                    )  
                }    
            </div>   
        </div>
    );
}

export default Listing;