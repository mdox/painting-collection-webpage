import { twMerge } from "tailwind-merge";

interface TextInputProps {
  maxLength?: number;
  value?: string;
  className?: string;
  onChange?(newValue: string): void;
}

const TextInput = (props: TextInputProps) => {
  return (
    <input
      type="text"
      maxLength={props.maxLength}
      value={props.value}
      className={twMerge(
        "rounded border p-2 outline-none",
        "min-h-[44px]",
        "text-base",
        "bg-input",
        "text-input-text",
        "border-input-border",
        "focus-within:bg-input-focus",
        "focus-within:border-input-border-focus",
        props.className
      )}
      onChange={(e) => props.onChange?.(e.currentTarget.value)}
    />
  );
};

export default TextInput;
