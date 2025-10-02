import Head from 'next/head';
import { useEffect } from 'react';
import customers from '../data/customers.json';

export default function CustomerPage({ customer }) {
  useEffect(() => {
    // Load external scripts
    const scripts = [
      '/js/jquery.min.js',
      '/js/bootstrap.min.js',
      '/js/typed.min.js',
      '/js/isotope.pkgd.min.js',
      '/js/wow.min.js',
      '/js/jquery.fittext.js',
      '/js/jquery.magnific-popup.min.js',
      '/js/particles.min.js',
      '/js/main.js'
    ];

    const loadedScripts = [];

    scripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
      loadedScripts.push(script);
    });

    // Initialize particles after scripts load
    const initParticles = () => {
      if (window.particlesJS) {
        window.particlesJS.load('particles-js', '/js/particles.json', function() {
          console.log('callback - particles.js config loaded');
        });
      }
    };

    // Wait for particles.js to load
    setTimeout(initParticles, 1000);

    return () => {
      // Cleanup scripts
      loadedScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <>
      <Head>
        <title>{`Personal Website - ${customer.name}`}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personal Website" />
        <meta name="keywords" content="personal website" />
        <meta name="author" content="PrintScribe" />
        

      </Head>

      <div>
        

        {/* Navbar Start */}
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="#"><img src="/images/logo/logo3.png" alt="logo" /></a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="#banner">Home<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#portfolio">Gallery</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Navbar End */}
          
        {/* Banner Section Start */}
        <section id="banner" className="banner-particles wave-primary" style={{backgroundImage: `url('${customer.background}')`}}>
          <div id="particles-js"></div>

          <div className="banner-text">
            <h1 className="montserrat">{customer.name}</h1>
            <div id="typed-strings">
              <p>A personalized gift</p>
              <p>crafted.</p>
              <p>just for you.</p>
            </div>
            <span id="typed"></span>
          </div>
          <svg className="wave" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1400 100" preserveAspectRatio="none">
            <path d="M0,100c0,0,419-178,693-49.5S1400,0,1400,0v100H0z"/>
          </svg>
        </section>
        {/* Banner Section End */}

        {/* About Section Start */}
        <section id="about" className="wave-secondary">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 about-intro text-center wow fadeInUp" data-wow-delay="0.2s">
                <h2 className="text-uppercase marbtm-40">Message</h2>
                <p dangerouslySetInnerHTML={{ __html: customer.message }}></p>
              </div>
            </div>
          </div>
          <svg className="wave" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1400 100" preserveAspectRatio="none">
            <path d="M0,100c0,0,419-178,693-49.5S1400,0,1400,0v100H0z"/>
          </svg>
        </section>
        {/* About Section End */}

        {/* Portfolio Section Start */}
        <section id="portfolio" className="wave-primary">
          <div className="container">
            <div className="portfolio-header padbtm-60">
              <h2 className="text-uppercase">Gallery</h2>
              <div className="portfolio-filter">
                <ul></ul>
              </div>
            </div>
            <div className="row portfolio-items">
              {customer.gallery.map((image, index) => (
                <div key={index} className="col-lg-4 col-md-6 single-item application wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.2)}s`}>
                  <a className="popup" href={image}>
                    <img src={image} alt="" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <svg className="wave" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1400 100" preserveAspectRatio="none">
            <path d="M0,100c0,0,419-178,693-49.5S1400,0,1400,0v100H0z"/>
          </svg>
        </section>
        {/* Portfolio Section End */}

        {/* Follow Us Section Start */}
        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12 address-box wow fadeInUp" data-wow-delay="0.3s">
                <h2 className="text-left">Follow & Message Us</h2>
                <p>Looking for an event website? Any occasion? Message and follow us!</p>
                <div className="social-links" style={{marginTop: '20px', fontSize: '18px'}}>
                  <p>
                    <a href="https://www.tiktok.com/@printscribe" target="_blank" style={{textDecoration:'none', color:'#000'}}>
                      <i className="fab fa-tiktok" style={{fontSize:'28px', marginRight:'8px'}}></i> @printScribe
                    </a>
                  </p>
                  <p>
                    <a href="https://www.facebook.com/printscribeph" target="_blank" style={{textDecoration:'none', color:'#000'}}>
                      <i className="fab fa-facebook-f" style={{fontSize:'28px', marginRight:'8px'}}></i> PrintScribeph
                    </a>
                  </p>
                  <p>
                    <a href="https://www.instagram.com/printscribeph" target="_blank" style={{textDecoration:'none', color:'#000'}}>
                      <i className="fab fa-instagram" style={{fontSize:'28px', marginRight:'8px'}}></i> @PrintScribeph
                    </a>
                  </p>
                  <p>
                    <a href="http://www.m.me/397530840115237" target="_blank" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', color:'#000'}}>
                      <i className="fab fa-facebook-messenger" style={{fontSize:'28px'}}></i> Message us on Messenger
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Follow Us Section End */}

        {/* Footer Section Start */}
        <footer className="wave-footer">
          <div className="container">
            <div className="col-md-12 text-center">
              <ul className="social-icons" style={{listStyle:'none', padding:'0', display:'flex', justifyContent:'center', gap:'20px'}}>
                <li><a href="https://www.tiktok.com/@printscribe" target="_blank" style={{textDecoration:'none', color:'#ffffff'}}>
                  <i className="fab fa-tiktok" style={{fontSize:'28px', marginRight:'8px'}}></i> 
                </a></li>
                <li><a href="https://www.facebook.com/printscribeph" target="_blank" style={{textDecoration:'none', color:'#ffffff'}}>
                  <i className="fab fa-facebook-f" style={{fontSize:'28px', marginRight:'8px'}}></i> 
                </a></li>
                <li><a href="https://www.instagram.com/printscribeph" target="_blank" style={{textDecoration:'none', color:'#ffffff'}}>
                  <i className="fab fa-instagram" style={{fontSize:'28px', marginRight:'8px'}}></i> 
                </a></li>
                <li><a href="http://www.m.me/397530840115237" target="_blank" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', color:'#ffffff'}}>
                  <i className="fab fa-facebook-messenger" style={{fontSize:'28px'}}></i>
                </a></li>
              </ul>
              <p style={{marginTop:'15px'}}>
                Copyright &copy; 2025 PrintScribe, All Right Reserved.<br />
                Created By PrintScribe.
              </p>
            </div>
          </div>
          <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 100" preserveAspectRatio="none">
            <path d="M0,100c0,0,419-178,693-49.5S1400,0,1400,0v100H0z"/>
          </svg>
        </footer>
        {/* Footer Section End */}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = customers.map((customer) => ({
    params: { customer: customer.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const customer = customers.find((c) => c.slug === params.customer);

  if (!customer) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      customer,
    },
  };
}
