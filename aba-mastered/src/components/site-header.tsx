import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-10 bg-[linear-gradient(to_bottom,#64748b_0%,#94a3b8_30%,#cbd5e1_55%,#f1f5f9_78%,#ffffff_100%)] shadow-sm shadow-slate-200/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 pb-40 pt-2 sm:px-6 sm:pb-48">
        <Link href="/" aria-label="ABA Mastered home" className="inline-flex">
          <Image
            src="/logo-for-aba-mastered.png"
            alt="ABA Mastered logo"
            width={1536}
            height={1024}
            priority
            className="h-56 w-auto object-contain sm:h-64"
          />
        </Link>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-24 h-24 bg-gradient-to-b from-white via-white/80 to-transparent"
      />
    </header>
  );
}
