import { Link } from "react-router-dom";
import "./LandingPage.css";
import Terre from "../assets/images/planete-terre.png";
import { useEffect, useState } from "react";
import Timeline from "../components/Timeline";
import { gsapHeader } from "../gsap/gsapHeader";

const LandingPage = () => {
  const [conceptHidden, setConceptHidden] = useState(true);

  const toggleConcept = () => {
    setConceptHidden(!conceptHidden);
  };

  useEffect(() => {
    gsapHeader();
  }, []);

  return (
    <div className="landingPageContainer">
      <div className="landingTitle">
        <h1>Epik'Eco</h1>
        <h3>Le jeu des éco-héros engagés !</h3>
      </div>
      <section className="gamePresentation">
        <p className="landingPageDescription">
          Prêt à relever le défi pour préserver notre belle planète tout en
          rivalisant avec vos amis ? Bienvenue sur Epik'Eco, le site qui
          révolutionne votre manière de contribuer à la préservation de
          l'environnement ! <br />
          Epik'Eco est bien plus qu'un simple jeu, c'est une expérience
          immersive qui vous transporte dans un monde virtuel où chaque geste
          compte.
        </p>
        <div className="earth">
          <img className="rotate" src={Terre} alt="planète Terre" />
        </div>
      </section>
      <section className="timeline">
        <h3>Comment ça marche ?</h3>
        <Timeline />
      </section>
      <button id="enSavoirPlus" onClick={toggleConcept}>
        En savoir plus sur le concept
      </button>
      <article id="concept" className={conceptHidden ? "hidden" : ""}>
        <div className="infos">
          <p>
            Avec notre concept unique de challenges écologiques, vous pouvez
            affronter vos amis dans une compétition palpitante pour obtenir le
            meilleur score final et vous hisser au sommet du classement.
          </p>
          <p>
            <strong>Le principe est simple :</strong> vous disposez d'un temps
            limité pour réaliser une série d'éco-gestes qui font toute la
            différence. Recycler, économiser l'énergie, réduire votre
            consommation d'eau... Chaque action positive est récompensée par des
            points précieux. Plus vous en faites, plus vous grimpez dans le
            classement !
          </p>
          <p>
            Notre plateforme conviviale vous permet de suivre votre progression,
            de consulter le classement en temps réel et de défier vos amis
            directement depuis votre ordinateur ou votre smartphone.
          </p>
        </div>
      </article>
      <section className="startGame">
        <div className="startGameContainer">
          <h3>Alors, êtes-vous prêt à devenir un éco-héros ?</h3>
          <p>
            Rejoignez-nous dès maintenant sur Epik'Eco et prouvez que vous avez
            le pouvoir de changer le monde en vous amusant. Ensemble, nous
            pouvons faire la différence !
          </p>
        </div>
        <Link to="/signup">
          <button>C'est parti !</button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
