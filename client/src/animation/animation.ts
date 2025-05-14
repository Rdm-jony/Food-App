import gsap from "gsap";

export const animateHeroSection = (heroImg: HTMLImageElement | null, heroContainer: HTMLDivElement | null) => {
    const tl = gsap.timeline();

    tl.from(
        heroImg,
        {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: "power2.inOut",
            delay: 0.5,
        },

    );

    tl.from(
        heroContainer,
        {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: "power2.inOut",
            delay: 0.5,
        },

    );
    gsap.to(heroImg, {
        rotate: 360,
        duration: 4,
        ease: "linear",
        repeat: -1, // Infinite
    });
};
