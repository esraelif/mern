import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';

const Home = () => {
    const dispatch = useDispatch();

    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts())

    }, [dispatch])
    console.log(products, loading, "ürünler")
    return (
        <div>
            Home
        </div>
    );
}

export default Home;
