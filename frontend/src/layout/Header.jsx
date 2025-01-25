import React, { useState } from 'react';
import { SlBasket } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
const Header = () => {
    const [openMenu, setOpenMenu] = useState(true);
    const menuItems = [
        {
            name: "Profile",
            url: "/profile"
        },
        {
            name: "Admin",
            url: "/admin"
        },
        {
            name: "Logout",
            url: "/logout"
        }
    ]
    return (
        <div className='bg-gray-500 h-16 px-5 flex items-center justify-between'>
            <div className='text-4xl'>
                e.com
            </div>
            <div className='flex items-center gap-5'>
                <div className='flex items-center'>
                    <input className='p-2 outline-none' type="text" placeholder='Searching...' />
                    <div className='p-2 ml-1 bg-white cursor-pointer'>Search</div>
                </div>

                <div className='relative'>
                    <CgProfile className='w-8 h-8 rounded-full' onClick={() => setOpenMenu(!openMenu)} />
                    {openMenu && <div className='absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-amber-800'>
                        {menuItems.map((item, i) => (
                            <div className='px-2 py-1 hover:bg-gray-600' key={i}>{item.name}</div>
                        ))
                        }
                    </div>}
                </div>
                <div className='relative'>
                    <SlBasket size={30} />
                    <div className='absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center'>4</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
