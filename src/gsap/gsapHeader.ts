import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

export const gsapHeader = () => {

	gsap.fromTo(
		'.landingTitle',
		{
      opacity: 0,
			xPercent: -50,
		},
		{
			opacity: 1,
			xPercent: 0,
		  ease: 'ease',
      duration: 0.7,
		},
	);

  gsap.fromTo(
		'.landingPageDescription',
		{
      opacity: 0,
			xPercent: -50,
		},
		{
			opacity: 1,
			xPercent: 0,
		  ease: 'ease',
      delay: 0.3,
      duration: 0.7,
		},
	);

  gsap.fromTo(
    '.earth',
    {
      opacity: 0,
      xPercent: 50,
    },
    {
      opacity: 1,
      xPercent: 0,
      ease: 'ease',
      delay: 0.5,
      duration: 0.7,
    },
  );

  gsap.fromTo(
    '.timeline',
    {
      opacity: 0,
      yPercent: 50,
    },
    {
      opacity: 1,
      yPercent: 0,
      ease: 'ease',
      delay: 0.7,
      duration: 0.7,
    },
  );

  gsap.fromTo(
    '.startGame',
    {
      yPercent: 50, // Départ à 50% vers le bas
    },
    {
      scrollTrigger: {
        trigger: '.startGame',
        toggleActions: "restart none none reset"
      },
      yPercent: 0, // Arrivée à 0% vers le haut
      duration: 1,
    },
  );
};
