# 📚 Documentação do Simulador de Certificação

Bem-vindo à documentação completa do simulador! Aqui você encontra guias detalhados para personalizar seu simulador.

---

### Para Iniciantes

1. **[CONFIG-GUIDE.md](CONFIG-GUIDE.md)** - 📝 Como configurar o simulador

   - Preencher informações da certificação
   - Configurar nome, código, tempo, nota mínima
   - Prompt de automação com IA incluso
   - **Tempo estimado**: 5-10 minutos

2. **[QUESTIONS-GUIDE.md](QUESTIONS-GUIDE.md)** - 📚 Como adicionar questões
   - Criar tópicos/áreas temáticas
   - Adicionar questões bilíngues
   - Prompts de automação com IA inclusos
   - **Tempo estimado**: 30-60 minutos (dependendo da quantidade)

---

## 🎯 Fluxo de Trabalho Recomendado

### Passo a Passo

```
1. Leia CONFIG-GUIDE.md
   ↓
2. Preencha window.certificationInfo em assets/data/config.js
   ↓
3. Leia QUESTIONS-GUIDE.md
   ↓
4. Defina tópicos em assets/data/questions-unified.js
   ↓
5. Adicione questões em assets/data/questions-unified.js
   ↓
6. Teste no navegador (index.html)
   ↓
7. Ajuste conforme necessário
```

---

## 🤖 Automação com IA

Todos os guias incluem **prompts prontos** para usar com ChatGPT ou Claude:

- **CONFIG-GUIDE.md**: Prompt para gerar configuração completa da certificação
- **QUESTIONS-GUIDE.md**:
  - Prompt para gerar tópicos automaticamente
  - Prompt para converter questões para o formato correto

### Como Usar os Prompts

1. Abra o guia relevante (CONFIG-GUIDE.md ou QUESTIONS-GUIDE.md)
2. Copie o prompt marcado com `🤖 PROMPT DE AUTOMAÇÃO`
3. Cole no ChatGPT ou Claude
4. Forneça as informações solicitadas (certificação, questões, etc.)
5. Copie o código gerado e cole no arquivo correspondente

---

## ❓ Perguntas Frequentes

### Como começar do zero?

1. Leia `CONFIG-GUIDE.md`
2. Use o prompt de automação para gerar a configuração
3. Leia `QUESTIONS-GUIDE.md`
4. Use os prompts para gerar tópicos e questões

### Preciso saber programar?

**Não!** Os guias explicam exatamente onde copiar e colar o código. Os prompts de IA fazem o trabalho pesado.

### Quanto tempo leva para criar um simulador?

- **Com IA**: 30-60 minutos para um simulador básico (25-50 questões)
- **Manualmente**: 2-4 horas

### Posso usar questões em outros idiomas?

Sim! O sistema é bilíngue (EN/PT) mas você pode:

- Adicionar mais idiomas editando `config.js`
- Usar apenas um idioma (basta duplicar o conteúdo)

### Como adiciono mais questões depois?

Edite `assets/data/questions-unified.js` e adicione novos objetos ao array `window.questionBank`.

---

## 🔧 Estrutura dos Arquivos

```
📁 seu-simulador/
├── 📄 index.html
├── 📄 README.md
├── 📁 assets/
│   ├── 📁 css/
│   │   └── style.css           # Estilos e temas
│   ├── 📁 js/
│   │   └── app.js              # Lógica do simulador
│   └── 📁 data/
│       ├── config.js           # ⚙️ EDITE AQUI: Configurações
│       └── questions-unified.js # 📚 EDITE AQUI: Tópicos e questões
└── 📁 docs/                    # Esta pasta
    ├── CONFIG-GUIDE.md         # 📝 Guia de configuração
    ├── QUESTIONS-GUIDE.md      # 📚 Guia de questões
    └── README.md               # Este arquivo
```

---

## 📞 Precisa de Ajuda?

1. **Leia os guias** - A maioria das dúvidas está respondida lá
2. **Verifique os exemplos** - MODULAR-EXAMPLE.md tem exemplos completos
3. **Use os prompts de IA** - Deixe a IA fazer o trabalho pesado
4. **Consulte o console** - Abra F12 no navegador para ver erros

---

## 🎓 Próximos Passos

Depois de criar seu simulador:

1. ✅ Teste todas as questões
2. ✅ Verifique ambos os idiomas (EN/PT)
3. ✅ Teste em diferentes navegadores
4. ✅ Ajuste cores/temas em `assets/css/style.css`
5. ✅ Faça deploy (GitHub Pages, Netlify, Vercel, etc.)

---

**Boa sorte com seu simulador! 🚀**
