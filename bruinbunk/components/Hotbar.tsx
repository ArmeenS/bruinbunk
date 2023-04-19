import Link from 'next/link';
import Image from 'next/image';

const externalImageLoader = ({ src }: { src: string }) =>
  `https://BruinBunk.com/${src}`;

// Switch to this eventually
//<Image src="BruinBunkCroppedLogo.png" loader={externalImageLoader} width="400" height="400" layout="responsive" alt="Bruin Bunk" className=""/>


function Hotbar() {
    return (
        <div id={"home"} className="hidden  sm:block absolute w-full bg-black sm:top-0 z-20">
            <div className="sm:w-6/12 sm:flex m-auto ">
                <div className="sm:flex w-1/2">
                    <Link href="/">
                        <Image src="BruinBunkCroppedLogo.png" width={500} height={500} loader={externalImageLoader} alt="Bruin Bunk" className="h-12 w-fit"/>

                    </Link>
                </div>
                
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
            </div>
        </div>
    );
}

export default Hotbar;
