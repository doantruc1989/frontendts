import { useState, useEffect } from 'react';
import paginate from '../Product/util';
import axiosAll from '../../other/axiosAll';
import { useParams } from 'react-router-dom';


export const useFetch = () => {
    const { categoryname } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)

    const getProducts = async () => {
        try {
            await axiosAll.get(`category/${categoryname}`)
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