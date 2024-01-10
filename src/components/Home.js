import './Home.scss';
import { useState, useEffect, useRef } from "react";
import mainLogo from'../assets/Raw_Transparent_Crop.png';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default function Home() {

    useEffect(() => {
        // First part
        gsap.to('.fullscreen', {
            backgroundColor: '#15171900',
            duration: 3,
            ease: "power1.out"
        })
        gsap.to('.first-display', {
            opacity: 1,
            duration: 3,
            ease: "power1.out"
        })


        document.querySelectorAll('.display').forEach((el) => {
            gsap.to(el, {
                scrollTrigger:{
                    trigger: el,
                    start: "top 75%",
                    end: 'top 75%',
                    scrub: true,
                    ease: "power1.out",
                },
                opacity: 1,
                duration: 2
            })
        })


    }, [])
    return (
        <div className="Home">
            <div className='fullscreen'>
                <div className='first-display' style={{opacity: '0'}}>
                    <img className="logo" src={mainLogo} alt="Logo"/>
                    <h1>We are Metaway Studio</h1>
                    <p>A small team of french indie game developers. Aims to create unique and fun gaming experiences.</p>
                </div>
            </div>
            <div className='display' style={{opacity: '0'}}>
                <h1>About Us</h1>
                <p>As two avid gamers turned creators, we founded this independent studio with a shared vision</p>
                <p>We use all the tools at our disposal to create fun, trendy games, or games requested by players</p>
                <p>Being two self-taught video game developers, we are not afraid to learn everything video games can teach us.</p>
            </div>
            <div className='display' style={{opacity: '0'}}>
                <h1>Proximity to Players and Collaborative Creativity</h1>
                <p>The gaming community is at the core of our universe.</p>
                <p>We're not just game developers; we're players too. We value your creativity and believe in the power of collaboration.</p>
                <p>That's why we actively seek and welcome your ideas to shape our games. Your input isn't just appreciated; it's integral to our development process.</p>
                <p>Join us in creating games that reflect the collective imagination of our community, where players aren't just the audience but essential contributors to the gaming experience.</p>
            </div>
        </div>
    );
}