import { Instagram, Linkedin, Phone } from "lucide-react";
import aiLawyersLogo from "@/assets/ai-lawyers-logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* AI Lawyers Logo with Animation */}
          <div className="flex items-center gap-3">
            <img 
              src={aiLawyersLogo} 
              alt="AI Lawyers Logo" 
              className="h-12 w-12 animate-float"
            />
            <span className="text-lg font-semibold text-foreground">AI Lawyers</span>
          </div>

          {/* Contact Information */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a
              href="https://wa.me/917013550760"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span>+91 7013550760</span>
            </a>
            
            <a
              href="https://www.instagram.com/sharabumanojkumar/?hl=fi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/sharabu-manoj-kumar/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Lawyers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
