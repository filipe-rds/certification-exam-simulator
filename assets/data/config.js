/**
 * Configuration and Text Resources for Certification Exam Simulator
 * Supports bilingual interface (English and Portuguese)
 * 
 * THIS IS THE MAIN CONFIGURATION FILE
 * - Quiz settings (questions count, passing score, time limit) are defined here
 * - All UI texts for both languages are defined here
 * 
 * 📖 DOCUMENTATION: See docs/CONFIG-GUIDE.md for detailed instructions
 * 🤖 AI AUTOMATION: Use the prompt in docs/CONFIG-GUIDE.md to generate this automatically
 */

// ============================================================================
// 📝 CERTIFICATION-SPECIFIC SETTINGS
// ============================================================================
// This is the ONLY section you need to modify for each certification!
// See docs/CONFIG-GUIDE.md for complete instructions and AI automation prompt.

window.certificationInfo = {
    // Basic certification details
    name: {
        en: "Certification Exam Simulator",
        pt: "Simulador de Certificação"
    },
    code: "",  // e.g., "1Z0-819", "AZ-900", "AWS-SAA-C03"
    provider: "",  // e.g., "Oracle", "Microsoft", "AWS"

    // Exam specifications
    exam: {
        totalQuestions: 25,    // Number of questions in the real exam
        passingScore: 70,      // Passing score percentage (e.g., 68, 70, 75)
        timeLimit: 60,         // Time limit in MINUTES (will be converted to seconds)
        questionTypes: "Multiple choice (single and multiple answers)"
    },

    // Bilingual descriptions
    description: {
        en: "Practice with real exam questions and test your knowledge",
        pt: "Pratique com questões reais e teste seus conhecimentos"
    },

    welcome: {
        en: "Welcome to the Practice Simulator!",
        pt: "Bem-vindo ao Simulador de Prática!"
    },

    welcomeDescription: {
        en: "Practice with questions and aim for a passing score!",
        pt: "Pratique com questões e alcance a nota de aprovação!"
    },

    // Exam information highlights (displayed on home screen)
    highlights: {
        en: [
            "Multiple choice questions per session",
            "Questions are randomized for each attempt",
            "Detailed feedback and explanations provided",
            "Track your progress and improve over time"
        ],
        pt: [
            "Questões de múltipla escolha por sessão",
            "Questões randomizadas a cada tentativa",
            "Feedback detalhado e explicações fornecidas",
            "Acompanhe seu progresso e melhore ao longo do tempo"
        ]
    }
};

// ============================================================================
// ⚙️ GENERIC APP CONFIGURATION
// ============================================================================
// These settings control the simulator behavior but rarely need changes.
// Most users can leave this section as-is.

window.appConfig = {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'pt'],
    quiz: {
        totalQuestions: window.certificationInfo.exam.totalQuestions,
        passingScore: window.certificationInfo.exam.passingScore,
        timeLimit: window.certificationInfo.exam.timeLimit * 60,  // Convert minutes to seconds
        randomizeQuestions: true,
        showProgress: true
    },
    features: {
        scoreHistory: true,           // Enable score history tracking
        detailedResults: true,         // Show detailed results after quiz
        showCustomizationGuide: true   // Show "How to Customize" button (set to false to hide)
    }
};


// ============================================================================
// 🌐 GENERIC UI TEXT RESOURCES
// ============================================================================
// These are standard UI labels that rarely need customization.
// They are automatically populated with certification-specific info where needed.

