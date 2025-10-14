# Site Kasa Uno - Móveis Planejados e Interiores

Site institucional da Kasa Uno, empresa especializada em móveis planejados e design de interiores localizada em São José dos Campos - SP.

## 🎨 Design e Identidade Visual

O site foi desenvolvido com base na identidade visual fornecida, utilizando as cores douradas características da marca Kasa Uno e um design moderno e elegante inspirado no site da Bontempo.

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Design responsivo com Flexbox e Grid
- **JavaScript** - Interatividade e funcionalidades avançadas
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📁 Estrutura do Projeto

```
Site Kasa Uno/
├── index.html          # Página principal
├── 404.html           # Página de erro 404
├── robots.txt         # Arquivo para SEO
├── sitemap.xml        # Mapa do site para SEO
├── css/
│   └── style.css      # Estilos principais
├── js/
│   └── script.js      # Scripts e funcionalidades
└── images/
    ├── README.md      # Instruções sobre imagens
    └── (imagens do site)
```

## 🎯 Funcionalidades Principais

### ✨ Interface
- **Design Responsivo** - Adaptável a todos os dispositivos
- **Menu Mobile** - Navegação otimizada para celulares
- **Slider Hero** - Carrossel automático com navegação manual
- **Animações Suaves** - Transições e efeitos visuais elegantes

### 🎨 Seções do Site
- **Hero Section** - Slider com chamadas principais
- **Sobre** - Apresentação da empresa e valores
- **Serviços** - Cards interativos com os serviços oferecidos
- **Projetos** - Galeria de trabalhos realizados
- **Blog** - Artigos e novidades
- **Contato** - Formulário e informações de contato

### ⚡ Funcionalidades Avançadas
- **Formulário de Contato** - Validação completa e feedback visual
- **Navegação Suave** - Scroll suave entre seções
- **Otimização SEO** - Meta tags e estrutura otimizada
- **Performance** - Carregamento otimizado e lazy loading

## 🖼️ Imagens Necessárias

Para o funcionamento completo do site, adicione as seguintes imagens na pasta `images/`:

### Logos
- `logo-kasa-uno.png` - Logo principal
- `logo-kasa-uno-white.png` - Logo branca (footer)

### Hero Slider
- `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` - Imagens do slider (1920x1080px)

### Conteúdo
- `about-kasa-uno.jpg` - Imagem da seção sobre
- `projeto-1.jpg` a `projeto-4.jpg` - Projetos em destaque
- `blog-1.jpg` a `blog-3.jpg` - Imagens dos artigos

Consulte `images/README.md` para especificações detalhadas.

## 🛠️ Instalação e Uso

1. **Clone ou baixe** os arquivos do projeto
2. **Adicione as imagens** necessárias na pasta `images/`
3. **Abra o arquivo** `index.html` em um navegador
4. **Para desenvolvimento local**, use um servidor local como Live Server (VS Code)

### Servidor Local (Recomendado)

```bash
# Se você tem Python instalado
python -m http.server 8000

# Se você tem Node.js instalado
npx serve .

# Ou use a extensão Live Server no VS Code
```

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- 📱 **Mobile** - 320px a 768px
- 📊 **Tablet** - 768px a 1024px  
- 💻 **Desktop** - 1024px+
- 🖥️ **Large Desktop** - 1200px+

## 🎨 Personalização

### Cores Principais
```css
:root {
    --primary-gold: #C4A464;
    --secondary-gold: #B8935A;
    --dark-blue: #2c3e50;
    --medium-blue: #34495e;
    --light-gray: #f8f9fa;
}
```

### Fontes
- **Principal**: Inter (Google Fonts)
- **Ícones**: Font Awesome 6.0

## 📧 Formulário de Contato

O formulário inclui:
- ✅ Validação completa de campos
- 📧 Validação de e-mail
- 📱 Validação de telefone
- 💬 Feedback visual para erros
- ✨ Modal de sucesso

**Nota**: Para envio real de e-mails, integre com um backend ou serviço como EmailJS, Netlify Forms, ou Formspree.

## 🔧 Customização Fácil

### Alterar Informações da Empresa
Edite o arquivo `index.html` nas seções:
- Informações de contato
- Textos sobre a empresa
- Serviços oferecidos

### Alterar Cores
Edite as variáveis CSS no início do arquivo `style.css`

### Adicionar/Remover Seções
As seções são modulares e podem ser facilmente modificadas

## 📈 SEO e Performance

### Otimizações Incluídas
- ✅ Meta tags apropriadas
- ✅ Estrutura semântica HTML5
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Imagens otimizadas (lazy loading)
- ✅ Compressão CSS/JS
- ✅ Schema markup ready

### Performance
- ⚡ Carregamento otimizado
- 🖼️ Lazy loading de imagens
- 📱 Otimizado para mobile
- 🔄 Cache otimizado

## 🌐 Deploy

### Netlify (Recomendado)
1. Faça upload da pasta completa
2. Configure domínio personalizado
3. SSL automático incluído

### GitHub Pages
1. Crie repositório no GitHub
2. Ative GitHub Pages
3. Site disponível em `username.github.io/repo-name`

### Hospedagem Tradicional
1. Faça upload via FTP
2. Configure domínio
3. Certifique-se de que o servidor suporta arquivos estáticos

## 🆘 Suporte e Manutenção

### Browsers Suportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Problemas Conhecidos
- Imagens: Certifique-se de que todas as imagens estão na pasta correta
- Formulário: Para funcionar completamente, precisa de backend

## 📄 Licença

Este projeto foi desenvolvido especificamente para a Kasa Uno. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a Kasa Uno**

*Transformamos sonhos em realidade através de móveis planejados e design de interiores únicos e funcionais.*