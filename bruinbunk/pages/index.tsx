import Link from 'next/link'
import Image from "next/image";
import BruinBunkCroppedLogo from "../public/BruinBunkCroppedLogo.png";
import Portfolio from '../components/Landing';

// Navbar at the top of the screen *Eventually put this into its own class*
const NavBar = () => (
  <div className="h-12 w-full text-white bg-red-200 flex flex-row justify-end">
    
    <div className="bg-yellow-200">
      hello
    </div>    
  </div>
);

const IndexPage = () => (
  <Portfolio/>
)

export default IndexPage
