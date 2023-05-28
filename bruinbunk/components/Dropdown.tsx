// Basic dropdown from the problem description

import React, { useState, useEffect } from "react";
import Popup from "./Popup";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

// Dropdown Props (normally I would use typescript but this is the replacement)
// width: string (ex: "10px")
// options: Array<string>
// multiselect: boolean
// tag: string
function Dropdown(props) {
    // Whether the current dropdown is selected
    const [ isSelected, setIsSelected ] = useState(false);

    // If the multiselect option is turned off, the first option should be chosen by default
    let startingSelectOptionsIndex = []
    useEffect(() => { 
        if (!(props.multiselect)) {
            if (props.options.length > 0) startingSelectOptionsIndex = [0]
        }
    }, []);

    // A list of the options that are selected by index 
    let selectedOptionsIndex = props.selectedOptions;
    let setSelectedOptionsIndex = props.setSelectedOptions;

    // If the multiselect option is turned off, the first option should be chosen by default
    let startingIsSelectedOption = {}
    useEffect(() => { 
        if (!(props.multiselect)) {
            if (props.options.length > 0) startingIsSelectedOption = {"0": true}
        }
    }, []);

    // A hashmap of the options that are selected by index (for O(1) access time) 
    const [ isSelectedOption, setIsSelectedOption ] = useState(startingIsSelectedOption);

    // Dropdown width
    const width = props.width;

    // Handles when the dropdown is clicked
    const onClickHandler = () => {
        setIsSelected(prevValue => !prevValue)
    }

    return (    
        <div // this div is required to get the popup properly work
            style={{
                padding: "0px",
                position: "static",
                display: "inline-block",
            }}
            className=" rounded-full"
        >    
            <fieldset // this field set gives us the text in the top corner
                style={{
                    borderRadius: "3px",
                    padding: "5px 3px 5px 3px",
                    display: "inline-block",
                    cursor: "pointer",
                    width: width,
                }}

                onClick={() => {onClickHandler()}} // The dropdown was clicked
            >
                
                <div // The actual text inside the dropdown
                    style={{
                        
                        border: "0px",
                        cursor: "pointer",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        paddingLeft: "5px",
                        display: "inline-block",
                    }}
                    
                >
                    {props.tag}
                </div>
                <div
                    style={{
                        display: "inline-block",
                        float: "right",
                    }}
                >
                {
                    isSelected ? 
                        <div className={"flex h-12/12 pr-4"}>
                        <div className="m-auto">
                            <IoMdArrowDropup
                                style={{
                                    
                                }}
                            />
                        </div>
                        </div>
                    :
                        <div className={"flex h-12/12 pr-4"}>
                        <div className="m-auto">
                            <IoMdArrowDropdown
                                style={{
                                    display: "inline-block",
                                }}
                            />
                        </div>
                        </div>
                }
                </div>
                
            </fieldset>     
            {
                // Show the popup when clicked
                isSelected ? 
                    <Popup 
                        width={width} 
                        options={props.options}
                        selectedOptionsIndex={selectedOptionsIndex}
                        setSelectedOptionsIndex={setSelectedOptionsIndex}
                        isSelectedOption={isSelectedOption}
                        setIsSelectedOption={setIsSelectedOption}
                        multiselect={props.multiselect}
                        setIsSelected={setIsSelected}
                    /> 
                : 
                    ""
            }
        </div>
          
    )
}

export default Dropdown;