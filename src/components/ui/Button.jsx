import React from "react";

const Button = ({
  children,
  className = "",
  variant = "default",
  disabled = false,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all active:scale-[0.97] focus:outline-none disabled:opacity-60 disabled:pointer-events-none";

  const variants = {
    default:
      "bg-secondary text-foreground hover:bg-zinc-700 border border-white/15",
    outline: "border border-white/15 text-foreground hover:bg-zinc-800/50",
    primary: "bg-[#bf5af2] text-zinc-100 hover:bg-zinc-600",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
