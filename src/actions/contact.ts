'use server'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const RESEND_EMAILS_ENDPOINT = 'https://api.resend.com/emails'

function getStringValue(formData: FormData, field: string) {
  const value = formData.get(field)

  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatMessageLine(label: string, value: string) {
  return `${label}: ${value || 'Nao informado'}`
}

export async function sendContactEmail(
  recipientEmail: string,
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = getStringValue(formData, 'company')

  if (honeypot) {
    return {
      status: 'success',
      message: 'Mensagem enviada com sucesso.',
    }
  }

  const name = getStringValue(formData, 'name')
  const email = getStringValue(formData, 'email')
  const phone = getStringValue(formData, 'phone')
  const message = getStringValue(formData, 'message')

  if (!name || !phone) {
    return {
      status: 'error',
      message: 'Preencha nome e telefone para enviar.',
    }
  }

  if (email && !isValidEmail(email)) {
    return {
      status: 'error',
      message: 'Informe um e-mail valido.',
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail = recipientEmail.trim()

  if (!apiKey || !fromEmail || !toEmail) {
    console.error('Missing Resend contact form configuration.')

    return {
      status: 'error',
      message: 'Nao foi possivel enviar agora. Tente novamente mais tarde.',
    }
  }

  const subject = `Novo contato pelo site - ${name}`
  const text = [
    'Novo contato pelo site Mategusti',
    '',
    formatMessageLine('Nome', name),
    formatMessageLine('E-mail', email),
    formatMessageLine('Telefone', phone),
    formatMessageLine('Mensagem', message),
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; color: #4C1514; line-height: 1.5;">
      <h1 style="font-size: 20px;">Novo contato pelo site Mategusti</h1>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email || 'Nao informado')}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(message || 'Nao informado').replace(/\n/g, '<br />')}</p>
    </div>
  `

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email || undefined,
      subject,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Resend contact email failed.', errorBody)

    return {
      status: 'error',
      message: 'Nao foi possivel enviar agora. Tente novamente mais tarde.',
    }
  }

  return {
    status: 'success',
    message: 'Mensagem enviada com sucesso.',
  }
}
