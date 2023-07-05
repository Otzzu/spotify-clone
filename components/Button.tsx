import { forwardRef } from "react"
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, type='button', disabled, ...props }, ref) => (
    <button className={twMerge('w-full bg-green-500 rounded-full px-3 py-3 font-bold text-black border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 transition', className)} type={type} ref={ref} disabled={disabled} {...props}>
        {children}
    </button>
))

Button.displayName = 'Button'

export default Button