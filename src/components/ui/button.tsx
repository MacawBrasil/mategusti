import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex h-12 items-center justify-center gap-4 whitespace-nowrap rounded-full px-6 text-center font-sans text-sm font-bold leading-none tracking-[2.4px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21AA50] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:gap-7 sm:px-10 sm:text-base sm:tracking-[3.2px] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border border-[#21AA50] bg-transparent text-[#21AA50] hover:bg-[#21AA50] hover:text-white active:bg-[#147E35] active:text-white',
        hollow:
          'border border-[#21AA50] bg-transparent text-[#21AA50] hover:bg-[#21AA50] hover:text-white active:bg-[#147E35] active:text-white',
        solid:
          'border border-[#21AA50] bg-[#21AA50] text-white hover:bg-white hover:text-[#009D4B] active:border-[#CFCFCF] active:bg-[#CFCFCF] active:text-[#009D4B]',
        outline:
          'border border-[#21AA50] bg-transparent text-[#21AA50] hover:bg-[#21AA50] hover:text-white active:bg-[#147E35] active:text-white',
        ghost: 'border border-transparent bg-transparent text-[#21AA50] hover:text-white',
        secondary:
          'border border-[#21AA50] bg-[#21AA50] text-white hover:bg-white hover:text-[#009D4B] active:border-[#CFCFCF] active:bg-[#CFCFCF] active:text-[#009D4B]',
      },
      size: {
        default: 'h-12',
        sm: 'h-10 gap-4 px-6 text-xs tracking-[2.4px] sm:px-8 sm:text-sm sm:tracking-[2.8px]',
        lg: 'h-14 px-12',
        icon: 'size-12 px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
