import React from 'react'

interface ListingType {
    address: string;
    contact: string;
    images: Array<string>;
    months: Array<string>;
    notes: string;
    rent: number;
    type: string;
}

interface propsInterface {
    listingInfo: ListingType
}

const Listing = (props: propsInterface) => {
    let { address, rent, images, type, months } = props.listingInfo;
    return (
        <div className="md:w-80 md:h-80 md:bg-gray-200 rounded-lg">
            <img className="rounded-[12px]" src={images[0]}/>
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
                <div className="font-bold">
                    ${rent} month
                </div>         
            </div>   
        </div>
    );
}

export default Listing;