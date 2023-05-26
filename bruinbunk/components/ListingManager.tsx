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
    num: number;
}

interface propsInterface {
    listings: Array<ListingType>
    setModalShown: any
    setSelectedListing: any
}

const ListingManager = (props: propsInterface) => {
    let { listings, setModalShown, setSelectedListing } = props;
    return (
        <div className="flex flex-col flex-wrap md:flex-row md:px-4 md:py-4 justify-center">
            {listings.map(function(listing, index){
                return <Listing key={ index } 
                    setModalShown={setModalShown} 
                    listingInfo={listing} 
                    setSelectedListing={setSelectedListing}
                />;
            })}    
        </div>
    );
}

export default ListingManager;