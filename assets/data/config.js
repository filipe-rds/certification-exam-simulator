/**
 * Configuration and Text Resources for Certification Exam Simulator
 * Supports bilingual interface (English and Portuguese)
 * 
 * THIS IS THE MAIN CONFIGURATION FILE
 * - Quiz settings (questions count, passing score, time limit) are defined here
 * - All UI texts for both languages are defined here
 * - Customize these values to create your own certification simulator
 */

// ============================================================================
// 📝 CERTIFICATION-SPECIFIC SETTINGS
// ============================================================================
// This is the ONLY section you need to modify for each certification!
// Fill in the details of your target certification exam below.

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
        scoreHistory: true,
        detailedResults: true,
        topicFiltering: false,
        difficultySelection: false
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
        "guide-intro": "This tutorial shows how to adapt this simulator for any certification or quiz. Simply customize the question bank and configuration files.",
        "guide-step1-title": "1. Change title and main texts:",
        "guide-step1-desc": "In the <code>assets/data/config.js</code> file, edit the texts in the <code>window.texts</code> object for both languages (en/pt). Update title, subtitle, and welcome messages.",
        "guide-step2-title": "2. Configure quiz settings:",
        "guide-step2-desc": "In the <code>assets/data/config.js</code> file, adjust the quiz settings in <code>window.appConfig.quiz</code>:",
        "guide-step3-title": "3. Edit question bank:",
        "guide-step3-desc": "In the <code>assets/data/questions-unified.js</code> file, edit the <code>window.questionBank</code> array. Each question follows a bilingual format with question text, options, correct answers, and explanations.",
        "guide-step4-title": "4. Configure topics (optional):",
        "guide-step4-desc": "In the <code>questions-unified.js</code> file, edit the <code>questionConfig.topics</code> object to define your subject areas with names, descriptions, and icons.",
        "guide-step5-title": "5. Customize visual theme:",
        "guide-step5-desc": "In the <code>assets/css/style.css</code> file, modify CSS variables in <code>:root</code> to change colors, fonts, and spacing. The design system supports light and dark themes.",
        "guide-step6-title": "6. Test the simulator:",
        "guide-step6-desc": "Open <code>index.html</code> in your browser and verify the quiz works with your new questions, topics, and settings. Test both language options and theme modes.",
        "guide-resources-title": "💡 Available Features:",
        "guide-resources": [
            "Bilingual support (English/Portuguese)",
            "Performance analysis by topic",
            "Score history with tracking",
            "Single and multiple choice questions",
            "Timer and progress tracking",
            "Light/Dark theme toggle",
            "Fully responsive design"
        ],
        "guide-help": "Need help? Check the documentation files in the project root or create an issue on GitHub!"
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
        "guide-intro": "Este tutorial mostra como adaptar este simulador para qualquer certificação ou quiz. Basta personalizar o banco de questões e arquivos de configuração.",
        "guide-step1-title": "1. Altere título e textos principais:",
        "guide-step1-desc": "No arquivo <code>assets/data/config.js</code>, edite os textos no objeto <code>window.texts</code> para ambos os idiomas (en/pt). Atualize título, subtítulo e mensagens de boas-vindas.",
        "guide-step2-title": "2. Configure as informações do quiz:",
        "guide-step2-desc": "No arquivo <code>assets/data/config.js</code>, ajuste as configurações do quiz em <code>window.appConfig.quiz</code>:",
        "guide-step3-title": "3. Edite o banco de questões:",
        "guide-step3-desc": "No arquivo <code>assets/data/questions-unified.js</code>, edite o array <code>window.questionBank</code>. Cada questão segue um formato bilíngue com texto da questão, opções, respostas corretas e explicações.",
        "guide-step4-title": "4. Configure tópicos (opcional):",
        "guide-step4-desc": "No arquivo <code>questions-unified.js</code>, edite o objeto <code>questionConfig.topics</code> para definir suas áreas temáticas com nomes, descrições e ícones.",
        "guide-step5-title": "5. Personalize o tema visual:",
        "guide-step5-desc": "No arquivo <code>assets/css/style.css</code>, modifique as variáveis CSS em <code>:root</code> para alterar cores, fontes e espaçamentos. O design system suporta temas claro e escuro.",
        "guide-step6-title": "6. Teste o simulador:",
        "guide-step6-desc": "Abra o <code>index.html</code> no navegador e verifique se o quiz funciona com suas novas questões, tópicos e configurações. Teste ambas as opções de idioma e modos de tema.",
        "guide-resources-title": "💡 Recursos Disponíveis:",
        "guide-resources": [
            "Suporte bilíngue (Inglês/Português)",
            "Análise de desempenho por tópico",
            "Histórico de pontuação com rastreamento",
            "Questões de escolha simples e múltipla",
            "Temporizador e acompanhamento de progresso",
            "Alternância de tema Claro/Escuro",
            "Design totalmente responsivo"
        ],
        "guide-help": "Precisa de ajuda? Consulte os arquivos de documentação na raiz do projeto ou crie uma issue no GitHub!"
    }
};

// Backward compatibility - will be populated by questions-unified.js
window.officialQuestionBank = [];
