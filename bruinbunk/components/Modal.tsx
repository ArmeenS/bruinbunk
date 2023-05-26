import React, { useEffect } from 'react';
import Image from 'next/image';
import arrowLeft from "../public/leftArrow.png"; // used for local images
import arrowRight from "../public/rightArrow.png"; // used for local images


const externalImageLoader = ({ src }: { src: string }) =>
  `${src}`;


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

interface ModalProps {
    setModalShown: any;
    selectedListing: number;
    masterListings: Array<any>;
    setSelectedImageIndex: any;
    selectedImageIndex: number;
}

const Modal = (props: ModalProps) => {
    const { setModalShown, selectedListing, masterListings, setSelectedImageIndex, selectedImageIndex } = props;

    const onClose = () => {
        setModalShown(false);
    }

    const onClickPrevImage = () => {
        if (selectedImageIndex == 0) {
            let numImages: number = masterListings[selectedListing]?.images.length;
            setSelectedImageIndex((prevState: number) => numImages-1);
        } else {
            setSelectedImageIndex((prevState: number) => prevState-1);
        }
        
    }

    const onClickNextImage = () => {
        let numImages: number = masterListings[selectedListing]?.images.length;
        if (selectedImageIndex == numImages-1) {
            setSelectedImageIndex((prevState: number) => 0);
        } else {
            setSelectedImageIndex((prevState: number) => prevState+1);
        }
    }

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

    //useEffect(() => {setSelectedImageIndex((prevState: number) => {selectedImageIndex = prevState})}, [selectedImageIndex])

    return (
        <div className="bg-black fixed h-screen w-screen text-white z-40" onClick={() => {}}>
            <button className="p-4 text-lg fixed" onClick={() => {setModalShown(false)}}>
                X Close
            </button>
            <div className="flex">
                <div className="w-2/12 h-screen flex place-content-end">
                    <div className="flex fixed h-screen">
                        <div className={"m-auto "  + (selectedImageIndex != 0 ? " " : " hidden")}>
                            <button onClick={() => {onClickPrevImage()}}>
                                <Image src={arrowLeft} alt="L" className="w-fit h-fit z-20" width={10} height={10}/>

                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-8/12 h-screen">
                    
                     
                    <div className="flex w-full h-screen">
                        <div className="m-auto w-full h-screen">
                            <div className="h-full w-full relative group">

                            
                                <Image 
                                    src={masterListings[selectedListing]?.images[selectedImageIndex]}  
                                    fill={true}
                                    objectFit="contain"
                                    alt="Bruin Bunk listing image" 
                                    loader={externalImageLoader} 
                                    className="w-fit"
                                    onClick={() => {}}
                                />
                                <div>
                                <div className="opacity-0 group-hover:opacity-100 absolute bg-gradient-to-t from-black w-full bottom-0 h-1/2">
                                    
                                    <div className={"flex h-full p-4 opacity-100" }>
                                        <div className="m-auto w-full text-white">
                                            <div className="w-full text-center">
                                                {selectedImageIndex+1}/{masterListings[selectedListing]?.images.length}
                                            </div>
                                            <div>
                                                Notes: {masterListings[selectedListing]?.notes}
                                            </div>
                                            <div>
                                                Contact: {masterListings[selectedListing]?.contact ? masterListings[selectedListing]?.contact : "Missing"}
                                            </div>
                                            <div>
                                                Rent: {masterListings[selectedListing]?.rent != -1 ? "Rent negotiable" :  masterListings[selectedListing]?.rent}
                                            </div>
                                            <div>
                                                Months: {monthMapping( masterListings[selectedListing]?.months[0])} - {monthMapping(masterListings[selectedListing]?.months[masterListings[selectedListing]?.months.length-1])}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                                
                            </div>
                        </div>

                    </div>  
                </div>
                <div className="w-2/12 h-screen">
                    <div className="flex fixed h-screen">
                        <div className={"m-auto" + (selectedImageIndex != masterListings[selectedListing]?.images.length-1 ? " " : " hidden")}>
                            <button onClick={() => {onClickNextImage()}}>
                                <Image src={arrowRight} alt="R" className="w-fit h-fit z-20" width={10} height={10}/>

                            </button>
                        </div>
                    </div> 
                </div>
                       
            </div>
            
        </div>
    );
}

export default Modal;