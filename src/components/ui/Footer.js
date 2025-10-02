export default function Footer() {
  return (
    <footer className="wave-footer">
      <div className="container">
        <div className="col-md-12 text-center">
          <ul className="social-icons" style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center", gap: 20 }}>
            <li>
              <a href="https://www.tiktok.com/@printscribe" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
                <i className="fab fa-tiktok" style={{ fontSize: 28, marginRight: 8 }}></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/printscribeph" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
                <i className="fab fa-facebook-f" style={{ fontSize: 28, marginRight: 8 }}></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/printscribeph" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
                <i className="fab fa-instagram" style={{ fontSize: 28, marginRight: 8 }}></i>
              </a>
            </li>
            <li>
              <a href="http://www.m.me/397530840115237" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#fff" }}>
                <i className="fab fa-facebook-messenger" style={{ fontSize: 28 }}></i>
              </a>
            </li>
          </ul>
          <p style={{ marginTop: 15 }}>
            Copyright &copy; 2025 PrintScribe, All Right Reserved.<br />
            Created By PrintScribe.
          </p>
        </div>
      </div>

      {/* Creative Background Wave */}
      <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 100" preserveAspectRatio="none">
        <path d="M0,100c0,0,419-178,693-49.5S1400,0,1400,0v100H0z" />
      </svg>
    </footer>
  );
}
