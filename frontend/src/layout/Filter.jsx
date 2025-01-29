import React from 'react';

const Filter = () => {
    const categoryList = [
        "Bag", "Shoes", "Computer", "MobilePhone", "Pants"
    ]
    const ratingList = [
        1, 2, 3, 4, 5
    ]
    return (
        <div className='w-[200px] mt-3 p-1'>
            <div>Filter</div>
            <div className='flex items-center gap-2 my-2'>
                <input className='border w-16 p-1 outline-none' type="number" placeholder='Min' />
                <input className='border w-16 p-1 outline-none' type="number" placeholder='Max' />
            </div>
            <div className='my-2'>Category</div>
            {
                categoryList.map((category, i) => (
                    <div key={i} className='flex items-center gap-2 my-2 text-sm cursor-pointer'>
                        {category}
                    </div>
                ))
            }
            <hr />
            <div>Rating</div>
            {
                ratingList.map((rating, i) => (
                    <div key={i} className='flex items-center gap-2 my-2 text-sm cursor-pointer'>
                        {rating}
                    </div>
                ))
            }
        </div>
    );
}

export default Filter;
