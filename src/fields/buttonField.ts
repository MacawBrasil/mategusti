import type { GroupField } from 'payload'

export function buttonField(name: string, label?: string): GroupField {
  return {
    name,
    type: 'group',
    label: label ?? 'Botão',
    localized: true,
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Título',
        required: true,
        localized: true,
      },
      {
        name: 'type',
        type: 'radio',
        label: 'Tipo de link',
        defaultValue: 'internal',
        options: [
          { label: 'Interno', value: 'internal' },
          { label: 'Externo', value: 'external' },
          { label: 'WhatsApp', value: 'whatsapp' },
        ],
      },
      {
        name: 'href',
        type: 'text',
        label: 'Link ou número',
        required: true,
        localized: true,
        admin: {
          description:
            'Para WhatsApp, informe apenas o número com DDD e código do país. Ex: 54999999999.',
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Abrir em nova aba',
        defaultValue: false,
      },
    ],
  }
}
