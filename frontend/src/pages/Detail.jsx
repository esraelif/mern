import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            dispatch()
        }
    }, [dispatch, id])
    return (
        <div>
            Detail
        </div>
    );
}

export default Detail;
