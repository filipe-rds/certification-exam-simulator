# 📝 Guia de Configuração - config.js

Este guia mostra como preencher o arquivo `assets/data/config.js` para personalizar seu simulador.

## 🎯 Abordagem Modular (Recomendada)

Você só precisa preencher o objeto `window.certificationInfo`. Todo o resto é automático!

---

## 📋 Estrutura do window.certificationInfo

```javascript
window.certificationInfo = {
  // Nome da certificação (bilíngue)
  name: {
    en: "Nome em Inglês",
    pt: "Nome em Português",
  },

  // Código do exame (ex: "1Z0-819", "AZ-900", "AWS-SAA-C03")
  code: "CÓDIGO-EXAME",

  // Provedor (ex: "Oracle", "Microsoft", "AWS")
  provider: "Nome do Provedor",

  // Especificações do exame
  exam: {
    totalQuestions: 50, // Quantidade de questões no exame real
    passingScore: 70, // Nota mínima para aprovação (%)
    timeLimit: 90, // Tempo em MINUTOS (será convertido automaticamente)
    questionTypes: "Múltipla escolha (simples e múltipla)",
  },

  // Descrições (bilíngue)
  description: {
    en: "Descrição breve em inglês",
    pt: "Descrição breve em português",
  },

  // Mensagens de boas-vindas (bilíngue)
  welcome: {
    en: "Welcome to [Nome] Practice!",
    pt: "Bem-vindo à Prática [Nome]!",
  },

  welcomeDescription: {
    en: "Mensagem motivacional em inglês",
    pt: "Mensagem motivacional em português",
  },

  // Destaques do exame (4 itens, bilíngue)
  highlights: {
    en: [
      "Destaque 1 sobre o exame",
      "Destaque 2 sobre o exame",
      "Destaque 3 sobre o exame",
      "Destaque 4 sobre o exame",
    ],
    pt: [
      "Destaque 1 sobre o exame",
      "Destaque 2 sobre o exame",
      "Destaque 3 sobre o exame",
      "Destaque 4 sobre o exame",
    ],
  },
};
```

---

## ⚙️ Configurações Opcionais do window.appConfig

Além do `window.certificationInfo`, você pode customizar algumas funcionalidades avançadas em `window.appConfig.features`:

```javascript
window.appConfig = {
  // ... outras configurações (não modificar)
  features: {
    scoreHistory: true, // Habilitar histórico de pontuações
    detailedResults: true, // Mostrar resultados detalhados
    showCustomizationGuide: true, // Mostrar botão "Como Personalizar"
  },
};
```

### Quando modificar `showCustomizationGuide`:

- **`true` (padrão)**: Mostra o botão "📖 Como Personalizar" na tela inicial
  - 👍 Ideal durante desenvolvimento/personalização
  - 👍 Útil para quem está aprendendo a usar o simulador
- **`false`**: Oculta o botão "📖 Como Personalizar"
  - 👍 Ideal para simuladores finalizados em produção
  - 👍 Interface mais limpa para usuários finais
  - 💡 Recomendado após você concluir a personalização

**Exemplo**: Se você já personalizou o simulador e quer uma interface mais profissional:

```javascript
features: {
  scoreHistory: true,
  detailedResults: true,
  showCustomizationGuide: false  // ← Oculta o botão de customização
}
```

---

## 🤖 PROMPT DE AUTOMAÇÃO (Use com ChatGPT/Claude)

Copie e cole este prompt para gerar a configuração automaticamente:

````
Você é um especialista em criar simuladores de certificação. Preciso que você preencha o objeto window.certificationInfo do meu simulador.

CERTIFICAÇÃO: [Insira o nome e código da certificação aqui]

TAREFA:
1. Pesquise as especificações oficiais do exame (número de questões, tempo, nota mínima)
2. Gere o objeto window.certificationInfo completo em JavaScript
3. Preencha TODOS os campos com informações precisas
4. Crie descrições e mensagens em INGLÊS e PORTUGUÊS
5. Os 4 highlights devem ser informativos sobre o exame

