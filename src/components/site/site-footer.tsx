import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contacts" className="border-t border-border bg-muted-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">Лоза</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Средиземноморская и грузинская кухня, гриль на углях. Готовим из свежих
            продуктов каждый день.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium">Контакты</p>
          <p className="text-muted">г. Москва, ул. Виноградная, 12</p>
          <p className="mt-1 text-muted">+7 (495) 000-00-00</p>
          <p className="mt-1 text-muted">Ежедневно, 11:00–23:00</p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium">Навигация</p>
          <div className="flex flex-col gap-2">
            <Link href="/menu" className="text-muted hover:text-foreground">
              Меню
            </Link>
            <Link href="/cart" className="text-muted hover:text-foreground">
              Корзина
            </Link>
            <Link href="/orders" className="text-muted hover:text-foreground">
              Личный кабинет
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} Ресторан «Лоза». Все права защищены.
      </div>
    </footer>
  );
}
