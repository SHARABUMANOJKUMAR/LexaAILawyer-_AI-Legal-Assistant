import { ArrowLeft, Download, FileText, Shield, Users, Building, Lock, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const templates = [
  {
    id: 1,
    title: "Non-Disclosure Agreement (NDA)",
    icon: Lock,
    description: "Protect confidential information shared between parties",
    category: "Contracts",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    id: 2,
    title: "Privacy Policy",
    icon: Shield,
    description: "Comprehensive privacy policy for websites and apps",
    category: "Compliance",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  },
  {
    id: 3,
    title: "Employment Agreement",
    icon: Users,
    description: "Standard employment contract template",
    category: "HR",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500"
  },
  {
    id: 4,
    title: "Terms of Service",
    icon: FileText,
    description: "Legal terms and conditions for your service",
    category: "Compliance",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-500"
  },
  {
    id: 5,
    title: "Service Agreement",
    icon: Briefcase,
    description: "Professional services contract template",
    category: "Contracts",
    gradient: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-500"
  },
  {
    id: 6,
    title: "Cookie Policy",
    icon: Building,
    description: "GDPR-compliant cookie usage policy",
    category: "Compliance",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500"
  }
];

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleDownload = (templateTitle: string) => {
    toast({
      title: "Template Ready",
      description: `${templateTitle} template is being prepared for download.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b bg-card/50 backdrop-blur-xl shadow-soft sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full hover:bg-primary/10 transition-all hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t.templates.title}
              </h2>
              <p className="text-sm text-muted-foreground">{t.templates.subtitle}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Content */}
      <div className="container relative mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Professional Templates</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Template Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of professionally drafted legal templates
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className="group relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:shadow-strong hover:scale-105 hover:border-primary/30"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <CardHeader className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`rounded-xl bg-gradient-to-br ${template.gradient} p-4 shadow-soft group-hover:scale-110 transition-transform`}>
                    <template.icon className={`h-7 w-7 ${template.iconColor}`} />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                    {template.category}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {template.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(template.title)}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-strong"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t.templates.download}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/10"
                    onClick={() => {
                      toast({
                        title: "Opening in Chat",
                        description: "Template loaded for customization",
                      });
                      navigate('/');
                    }}
                  >
                    {t.templates.customize}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-8 text-center backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]" />
          <div className="relative">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-3 text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.templates.needCustom}
            </h3>
            <p className="mb-6 text-muted-foreground max-w-xl mx-auto">
              Can't find what you're looking for? Our AI can help draft custom legal documents tailored to your needs.
            </p>
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-strong transition-all hover:scale-105"
            >
              {t.templates.startConsultation}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
