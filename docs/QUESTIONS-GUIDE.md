# 📚 Guia de Questões - questions-unified.js

Este guia mostra como preencher o arquivo `assets/data/questions-unified.js` com tópicos e questões.

---

## 📂 Estrutura do Arquivo

O arquivo `questions-unified.js` contém 2 objetos principais:

1. **`window.questionConfig.topics`** - Definição dos tópicos/áreas temáticas
2. **`window.questionBank`** - Array com todas as questões

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
    difficulty: "medium", // 'easy', 'medium' ou 'hard'

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

---

## 🔢 Tipos de Questões

### Single Choice (Uma resposta correta)

```javascript
{
    id: 'java_q001',
    type: 'single',
    // ...
    en: {
        question: "Qual é a saída?\n\nint x = 5;\nSystem.out.println(x++);",
        options: ["4", "5", "6", "Erro"],
        correct: [1],  // Apenas índice 1 (opção "5")
        // ...
    }
}
```

### Multiple Choice (Múltiplas respostas corretas)

```javascript
{
    id: 'collections_q001',
    type: 'multiple',
    // ...
    en: {
        question: "Quais DUAS coleções permitem duplicatas?",
        options: [
            "HashSet",
            "ArrayList",    // Correta
            "TreeSet",
            "LinkedList"    // Correta
        ],
        correct: [1, 3],   // Índices 1 e 3
        // ...
    }
}
```

---

## 🤖 PROMPT DE AUTOMAÇÃO - TÓPICOS

Copie e cole para gerar os tópicos automaticamente:

````
Você é um especialista em criar simuladores de certificação. Preciso que você gere os tópicos (topics) para o meu banco de questões.

CERTIFICAÇÃO: [Nome e código da certificação]

TAREFA:
1. Pesquise os principais tópicos cobrados nesta certificação
2. Identifique 5-10 áreas temáticas principais
3. Gere o objeto window.questionConfig.topics completo
4. Use nomes descritivos e emojis relevantes
5. Mantenha descrições curtas (máx 60 caracteres)

FORMATO DE SAÍDA:
```javascript
window.questionConfig = {
    topics: {
        // Seus tópicos aqui
    }
};
````

REGRAS:

- Chaves em snake_case (ex: java_fundamentals)
- Name: 2-4 palavras
- Description: Uma frase curta
- Icon: Emoji representativo
- 5-10 tópicos no total

EXEMPLO:

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

CERTIFICAÇÃO:
[Cole aqui o nome da certificação]

```

---

## 🤖 PROMPT DE AUTOMAÇÃO - QUESTÕES

Copie e cole para converter questões automaticamente:

```

Você é um especialista em criar simuladores de certificação. Preciso que você converta questões para o formato do meu simulador.

TÓPICOS DISPONÍVEIS:
[Cole aqui os tópicos que você gerou anteriormente]

QUESTÕES PARA CONVERTER:
[Cole suas questões aqui - podem estar em qualquer formato]

TAREFA:

1. Analise cada questão
2. Atribua ao tópico mais apropriado
3. Identifique se é 'single' (uma resposta) ou 'multiple' (várias respostas)
4. Defina dificuldade: 'easy', 'medium' ou 'hard'
5. Gere explicações educativas (2-3 frases)
6. Crie dicas estratégicas para o exame
7. Forneça AMBAS as versões: inglês (en) e português (pt)

REGRAS CRÍTICAS:

- ID: formato {topico}\_q{numero} (ex: java_q001, oop_q045)
- Type: 'single' para uma resposta, 'multiple' para várias
- Topic: deve existir nos tópicos fornecidos
- Correct: array com índices base-0 (ex: [1] ou [0, 2])
- Ambos en e pt devem ter EXATAMENTE a mesma estrutura

FORMATO DE SAÍDA:

```javascript
window.questionBank = [
  {
    id: "topico_q001",
    type: "single",
    topic: "nome_do_topico",
    difficulty: "medium",
    en: {
      question: "Pergunta em inglês?",
      options: ["A", "B", "C", "D"],
      correct: [1],
      explanation: "Explicação educativa em inglês.",
      tip: "Dica estratégica em inglês.",
    },
    pt: {
      question: "Pergunta em português?",
      options: ["A", "B", "C", "D"],
      correct: [1],
      explanation: "Explicação educativa em português.",
      tip: "Dica estratégica em português.",
    },
  },
  // Repita para todas as questões
];
```

EXEMPLO COMPLETO:

```javascript
{
    id: 'java_fund_q001',
    type: 'single',
    topic: 'java_fundamentals',
    difficulty: 'easy',
    en: {
        question: "What is the output?\n\nint x = 5;\nSystem.out.println(x++);",
        options: ["4", "5", "6", "Compilation error"],
        correct: [1],
        explanation: "Post-increment (x++) returns 5, then increments x to 6. Pre-increment (++x) would return 6.",
        tip: "Remember: x++ uses then increments, ++x increments then uses."
    },
    pt: {
        question: "Qual é a saída?\n\nint x = 5;\nSystem.out.println(x++);",
        options: ["4", "5", "6", "Erro de compilação"],
        correct: [1],
        explanation: "Pós-incremento (x++) retorna 5, depois incrementa x para 6. Pré-incremento (++x) retornaria 6.",
        tip: "Lembre-se: x++ usa depois incrementa, ++x incrementa depois usa."
    }
}
```

CONVERTA ESTAS QUESTÕES:
[Cole suas questões aqui]

````

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
- [ ] Difficulty: 'easy', 'medium' ou 'hard'
- [ ] Correct array com índices corretos (base-0)
- [ ] Versões EN e PT completas
- [ ] Explicações educativas (2-3 frases)
- [ ] Dicas estratégicas úteis
- [ ] Sem erros de sintaxe JavaScript

---

## 📌 Dicas Importantes

### 1. IDs das Questões
```javascript
// ✅ BOM:
id: 'java_fund_q001'
id: 'collections_q045'

// ❌ RUIM:
id: 'question1'
id: 'q_001'
````

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

Analise o conceito PRINCIPAL da questão:

- Questão sobre `int x = 5; x++;` → `java_fundamentals`
- Questão sobre `class extends` → `oop_concepts`
- Questão sobre `ArrayList.add()` → `collections`

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
    difficulty: "easy",
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
