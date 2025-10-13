/**
 * Integração do Formulário de Contato - Exemplos de Backend
 * 
 * Este arquivo contém exemplos de como integrar o formulário
 * com diferentes serviços de backend e APIs.
 */

// ===========================================
// 1. INTEGRAÇÃO COM EMAILJS
// ===========================================

// Configuração do EmailJS (gratuito até 200 emails/mês)
function setupEmailJS() {
    // Substitua pelos seus IDs do EmailJS
    const EMAIL_SERVICE_ID = 'seu_service_id';
    const EMAIL_TEMPLATE_ID = 'seu_template_id';
    const EMAIL_PUBLIC_KEY = 'sua_public_key';
    
    // Inicializar EmailJS
    emailjs.init(EMAIL_PUBLIC_KEY);
}

// Função para enviar email via EmailJS
async function sendEmailViaEmailJS(formData) {
    try {
        const templateParams = {
            from_name: formData.nome,
            from_email: formData.email,
            phone: formData.telefone,
            service: formData.servico,
            message: formData.mensagem,
            to_email: 'contato@kazauna.com.br'
        };
        
        const response = await emailjs.send(
            EMAIL_SERVICE_ID,
            EMAIL_TEMPLATE_ID,
            templateParams
        );
        
        return { success: true, response };
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return { success: false, error };
    }
}

// ===========================================
// 2. INTEGRAÇÃO COM NETLIFY FORMS
// ===========================================

// Para usar Netlify Forms, adicione ao HTML do formulário:
// <form name="contato" method="POST" data-netlify="true" data-netlify-recaptcha="true">
// <input type="hidden" name="form-name" value="contato" />

async function sendViaNetlifyForms(formData) {
    try {
        const form = new FormData();
        form.append('form-name', 'contato');
        Object.keys(formData).forEach(key => {
            form.append(key, formData[key]);
        });
        
        const response = await fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(form).toString()
        });
        
        return { success: response.ok };
    } catch (error) {
        return { success: false, error };
    }
}

// ===========================================
// 3. INTEGRAÇÃO COM FORMSPREE
// ===========================================

async function sendViaFormspree(formData) {
    try {
        const response = await fetch('https://formspree.io/f/SEU_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        return { success: response.ok };
    } catch (error) {
        return { success: false, error };
    }
}

// ===========================================
// 4. INTEGRAÇÃO COM BACKEND PERSONALIZADO (PHP)
// ===========================================

async function sendViaCustomBackend(formData) {
    try {
        const response = await fetch('backend/contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        return { success: false, error };
    }
}

// ===========================================
// 5. INTEGRAÇÃO COM WHATSAPP
// ===========================================

function sendViaWhatsApp(formData) {
    const phoneNumber = '5512345678901'; // Número da Kaza Una
    const message = `
*Nova solicitação de orçamento - Site Kaza Una*

*Nome:* ${formData.nome}
*E-mail:* ${formData.email}
*Telefone:* ${formData.telefone}
*Serviço:* ${formData.servico}
*Mensagem:* ${formData.mensagem}
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    return { success: true };
}

// ===========================================
// FUNÇÃO PRINCIPAL DE ENVIO (MODIFICAR NO script.js)
// ===========================================

// Substitua a função handleFormSubmit no script.js principal por esta:
async function handleFormSubmitWithBackend(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = new FormData(contactForm);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        servico: formData.get('servico'),
        mensagem: formData.get('mensagem')
    };
    
    // Validação básica
    if (!validateForm(data)) {
        return;
    }
    
    // Mostrar loading
    showLoading();
    
    try {
        // Escolha uma das opções abaixo:
        
        // Opção 1: EmailJS
        // const result = await sendEmailViaEmailJS(data);
        
        // Opção 2: Netlify Forms
        // const result = await sendViaNetlifyForms(data);
        
        // Opção 3: Formspree
        // const result = await sendViaFormspree(data);
        
        // Opção 4: Backend personalizado
        // const result = await sendViaCustomBackend(data);
        
        // Opção 5: WhatsApp (backup)
        const result = sendViaWhatsApp(data);
        
        hideLoading();
        
        if (result.success) {
            showSuccessMessage();
            contactForm.reset();
        } else {
            showErrorMessage('Erro ao enviar mensagem. Tente novamente.');
        }
        
    } catch (error) {
        hideLoading();
        showErrorMessage('Erro de conexão. Tente novamente mais tarde.');
        console.error('Erro no envio:', error);
    }
}

// ===========================================
// FUNÇÕES DE APOIO
// ===========================================

function showErrorMessage(message) {
    const modal = document.createElement('div');
    modal.className = 'error-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Ops! Algo deu errado</h3>
            <p>${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Tentar Novamente
                </button>
                <button class="btn" style="background: transparent; border: 2px solid #C4A464; color: #C4A464;" onclick="sendViaWhatsApp(lastFormData)">
                    Enviar via WhatsApp
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 10000);
}

// Armazenar último formulário para backup
let lastFormData = {};

// ===========================================
// EXEMPLO DE BACKEND PHP (contact.php)
// ===========================================

/*
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
    exit;
}

// Validação básica
$required_fields = ['nome', 'email', 'telefone', 'servico'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Campo $field é obrigatório"]);
        exit;
    }
}

// Configurações de email
$to = 'contato@kazauna.com.br';
$subject = 'Nova solicitação de orçamento - Site Kaza Una';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: noreply@kazauna.com.br' . "\r\n";

// Corpo do email
$message = "
<html>
<head>
    <title>Nova Solicitação de Orçamento</title>
</head>
<body>
    <h2>Nova solicitação recebida pelo site</h2>
    <p><strong>Nome:</strong> {$input['nome']}</p>
    <p><strong>E-mail:</strong> {$input['email']}</p>
    <p><strong>Telefone:</strong> {$input['telefone']}</p>
    <p><strong>Serviço:</strong> {$input['servico']}</p>
    <p><strong>Mensagem:</strong> {$input['mensagem']}</p>
</body>
</html>
";

// Enviar email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'E-mail enviado com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar e-mail']);
}
?>
*/

// ===========================================
// INSTRUÇÕES DE CONFIGURAÇÃO
// ===========================================

/*
PASSO A PASSO PARA CONFIGURAR:

1. EMAILJS (Recomendado para iniciantes):
   - Crie conta em emailjs.com
   - Configure um serviço de email
   - Crie um template
   - Substitua as constantes no código
   - Adicione o script do EmailJS no HTML

2. NETLIFY FORMS (Para sites no Netlify):
   - Deploy no Netlify
   - Adicione atributos data-netlify="true" no form
   - Configure notificações no painel

3. FORMSPREE (Alternativa simples):
   - Crie conta em formspree.io
   - Obtenha o endpoint
   - Substitua no código

4. BACKEND PERSONALIZADO:
   - Configure servidor PHP/Node.js
   - Implemente o endpoint
   - Configure SMTP para envio de emails

5. WHATSAPP (Backup):
   - Substitua o número de telefone
   - Funciona imediatamente
*/