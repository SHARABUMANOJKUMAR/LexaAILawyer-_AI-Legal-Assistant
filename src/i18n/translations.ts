export const translations = {
  en: {
    hero: {
      title: "LexaAI Legal &",
      subtitle: "Compliance Assistant",
      description: "Get instant legal insights, compliance guidance, and document analysis powered by advanced AI technology.",
      getStarted: "Get Started",
      learnMore: "Learn More"
    },
    chat: {
      placeholder: "Ask me anything about legal matters, compliance, or upload a document...",
      howCanIHelp: "How can I assist you today?",
      description: "Ask me about legal concepts, compliance requirements, document analysis, or general legal guidance. Upload a document for AI-powered analysis!",
      uploadDocument: "Upload document (PDF, DOC, DOCX, TXT)"
    },
    templates: {
      title: "Legal Templates",
      subtitle: "Professional legal document templates ready to customize",
      download: "Download",
      customize: "Customize",
      needCustom: "Need a Custom Template?",
      startConsultation: "Start AI Consultation"
    },
    reports: {
      title: "Document Reports",
      subtitle: "View and manage your generated legal reports",
      noReports: "No Reports Yet",
      startAnalysis: "Start Analysis",
      downloadPDF: "Download PDF",
      email: "Email"
    },
    footer: {
      poweredBy: "Powered by Advanced AI",
      rights: "All rights reserved",
      location: "Hyderabad, India"
    }
  },
  es: {
    hero: {
      title: "LexaAI Legal &",
      subtitle: "Asistente de Cumplimiento",
      description: "Obtenga información legal instantánea, orientación de cumplimiento y análisis de documentos impulsados por tecnología de IA avanzada.",
      getStarted: "Comenzar",
      learnMore: "Saber Más"
    },
    chat: {
      placeholder: "Pregúntame sobre asuntos legales, cumplimiento o sube un documento...",
      howCanIHelp: "¿Cómo puedo ayudarte hoy?",
      description: "Pregúntame sobre conceptos legales, requisitos de cumplimiento, análisis de documentos u orientación legal general. ¡Sube un documento para análisis con IA!",
      uploadDocument: "Subir documento (PDF, DOC, DOCX, TXT)"
    },
    templates: {
      title: "Plantillas Legales",
      subtitle: "Plantillas de documentos legales profesionales listas para personalizar",
      download: "Descargar",
      customize: "Personalizar",
      needCustom: "¿Necesitas una Plantilla Personalizada?",
      startConsultation: "Iniciar Consulta con IA"
    },
    reports: {
      title: "Informes de Documentos",
      subtitle: "Ver y gestionar tus informes legales generados",
      noReports: "Aún No Hay Informes",
      startAnalysis: "Iniciar Análisis",
      downloadPDF: "Descargar PDF",
      email: "Correo"
    },
    footer: {
      poweredBy: "Impulsado por IA Avanzada",
      rights: "Todos los derechos reservados",
      location: "Hyderabad, India"
    }
  },
  fr: {
    hero: {
      title: "LexaAI Legal &",
      subtitle: "Assistant de Conformité",
      description: "Obtenez des informations juridiques instantanées, des conseils de conformité et une analyse de documents alimentés par une technologie d'IA avancée.",
      getStarted: "Commencer",
      learnMore: "En Savoir Plus"
    },
    chat: {
      placeholder: "Posez-moi des questions sur des questions juridiques, de conformité ou téléchargez un document...",
      howCanIHelp: "Comment puis-je vous aider aujourd'hui?",
      description: "Posez-moi des questions sur les concepts juridiques, les exigences de conformité, l'analyse de documents ou les conseils juridiques généraux. Téléchargez un document pour une analyse par IA!",
      uploadDocument: "Télécharger un document (PDF, DOC, DOCX, TXT)"
    },
    templates: {
      title: "Modèles Juridiques",
      subtitle: "Modèles de documents juridiques professionnels prêts à personnaliser",
      download: "Télécharger",
      customize: "Personnaliser",
      needCustom: "Besoin d'un Modèle Personnalisé?",
      startConsultation: "Démarrer la Consultation IA"
    },
    reports: {
      title: "Rapports de Documents",
      subtitle: "Voir et gérer vos rapports juridiques générés",
      noReports: "Pas Encore de Rapports",
      startAnalysis: "Démarrer l'Analyse",
      downloadPDF: "Télécharger PDF",
      email: "Email"
    },
    footer: {
      poweredBy: "Propulsé par IA Avancée",
      rights: "Tous droits réservés",
      location: "Hyderabad, Inde"
    }
  },
  de: {
    hero: {
      title: "LexaAI Legal &",
      subtitle: "Compliance-Assistent",
      description: "Erhalten Sie sofortige rechtliche Einblicke, Compliance-Beratung und Dokumentenanalyse durch fortschrittliche KI-Technologie.",
      getStarted: "Loslegen",
      learnMore: "Mehr Erfahren"
    },
    chat: {
      placeholder: "Fragen Sie mich zu rechtlichen Angelegenheiten, Compliance oder laden Sie ein Dokument hoch...",
      howCanIHelp: "Wie kann ich Ihnen heute helfen?",
      description: "Fragen Sie mich zu rechtlichen Konzepten, Compliance-Anforderungen, Dokumentenanalyse oder allgemeiner Rechtsberatung. Laden Sie ein Dokument für KI-gestützte Analyse hoch!",
      uploadDocument: "Dokument hochladen (PDF, DOC, DOCX, TXT)"
    },
    templates: {
      title: "Rechtsvorlagen",
      subtitle: "Professionelle Rechtsdokumentvorlagen bereit zur Anpassung",
      download: "Herunterladen",
      customize: "Anpassen",
      needCustom: "Benötigen Sie eine Benutzerdefinierte Vorlage?",
      startConsultation: "KI-Beratung Starten"
    },
    reports: {
      title: "Dokumentberichte",
      subtitle: "Ihre generierten Rechtsberichte ansehen und verwalten",
      noReports: "Noch Keine Berichte",
      startAnalysis: "Analyse Starten",
      downloadPDF: "PDF Herunterladen",
      email: "E-Mail"
    },
    footer: {
      poweredBy: "Betrieben durch Fortgeschrittene KI",
      rights: "Alle Rechte vorbehalten",
      location: "Hyderabad, Indien"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
