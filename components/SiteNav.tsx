import Image from "next/image";
import Link from "next/link";

export default function SiteNav({ note }: { note?: string }) {
  return (
    <nav className="border-b border-grove-border bg-grove-panel/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Hirpa SciML Academy logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-white">Hirpa SciML Academy</span>
        </Link>
        <div className="flex items-center gap-5 text-sm text-slate-400">
          {note && <span className="hidden sm:inline text-slate-500">{note}</span>}
          <Link href="/learn" className="hover:text-white">
            Lessons
          </Link>
          <Link href="/lab" className="hover:text-white">
            Math Lab
          </Link>
          <Link href="/medtech" className="hover:text-white">
            MedTech
          </Link>
        </div>
      </div>
    </nav>
  );
}
