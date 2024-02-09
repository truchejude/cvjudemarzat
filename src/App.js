import React, { useEffect } from 'react';
import './App.css';
import goise from './main-dessin-illustration-du-concept-individualite/goose.png'
import Crawl from './react-star-wars-crawl/Crawl'
import 'react-star-wars-crawl/lib/index.css'

function App() {
  const starSpeed = 2000
  const starCreation = 1

  useEffect(() => {
    function createStar() {
      const star = document.createElement('div');
      star.classList.add('star');

      star.style.left = `${Math.random() * window.innerWidth + window.scrollX}px`;
      star.style.top = `${Math.random() * window.innerHeight + window.scrollY}px`;
      function randomBrightColor() {
        //                  jaune       vert      bleu        violet      rouge sa mére
        const colorTab = ['#ffec00', '#1bff00', '#002eff', '#c100ff', '#ff0000']
        return colorTab[Math.floor(Math.random() * colorTab.length)];
      }
      star.style.backgroundColor = randomBrightColor()
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, starSpeed);
    }

    // Créer une étoile toutes les secondes
    const interval = setInterval(createStar, starCreation);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  function BareDuTop() {
    return (
      <header style={{ width: '100%', zIndex: '10' }} className="App-header">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <h1>Jude</h1>
          <img style={{ height: '200px' }} alt='logo avec deux oie' src={goise} />
          <h1>Marzat</h1>
          {/* Contenu de votre CV */}
        </section>
      </header>
    )
  }

  function Langage() {
    const CircleImageGallery = ({ images }) => {

      const angleStep = (2 * Math.PI) / images.length;

      return (
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <div
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '2px solid black',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {images.map((image, index) => {
              // Calcule les coordonnées polaires pour placer les images autour du cercle
              const angle = index * angleStep;
              const radius = 480; // Rayon du cercle
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const imageSize = 200
              const rotation = (angle + Math.PI / 2) * (180 / Math.PI);
              return (
                <img
                  key={index}
                  src={image}
                  alt={`${image}`}
                  style={{
                    position: 'absolute',
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    top: `calc(50% - ${imageSize / 2}px + ${y}px)`,
                    left: `calc(50% - ${imageSize / 2}px + ${x}px)`,
                    borderRadius: '50%',
                    transform: `rotate(${rotation}deg)`,
                  }}
                />
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <section className='langage'>
        <div className='rotating-div' >
          <CircleImageGallery images={["/logo512.png", "/ico/python.png", "/ico/linux.png", "/ico/c.png", "/ico/cpp.png", "/ico/css.svg", "/ico/docker.png", "/ico/github.png", "/ico/html.png", "/ico/java scrypt.png"]} />
        </div>
      </section>
    )
  }

  function MonEquip() {
    return (
      <section className='mon-equip'>
        <h2>Mon equipe</h2>
        <div className='card-equip'>
          <p style={{ position: 'absolute' }}>Jude Marzat</p>
          <div className='cadre-image'>
            <img alt='jude marzat' src='20240208_135652-removebg-preview.png' style={{ width: '100%' }} />
          </div>
          <div style={{ marginInline: '10px', justifyContent: 'flex-start', width: '250px' }}>
            <p>Et oui, c'est moi...</p>
            <p>Regard de braise, je reste inébranlable, mais branle-moi quand même.</p>
          </div>
          <div style={{ width: '90%' }}>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/jude-marzat-6a16bb208">
              <img style={{ width: '40px' }} alt='inkdin' src='inkDin.png' />
            </a>
          </div>
        </div>
      </section>
    )
  }

  function CommentJenSuisArriverLa() {

    return (
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>comment j'en suis arrivé là?</h2>
        <p style={{ color: '#11dbfc' }}>Il n'y a pas si longtemps sur une planète pas plus proche que la nôtre...</p>
        <Crawl title="Episode IV" subTitle="Un nouvel espoir" text>
            <p>C'est une époque de confinement. À bord d'une maison terrienne opérant à partir de la wifi, Jude a remporté le droit d'étudier à Epitech, sa première victoire sur le... Il n'y a pas de méchant... désolé.</p>
            <p>À peine le temps de respirer que c'est déjà la rentrée. La fameuse piscine d'Epitech est déjà lancée, Jude n'a plus qu'à apprendre les différents langages secrets de l'Empire de la programmation : le langage bas niveau C. Un appartement terrien doté d'une wifi assez puissante pour push sur GitHub et ses amis l'aidera dans sa quête.</p>
            <p>Poursuivi par sa volonté de réussir, il parviendra à vaincre différents projets d'Epitech comme le Dantes Star où il faut créer et résoudre des labyrinthes, projet très sympathique que j'ai refait plus bas sur la game julio... OU BIEN D'AUTRES! encore plus machiavéliques comme un Bomberman en multijoueur. Celui-là aussi c'était sympathique, en plus je l'ai fait en multijoueur en ligne pour flex, ha ha le bon temps. EN PARLANT DE TEMPS, nous sommes bientôt en fin de tech 4, est-ce que Jude trouvera un stage à temps ?</p>
        </Crawl>
      </section>
    )
  }

  return (
    <div style={{ zIndex: '0' }} className="App">
      <BareDuTop />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <h2>Mes compé</h2>
          <h2>tences</h2>
        </div>
      </div>
      <Langage />
      <MonEquip />
      <CommentJenSuisArriverLa />
      <footer>
        <p>merci d'avoie regarder mon sit cv c'est la version 1.00 du sit il est loing d'étre terminer</p>
        <p>merci a rdubrock pour react-star-wars-crawl tout simple mais super bien https://github.com/rdubrock/react-star-wars-crawl/tree/master</p>
      </footer>
    </div>
  );
}

export default App;