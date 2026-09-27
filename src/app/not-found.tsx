import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-xl font-semibold">Страница не найдена</h1>
      <p className="mt-2 text-muted">Возможно, ссылка устарела или страница была перемещена.</p>
      <Link href="/" className={buttonClasses("primary", "md") + " mt-6"}>
        На главную
      </Link>
    </div>
  );
}
