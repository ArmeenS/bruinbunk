import React from 'react';
import Image from 'next/image';


const externalImageLoader = ({ src }: { src: string }) =>
  `${src}`;

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

    return (
        <div className="bg-black fixed h-screen w-screen text-white z-40" onClick={() => {}}>
            <button className="p-4 text-lg fixed" onClick={() => {setModalShown(false)}}>
                X Close
            </button>
            <div className="flex">
                <div className="w-1/3 h-screen flex place-content-end">
                    <div className="flex fixed h-screen">
                        <div className="m-auto">
                            <button onClick={() => {onClickPrevImage()}}>
                                left
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 h-screen">
                    
                     
                    <div className="flex h-screen">
                        <div className="m-auto">
                            <Image 
                                src={masterListings[selectedListing]?.images[selectedImageIndex]}  
                                width={400}
                                height={400}
                                alt="Bruin Bunk" 
                                loader={externalImageLoader} 
                                className="w-fit rounded-[12px]"
                                onClick={() => {}}
                            />
                        </div>

                    </div>  
                </div>
                <div className="w-1/3 h-screen">
                    <div className="flex fixed h-screen">
                        <div className="m-auto">
                            <button onClick={() => {onClickNextImage()}}>
                                right
                            </button>
                        </div>
                    </div> 
                </div>
                       
            </div>
            
        </div>
    );
}

export default Modal;