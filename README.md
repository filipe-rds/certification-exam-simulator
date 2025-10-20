# 🎓 Simulador de Certificação

Simulador de provas de certificação profissional, bilíngue (Inglês/Português), com design moderno inspirado na Rocketseat.

**✨ Novo: Configuração modular simplificada - apenas ~30 linhas para personalizar!**

![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![Language](https://img.shields.io/badge/idioma-PT--BR%20%7C%20EN-orange.svg)

---

## ⚡ Destaques

- 🆕 **Configuração Simplificada**: Apenas ~30 linhas vs 100+ anteriormente
- 🤖 **Automação com IA**: Prompts prontos para ChatGPT/Claude gerarem tudo
- 🌍 **Totalmente Bilíngue**: EN/PT com troca dinâmica instantânea
- 📊 **Análise Avançada**: Gráficos de desempenho por tópico
- 🎨 **Design Moderno**: Inspirado na Rocketseat com tema claro/escuro
- 📱 **100% Responsivo**: Funciona perfeitamente em qualquer dispositivo

---

## ✨ Recursos Completos

### 🎯 Funcionalidades

- ✅ **Interface Bilíngue**: Inglês e Português com troca dinâmica
- ✅ **Análise por Tópicos**: Desempenho detalhado com gráficos visuais
- ✅ **Histórico Completo**: Registre e compare múltiplas tentativas
- ✅ **Single/Multiple Choice**: Suporte para questões de escolha única e múltipla
- ✅ **Timer & Progresso**: Cronômetro regressivo e barra de progresso
- ✅ **Temas Claro/Escuro**: Alternância suave com preferência salva
- ✅ **Design Responsivo**: Mobile-first, otimizado para todos os dispositivos
- ✅ **Feedback Detalhado**: Explicações educativas e dicas estratégicas
- ✅ **Offline-First**: Funciona sem internet após carregamento inicial
- ✅ **Zero Dependências**: JavaScript puro, sem frameworks

---

## 🚀 Instalação e Uso

### Opção 1: Usar Diretamente (Sem Instalar)

Basta abrir o arquivo `index.html` diretamente no navegador. Funciona offline!

### Opção 2: Servidor Local (Recomendado para Desenvolvimento)

Escolha um método:

**Python 3:**

```bash
python3 -m http.server 8080
```

**Node.js:**

```bash
npx http-server -p 8080
```

**PHP:**

```bash
php -S localhost:8080
```

Depois acesse: `http://localhost:8080`

### Opção 3: Hospedar Online (Produção)

Deploy gratuito em:

- **GitHub Pages**: `Settings → Pages → Deploy from main branch`
- **Netlify**: Arraste a pasta para netlify.com/drop
- **Vercel**: `vercel --prod`

---

## 📝 Como Personalizar

### Estrutura do Projeto

```
📁 certification-exam-simulator/
├── 📄 index.html                    # Página principal
├── � README.md                     # Este arquivo
├── �📁 assets/
│   ├── 📁 css/
│   │   └── style.css               # Estilos (tema claro/escuro)
│   ├── 📁 js/
│   │   └── app.js                  # Lógica do simulador
│   └── 📁 data/
│       ├── config.js               # ⚙️ Configurações e textos da UI
│       └── questions-unified.js    # 📚 Tópicos e banco de questões
└── 📁 docs/                         # 📖 Documentação completa
    ├── README.md                   # Índice da documentação
    ├── CONFIG-GUIDE.md             # Guia de configuração
    └── QUESTIONS-GUIDE.md          # Guia de questões
```

### Abordagem Modular (Novo!)

**Apenas ~30 linhas para personalizar!**

Agora você edita apenas o objeto `window.certificationInfo` e o resto é auto-preenchido automaticamente:

- ✅ `window.appConfig` → Auto-populado
- ✅ `window.texts` → Auto-populado
- ✅ Tempo convertido automaticamente (minutos → segundos)
- ✅ Textos da UI gerados a partir das configurações

### Passos para Customização

#### 1️⃣ Configure a Certificação (5-10 minutos)

**Arquivo**: `assets/data/config.js`

Edite apenas o objeto `window.certificationInfo`:

```javascript
window.certificationInfo = {
  name: {
    en: "Oracle Certified Professional: Java SE 11",
    pt: "Oracle Profissional Certificado: Java SE 11",
  },
  code: "1Z0-819",
  provider: "Oracle",
  exam: {
    totalQuestions: 50,
    passingScore: 68,
    timeLimit: 90, // ⚡ em minutos (auto-convertido para segundos)
    questionTypes: "Multiple choice",
  },
  description: {
    en: "Master Java SE 11 fundamentals",
    pt: "Domine os fundamentos do Java SE 11",
  },
  welcome: {
    en: "Welcome to Java SE 11 Practice!",
    pt: "Bem-vindo à Prática Java SE 11!",
  },
  welcomeDescription: {
    en: "Practice and achieve certification!",
    pt: "Pratique e conquiste a certificação!",
  },
  highlights: {
    en: [
      "50 questions covering Java SE 11",
      "90 minutes exam simulation",
      "Detailed explanations included",
      "Track your progress",
    ],
    pt: [
      "50 questões cobrindo Java SE 11",
      "Simulação de 90 minutos",
      "Explicações detalhadas incluídas",
      "Acompanhe seu progresso",
    ],
  },
};
```

📖 **Guia completo com prompt de IA**: [`docs/CONFIG-GUIDE.md`](docs/CONFIG-GUIDE.md)

#### 2️⃣ Defina os Tópicos (10-15 minutos)

**Arquivo**: `assets/data/questions-unified.js`

```javascript
window.questionConfig = {
  topics: {
    java_fundamentals: {
      name: "Fundamentos Java",
      description: "Sintaxe básica e tipos de dados",
      icon: "☕",
    },
    oop_concepts: {
      name: "POO",
      description: "Classes, herança e polimorfismo",
      icon: "🎯",
    },
    // ... mais 3-8 tópicos
  },
};
```

#### 3️⃣ Adicione as Questões (30-60 minutos)

**Arquivo**: `assets/data/questions-unified.js`

```javascript
window.questionBank = [
  {
    id: "java_q001",
    type: "single", // 'single' ou 'multiple'
    topic: "java_fundamentals",
    difficulty: "easy", // 'easy', 'medium', 'hard'
    en: {
      question: "What is the output?\n\nint x = 5;\nSystem.out.println(x++);",
      options: ["4", "5", "6", "Error"],
      correct: [1], // Índice base-0
      explanation: "Post-increment returns 5, then increments to 6.",
      tip: "x++ uses then increments, ++x increments then uses.",
    },
    pt: {
      question: "Qual é a saída?\n\nint x = 5;\nSystem.out.println(x++);",
      options: ["4", "5", "6", "Erro"],
      correct: [1],
      explanation: "Pós-incremento retorna 5, depois incrementa para 6.",
      tip: "x++ usa depois incrementa, ++x incrementa depois usa.",
    },
  },
  // ... mais questões
];
```

📖 **Guia completo com prompts de IA**: [`docs/QUESTIONS-GUIDE.md`](docs/QUESTIONS-GUIDE.md)

---

## 🤖 Automação com IA

**Tempo total: 30-60 minutos para um simulador completo!**

Use os prompts prontos nos guias de documentação para gerar tudo automaticamente com ChatGPT ou Claude:

### 📝 Configuração da Certificação

- **Onde**: [`docs/CONFIG-GUIDE.md`](docs/CONFIG-GUIDE.md)
- **O que faz**: Gera `window.certificationInfo` completo
- **Você fornece**: Nome da certificação
- **IA retorna**: Código JavaScript pronto para colar

### 📚 Tópicos e Questões

- **Onde**: [`docs/QUESTIONS-GUIDE.md`](docs/QUESTIONS-GUIDE.md)
- **O que faz**:
  - Prompt 1: Gera tópicos automaticamente
  - Prompt 2: Converte suas questões para o formato correto
- **Você fornece**: Certificação + lista de questões (qualquer formato)
- **IA retorna**: Código JavaScript bilíngue (EN/PT) pronto para colar

---

## 📚 Documentação

### 🇧🇷 Guias em Português (Recomendados)

1. **[docs/README.md](docs/README.md)** - 📖 Índice completo da documentação
2. **[docs/CONFIG-GUIDE.md](docs/CONFIG-GUIDE.md)** - ⚙️ Como configurar `config.js` + prompt de automação
3. **[docs/QUESTIONS-GUIDE.md](docs/QUESTIONS-GUIDE.md)** - 📚 Como criar tópicos e questões + prompts de automação

### 🎯 Fluxo Recomendado

```
1. Leia docs/CONFIG-GUIDE.md → Use o prompt → Cole em config.js
                ↓
2. Leia docs/QUESTIONS-GUIDE.md → Use os prompts → Cole em questions-unified.js
                ↓
3. Abra index.html no navegador → Teste e ajuste
```

---

## 🌐 Compatibilidade

| Navegador | Versão | Status       |
| --------- | ------ | ------------ |
| Chrome    | 90+    | ✅ Suportado |
| Firefox   | 88+    | ✅ Suportado |
| Safari    | 14+    | ✅ Suportado |
| Edge      | 90+    | ✅ Suportado |

---

## ⚡ Quick Start (5 minutos)

1. **Clone o projeto**

   ```bash
   git clone https://github.com/seu-usuario/certification-exam-simulator.git
   cd certification-exam-simulator
   ```

2. **Execute localmente**

   ```bash
   python3 -m http.server 8080
   # ou: npx http-server -p 8080
   ```

3. **Abra no navegador**

   ```
   http://localhost:8080
   ```

4. **Personalize**
   - Edite `assets/data/config.js` (use o prompt em `docs/CONFIG-GUIDE.md`)
   - Edite `assets/data/questions-unified.js` (use os prompts em `docs/QUESTIONS-GUIDE.md`)

---

## 🐛 Solução de Problemas

### Questões não aparecem

✅ Verifique se `questions-unified.js` está carregado antes de `app.js` no `index.html`  
✅ Confira erros no Console do navegador (F12)  
✅ Certifique-se que `window.questionBank` é um array válido

### Tema não alterna

✅ Limpe o cache: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)  
✅ Verifique se localStorage está habilitado (não funciona em modo anônimo)

### Idioma não muda

✅ Todas as chaves de texto devem existir em `window.texts.en` e `window.texts.pt`  
✅ Veja o console (F12) para avisos de traduções faltantes

### Histórico não salva

✅ Não funciona em modo anônimo/privado  
✅ localStorage tem limite de 10MB  
✅ Limpe dados antigos se necessário

### Configuração não aparece

✅ Verifique se `window.certificationInfo` está definido em `config.js`  
✅ Certifique-se que o objeto está completo (todos os campos obrigatórios)  
✅ Veja erros no console do navegador

---

## 💡 Dicas Úteis

- **Tempo em minutos**: Em `certificationInfo.exam.timeLimit`, use minutos (não segundos). O sistema converte automaticamente.
- **IDs únicos**: Cada questão deve ter um ID único. Formato: `{topico}_q{numero}` (ex: `java_q001`)
- **Índices base-0**: Arrays `correct` usam índice 0 para primeira opção. Ex: `[0, 2]` = opções A e C
- **Traduções naturais**: Escreva traduções naturais, não literais. Use o contexto cultural de cada idioma.
- **5-10 tópicos**: Quantidade ideal para boa organização e análise de desempenho

---

## 📄 Licença

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

Este projeto é licenciado para **uso não comercial**. Você pode:

- ✅ **Usar livremente** para estudos pessoais
- ✅ **Modificar e adaptar** para suas necessidades
- ✅ **Compartilhar** com outros estudantes
- ✅ **Usar em educação** (escolas, universidades, cursos gratuitos)

**Não é permitido**:

- ❌ Vender este software ou versões modificadas
- ❌ Usar em treinamentos corporativos pagos
- ❌ Incluir em produtos comerciais
- ❌ Usar para fins lucrativos

⚠️ **Este projeto é exclusivamente para uso não comercial e sem fins lucrativos.**

📜 **Licença completa**: Veja o arquivo [LICENSE](LICENSE)  
🔗 **Mais informações**: [creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- 🐛 Reportar bugs via [Issues](https://github.com/seu-usuario/certification-exam-simulator/issues)
- ✨ Sugerir novos recursos
- 🌍 Melhorar traduções (adicionar novos idiomas)
- 📝 Aprimorar documentação
- 🎨 Enviar melhorias de UI/UX

### Como Contribuir

1. Fork o projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## 🙏 Créditos

- **Design**: Inspirado na [Rocketseat](https://www.rocketseat.com.br/)
- **Desenvolvimento**: Colaboração GitHub Copilot + Humano
- **Ícones**: Emojis Unicode padrão
- **Fontes**: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Cores**: Paleta roxo/púrpura inspirada na Rocketseat

---

## 📊 Estatísticas do Projeto

- **Linhas de código**: ~3.000 (HTML + CSS + JS)
- **Arquivos principais**: 3 (`index.html`, `style.css`, `app.js`)
- **Dependências**: 0 (JavaScript puro)
- **Idiomas suportados**: 2 (EN/PT) - expansível
- **Tamanho total**: ~50KB (sem questões)

---

## 🌟 Showcase

Usando este simulador? Compartilhe conosco!

- Simulador Oracle Java SE 11
- Simulador AWS Solutions Architect
- Simulador Azure Fundamentals
- Simulador CompTIA A+
- [Adicione o seu aqui!]

---

## 📞 Suporte

- 📖 **Documentação**: Veja a pasta `/docs/`
- 💬 **Discussões**: [GitHub Discussions](https://github.com/filipe-rds/certification-exam-simulator/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/filipe-rds/certification-exam-simulator/issues)

---

<div align="center">

**Desenvolvido com ❤️ e assistência de IA 🤖**

[⭐ Estrele no GitHub](https://github.com/filipe-rds/certification-exam-simulator) • [🐛 Reportar Bug](https://github.com/filipe-rds/certification-exam-simulator/issues) • [✨ Sugerir Feature](https://github.com/filipe-rds/certification-exam-simulator/issues)

---

**v1.0.0** • Outubro 2025 • [CC BY-NC 4.0 License](LICENSE)

</div>
