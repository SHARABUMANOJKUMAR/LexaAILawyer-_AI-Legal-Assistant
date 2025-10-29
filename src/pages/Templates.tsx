import { ArrowLeft, Download, FileText, Shield, Users, Building, Lock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const templates = [
  {
    id: 1,
    title: "Non-Disclosure Agreement (NDA)",
    icon: Lock,
    description: "Protect confidential information shared between parties",
    category: "Contracts",
    color: "text-blue-500"
  },
  {
    id: 2,
    title: "Privacy Policy",
    icon: Shield,
    description: "Comprehensive privacy policy for websites and apps",
    category: "Compliance",
    color: "text-purple-500"
  },
  {
    id: 3,
    title: "Employment Agreement",
    icon: Users,
    description: "Standard employment contract template",
    category: "HR",
    color: "text-green-500"
  },
  {
    id: 4,
    title: "Terms of Service",
    icon: FileText,
    description: "Legal terms and conditions for your service",
    category: "Compliance",
    color: "text-orange-500"
  },
  {
    id: 5,
    title: "Service Agreement",
    icon: Briefcase,
    description: "Professional services contract template",
    category: "Contracts",
    color: "text-indigo-500"
  },
  {
    id: 6,
    title: "Cookie Policy",
    icon: Building,
    description: "GDPR-compliant cookie usage policy",
    category: "Compliance",
    color: "text-pink-500"
  }
];

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownload = (templateTitle: string) => {
    toast({
      title: "Template Ready",
      description: `${templateTitle} template is being prepared for download.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Legal Templates</h2>
            <p className="text-sm text-muted-foreground">Ready-to-use legal documents</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Template Library</h1>
          <p className="text-muted-foreground">
            Choose from our collection of professionally drafted legal templates
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`rounded-lg bg-muted p-3 ${template.color}`}>
                    <template.icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {template.category}
                  </span>
                </div>
                <CardTitle className="text-xl">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(template.title)}
                    className="flex-1"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Opening in Chat",
                        description: "Template loaded for customization",
                      });
                      navigate('/');
                    }}
                  >
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border bg-muted/50 p-6 text-center">
          <h3 className="mb-2 text-lg font-semibold">Need a Custom Template?</h3>
          <p className="mb-4 text-muted-foreground">
            Can't find what you're looking for? Our AI can help draft custom legal documents.
          </p>
          <Button onClick={() => navigate('/')}>
            Start AI Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
