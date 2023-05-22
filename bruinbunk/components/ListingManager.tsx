import React from "react";

import Listing from "./Listing";

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
    listings: Array<ListingType>
}

const ListingManager = (props: propsInterface) => {
    let { listings } = props;
    return (
        <div className="flex flex-col w-fit m-auto md:flex-row md:space-x-4 md:px-4 md:py-4">
            {listings.map(function(listing, index){
                return <Listing key={ index } listingInfo={listing}/>;
            })}
            
        </div>
    );
}

export default ListingManager;