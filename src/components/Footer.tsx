import { Instagram, Linkedin, Phone } from "lucide-react";
import aiLawyersLogo from "@/assets/ai-lawyers-logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary-glow/5">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      
      <div className="container relative mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* AI Lawyers Logo with Animation */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
              <img 
                src={aiLawyersLogo} 
                alt="AI Lawyers Logo" 
                className="relative h-16 w-16 animate-float drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]"
              />
            </div>
            <span className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-2xl font-bold text-transparent">
              AI Lawyers
            </span>
          </div>

          {/* Contact Information - Vertical Layout */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect With Us
            </h3>
            
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/917013550760"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-3 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              >
                <Phone className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
                <span className="font-medium text-foreground">WhatsApp: +91 7013550760</span>
              </a>
              
              <a
                href="https://www.instagram.com/sharabumanojkumar/?hl=fi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-accent/20 bg-gradient-to-r from-accent/10 to-primary-glow/10 px-6 py-3 backdrop-blur-sm transition-all hover:scale-105 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              >
                <Instagram className="h-5 w-5 text-accent transition-transform group-hover:rotate-12" />
                <span className="font-medium text-foreground">Instagram</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/sharabu-manoj-kumar/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-primary-glow/20 bg-gradient-to-r from-primary-glow/10 to-primary/10 px-6 py-3 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary-glow/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              >
                <Linkedin className="h-5 w-5 text-primary-glow transition-transform group-hover:rotate-12" />
                <span className="font-medium text-foreground">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 flex flex-col items-center gap-2 border-t border-primary/10 pt-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Lawyers. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Powered by Advanced AI Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