FORMATO DE SAÍDA:
Forneça apenas o código JavaScript pronto para copiar e colar no arquivo config.js.

EXEMPLO DO QUE PRECISO:
```javascript
window.certificationInfo = {
    name: {
        en: "Oracle Certified Professional: Java SE 11 Developer",
        pt: "Oracle Profissional Certificado: Desenvolvedor Java SE 11"
    },
    code: "1Z0-819",
    provider: "Oracle",
    exam: {
        totalQuestions: 50,
        passingScore: 68,
        timeLimit: 90,
        questionTypes: "Multiple choice (single and multiple answers)"
    },
    description: {
        en: "Master Java SE 11 fundamentals and prepare for Oracle certification",
        pt: "Domine os fundamentos do Java SE 11 e prepare-se para a certificação Oracle"
    },
    welcome: {
        en: "Welcome to Java SE 11 Certification Practice!",
        pt: "Bem-vindo à Prática da Certificação Java SE 11!"
    },
    welcomeDescription: {
        en: "Practice with real exam-style questions and achieve your Oracle certification!",
        pt: "Pratique com questões no estilo do exame real e conquiste sua certificação Oracle!"
    },
    highlights: {
        en: [
            "50 multiple choice questions covering Java SE 11",
            "90 minutes to complete the exam",
            "68% passing score required",
            "Official Oracle certification exam simulator"
        ],
        pt: [
            "50 questões de múltipla escolha cobrindo Java SE 11",
            "90 minutos para completar o exame",
            "68% de nota mínima para aprovação",
            "Simulador oficial do exame de certificação Oracle"
        ]
    }
};
````

CERTIFICAÇÃO QUE QUERO CONFIGURAR:
[Cole aqui o nome da certificação e qualquer informação que você tenha]

````

---

## ✅ Checklist de Validação

Antes de salvar, verifique:

- [ ] Nome da certificação preenchido em EN e PT
- [ ] Código do exame correto (ex: "1Z0-819")
- [ ] Provedor identificado
- [ ] Número de questões do exame real
- [ ] Nota mínima correta (em %)
- [ ] Tempo em MINUTOS (não segundos!)
- [ ] Descrições naturais (não literais)
- [ ] Mensagens de boas-vindas motivacionais
- [ ] Exatamente 4 highlights em cada idioma
- [ ] Traduções de qualidade (não apenas literal)

---

## 📌 Dicas Importantes

### 1. Tempo do Exame
```javascript
timeLimit: 90,  // ✅ CORRETO: 90 minutos
timeLimit: 5400 // ❌ ERRADO: Isso seria 90 horas!
````

### 2. Nota de Aprovação

Alguns exames usam escalas diferentes:

- **Porcentagem** (maioria): `passingScore: 68` = 68%
- **Pontuação** (Microsoft): `passingScore: 700` = 700/1000 pontos

### 3. Highlights

Devem ter **exatamente 4 itens** para melhor layout visual.

### 4. Traduções

Escreva de forma **natural**, não literal:

```javascript
// ✅ BOM (natural):
en: "Master cloud concepts and prepare for certification";
pt: "Domine conceitos de nuvem e prepare-se para a certificação";

// ❌ RUIM (muito literal):
en: "Master cloud concepts and prepare for certification";
pt: "Mestre conceitos de nuvem e prepare para certificação";
```

---

## 🔧 Onde Editar

**Arquivo**: `assets/data/config.js`

**Localização**: Procure por `window.certificationInfo = {`

**Dica**: Você NÃO precisa editar:

- `window.appConfig` (é auto-populado)
- `window.texts` (é auto-populado)

Apenas preencha `window.certificationInfo` e pronto!

---

## 📚 Próximos Passos

Depois de configurar o `config.js`:

1. ✅ **Configure os tópicos** → Veja `docs/QUESTIONS-GUIDE.md`
2. ✅ **Adicione as questões** → Veja `docs/QUESTIONS-GUIDE.md`
3. ✅ **Teste o simulador** → Abra `index.html` no navegador

---

**Dúvidas?** Consulte os outros guias em `/docs/`
