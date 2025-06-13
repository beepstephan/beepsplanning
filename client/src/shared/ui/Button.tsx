import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`p-2 rounded text-white transition ${className}`}
      {...props}
    />
  );
}
