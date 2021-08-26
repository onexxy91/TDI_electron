import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';


export default function Slide() {
    const data = useSelector(state => state.initialReducer);
    const placard = data.data.placard.image_arr;

    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, 
        slidesToSctoll: 1,
        autoplay: true,
        arrows: false
    }
    //console.log(placard);

    return (
        <Slider style={{width:'100%', height:'16vh'}} {...setting}>
            {placard.map((placardImg, index) => (
                <img key={index} className="plImage" src={placardImg.image_link}></img>
            ))}
        </Slider>
    )
}