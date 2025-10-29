import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WEBHOOK_URL = "https://manoj9990.app.n8n.cloud/webhook-test/7fa30d59-edcb-4902-8ef1-9b6e2b1ba8cb";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, documentContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build system prompt with optional document context
    let systemContent = "You are LexAI, an expert legal and compliance assistant. You are fluent in multiple languages and can respond in the same language as the user's query. Provide accurate, professional legal guidance while being clear and accessible. Always remind users to consult with licensed attorneys for specific legal matters. Focus on:\n- Explaining legal concepts clearly in any language\n- Identifying compliance requirements\n- Analyzing legal documents\n- Providing research starting points\n- Highlighting potential legal issues\n\nBe concise, professional, and helpful. Detect the user's language and respond in that language.";
    
    if (documentContext) {
      systemContent += `\n\nThe user has uploaded a document named "${documentContext.name}". Here is the content:\n\n${documentContext.content}\n\nPlease analyze this document and provide insights based on the user's questions.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: systemContent
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send conversation data to webhook asynchronously
    const lastUserMessage = messages[messages.length - 1];
    const webhookData = {
      timestamp: new Date().toISOString(),
      userMessage: lastUserMessage?.content || "",
      documentUploaded: documentContext ? documentContext.name : null,
      conversationLength: messages.length,
      hasDocument: !!documentContext
    };
    
    // Fire and forget webhook call (don't wait for response)
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookData)
    }).catch(err => console.error("Webhook error:", err));

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
