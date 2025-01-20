import React from 'react';
import { SlBasket } from "react-icons/sl";
const Header = () => {
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
        <div className='bg-red-100 h-16 px-5 flex items-center justify-between'>
            <div className='text-4xl'>
                e.com
            </div>
            <div className=''>
                <input type="text" placeholder='Searching...' />
                <div className='relative'>
                    <img src="https://www.google.com/imgres?q=profile%20picture&imgurl=https%3A%2F%2Fas2.ftcdn.net%2Fjpg%2F05%2F75%2F00%2F85%2F1000_F_575008502_iL4EIHF2rUqNY2L1o45Q15Mny2j6Wn4W.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fde%2Fimages%2Fdefault-avatar-female-profile-user-profile-icon-profile-picture-portrait-symbol-user-member-people-icon-in-flat-style-circle-button-with-avatar-photo-silhouette-vector-design-and-illustration%2F575008502&docid=IEOFbfN1RwIQWM&tbnid=B_UBDPRlTCq_tM&vet=12ahUKEwidyP2NzYSLAxU69LsIHZidA5kQM3oECCsQAA..i&w=1000&h=837&hcb=2&ved=2ahUKEwidyP2NzYSLAxU69LsIHZidA5kQM3oECCsQAA" alt="" />
                    <div className='absolute'>
                        {menuItems.map((item, i) => (
                            <div key={i}>{item.name}</div>
                        ))
                        }
                    </div>
                </div>
                <div className='relative'>
                    <SlBasket />
                </div>
            </div>
        </div>
    );
}

export default Header;
