import { useState, useEffect } from 'react';
import paginate from './util';
import axiosAll from '../../other/axiosAll';

export const useFetch = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)

    const getProducts = async () => {
        try {
            await axiosAll.get('product')
                .then((response) => {
                    setData(paginate(response.data))
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    return { loading, data }
}