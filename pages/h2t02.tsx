import React from 'react';
import '@/app/globals.css';

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between mr-[170px] font-inter ml-[170px] bg-[#E6E6E6] text-[#000] text-2xl p-[48px_32px_48px_32px] mt-[92px]">
            <div className="">
                <a href="/" className="">Home</a>
                <a href="/contact" className="ml-[64px] mr-[64px]">Contact</a>
                <a href="/categories" className="">Categories</a>
            </div>
            <div>
                <a href="/signin" className="">Sign In</a>
            </div>
        </nav>
    );
};

export default Navbar;