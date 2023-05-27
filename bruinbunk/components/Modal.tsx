import React, { useEffect } from 'react';
import Image from 'next/image';
import arrowLeft from "../public/leftDark.svg"; // used for local images
import arrowRight from "../public/rightDark.svg"; // used for local images


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
                                <Image src={arrowLeft} alt="L" className="w-2/3 h-2/3 z-20" width={5} height={5}/>

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
                                <div className="opacity-0 group-hover:opacity-100 absolute bg-gradient-to-t from-black w-full bottom-0 h-1/3">
                                    
                                    <div className={"flex h-full p-4 opacity-100" }>
                                        <div className="m-auto w-full text-white">
                                            <div className="w-full text-center font-bold pb-5" style={{fontFamily:'Montserrat', fontSize: 20}}>
                                                {selectedImageIndex+1}/{masterListings[selectedListing]?.images.length}
                                            </div>
                                            <div className="pb-2" style={{fontFamily:'Montserrat'}}>
                                                <b>Notes:</b> {masterListings[selectedListing]?.notes}
                                            </div>
                                            <div className="pb-2" style={{fontFamily:'Montserrat'}}>
                                                <b>Contact:</b> {masterListings[selectedListing]?.contact ? masterListings[selectedListing]?.contact : "Missing"}
                                            </div>
                                            <div className="pb-2" style={{fontFamily:'Montserrat'}}>
                                                <b>Rent:</b> {masterListings[selectedListing]?.rent == -1 ? "Negotiable" :  masterListings[selectedListing]?.rent}
                                            </div>
                                            <div className="pb-2" style={{fontFamily:'Montserrat'}}>
                                                <b>Months:</b> {monthMapping( masterListings[selectedListing]?.months[0])} - {monthMapping(masterListings[selectedListing]?.months[masterListings[selectedListing]?.months.length-1])}
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
                                <Image src={arrowRight} alt="R" className="w-2/3 h-2/3 z-20" width={10} height={10}/>

                            </button>
                        </div>
                    </div> 
                </div>
                       
            </div>
            
        </div>
    );
}

export default Modal;