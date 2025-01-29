import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../redux/productSlice';
import Slider from 'react-slick';
import { BsFillStarFill } from 'react-icons/bs';
import Button from '../components/Button';

const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { loading, product } = useSelector(state => state.products)
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        if (id) {
            dispatch(getProductDetail(id))
        }
    }, [dispatch, id])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const addBasket = () => {

    }
    const increment = () => {
        if (quantity < product?.product?.stock) {
            setQuantity(quantity + 1)
        }
    }
    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }
    return (
        <>

            {
                loading ? "Loading..." :
                    <div className=''>
                        <div className='flex mt-4 justify-center gap-5'>
                            {
                                product?.product && (
                                    <div className='w-[500px]'>
                                        <Slider  {...settings}>
                                            {
                                                product?.product?.images?.map((image, i) => {
                                                    return <img src={image.url} key={i} alt='img' />
                                                })
                                            }
                                        </Slider>
                                    </div>
                                )
                            }
                            <div className='space-y-3'>
                                <div className='text-3xl'>{product?.product?.name}</div>
                                <div className='text-xl'>Description:{product?.product?.description}</div>
                                {product?.product?.stock > 0 ? <div className='text-xl text-green-500'>Number of stock:{product?.product?.stock}</div> :
                                    <div className='text-xl text-red-500'>Product is not in stock</div>}
                                <div className='text-xl'>Category:{product?.product?.category}</div>
                                <div className='text-xl flex items-center gap-2'>Rating:{product?.product?.rating}<BsFillStarFill /></div>
                                <div className='flex items-center gap-4 '>
                                    <div className='text-3xl cursor-pointer' onClick={decrement}>-</div>
                                    <div className='text-2xl'>{quantity}</div>
                                    <div className='text-3xl cursor-pointer' onClick={increment}>+</div>
                                </div>
                                <Button name={"Add Basket"} onClick={addBasket} />
                            </div>
                        </div>
                    </div>
            }

        </>

    );
}

export default Detail;
