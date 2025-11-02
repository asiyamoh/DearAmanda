interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer
      className={`text-center text-sm md:text-base text-slateGray/60 font-sans pb-6 ${className}`}
    >
      You are loved and doing amazing things.
    </footer>
  );
}
