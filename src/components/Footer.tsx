import "./Footer.css";
import { FaFacebookSquare, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  let iconeStyle = { fontSize: "28px", color: "white" };

  return (
    <div className="footer">
      <section className="firstBlock">
        <a href="http://localhost:3000/">A propos</a>
        <a href="mailto:keops.epikeco@gmail.com">Nous contacter</a>
        <p>Mentions légales</p>
      </section>

      <section>
        <p>Suivez-nous sur nos réseaux sociaux !</p>
        <div className="sociaIconsContainer">
          <a
            className="socialNetworks"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookSquare style={iconeStyle} />
          </a>
          <a
            className="socialNetworks"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram style={iconeStyle} />
          </a>
          <a
            className="socialNetworks"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin style={iconeStyle} />
          </a>
        </div>
      </section>

      <section>
        <p>©KEOP's</p>
      </section>
    </div>
  );
};

export default Footer;
