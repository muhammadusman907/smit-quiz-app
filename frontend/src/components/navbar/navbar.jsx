import LOGO from "../../assets/images/logo-OpazD70S.png";
import LOGOQ from "../../assets/images/logo-new.svg";
import React from 'react'
import Button from '../button/button.jsx';
const Navbar = ( ) => {
  return (
  <nav className=" bg-secondary box-shadow h-[70px]">
    <div className=" flex items-center h-[70px] justify-between px-10">
      <div >
    <img src={LOGOQ} alt="" className="h-10 w-100"/>
      </div>
       <Button btnName="Login" />
    </div>
  </nav>
  
  );
}
export default Navbar ; 