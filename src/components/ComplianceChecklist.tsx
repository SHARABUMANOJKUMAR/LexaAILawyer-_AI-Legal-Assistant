import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

interface ComplianceChecklistProps {
  items: ComplianceItem[];
  title: string;
  onGeneratePDF: () => void;
}

const ComplianceChecklist = ({ items, title, onGeneratePDF }: ComplianceChecklistProps) => {
  const [checklistItems, setChecklistItems] = useState<ComplianceItem[]>(items);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleCheckChange = (id: string) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );

    // Send to webhook
    fetch("https://manoj9990.app.n8n.cloud/webhook-test/7fa30d59-edcb-4902-8ef1-9b6e2b1ba8cb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "checklist_update",
        checklist_title: title,
        item_id: id,
        timestamp: new Date().toISOString()
      })
    }).catch(err => console.error("Webhook error:", err));
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text(title, 20, 20);
      
      doc.setFontSize(12);
      let yPosition = 40;
      
      checklistItems.forEach((item, index) => {
        const checkbox = item.checked ? '[X]' : '[ ]';
        const text = `${checkbox} ${item.title}`;
        doc.text(text, 20, yPosition);
        
        if (item.description) {
          doc.setFontSize(10);
          const splitDesc = doc.splitTextToSize(item.description, 170);
          yPosition += 7;
          doc.text(splitDesc, 30, yPosition);
          yPosition += (splitDesc.length * 5);
        }
        
        doc.setFontSize(12);
        yPosition += 10;
        
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      });
      
      doc.save(`${title}.pdf`);
      
      toast({
        title: "PDF Generated",
        description: "Your compliance checklist has been downloaded.",
      });

      // Send to webhook
      fetch("https://manoj9990.app.n8n.cloud/webhook-test/7fa30d59-edcb-4902-8ef1-9b6e2b1ba8cb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "checklist_pdf_download",
          checklist_title: title,
          items: checklistItems,
          completed_count: checklistItems.filter(i => i.checked).length,
          total_count: checklistItems.length,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error("Webhook error:", err));
      
      onGeneratePDF();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const completedCount = checklistItems.filter(item => item.checked).length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {completedCount} of {checklistItems.length} items completed ({progress}%)
            </CardDescription>
          </div>
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            size="sm"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={() => handleCheckChange(item.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {item.title}
                </label>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceChecklist;
