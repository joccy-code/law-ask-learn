import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8" />
              <span className="text-xl font-bold">LawQA</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              The premier Q&A platform for law students. Ask questions, share knowledge, and build your legal expertise.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/topics" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Topics</Link></li>
              <li><Link to="/ask" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Ask Question</Link></li>
              <li><Link to="/profile" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">My Profile</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/guidelines" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Community Guidelines</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>support@lawqa.com</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>Legal District, Law City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2024 LawQA. All rights reserved. Empowering the next generation of legal minds.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;