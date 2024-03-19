import { 
  FormControl, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "./form"
import { Input } from "./input"

type FormItemProps = {
  label: string,
  input: {
    name: string,
    placeholder?: string,
    autoCorrect?: boolean | 'false',
    autoComplete?: boolean | 'true',
    accept?: string,
    type?: string,
    ref?: any
  },
}

export const FormFieldItem = ({ 
  label,
  input,
  ...props
}: FormItemProps) => {
  return (
    <FormItem>
      <FormLabel>
        {label}
      </FormLabel>
      <FormControl>
        <Input 
          name={input.name}
          placeholder={input.placeholder}
          autoCorrect={`${input.autoCorrect}`}
          autoComplete={`${input.autoComplete}`}
          spellCheck="false"
          accept={input.accept}
          ref={input.ref}
          type={input.type}
          {...props}
        />
      </FormControl>
      <FormMessage/>
      { }
    </FormItem>
  )
}