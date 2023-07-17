import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <section>
        <a href="">A propos</a>
      </section>

      <section>
        <a href="mailto:keops.epikeco@gmail.com">Nous contacter</a>
      </section>

      <section>
        <p>Mentions légales</p>
      </section>

      <section>
        <p>Suivez-nous sur nos réseaux sociaux!</p>
        <a
          className="social-networks"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          Logo Facebook
        </a>
        <a
          className="social-networks"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          Logo Instagram
        </a>
        <a
          className="social-networks"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
        >
          Logo LinkedIn
        </a>
      </section>
    </div>
  );
};

export default Footer;
