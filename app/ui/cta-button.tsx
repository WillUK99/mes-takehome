import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
} from "react";

function CtaLayer({
  children,
  fullWidth,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <span
      className={`relative inline-flex ${fullWidth ? "w-full" : ""}`.trim()}
    >
      <span
        className="absolute inset-0 translate-x-1 translate-y-1 rounded-none bg-cta-offset"
        aria-hidden
      />
      {children}
    </span>
  );
}

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export function CtaButton({
  className = "",
  children,
  disabled,
  type = "button",
  fullWidth,
  ...props
}: CtaButtonProps) {
  return (
    <CtaLayer fullWidth={fullWidth}>
      <button
        type={type}
        disabled={disabled}
        className={`relative rounded-none border-0 bg-cta px-6 py-2.5 text-sm font-bold text-on-cta transition hover:brightness-95 disabled:pointer-events-none disabled:opacity-60 ${
          fullWidth ? "flex w-full justify-center" : ""
        } ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    </CtaLayer>
  );
}

type CtaLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  fullWidth?: boolean;
};

export function CtaLink({
  className = "",
  children,
  fullWidth,
  ...props
}: CtaLinkProps) {
  return (
    <CtaLayer fullWidth={fullWidth}>
      <Link
        className={`relative inline-flex items-center justify-center rounded-none bg-cta px-6 py-2.5 text-sm font-bold text-on-cta transition hover:brightness-95 ${
          fullWidth ? "w-full" : ""
        } ${className}`.trim()}
        {...props}
      >
        {children}
      </Link>
    </CtaLayer>
  );
}
