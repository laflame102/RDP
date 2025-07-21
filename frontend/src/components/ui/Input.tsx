import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, onChange, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col relative">
        {label && <label className="text-sm uppercase ">{label}</label>}
        <input
          ref={ref}
          onChange={onChange}
          className={`w-full py-2.5 px-4 border-b border-stroke  ${className}`}
          placeholder="Enter"
          {...props}
        />
        {error && (
          <span className="absolute top-full text-red-600 text-xs mt-1 pl-4">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
