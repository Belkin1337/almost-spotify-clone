import { FormControl, FormItem, FormLabel, FormMessage } from "./form"
import { HTMLAttributes, ReactNode } from "react";

interface IInput extends HTMLAttributes<HTMLInputElement> {
    name: string,
    optional?: boolean,
    placeholder?: string,
    autoCorrect?: 'true' | 'false';
    autoComplete?: 'true' | 'false';
    accept?: string,
    type?: string,
    ref?: any,
}

interface IFormFieldItem {
  label?: string,
  optional?: boolean,
  children: ReactNode
}

export const FormFieldItem = ({
  label,
  children,
  optional,
  ...props
}: IFormFieldItem) => {
  return (
    <FormItem {...props}>
      {label && (
        <FormLabel>
          {label} {optional && "(опционально)"}
        </FormLabel>
      )}
      <FormControl>
        {children}
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}