interface LogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}

/** Geometric balance mark: inflow / outflow meeting at saldo. */
export function Logo({
  className = "",
  markClassName = "h-8 w-8",
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-fg ${className}`}>
      <svg
        className={markClassName}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left zone — income */}
        <rect
          x="5"
          y="6"
          width="9"
          height="20"
          rx="2"
          className="fill-income/90"
        />
        {/* Right zone — expenses */}
        <rect
          x="18"
          y="6"
          width="9"
          height="20"
          rx="2"
          className="fill-expense/85"
        />
        {/* Central saldo intersection */}
        <rect
          x="11"
          y="13"
          width="10"
          height="6"
          rx="1.5"
          className="fill-saldo"
        />
        {/* Balance notch */}
        <circle cx="16" cy="16" r="1.6" className="fill-bg-elevated" />
      </svg>
      {showWordmark ? (
        <span className="font-display text-[1.35rem] font-semibold tracking-[-0.02em] leading-none">
          Saldo
        </span>
      ) : null}
    </span>
  );
}
