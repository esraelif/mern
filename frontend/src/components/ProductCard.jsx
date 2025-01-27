import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";

const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className='w-[250px] bg-gray-300' onClick={() => navigate(`product/${product._id}`)}>
            <Slider {...settings}>
                {
                    product?.images?.map((image, i) => {
                        return <img src={image.url} key={i} alt='img' />
                    })
                }
            </Slider>
            <div className='text-xl px-3'>{product?.name}</div>
            <div className='text-2xl px-3'>{product?.price}$</div>

        </div>
    );
}

export default ProductCard;
