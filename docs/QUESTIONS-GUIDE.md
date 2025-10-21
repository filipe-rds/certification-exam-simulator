# 📚 Guia de Questões - questions-unified.js

Este guia mostra como preencher o arquivo `assets/data/questions-unified.js` com tópicos e questões.

---

## � Índice

1. **[Estrutura do Arquivo](#-estrutura-do-arquivo)** - Visão geral dos objetos
2. **[Parte 1: Configurar Tópicos](#-parte-1-configurar-tópicos)** - Como definir áreas temáticas
3. **[Parte 2: Adicionar Questões](#-parte-2-adicionar-questões)** - Como criar questões bilíngues
4. **[Tipos de Questões](#-tipos-de-questões)** - Single vs Multiple Choice
5. **[🤖 Prompt 1: Gerar Tópicos](#-prompt-1-gerar-tópicos)** - Automação de tópicos
6. **[🤖 Prompt 2: Gerar Questões](#-prompt-2-gerar-banco-de-questões)** - Automação de questões
7. **[Checklist de Validação](#-checklist-de-validação)** - Verificações finais
8. **[Dicas Importantes](#-dicas-importantes)** - Boas práticas

---

## �📂 Estrutura do Arquivo

O arquivo `questions-unified.js` contém 2 objetos principais:

1. **`window.questionConfig.topics`** - Definição dos tópicos/áreas temáticas
2. **`window.questionBank`** - Array com todas as questões

**🤖 Use os prompts de automação abaixo para gerar tudo automaticamente!**

---

## ⚡ Resumo Rápido

### Fluxo de Trabalho Recomendado

```
1️⃣ Use o PROMPT 1 → Gere os tópicos
   ↓
2️⃣ Cole o resultado em questions-unified.js (window.questionConfig)
   ↓
3️⃣ Use o PROMPT 2 → Converta suas questões
   ↓
4️⃣ Cole o resultado em questions-unified.js (window.questionBank)
   ↓
5️⃣ Teste no navegador (index.html)
```

### Tempo Estimado

- **Com Prompts de IA**: 30-60 minutos para um simulador completo
- **Manual**: 2-4 horas

---

## 🎯 PARTE 1: Configurar Tópicos

### Estrutura dos Tópicos

```javascript
window.questionConfig = {
  topics: {
    // Chave do tópico (use snake_case)
    nome_do_topico: {
      name: "Nome do Tópico",
      description: "Descrição breve (máx 60 caracteres)",
      icon: "📚", // Emoji representativo
    },

    // Exemplo completo:
    java_fundamentals: {
      name: "Fundamentos Java",
      description: "Sintaxe básica, tipos de dados e operadores",
      icon: "☕",
    },
  },
};
```

### Regras para Tópicos

- **Chave**: Use `snake_case` (ex: `java_fundamentals`, `oop_concepts`)
- **Name**: Nome descritivo (2-4 palavras)
- **Description**: Uma frase curta (máx 60 caracteres)
- **Icon**: Um emoji relevante
- **Quantidade**: Entre 5-10 tópicos é ideal

---

## 📝 PARTE 2: Adicionar Questões

### Estrutura de uma Questão

```javascript
window.questionBank = [
  {
    id: "topico_q001", // ID único com prefixo do tópico
    type: "single", // 'single' ou 'multiple'
    topic: "nome_do_topico", // Deve existir em questionConfig.topics

    en: {
      question: "Texto da pergunta em inglês?",
      options: [
        "Opção A",
        "Opção B", // Resposta correta (índice 1)
        "Opção C",
        "Opção D",
      ],
      correct: [1], // Array com índices corretos (base 0)
      explanation:
        "Explicação detalhada de por que a resposta B está correta e as outras erradas.",
      tip: "Dica estratégica para lembrar deste conceito no exame.",
    },

    pt: {
      question: "Texto da pergunta em português?",
      options: ["Opção A", "Opção B", "Opção C", "Opção D"],
      correct: [1],
      explanation:
        "Explicação detalhada de por que a resposta B está correta e as outras erradas.",
      tip: "Dica estratégica para lembrar deste conceito no exame.",
    },
  },
];
```

**Nota**: A propriedade `difficulty` é opcional e não é necessária para o funcionamento do simulador.

---

## 🔢 Tipos de Questões

### Single Choice (Uma resposta correta)

```javascript
{
    id: 'topic1_q001',
    type: 'single',
    topic: 'topic1',
    en: {
        question: "Qual é a saída?\n\nint x = 5;\nSystem.out.println(x++);",
        options: ["4", "5", "6", "Erro"],
        correct: [1],  // Apenas índice 1 (opção "5")
        explanation: "Post-increment returns the value then increments.",
        tip: "x++ uses then increments, ++x increments then uses."
    },
    pt: {
        question: "Qual é a saída?\n\nint x = 5;\nSystem.out.println(x++);",
        options: ["4", "5", "6", "Erro"],
        correct: [1],
        explanation: "Pós-incremento retorna o valor e depois incrementa.",
        tip: "x++ usa depois incrementa, ++x incrementa depois usa."
    }
}
```

### Multiple Choice (Múltiplas respostas corretas)

```javascript
{
    id: 'topic2_q001',
    type: 'multiple',
    topic: 'topic2',
    en: {
        question: "Quais DUAS coleções permitem duplicatas?",
        options: [
            "HashSet",
            "ArrayList",    // Correta
            "TreeSet",
            "LinkedList"    // Correta
        ],
        correct: [1, 3],   // Índices 1 e 3
        explanation: "ArrayList and LinkedList implement List, which allows duplicates.",
        tip: "Sets guarantee uniqueness, Lists allow duplicates."
    },
    pt: {
        question: "Quais DUAS coleções permitem duplicatas?",
        options: [
            "HashSet",
            "ArrayList",
            "TreeSet",
            "LinkedList"
        ],
        correct: [1, 3],
        explanation: "ArrayList e LinkedList implementam List, que permite duplicatas.",
        tip: "Sets garantem unicidade, Lists permitem duplicatas."
    }
}
```

---

## 🤖 AUTOMAÇÃO COM IA

Use os prompts abaixo para gerar tópicos e questões automaticamente com ChatGPT, Claude ou outra IA generativa.

**💡 Dica**: Execute os prompts na ordem (1 → 2) para melhores resultados!

---

## 🤖📋 PROMPT 1: Gerar Tópicos

**🎯 O que faz**: Gera o objeto `window.questionConfig.topics` completo baseado na certificação.

**⏱️ Tempo**: ~5 minutos

**Copie e cole este prompt:**

````markdown
Você é um especialista em criar simuladores de certificação. Preciso que você gere os tópicos (topics) para o meu banco de questões.

**CERTIFICAÇÃO**: [Nome e código da certificação - ex: Oracle Java SE 11 (1Z0-819)]

**TAREFA**:

1. Pesquise os principais tópicos cobrados nesta certificação
2. Identifique 5-10 áreas temáticas principais
3. Gere o objeto `window.questionConfig.topics` completo
4. Use nomes descritivos e emojis relevantes
5. Mantenha descrições curtas (máx 60 caracteres)

**REGRAS**:

- Chaves em `snake_case` (ex: `java_fundamentals`, `oop_concepts`)
- Name: 2-4 palavras descritivas
- Description: Uma frase curta (máx 60 caracteres)
- Icon: Emoji representativo do tema
- Quantidade: Entre 5-10 tópicos

**FORMATO DE SAÍDA**:

```javascript
window.questionConfig = {
  topics: {
    topico_1: {
      name: "Nome do Tópico",
      description: "Descrição curta do que será coberto",
      icon: "📚",
    },
    topico_2: {
      name: "Outro Tópico",
      description: "Outra descrição curta",
      icon: "🎯",
    },
    // ... mais tópicos
  },
};
```

**EXEMPLO REAL**:

```javascript
window.questionConfig = {
  topics: {
    java_fundamentals: {
      name: "Fundamentos Java",
      description: "Sintaxe básica, tipos de dados e operadores",
      icon: "☕",
    },
    oop_concepts: {
      name: "POO",
      description: "Classes, herança, polimorfismo, encapsulamento",
      icon: "🎯",
    },
    collections: {
      name: "Collections",
      description: "Lists, Sets, Maps e operações de coleção",
      icon: "📦",
    },
  },
};
```

**CERTIFICAÇÃO QUE QUERO**:
[Cole aqui o nome e código da certificação]
````

**✅ Após executar este prompt**:

1. Copie o código JavaScript gerado pela IA
2. Abra `assets/data/questions-unified.js`
3. Substitua o conteúdo de `window.questionConfig = { topics: { ... } };`
4. Salve o arquivo
5. Prossiga para o **PROMPT 2** para gerar as questões

---

## 🤖📝 PROMPT 2: Gerar Banco de Questões

**🎯 O que faz**: Converte suas questões (em qualquer formato) para o formato bilíngue do simulador.

**⏱️ Tempo**: ~20-45 minutos (depende da quantidade de questões)

**📌 Pré-requisito**: Execute o PROMPT 1 primeiro para ter os tópicos definidos!

**📎 Formatos Aceitos**:

- ✅ Texto colado diretamente no prompt
- ✅ Arquivo PDF anexado
- ✅ Documento Word/Google Docs anexado
- ✅ Planilha Excel/Google Sheets anexada
- ✅ Imagem de questões (screenshot) anexada
- ✅ Arquivo TXT ou qualquer formato de texto

### 📖 Como Usar Este Prompt

Você tem **DUAS OPÇÕES** para fornecer as questões:

#### 📌 OPÇÃO 1: Colar Texto Diretamente

```
👍 Use quando:
- Você tem poucas questões (< 20)
- As questões já estão em formato texto
- Você quer rapidez e simplicidade

📝 Como fazer:
1. Copie o prompt abaixo
2. Cole suas questões na seção "QUESTÕES PARA CONVERTER"
3. Execute na sua IA favorita (ChatGPT, Claude, etc.)
```

#### 📎 OPÇÃO 2: Anexar Arquivo(s)

```
👍 Use quando:
- Você tem muitas questões (> 20)
- As questões estão em PDF, Word, Excel
- As questões estão em imagens/screenshots
- Você quer processar múltiplos arquivos de uma vez

📎 Como fazer:
1. Copie o prompt abaixo
2. Cole na sua IA (ChatGPT, Claude com suporte a anexos)
3. Anexe os arquivos com 📎 (botão de anexar)
4. Execute o prompt
```

**💡 Dica Pro**: Você pode usar AMBAS as opções ao mesmo tempo! Cole algumas questões E anexe arquivos.

**🤖 Ferramentas de IA Compatíveis**:

- ✅ **ChatGPT** (GPT-4 ou superior) - Suporta anexos de arquivos
- ✅ **Claude** (Anthropic) - Suporta anexos de arquivos e imagens
- ✅ **Gemini** (Google) - Suporta anexos de arquivos
- ⚠️ Modelos gratuitos podem ter limitações em processamento de arquivos

---

**Copie e cole este prompt:**

````markdown
Você é um especialista em criar simuladores de certificação. Preciso que você converta questões para o formato bilíngue do meu simulador.

**TÓPICOS DISPONÍVEIS**:

```javascript
[Cole aqui o código completo de window.questionConfig.topics que você gerou no Prompt 1]
```

**QUESTÕES PARA CONVERTER**:

📌 **OPÇÃO 1 - Colar Texto**: Cole suas questões abaixo em qualquer formato de texto:

```
[Cole suas questões aqui - pode ser texto puro, lista numerada, qualquer formato]
```

📎 **OPÇÃO 2 - Anexar Arquivo(s)**: Anexe um ou mais arquivos contendo as questões:

- Formatos aceitos: PDF, DOC, DOCX, XLS, XLSX, TXT, PNG, JPG
- Você pode anexar múltiplos arquivos de uma vez
- Eu vou extrair e processar todas as questões dos arquivos

💡 **Dica de Uso**:

- Poucas questões (< 20)? → Cole diretamente no texto (OPÇÃO 1)
- Muitas questões (> 20)? → Anexe arquivo(s) (OPÇÃO 2)
- Questões em imagens/PDFs escaneados? → Anexe os arquivos (OPÇÃO 2)

**TAREFA**:

1. Analise cada questão cuidadosamente (do texto colado OU dos arquivos anexados)
2. Atribua ao tópico mais apropriado (use as chaves dos tópicos acima)
3. Identifique o tipo: `'single'` (uma resposta) ou `'multiple'` (várias respostas)
4. Gere explicações educativas (2-3 frases) de por que a resposta está correta
5. Crie dicas estratégicas para ajudar a lembrar o conceito no exame
6. Forneça AMBAS as versões: inglês (`en`) e português (`pt`)
7. Garanta que ambas as versões tenham EXATAMENTE a mesma estrutura

**REGRAS CRÍTICAS**:

- **ID**: formato `{topico}_q{numero}` com 3 dígitos (ex: `java_fund_q001`, `oop_q045`)
- **Type**: `'single'` para uma resposta ou `'multiple'` para várias
- **Topic**: DEVE corresponder a uma chave existente em `questionConfig.topics`
- **Correct**: array com índices base-0 (ex: `[1]` para opção B, `[0, 2]` para A e C)
- **Options**: mantenha a ordem original quando possível
- **Explanation**: explique o raciocínio, não apenas reafirme a resposta
- **Tip**: dica prática/mnemônica para lembrar o conceito
- **NÃO inclua** a propriedade `difficulty` (não é necessária)

**FORMATO DE SAÍDA**:

```javascript
window.questionBank = [
  {
    id: "topico_q001",
    type: "single",
    topic: "nome_do_topico",
    en: {
      question: "Question text in English?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: [1],
      explanation:
        "Educational explanation of why B is correct and others are wrong.",
      tip: "Strategic tip to remember this concept in the exam.",
    },
    pt: {
      question: "Texto da pergunta em português?",
      options: ["Opção A", "Opção B", "Opção C", "Opção D"],
      correct: [1],
      explanation:
        "Explicação educativa de por que B está correta e as outras erradas.",
      tip: "Dica estratégica para lembrar este conceito no exame.",
    },
  },
  // ... repita para todas as questões
];
```

**EXEMPLO REAL - Single Choice**:

```javascript
{
  id: 'java_fund_q001',
  type: 'single',
  topic: 'java_fundamentals',
  en: {
    question: "What is the output?\n\nint x = 5;\nSystem.out.println(x++);",
    options: ["4", "5", "6", "Compilation error"],
    correct: [1],
    explanation: "Post-increment (x++) returns the current value (5), then increments x to 6. Pre-increment (++x) would first increment then return 6.",
    tip: "Remember: x++ uses then increments, ++x increments then uses."
  },
  pt: {
    question: "Qual é a saída?\n\nint x = 5;\nSystem.out.println(x++);",
    options: ["4", "5", "6", "Erro de compilação"],
    correct: [1],
    explanation: "Pós-incremento (x++) retorna o valor atual (5), depois incrementa x para 6. Pré-incremento (++x) primeiro incrementaria depois retornaria 6.",
    tip: "Lembre-se: x++ usa depois incrementa, ++x incrementa depois usa."
  }
}
```

**EXEMPLO REAL - Multiple Choice**:

```javascript
{
  id: 'collections_q001',
  type: 'multiple',
  topic: 'collections',
  en: {
    question: "Which TWO collections allow duplicate elements? (Choose TWO)",
    options: [
      "HashSet",
      "ArrayList",
      "TreeSet",
      "LinkedList"
    ],
    correct: [1, 3],
    explanation: "ArrayList and LinkedList implement the List interface, which allows duplicate elements. HashSet and TreeSet implement Set, which guarantees uniqueness.",
    tip: "Remember: Sets guarantee uniqueness, Lists allow duplicates."
  },
  pt: {
    question: "Quais DUAS coleções permitem elementos duplicados? (Escolha DUAS)",
    options: [
      "HashSet",
      "ArrayList",
      "TreeSet",
      "LinkedList"
    ],
    correct: [1, 3],
    explanation: "ArrayList e LinkedList implementam a interface List, que permite elementos duplicados. HashSet e TreeSet implementam Set, que garante unicidade.",
    tip: "Lembre-se: Sets garantem unicidade, Lists permitem duplicatas."
  }
}
```

**IMPORTANTE**:

- Numere os IDs sequencialmente por tópico (`_q001`, `_q002`, etc.)
- Mantenha consistência nas traduções (mesma estrutura, mesmo número de opções)
- Se a questão original estiver apenas em um idioma, você DEVE gerar a tradução
- **Se houver MUITAS questões** e você atingir o limite de processamento:
  - Processe em LOTES de 15-20 questões por vez
  - **PRIMEIRO ENVIO**: Envie o código completo com estrutura:
    ```javascript
    window.questionBank = [
      {
        /* questão 1 */
      },
      {
        /* questão 2 */
      },
      // ... questões 1-20
    ];
    ```
  - **ENVIOS SEGUINTES**: Envie SOMENTE os objetos das questões (sem `window.questionBank = [` e sem `];`):
    ```javascript
    { /* questão 21 */ },
    { /* questão 22 */ },
    // ... questões 21-40
    ```
  - Isso facilita copiar e colar - basta adicionar dentro do array existente
  - Mantenha a numeração sequencial entre lotes
  - Ao final, teremos um único `window.questionBank` completo

**EXEMPLO DE ENVIO INCREMENTAL**:

📤 **Primeiro Envio (questões 1-20)**:

```javascript
window.questionBank = [
  {
    id: "java_fund_q001",
    type: "single",
    topic: "java_fundamentals",
    en: {
      /* ... */
    },
    pt: {
      /* ... */
    },
  },
  {
    id: "java_fund_q002",
    // ... questões até q020
  },
];
```

📤 **Segundo Envio (questões 21-40)** - SOMENTE os objetos:

```javascript
  {
    id: 'java_fund_q021',
    type: 'single',
    topic: 'java_fundamentals',
    en: { /* ... */ },
    pt: { /* ... */ }
  },
  {
    id: 'java_fund_q022',
    // ... questões até q040
  }
```

_👆 Note que NÃO tem `window.questionBank = [` nem `];` - só os objetos com vírgula_

📤 **Terceiro Envio (questões 41-60)** - SOMENTE os objetos:

```javascript
  {
    id: 'java_fund_q041',
    // ... questões restantes
  }
```

💡 **Como colar no arquivo**:

1. Primeiro envio → Cole tudo (substitui o array)
2. Segundo envio em diante → Cole ANTES do `];` final
3. Resultado: um único array com todas as questões

**CONVERSÃO - Escolha seu método**:

✅ Se você **COLOU questões acima** (OPÇÃO 1):

- Converta todas as questões do texto colado
- Gere o código JavaScript completo

✅ Se você **ANEXOU arquivo(s)** (OPÇÃO 2):

- Extraia todas as questões dos arquivos anexados
- Converta cada questão encontrada
- Gere o código JavaScript completo

✅ Se você usou **AMBOS** (texto + arquivos):

- Processe primeiro o texto colado
- Depois processe os arquivos anexados
- Combine tudo em um único `window.questionBank`

📦 **Se a lista for MUITO GRANDE** (> 50 questões):

- **1º ENVIO**: Gere com estrutura completa (`window.questionBank = [ ... ];`)
- **2º+ ENVIOS**: Gere SOMENTE os objetos (sem `window.questionBank = [` e `];`)
- Avise claramente: "Este é o envio X de Y" e "Cole após a última questão, antes do `];`"

**COMECE A CONVERSÃO AGORA!**
````

**✅ Após executar este prompt**:

1. Copie o código JavaScript gerado pela IA
2. Abra `assets/data/questions-unified.js`
3. Substitua o conteúdo de `window.questionBank = [ ... ];`
4. Salve o arquivo
5. Abra `index.html` no navegador e teste!

### 📦 Trabalhando com Envios Incrementais

Se a IA processar as questões em lotes (quando há muitas questões), siga este fluxo:

**1️⃣ Primeiro Lote (Questões 1-20)**:

```javascript
// A IA envia:
window.questionBank = [
  { id: "topic_q001" /* ... */ },
  { id: "topic_q002" /* ... */ },
  // ... até q020
];
```

✅ **Ação**: Cole isso COMPLETAMENTE no arquivo `questions-unified.js`

**2️⃣ Segundo Lote (Questões 21-40)**:

```javascript
// A IA envia SOMENTE:
  { id: 'topic_q021', /* ... */ },
  { id: 'topic_q022', /* ... */ },
  // ... até q040
```

✅ **Ação**:

1. Abra `questions-unified.js`
2. Vá até o FINAL do array (antes do `];`)
3. Adicione uma vírgula após a última questão
4. Cole o novo lote
5. Salve

**3️⃣ Terceiro Lote e Seguintes**:

- Repita o processo do passo 2️⃣
- Sempre cole ANTES do `];` final
- Sempre adicione vírgula após a questão anterior

**Resultado Final**:

```javascript
window.questionBank = [
  { id: "topic_q001" /* ... */ }, // ← Lote 1
  { id: "topic_q002" /* ... */ },
  // ... (18 questões)
  { id: "topic_q020" /* ... */ },
  { id: "topic_q021" /* ... */ }, // ← Lote 2
  { id: "topic_q022" /* ... */ },
  // ... (18 questões)
  { id: "topic_q040" /* ... */ },
  { id: "topic_q041" /* ... */ }, // ← Lote 3
  // ... todas as questões em um único array
];
```

💡 **Dica**: Use `Ctrl+End` (ou `Cmd+End` no Mac) para ir rapidamente ao final do arquivo!

---

## ✅ Checklist de Validação

### Para Tópicos:

- [ ] Entre 5-10 tópicos definidos
- [ ] Chaves em snake_case
- [ ] Nomes descritivos (2-4 palavras)
- [ ] Descrições curtas (máx 60 chars)
- [ ] Emojis relevantes

### Para Questões:

- [ ] ID único para cada questão
- [ ] Formato: `{topico}_q{numero}`
- [ ] Type correto ('single' ou 'multiple')
- [ ] Topic existe em questionConfig.topics
- [ ] Correct array com índices corretos (base-0)
- [ ] Versões EN e PT completas
- [ ] Explicações educativas (2-3 frases)
- [ ] Dicas estratégicas úteis
- [ ] Sem erros de sintaxe JavaScript
- [ ] NÃO incluir propriedade 'difficulty' (opcional)

---

## 📌 Dicas Importantes

### 1. IDs das Questões

```javascript
// ✅ BOM:
id: "topic1_q001";
id: "topic2_q045";

// ❌ RUIM:
id: "question1";
id: "q_001";
id: "q1"; // Muito curto
```

### 2. Índices Corretos

```javascript
// Opções:     0         1         2         3
options: ["HashSet", "ArrayList", "TreeSet", "LinkedList"];

// Se B e D são corretas:
correct: [1, 3]; // ✅ Correto (base-0)
correct: [2, 4]; // ❌ Errado (base-1)
```

### 3. Type vs Quantidade de Respostas

```javascript
// Uma resposta correta:
type: 'single',
correct: [2]

// Duas ou mais respostas corretas:
type: 'multiple',
correct: [0, 2, 4]
```

### 4. Explicações Educativas

```javascript
// ✅ BOM (educativo):
explanation: "ArrayList permite duplicatas porque implementa a interface List. Sets (HashSet, TreeSet) garantem unicidade e não permitem duplicatas.";

// ❌ RUIM (vago):
explanation: "A resposta correta é ArrayList.";
```

### 5. Mapeamento de Tópicos

Analise o conceito PRINCIPAL da questão e atribua ao tópico correto:

- Questão sobre sintaxe básica → `topic1` (ou o tópico correspondente aos fundamentos)
- Questão sobre conceitos avançados → `topic2` (ou o tópico correspondente)
- Questão sobre funcionalidades específicas → `topic3` (ou o tópico correspondente)

---

## 🔧 Onde Editar

**Arquivo**: `assets/data/questions-unified.js`

**Estrutura**:

```javascript
// 1. Defina os tópicos primeiro
window.questionConfig = { topics: { ... } };

// 2. Depois adicione as questões
window.questionBank = [ ... ];
```

---

## 📚 Próximos Passos

1. ✅ Configure `window.questionConfig.topics`
2. ✅ Popule `window.questionBank`
3. ✅ Abra `index.html` no navegador
4. ✅ Teste as questões e traduções
5. ✅ Ajuste conforme necessário

---

## 🎯 Exemplo Completo Mínimo

```javascript
// ========== TÓPICOS ==========
window.questionConfig = {
  topics: {
    fundamentals: {
      name: "Fundamentos",
      description: "Conceitos básicos e sintaxe",
      icon: "📚",
    },
  },
};

// ========== QUESTÕES ==========
window.questionBank = [
  {
    id: "fundamentals_q001",
    type: "single",
    topic: "fundamentals",
    en: {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: [1],
      explanation: "2 + 2 equals 4. This is basic arithmetic.",
      tip: "Remember basic math operations.",
    },
    pt: {
      question: "Quanto é 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: [1],
      explanation: "2 + 2 é igual a 4. Isso é aritmética básica.",
      tip: "Lembre-se das operações matemáticas básicas.",
    },
  },
];
```

---

**Dúvidas?** Consulte `docs/CONFIG-GUIDE.md` ou os exemplos em `/docs/`
