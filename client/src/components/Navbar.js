import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<div className=" bg-white w-full h-[80px] drop-shadow-xl z-20">
			<div className="flex items-center h-full justify-between mx-6">
				<Link to={`/`} className="flex items-center h-full">
					<img src={require("../img/icons8-smart-house-64.png")} alt="logo" />
					<div className=" text-3xl font-extrabold ml-6 pt-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-700 drop-shadow-xl">
						IOT Smart Home
					</div>
				</Link>
				<div className="">
					{" "}
					<img
						src={require("../img/icons8-hamburger-menu-64 (1).png")}
						alt="menu"
						className="w-[50px] h-[50px]"
					></img>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
