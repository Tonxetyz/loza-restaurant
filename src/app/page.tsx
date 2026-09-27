import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Truck } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { getDishes } from "@/lib/data";
import { PopularDishes } from "@/components/menu/popular-dishes";

export default async function Home() {
  const dishes = await getDishes();
  const popular = dishes.filter((d) => ["d11", "d13", "d17", "d6", "d19", "d3"].includes(d.id));

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/20" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-28 sm:px-6 sm:py-36">
          <span className="rounded-full bg-card/15 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur">
            Гриль на углях · Средиземноморская кухня
          </span>
          <h1 className="mt-6 max-w-xl font-display text-4xl font-bold text-primary-foreground sm:text-5xl">
            Вкус, который хочется разделить
          </h1>
          <p className="mt-4 max-w-lg text-primary-foreground/85">
            Ресторан «Лоза» — сезонные продукты, авторские рецепты и гриль на живом огне.
            Доставка и самовывоз каждый день с 11:00 до 23:00.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu" className={buttonClasses("primary", "lg")}>
              Смотреть меню <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted-bg">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 sm:grid-cols-3">
          <Feature icon={<Truck size={20} />} title="Быстрая доставка" text="Привозим за 40–60 минут по городу" />
          <Feature icon={<Clock size={20} />} title="Работаем ежедневно" text="С 11:00 до 23:00, без выходных" />
          <Feature icon={<MapPin size={20} />} title="Самовывоз" text="Заберите заказ из ресторана без ожидания" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Популярное</h2>
            <p className="mt-2 text-muted">Блюда, которые чаще всего заказывают гости</p>
          </div>
          <Link
            href="/menu"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            Всё меню <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8">
          <PopularDishes dishes={popular} />
        </div>
      </section>

      <section id="about" className="border-t border-border bg-muted-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80"
              alt="Интерьер ресторана «Лоза»"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">О ресторане</h2>
            <p className="mt-4 text-muted">
              «Лоза» открылась в 2019 году как небольшой семейный проект — сегодня это
              ресторан, куда приходят за настоящим вкусом гриля и домашней атмосферой.
              Мы работаем только со свежими сезонными продуктами и готовим на открытом огне.
            </p>
            <p className="mt-4 text-muted">
              Наша команда — шеф-повара с опытом работы в Грузии и Средиземноморье. Каждое
              блюдо в меню — результат многолетней практики и любви к своему делу.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-primary">
        {icon}
      </span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted">{text}</p>
      </div>
    </div>
  );
}
