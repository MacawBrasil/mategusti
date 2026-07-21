'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import type { ContactFormState } from '@/actions/contact'
import { Button } from './ui/button'

type ContactFormProps = {
  action: (state: ContactFormState, formData: FormData) => Promise<ContactFormState>
}

const initialState: ContactFormState = {
  status: 'idle',
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="solid"
      size="sm"
      disabled={pending}
      className="group ml-auto cursor-pointer"
    >
      {pending ? 'Enviando' : 'Enviar'}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="12"
        viewBox="0 0 40 12"
        fill="none"
        className="transition-all group-hover:[&_path]:fill-[#21AA50] group-active:[&_path]:fill-[#147E35]"
      >
        <path
          d="M39.7086 5.38264L33.8521 0.256595C33.4613 -0.0855315 32.8267 -0.0855315 32.4343 0.256595C32.0435 0.598721 32.0435 1.15431 32.4343 1.49644L36.5758 5.12239H34.7789C31.0065 5.12239 29.046 6.55084 27.3159 7.81261C25.636 9.03783 24.1848 10.0964 21.1355 10.0964C18.0861 10.0964 16.6366 9.03783 14.955 7.81261C13.2266 6.5523 11.2661 5.12239 7.49199 5.12239C4.03353 5.12239 2.14816 6.28035 0.36466 7.56991C-0.0628459 7.8784 -0.122964 8.43107 0.229395 8.80536C0.581753 9.17819 1.21299 9.23229 1.6405 8.92233C3.24365 7.7629 4.69149 6.87688 7.49199 6.87688C10.5396 6.87688 11.9908 7.93543 13.6725 9.16065C15.4009 10.421 17.3614 11.8509 21.1355 11.8509C24.9095 11.8509 26.8684 10.4224 28.5984 9.16065C30.2784 7.93543 31.7296 6.87688 34.7789 6.87688H36.5841L32.4427 10.5028C32.0519 10.845 32.0519 11.4005 32.4427 11.7427C32.638 11.9137 32.8952 12 33.1507 12C33.4062 12 33.6634 11.9137 33.8588 11.7427L39.7069 6.62248C40.0977 6.28035 40.0977 5.72476 39.7069 5.38264H39.7086Z"
          fill="white"
        />
      </svg>
    </Button>
  )
}

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction] = useActionState(action, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <form ref={formRef} action={formAction} className="mt-8 grid max-w-xl gap-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input
        type="text"
        name="name"
        placeholder="Nome*"
        required
        className="h-11 rounded-full border border-[#21AA50] bg-white px-5 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        className="h-11 rounded-full border border-[#21AA50] bg-white px-5 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Telefone*"
        required
        className="h-11 rounded-full border border-[#21AA50] bg-white px-5 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
      />
      <textarea
        name="message"
        placeholder="Mensagem"
        rows={5}
        className="resize-none rounded-3xl border border-[#21AA50] bg-white px-5 py-4 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
      />

      {state.message ? (
        <p
          aria-live="polite"
          className={`text-sm font-semibold ${
            state.status === 'success' ? 'text-[#21AA50]' : 'text-[#ED1C24]'
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  )
}
