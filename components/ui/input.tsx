import { cn } from "@/src/lib/utils/tailwind";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {Icon && <Icon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />}
        <input
          type={type}
          className={cn(
            `${Icon ? "pl-10 pr-3" : "px-3"} "flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
