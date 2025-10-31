import { ArrowLeft, Download, FileText, Calendar, Tag, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  summary: string;
  content: string;
}

const Reports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Load reports from localStorage
    const stored = localStorage.getItem('lexai_reports');
    if (stored) {
      setReports(JSON.parse(stored));
    }
  }, []);

  const handleDownloadPDF = async (report: Report) => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text(report.title, 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Type: ${report.type}`, 20, 35);
      doc.text(`Date: ${report.date}`, 20, 45);
      
      doc.setFontSize(10);
      const splitContent = doc.splitTextToSize(report.content, 170);
      doc.text(splitContent, 20, 60);
      
      doc.save(`${report.title}.pdf`);
      
      toast({
        title: "PDF Downloaded",
        description: `${report.title} has been downloaded.`,
      });

      // Send to webhook
      fetch("https://manoj9990.app.n8n.cloud/webhook-test/7fa30d59-edcb-4902-8ef1-9b6e2b1ba8cb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "pdf_download",
          report: report,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error("Webhook error:", err));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  const handleEmailReport = (report: Report) => {
    toast({
      title: "Email Sent",
      description: `${report.title} has been sent to your email.`,
    });

    // Send to webhook
    fetch("https://manoj9990.app.n8n.cloud/webhook-test/7fa30d59-edcb-4902-8ef1-9b6e2b1ba8cb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "email_report",
        report: report,
        timestamp: new Date().toISOString()
      })
    }).catch(err => console.error("Webhook error:", err));
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
                {t.reports.title}
              </h2>
              <p className="text-sm text-muted-foreground">{t.reports.subtitle}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Content */}
      <div className="container relative mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <TrendingUp className="h-4 w-4" />
            <span>Analytics & Insights</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            {t.reports.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View and manage all your legal document analyses
          </p>
        </div>

        {reports.length === 0 ? (
          <Card className="relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardContent className="relative flex flex-col items-center justify-center py-16">
              <div className="mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-6">
                <FileText className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t.reports.noReports}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Start analyzing documents to generate comprehensive legal reports with AI-powered insights
              </p>
              <Button 
                onClick={() => navigate('/')}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-strong transition-all hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {t.reports.startAnalysis}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardHeader className="relative">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Report History
              </CardTitle>
              <CardDescription>All your document analyses and compliance reports</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="rounded-lg border border-primary/10 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/5 hover:bg-primary/10">
                      <TableHead className="font-semibold">Title</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Summary</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report, index) => (
                      <TableRow 
                        key={report.id}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
                          >
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{report.date}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                          {report.summary}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadPDF(report)}
                              className="border-primary/20 hover:bg-primary/10 hover:border-primary/30"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              {t.reports.downloadPDF}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEmailReport(report)}
                              className="border-primary/20 hover:bg-primary/10 hover:border-primary/30"
                            >
                              {t.reports.email}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;
