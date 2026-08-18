import { Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="footer__brand-name">JP Integrated Farm</span>
        <p className="footer__tagline">இயற்கையின் சுவை உங்கள் வீட்டிற்கு</p>
      </div>

      <div className="footer__divider" />

      <div className="footer__contact">
        <a href="tel:+919876543210" className="footer__contact-item">
          <Phone size={14} />
          <span>+91 98765 43210</span>
        </a>
        <div className="footer__contact-item">
          <MapPin size={14} />
          <span>நத்தம், திண்டுக்கல் மாவட்டம்</span>
        </div>
      </div>

      <p className="footer__copy">© 2025 JP Integrated Farm. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
