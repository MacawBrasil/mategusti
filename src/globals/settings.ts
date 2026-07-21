import { GlobalConfig } from 'payload'

export const settings: GlobalConfig = {
  slug: 'settings',
  label: 'Configurações',
  fields: [
    {
      type: 'upload',
      name: 'logo',
      label: 'Logo',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'upload',
      name: 'blackLogo',
      label: 'Logo Escuro',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Telefone',
      required: true,
    },
    {
      type: 'text',
      name: 'whatsapp',
      label: 'WhatsApp',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      required: true,
      admin: {
        description: 'Este e-mail também será utilizado para contato.',
      },
    },
    {
      type: 'text',
      name: 'address',
      label: 'Endereço',
      required: true,
    },
    {
      type: 'text',
      name: 'openingHours',
      label: 'Horário de Funcionamento',
      required: true,
    },
    {
      type: 'text',
      name: 'facebook',
      label: 'Facebook',
      required: true,
    },
    {
      type: 'text',
      name: 'instagram',
      label: 'Instagram',
      required: true,
    },
  ],
}
