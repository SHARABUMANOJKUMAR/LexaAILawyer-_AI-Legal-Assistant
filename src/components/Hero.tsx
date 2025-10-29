import { Scale, Shield, FileText, MessageSquare, Upload, CheckSquare, Library, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-95" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <Shield className="h-4 w-4" />
            <span>Powered by Advanced AI</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
            Your AI Legal &
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
              Compliance Assistant
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="mb-12 text-xl text-white/90 md:text-2xl">
            Navigate complex legal matters with confidence. Get instant guidance, 
            document analysis, and compliance insights powered by cutting-edge AI.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="group h-14 bg-white px-8 text-lg font-semibold text-primary shadow-strong transition-all hover:scale-105 hover:shadow-[0_20px_60px_-12px_rgba(251,191,36,0.4)]"
            >
              Start Consultation
              <Scale className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            </Button>
            
            <Button
              onClick={() => navigate('/templates')}
              variant="outline"
              size="lg"
              className="h-14 border-2 border-white/30 bg-white/10 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View Templates
              <Library className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Features */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: MessageSquare, title: "AI Legal Q&A", desc: "Get instant answers to legal questions on contracts, HR laws, privacy & more" },
              { icon: Upload, title: "Document Analysis", desc: "Upload contracts for auto legal summary & risk detection" },
              { icon: CheckSquare, title: "Compliance Checklists", desc: "Generate personalized compliance requirements for your business" },
              { icon: Library, title: "Legal Templates", desc: "Access NDAs, policies, agreements & more ready-to-use templates" },
              { icon: Bell, title: "Regulation Alerts", desc: "Stay updated with the latest legal & compliance changes" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-strong"
              >
                <feature.icon className="mx-auto mb-4 h-12 w-12 text-accent transition-transform group-hover:scale-110" />
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
