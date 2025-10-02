export default function FollowUs() {
  return (
    <section id="contact">
      <div className="container">
        <div className="row">
          {/* Follow Us & Note */}
          <div className="col-md-6 col-sm-12 address-box wow fadeInUp" data-wow-delay="0.3s">
            <h2 className="text-left">Follow & Message Us</h2>
            <p>Looking for an event website? Any occasion? Message and follow us!</p>
            <div className="social-links" style={{ marginTop: 20, fontSize: 18 }}>
              <p>
                <a href="https://www.tiktok.com/@printscribe" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                  <i className="fab fa-tiktok" style={{ fontSize: 28, marginRight: 8 }}></i> @printScribe
                </a>
              </p>
              <p>
                <a href="https://www.facebook.com/printscribeph" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                  <i className="fab fa-facebook-f" style={{ fontSize: 28, marginRight: 8 }}></i> PrintScribeph
                </a>
              </p>
              <p>
                <a href="https://www.instagram.com/printscribeph" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#000" }}>
                  <i className="fab fa-instagram" style={{ fontSize: 28, marginRight: 8 }}></i> @PrintScribeph
                </a>
              </p>
              <p>
                <a href="http://www.m.me/397530840115237" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#000" }}>
                  <i className="fab fa-facebook-messenger" style={{ fontSize: 28 }}></i> Message us on Messenger
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
