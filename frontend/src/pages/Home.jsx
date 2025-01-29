import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const dispatch = useDispatch();

    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <div>
                <img className='h-[400px] w-full mt-0' src="https://th.bing.com/th/id/OIP.STWPlYiwT6bxHrSa1w0i2AHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" />
            </div>
            {
                loading ? "Loading..." : (
                    <div>
                        {
                            products?.products && (
                                <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
                                    {
                                        products?.products?.map((product, i) => (
                                            <ProductCard product={product} key={i} />
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    );
};

export default Home;
