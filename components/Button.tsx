import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  hidden?: boolean;
  disabled?: boolean;

  small?: boolean;
  narrow?: boolean;

  circular?: boolean;
  rectangular?: boolean;

  primary?: boolean;
  danger?: boolean;
  warning?: boolean;

  className?: string;
  children?: ReactNode;
  onClick?(): void;
}

export default function Button(props: ButtonProps) {
  if (props.hidden) return null;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    props.onClick?.();
  };

  return (
    <button
      disabled={props.disabled}
      className={twMerge(
        "relative flex items-center justify-center",
        "rounded outline-none",
        "px-3 py-2",
        "shadow",
        !props.disabled && "active:shadow-md",
        "text-base font-semibold uppercase",
        "text-button-normal-text",
        "bg-button-normal",
        props.disabled
          ? clsx(
              "text-button-normal-disabled-text",
              "bg-button-normal-disabled"
            )
          : clsx(
              "hover:bg-button-normal-hover",
              "active:bg-button-normal-active",
              "focus:bg-button-normal-focus"
            ),
        props.narrow && "p-0",
        props.small && "text-sm",
        props.small && "px-2 py-1",
        props.circular && "rounded-full",
        props.rectangular && "rounded-none",
        props.primary &&
          clsx(
            "text-button-primary-text",
            "bg-button-primary",
            props.disabled
              ? clsx(
                  "text-button-primary-disabled-text",
                  "bg-button-primary-disabled"
                )
              : clsx(
                  "hover:bg-button-primary-hover",
                  "active:bg-button-primary-active",
                  "focus:bg-button-primary-focus"
                )
          ),
        props.danger &&
          clsx(
            "text-button-danger-text",
            "bg-button-danger",
            props.disabled
              ? clsx(
                  "text-button-danger-disabled-text",
                  "bg-button-danger-disabled"
                )
              : clsx(
                  "hover:bg-button-danger-hover",
                  "active:bg-button-danger-active",
                  "focus:bg-button-danger-focus"
                )
          ),
        props.warning &&
          clsx(
            "text-button-warning-text",
            "bg-button-warning",
            props.disabled
              ? clsx(
                  "text-button-warning-disabled-text",
                  "bg-button-warning-disabled"
                )
              : clsx(
                  "hover:bg-button-warning-hover",
                  "active:bg-button-warning-active",
                  "focus:bg-button-warning-focus"
                )
          ),
        props.className
      )}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
