import Link from 'next/link';
import Image from 'next/image';
import BruinBunkLogo from "../public/BruinBunkLogo.svg"; // used for local images

const externalImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;


function Hotbar() {
    return (
        <div id={"home"} className="hidden sm:block absolute w-full sm:top-0 z-20">
            <div className="sm:fit p-6 sm:flex m-auto ">
                <div className="sm:flex w-1/2">
                    <Link href="/" className="w-full h-full">
                         
                        <Image src="BruinBunkLogo.svg" width={500} height={500} loader={externalImageLoader} alt="Bruin Bunk" className="h-48 -mt-5 w-fit"/>
                        
                        {/* 
                        <Image src={BruinBunkLogo} width={500} height={500} alt="Bruin Bunk" className=" h-48 -mt-5 w-fit"/>
                        */}
                    </Link>
                </div>
                
                {/*
                <div className="sm:flex w-1/2 place-content-end space-x-10">
                    <a 
                        className="my-auto text-gray-300 cursor-pointer hover:text-white"
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
                        className="my-auto text-gray-300 cursor-pointer hover:text-white"
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
                        className="my-auto text-gray-300 cursor-pointer hover:text-white"
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
                */}
            </div>
        </div>
    );
}

export default Hotbar;
