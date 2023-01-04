import axiosAll from '../../other/axiosAll';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './blogdetail.css'
import Navbar2 from '../../components/Navbar/Navbar2';
import { blogs } from '../../other/model';

const Blogdetail = () => {
    const [blogdetail, setBlogdetail] = useState<blogs>([] as any);
    const { blogid } = useParams();

    useEffect(() => {
        try {
            axiosAll.get(`blog/${blogid}`)
                .then((response) => {
                    setBlogdetail(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <Navbar2 />
            <section className="blogdetail">
                <div className="blogdetail-container">
                    <h1>{blogdetail.title}</h1>
                    <img src={blogdetail.image} />
                    <p>{blogdetail.content}</p>
                </div>
            </section>
        </>
    )
}

export default Blogdetail