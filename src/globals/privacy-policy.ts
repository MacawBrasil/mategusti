import type { GlobalConfig } from 'payload'

const textNode = (text: string) => ({
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  type: 'text',
  version: 1,
})

const paragraphNode = (text: string) => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
})

const headingNode = (text: string) => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag: 'h2',
  type: 'heading',
  version: 1,
})

const defaultContent = {
  root: {
    children: [
      headingNode('1. Dados que coletamos'),
      paragraphNode(
        'Coletamos os dados que você informa voluntariamente ao preencher formulários, entrar em contato conosco ou interagir com nossos canais digitais. Isso pode incluir nome, e-mail, telefone e mensagem.',
      ),
      paragraphNode(
        'Também podemos coletar informações técnicas básicas de navegação, como endereço IP, tipo de dispositivo, navegador e páginas acessadas, quando necessárias para segurança, funcionamento do site e melhoria da experiência.',
      ),
      headingNode('2. Como usamos seus dados'),
      paragraphNode(
        'Usamos seus dados para responder solicitações, retornar contatos, enviar informações sobre produtos e atendimento, melhorar nossos serviços e cumprir obrigações legais ou regulatórias.',
      ),
      paragraphNode(
        'Não vendemos seus dados pessoais. O envio de comunicações comerciais, quando ocorrer, será feito de forma compatível com a legislação aplicável e poderá ser interrompido mediante solicitação.',
      ),
      headingNode('3. Compartilhamento de informações'),
      paragraphNode(
        'Podemos compartilhar dados com fornecedores necessários para operação do site, hospedagem, gestão de mensagens, atendimento e segurança da informação.',
      ),
      paragraphNode(
        'Também poderemos compartilhar informações quando exigido por lei, ordem de autoridade competente ou para proteger direitos da Mategusti, de clientes e de terceiros.',
      ),
      headingNode('4. Cookies e tecnologias similares'),
      paragraphNode(
        'O site pode utilizar cookies essenciais para funcionamento, segurança e preferências de navegação. Caso ferramentas de medição ou marketing sejam utilizadas, elas poderão coletar dados agregados ou identificadores técnicos.',
      ),
      paragraphNode(
        'Você pode configurar seu navegador para bloquear cookies, mas algumas funcionalidades do site podem não operar corretamente.',
      ),
      headingNode('5. Armazenamento e segurança'),
      paragraphNode(
        'Mantemos os dados pelo tempo necessário para atender às finalidades descritas nesta política, respeitando prazos legais e necessidades legítimas de registro.',
      ),
      paragraphNode(
        'Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acessos não autorizados, perda, alteração ou divulgação indevida.',
      ),
      headingNode('6. Seus direitos'),
      paragraphNode(
        'Você pode solicitar confirmação de tratamento, acesso, correção, exclusão, portabilidade, anonimização, bloqueio ou informações sobre o compartilhamento dos seus dados, nos termos da Lei Geral de Proteção de Dados.',
      ),
      paragraphNode(
        'Também é possível solicitar a revogação de consentimentos quando o tratamento estiver baseado nessa hipótese legal.',
      ),
      headingNode('7. Atualizações desta política'),
      paragraphNode(
        'Esta política pode ser atualizada para refletir mudanças no site, em nossos processos ou em exigências legais. A versão vigente estará sempre disponível nesta página.',
      ),
      headingNode('8. Contato'),
      paragraphNode(
        'Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato pelo e-mail contato@mategusti.com.br.',
      ),
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}

export const privacyPolicy: GlobalConfig = {
  slug: 'privacyPolicy',
  label: 'Política de Privacidade',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Título',
      required: true,
      defaultValue: 'Política de Privacidade',
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Descrição curta',
      required: true,
      defaultValue:
        'Esta página explica como tratamos os dados pessoais enviados pelo site da Mategusti, especialmente por meio do formulário de contato e dos canais de atendimento.',
      admin: {
        description: 'Texto exibido no topo da página e usado como descrição de SEO.',
      },
    },
    {
      type: 'date',
      name: 'lastUpdated',
      label: 'Última atualização',
      required: true,
      defaultValue: '2026-05-25T00:00:00.000Z',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      type: 'richText',
      name: 'content',
      label: 'Conteúdo',
      required: true,
      defaultValue: defaultContent,
    },
  ],
}
