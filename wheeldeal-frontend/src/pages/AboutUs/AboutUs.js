import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './AboutUs.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const techStack = [
    { name: 'React', img: '/img/tech/react.png', desc: 'Frontend Framework' },
    { name: 'Node.js', img: '/img/tech/node.png', desc: 'Server Environment' },
    { name: 'Spring Boot', img: '/img/tech/spring.png', desc: 'Backend API' },
    { name: 'Google Cloud', img: '/img/tech/googlecloud.png', desc: 'OAuth / Login Integration' },
    { name: 'MySQL', img: '/img/tech/mysql.png', desc: 'Database' },
    { name: 'DBeaver', img: '/img/tech/dbeaver.png', desc: 'Database Management' },
    { name: 'Slick Slider', img: '/img/tech/slick.png', desc: 'Slider Component' },
    { name: 'Postman', img: '/img/tech/postman.png', desc: 'API Testing Tool' },
    { name: 'ChatGPT', img: '/img/tech/chatgpt.png', desc: 'AI Assistant' },
    { name: 'Claude', img: '/img/tech/claude.png', desc: 'AI Assistant' }
];


function AboutUs() {

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 7000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        arrows: false,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <div className="about-page">
            <h1 className="about-subtitle">Built using modern for a smooth experience.</h1>

            <div className="tech-slider">
                <Slider {...sliderSettings}>
                    {techStack.map((tech, index) => (
                        <div key={index} className="tech-slide">
                            <img src={tech.img} alt={tech.name} />
                            <p className="tech-name">{tech.name}</p>
                            <p className="tech-desc">{tech.desc}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default AboutUs;
