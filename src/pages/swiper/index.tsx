import React from 'react'
import "./index.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import 'swiper/swiper-bundle.css';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

SwiperCore.use([Navigation, Pagination, EffectCoverflow])
type Props = {}

export default function index({}: Props) {
  return (
    <div className='container'>
        <Swiper
            className='swiper-container'
            navigation
            // pagination
            loop
            centeredSlides={true}
            spaceBetween={50}
            slidesPerView={3}
            grabCursor={true}
            effect='coverflow'
            coverflowEffect={{
                rotate: 0,
                stretch:0,
                depth: 100,
                modifier: 2,
                slideShadows: true
            }}
        >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
        </Swiper>
    </div>
  )
}