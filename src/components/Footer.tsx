import { Instagram, Linkedin, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import aiLawyersLogo from "@/assets/ai-lawyers-logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/15 to-primary-glow/10">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-accent/20 blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary-glow/15 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      
      <div className="container relative mx-auto px-4 py-16">
        <div className="flex flex-col items-center gap-12">
          {/* AI Lawyers Logo Section with Enhanced Animation */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {/* Multiple glow layers */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-primary via-accent to-primary-glow opacity-40 blur-2xl" />
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-accent via-primary-glow to-primary opacity-30 blur-xl" style={{ animationDelay: '0.5s' }} />
              
              {/* Rotating ring */}
              <div className="absolute inset-0 -m-4 animate-spin rounded-full border-2 border-dashed border-primary/30" style={{ animationDuration: '8s' }} />
              
              <img 
                src={aiLawyersLogo} 
                alt="AI Lawyers Logo" 
                className="relative h-20 w-20 animate-float drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]"
              />
              
              {/* Corner sparkles */}
              <Sparkles className="absolute -right-2 -top-2 h-6 w-6 animate-pulse text-accent" />
              <Sparkles className="absolute -bottom-2 -left-2 h-5 w-5 animate-pulse text-primary-glow" style={{ animationDelay: '0.7s' }} />
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <h2 className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                AI Lawyers
              </h2>
              <p className="text-sm font-medium text-muted-foreground">Your Trusted Legal AI Assistant</p>
            </div>
          </div>

          {/* Divider with gradient */}
          <div className="relative h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-primary/50 to-transparent">
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
          </div>

          {/* Contact Information - Bottom Layout with Cards */}
          <div className="w-full max-w-4xl">
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-xl font-bold text-foreground">Get In Touch</h3>
              <p className="text-sm text-muted-foreground">Connect with us through any of these channels</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/917013550760"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-gradient-to-br from-primary to-primary-glow p-4 shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-transform group-hover:rotate-12">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                    <p className="font-bold text-foreground">+91 7013550760</p>
                  </div>
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/sharabumanojkumar/?hl=fi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-gradient-to-br from-accent to-accent-glow p-4 shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-transform group-hover:rotate-12">
                    <Instagram className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Instagram</p>
                    <p className="font-bold text-foreground">@sharabumanojkumar</p>
                  </div>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/sharabu-manoj-kumar/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-primary-glow/30 bg-gradient-to-br from-primary-glow/20 via-primary-glow/10 to-transparent p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary-glow/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] sm:col-span-2 lg:col-span-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-gradient-to-br from-primary-glow to-accent-glow p-4 shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-transform group-hover:rotate-12">
                    <Linkedin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                    <p className="font-bold text-foreground">Sharabu Manoj Kumar</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Section with Copyright */}
          <div className="flex w-full flex-col items-center gap-4 border-t border-primary/20 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>India</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-primary/40" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary-glow" />
                <span>Powered by Advanced AI</span>
              </div>
            </div>
            
            <p className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-sm font-semibold text-transparent">
              © {new Date().getFullYear()} AI Lawyers. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
