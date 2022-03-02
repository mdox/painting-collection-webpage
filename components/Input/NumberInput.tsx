import { twMerge } from "tailwind-merge";

interface NumberInputProps {
  min?: number;
  max?: number;
  value?: number;
  className?: string;
  onChange?(newValue?: number): void;
}

const NumberInput = (props: NumberInputProps) => {
  return (
    <input
      type="number"
      min={props.min}
      max={props.max}
      value={props.value ?? ""}
      className={twMerge(
        "rounded border p-2 outline-none",
        "min-h-[44px]",
        "text-base",
        "bg-input",
        "text-input-text",
        "border-input-border",
        "ring-input-ring",
        "focus-within:bg-input-focus",
        "focus-within:border-input-ring",
        "focus-within:ring-1",
        props.className
      )}
      onChange={(e) => {
        const number = parseFloat(e.currentTarget.value);
        props.onChange?.(isNaN(number) ? undefined : number);
      }}
    />
  );
};

export default NumberInput;
