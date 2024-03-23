import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "./form"
import { Input } from "./input"

interface InputProps 
  extends React.HTMLAttributes<HTMLInputElement> {
    name: string,
    optional?: boolean,
    placeholder?: string,
    autoCorrect?: 'true' | 'false' | undefined; 
    autoComplete?: 'true' | 'false' | undefined;
    accept?: string,
    type?: string,
    ref?: any,
}

interface FormFieldItemProps {
  label: string,
  input: InputProps,
}

export const FormFieldItem = ({
  label,
  input,
  ...props
}: FormFieldItemProps) => {
  return (
    <FormItem>
      <FormLabel>
        {label} {input.optional && "(опционально)"}
      </FormLabel>
      <FormControl>
        <Input
          name={input.name}
          placeholder={input.placeholder}
          autoCorrect={`${input.autoCorrect}`}
          autoComplete={`${input.autoComplete}`}
          spellCheck="false"
          onChange={input.onChange}
          accept={input.accept}
          ref={input.ref}
          type={input.type}
          {...props}
        />
      </FormControl>
      <FormMessage />
      { }
    </FormItem>
  )
}