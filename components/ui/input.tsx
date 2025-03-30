import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2
          text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm
          file:font-medium file:text-foreground placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
          md:text-sm`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

export const BottomGradient = () => {
  return (
    <>
      <span
        className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute
          h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500
          to-transparent"
      />
      <span
        className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0
          absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r
          from-transparent via-indigo-500 to-transparent"
      />
    </>
  );
};
