import { ArrowLeft, Download, FileText, Calendar, Tag } from "lucide-react";
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
            <h2 className="text-lg font-semibold text-foreground">Reports & History</h2>
            <p className="text-sm text-muted-foreground">Your document analyses and compliance reports</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Document Reports</h1>
          <p className="text-muted-foreground">
            View and manage all your legal document analyses
          </p>
        </div>

        {reports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start analyzing documents to generate reports
              </p>
              <Button onClick={() => navigate('/')}>Start Analysis</Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>All your document analyses and compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {report.date}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{report.summary}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPDF(report)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEmailReport(report)}
                          >
                            Email
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;
