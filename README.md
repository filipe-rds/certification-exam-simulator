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

### 📚 Documentação Completa

Para instruções detalhadas de personalização, consulte a **[documentação completa em `/docs/`](docs/README.md)**:

- **[docs/CONFIG-GUIDE.md](docs/CONFIG-GUIDE.md)** - Como configurar a certificação (5-10 minutos)
- **[docs/QUESTIONS-GUIDE.md](docs/QUESTIONS-GUIDE.md)** - Como adicionar tópicos e questões (30-60 minutos)

### ⚡ Resumo Rápido

**Apenas ~30 linhas para personalizar!**

1. **Configure a certificação** em `assets/data/config.js`:

   - Edite o objeto `window.certificationInfo`
   - Preencha nome, código, tempo, nota mínima
   - Use o prompt de IA do guia para automatizar

2. **Adicione tópicos e questões** em `assets/data/questions-unified.js`:

   - Defina os tópicos em `window.questionConfig.topics`
   - Adicione questões em `window.questionBank`
   - Use os prompts de IA do guia para automatizar

3. **Teste no navegador**:
   - Abra `index.html`
   - Verifique ambos os idiomas (EN/PT)

### 🤖 Automação com IA

Todos os guias incluem prompts prontos para ChatGPT/Claude. Veja **[docs/README.md](docs/README.md)** para mais detalhes.

---

## 📚 Documentação

Toda a documentação está em português na pasta **[`/docs/`](docs/README.md)**:

- **[docs/README.md](docs/README.md)** - 📖 Índice e visão geral
- **[docs/CONFIG-GUIDE.md](docs/CONFIG-GUIDE.md)** - ⚙️ Como configurar a certificação + prompt de IA
- **[docs/QUESTIONS-GUIDE.md](docs/QUESTIONS-GUIDE.md)** - 📚 Como criar tópicos e questões + prompts de IA

### 🎯 Fluxo de Trabalho

```
1. Leia docs/README.md (visão geral)
   ↓
2. Siga docs/CONFIG-GUIDE.md (configuração)
   ↓
3. Siga docs/QUESTIONS-GUIDE.md (questões)
   ↓
4. Teste no navegador (index.html)
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

**v2.0.0** • Janeiro 2025 • [CC BY-NC 4.0 License](LICENSE)

</div>
