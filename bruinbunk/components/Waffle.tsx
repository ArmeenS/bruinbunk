import { AiOutlineMenu, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';

const Waffle = () => {
    const [isNavMenuVisible, setNavMenuVisible] = useState(false);

    const onWaffleClick = () => {
        setNavMenuVisible(!isNavMenuVisible);
    }

    return (
        <div className={(isNavMenuVisible ? "bg-gray-100 fixed " : "absolute ") + " z-40"}>
            <div onClick={() => onWaffleClick()} className="inline-block w-auto p-4 z-40">
                <AiOutlineMenu size="2.5rem" className={( isNavMenuVisible ? "text-black " : "text-gray-400 " )+"my-auto mt-5 mx-2 cursor-pointer sm:hidden"}/>
            </div>
            <div className={(isNavMenuVisible ? "" : "hidden ") + " bg-gray-100 z-50 w-screen py-10 pl-10"}>
                <div className="flex flex-col gap-2">
                    
                    <a 
                        className="inline-block w-auto pr-2 m-auto text-gray-400 text-xl"
                        href={`#home`}
                        onClick={(e: any) => {
                                e.preventDefault();
                                const head: (Element | null) = document.querySelector(`#home`)
                                if (head) {
                                    head.scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }
                            }
                        }
                    >
                        Home
                    </a>
                    <a 
                        className="inline-block w-auto pr-2 m-auto text-gray-400 text-xl"
                        href={`#about`}
                        onClick={(e: any) => {
                                e.preventDefault();
                                const head: (Element | null) = document.querySelector(`#about`)
                                if (head) {
                                    head.scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }
                            }
                        }
                    >
                        About
                    </a>
                    <a 
                        className="inline-block w-auto pr-2 m-auto text-gray-400 text-xl"
                        href={`#contact`}
                        onClick={(e: any) => {
                                e.preventDefault();
                                const head: (Element | null) = document.querySelector(`#contact`)
                                if (head) {
                                    head.scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }
                            }
                        }
                    >
                        Contact
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Waffle;