window.texts = {
    en: {
        // Dynamically populated from certificationInfo
        "page-title": window.certificationInfo.name.en,
        "main-title": window.certificationInfo.name.en,
        "subtitle": window.certificationInfo.description.en,
        "welcome-title": window.certificationInfo.welcome.en,
        "welcome-description": window.certificationInfo.welcomeDescription.en,

        // Generic UI labels (no customization needed)
        "quiz-info-title": "📋 Simulator Information:",
        "quiz-info-1": window.certificationInfo.highlights.en[0],
        "quiz-info-2": window.certificationInfo.highlights.en[1],
        "quiz-info-3": window.certificationInfo.highlights.en[2],
        "quiz-info-4": window.certificationInfo.highlights.en[3],
        "start-quiz": "🚀 Start Simulator",
        "reusability-guide-btn": "📖 How to Customize",
        "score-history-btn": "📊 Score History",
        "footer-signature": "Built with AI assistance 🤖 • GitHub Copilot + Human collaboration",
        "language-selector": "🌐 Language",
        "question-label": "Question",
        "of": "of",
        "previous": "⬅️ Previous",
        "next": "Next ➡️",
        "finish": "🏁 Finish",
        "completed": "🎉 Simulator Completed!",
        "correct-label": "Correct",
        "incorrect-label": "Incorrect",
        "time-used": "Total Time",
        "status": "Status",
        "restart": "🔄 Try Again",
        "tip-title": "💡 Strategy Tip:",
        "approved": "PASSED ✅",
        "failed": "FAILED ❌",
        "view-details": "🔍 View Detailed Results",
        "detailed-results-title": "Detailed Results",
        "back-to-summary": "⬅️ Back to Summary",
        "your_answer": "Your Answer:",
        "correct_answer": "Correct Answer:",
        "explanation_label": "Explanation:",
        "tip_label": "Strategy Tip:",
        "enhanced-explanation": "✨ Get Enhanced Explanation",
        "fetching-explanation": "Fetching enhanced explanation:",
        "multi-select-instruction": "Please select the required number of options.",
        "ai-generated-tag": "(AI-generated Question)",
        "official-tag": "(Real Past Exam Question)",
        "key-concepts-label": "Key Concepts to Remember:",
        "history-title": "Last 3 Attempts",
        "history-score": "Score:",
        "history-date": "Date:",
        "history-view": "View",
        "no-attempts": "No attempts yet.",
        "attempt-label": "Attempt",
        "close-btn": "Close",
        "topic-analysis-title": "📊 Performance by Topic",
        "topic-analysis-description": "See how you performed in each topic area:",
        "need-improvement": "Needs Improvement",
        "good-performance": "Good Performance",
        "excellent": "Excellent!",
        "study-recommendations": "📚 Study Recommendations:",
        "focus-on": "Focus on improving these areas:",
        "well-done": "Well done! Keep up the good work in:",
        "cancel-btn": "❌ Cancel",
        "back-to-home": "🏠 Back to Home",
        "guide-title": "📖 Customization Guide",
        "guide-intro": "This guide shows you how to customize this simulator for your own certification exam. Follow the steps below or check the detailed documentation in the /docs/ folder.",
        "guide-documentation-title": "Complete Documentation",
        "guide-documentation-desc": "All detailed guides with AI automation prompts are available in the /docs/ folder:",
        "guide-docs-readme": "Documentation index and workflow",
        "guide-docs-config": "How to configure the certification (5-10 min)",
        "guide-docs-questions": "How to add topics and questions (30-60 min)",
        "guide-quick-start-title": "Quick Start - Only ~30 Lines to Edit!",
        "guide-quick-start-desc": "The simulator uses a modular approach - you only need to edit 2 files:",
        "guide-step1-title": "Configure Certification (assets/data/config.js)",
        "guide-step1-desc": "Edit only the window.certificationInfo object (~30 lines):",
        "guide-step1-tip": "Use the AI prompt in docs/CONFIG-GUIDE.md to generate this automatically!",
        "guide-step2-title": "Add Topics & Questions (assets/data/questions-unified.js)",
        "guide-step2-desc": "Define your topics and add bilingual questions:",
        "guide-step2-tip": "Use the 2 AI prompts in docs/QUESTIONS-GUIDE.md to generate this automatically!",
        "guide-ai-automation-title": "AI Automation (Recommended!)",
        "guide-ai-automation-desc": "Both guides include ready-to-use prompts for ChatGPT/Claude:",
        "guide-ai-prompt1": "Generate topics automatically",
        "guide-ai-prompt2": "Convert questions to bilingual format",
        "guide-ai-time": "Total time: 30-60 minutes vs 2-4 hours manually!",
        "guide-step3-title": "Test Your Simulator",
        "guide-step3-desc": "Open index.html in your browser and test both languages (EN/PT). All changes are auto-applied!",
        "guide-features-title": "Key Features:",
        "guide-feature1": "Bilingual interface (EN/PT) with instant switching",
        "guide-feature2": "Topic-based performance analysis with charts",
        "guide-feature3": "Dark/Light theme with smooth transitions",
        "guide-feature4": "100% responsive - works on all devices",
        "guide-feature5": "Score history with topic breakdown",
        "guide-feature6": "Countdown timer and progress tracking",
        "guide-feature7": "Single & multiple choice questions support",
        "guide-feature8": "Detailed explanations and strategy tips",
        "guide-help-title": "Need Help?",
        "guide-help": "Check the /docs/ folder for complete guides with AI automation prompts!"
    },
    pt: {
        // Dinamicamente populado de certificationInfo
        "page-title": window.certificationInfo.name.pt,
        "main-title": window.certificationInfo.name.pt,
        "subtitle": window.certificationInfo.description.pt,
        "welcome-title": window.certificationInfo.welcome.pt,
        "welcome-description": window.certificationInfo.welcomeDescription.pt,

        // Labels genéricos da UI (sem necessidade de customização)
        "quiz-info-title": "📋 Informações do Simulador:",
        "quiz-info-1": window.certificationInfo.highlights.pt[0],
        "quiz-info-2": window.certificationInfo.highlights.pt[1],
        "quiz-info-3": window.certificationInfo.highlights.pt[2],
        "quiz-info-4": window.certificationInfo.highlights.pt[3],
        "start-quiz": "🚀 Iniciar Simulador",
        "reusability-guide-btn": "📖 Como Personalizar",
        "score-history-btn": "📊 Histórico de Pontuação",
        "footer-signature": "Construído com assistência de IA 🤖 • Colaboração GitHub Copilot + Humano",
        "language-selector": "🌐 Idioma",
        "question-label": "Questão",
        "of": "de",
        "previous": "⬅️ Anterior",
        "next": "Próxima ➡️",
        "finish": "🏁 Finalizar",
        "completed": "🎉 Simulador Concluído!",
        "correct-label": "Corretas",
        "incorrect-label": "Incorretas",
        "time-used": "Tempo Total",
        "status": "Status",
        "restart": "🔄 Tentar Novamente",
        "tip-title": "💡 Dica Estratégica:",
        "approved": "APROVADO ✅",
        "failed": "REPROVADO ❌",
        "view-details": "🔍 Ver Resultados Detalhados",
        "detailed-results-title": "Resultados Detalhados",
        "back-to-summary": "⬅️ Voltar ao Resumo",
        "your_answer": "Sua Resposta:",
        "correct_answer": "Resposta Correta:",
        "explanation_label": "Explicação:",
        "tip_label": "Dica Estratégica:",
        "enhanced-explanation": "✨ Obter Explicação Aprimorada",
        "fetching-explanation": "Buscando explicação aprimorada:",
        "multi-select-instruction": "Por favor, selecione o número necessário de opções.",
        "ai-generated-tag": "(Questão Gerada por IA)",
        "official-tag": "(Questão Real de Exame Anterior)",
        "key-concepts-label": "Conceitos-Chave para Lembrar:",
        "history-title": "Últimas 3 Tentativas",
        "history-score": "Pontuação:",
        "history-date": "Data:",
        "history-view": "Ver",
        "no-attempts": "Nenhuma tentativa ainda.",
        "attempt-label": "Tentativa",
        "close-btn": "Fechar",
        "topic-analysis-title": "📊 Desempenho por Tópico",
        "topic-analysis-description": "Veja como você se saiu em cada área temática:",
        "need-improvement": "Precisa Melhorar",
        "good-performance": "Bom Desempenho",
        "excellent": "Excelente!",
        "study-recommendations": "📚 Recomendações de Estudo:",
        "focus-on": "Foque em melhorar nestas áreas:",
        "well-done": "Muito bem! Continue assim em:",
        "cancel-btn": "❌ Cancelar",
        "back-to-home": "🏠 Voltar para Página Inicial",
        "guide-title": "📖 Guia de Personalização",
        "guide-intro": "Este guia mostra como personalizar este simulador para sua própria certificação. Siga os passos abaixo ou consulte a documentação detalhada na pasta /docs/.",
        "guide-documentation-title": "Documentação Completa",
        "guide-documentation-desc": "Todos os guias detalhados com prompts de automação por IA estão disponíveis na pasta /docs/:",
        "guide-docs-readme": "Índice da documentação e fluxo de trabalho",
        "guide-docs-config": "Como configurar a certificação (5-10 min)",
        "guide-docs-questions": "Como adicionar tópicos e questões (30-60 min)",
        "guide-quick-start-title": "Início Rápido - Apenas ~30 Linhas para Editar!",
        "guide-quick-start-desc": "O simulador usa uma abordagem modular - você só precisa editar 2 arquivos:",
        "guide-step1-title": "Configurar Certificação (assets/data/config.js)",
        "guide-step1-desc": "Edite apenas o objeto window.certificationInfo (~30 linhas):",
        "guide-step1-tip": "Use o prompt de IA em docs/CONFIG-GUIDE.md para gerar isso automaticamente!",
        "guide-step2-title": "Adicionar Tópicos e Questões (assets/data/questions-unified.js)",
        "guide-step2-desc": "Defina seus tópicos e adicione questões bilíngues:",
        "guide-step2-tip": "Use os 2 prompts de IA em docs/QUESTIONS-GUIDE.md para gerar isso automaticamente!",
        "guide-ai-automation-title": "Automação com IA (Recomendado!)",
        "guide-ai-automation-desc": "Ambos os guias incluem prompts prontos para uso com ChatGPT/Claude:",
        "guide-ai-prompt1": "Gerar tópicos automaticamente",
        "guide-ai-prompt2": "Converter questões para formato bilíngue",
        "guide-ai-time": "Tempo total: 30-60 minutos vs 2-4 horas manualmente!",
        "guide-step3-title": "Teste Seu Simulador",
        "guide-step3-desc": "Abra o index.html no navegador e teste ambos os idiomas (EN/PT). Todas as mudanças são aplicadas automaticamente!",
        "guide-features-title": "Recursos Principais:",
        "guide-feature1": "Interface bilíngue (EN/PT) com troca instantânea",
        "guide-feature2": "Análise de desempenho por tópico com gráficos",
        "guide-feature3": "Tema Claro/Escuro com transições suaves",
        "guide-feature4": "100% responsivo - funciona em todos os dispositivos",
        "guide-feature5": "Histórico de pontuação com detalhamento por tópico",
        "guide-feature6": "Temporizador regressivo e acompanhamento de progresso",
        "guide-feature7": "Suporte para questões de escolha simples e múltipla",
        "guide-feature8": "Explicações detalhadas e dicas estratégicas",
        "guide-help-title": "Precisa de Ajuda?",
        "guide-help": "Consulte a pasta /docs/ para guias completos com prompts de automação por IA!"
    }
};

// Backward compatibility - will be populated by questions-unified.js
window.officialQuestionBank = [];
