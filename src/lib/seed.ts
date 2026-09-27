import type { Category, Dish } from "./types";

export const categories: Category[] = [
  { id: "c1", slug: "starters", name: "Закуски", sortOrder: 1 },
  { id: "c2", slug: "salads", name: "Салаты", sortOrder: 2 },
  { id: "c3", slug: "soups", name: "Супы", sortOrder: 3 },
  { id: "c4", slug: "grill", name: "Гриль и горячее", sortOrder: 4 },
  { id: "c5", slug: "pasta", name: "Паста и ризотто", sortOrder: 5 },
  { id: "c6", slug: "desserts", name: "Десерты", sortOrder: 6 },
  { id: "c7", slug: "drinks", name: "Напитки", sortOrder: 7 },
];

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

export const dishes: Dish[] = [
  // Закуски
  { id: "d1", categoryId: "c1", slug: "hummus-s-batonom", name: "Хумус с гриль-батоном", description: "Нежный хумус из нута, оливковое масло, паприка, теплый батон на углях.", price: 420, imageUrl: pexels("6252735"), weightGrams: 220, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d2", categoryId: "c1", slug: "syrnye-shary", name: "Сырные шарики во фритюре", description: "Три вида сыра, панировка из трав, соус ткемали.", price: 380, imageUrl: pexels("34692572"), weightGrams: 180, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d3", categoryId: "c1", slug: "karpaccho-iz-govyadiny", name: "Карпаччо из говядины", description: "Тонкие ломтики вырезки, руккола, пармезан, каперсы, трюфельное масло.", price: 590, imageUrl: pexels("26932238"), weightGrams: 150, isVegetarian: false, isSpicy: false, isAvailable: true },
  { id: "d4", categoryId: "c1", slug: "ostrye-krylyshki", name: "Острые куриные крылышки", description: "Крылышки в соусе на основе перца чили и меда, сельдерей, соус блю-чиз.", price: 450, imageUrl: pexels("38366578"), weightGrams: 300, isVegetarian: false, isSpicy: true, isAvailable: true },

  // Салаты
  { id: "d5", categoryId: "c2", slug: "grecheskiy-salat", name: "Греческий салат", description: "Помидоры, огурцы, сыр фета, оливки каламата, красный лук, орегано.", price: 380, imageUrl: pexels("34293330"), weightGrams: 250, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d6", categoryId: "c2", slug: "cezar-s-kuricey", name: "Цезарь с курицей гриль", description: "Романо, куриное филе гриль, пармезан, гренки, классический соус цезарь.", price: 420, imageUrl: pexels("19938473"), weightGrams: 280, isVegetarian: false, isSpicy: false, isAvailable: true },
  { id: "d7", categoryId: "c2", slug: "salat-s-tuncom", name: "Салат с тунцом гриль", description: "Тунец на гриле, микс листьев, стручковая фасоль, яйцо пашот, оливки.", price: 520, imageUrl: pexels("6544221"), weightGrams: 260, isVegetarian: false, isSpicy: false, isAvailable: true },

  // Супы
  { id: "d8", categoryId: "c3", slug: "krem-sup-iz-tykvy", name: "Крем-суп из тыквы", description: "Печеная тыква, имбирь, кокосовое молоко, тыквенные семечки.", price: 320, imageUrl: img("photo-1476718406336-bb5a9690ee2a"), weightGrams: 300, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d9", categoryId: "c3", slug: "solyanka", name: "Сборная солянка", description: "Наваристый мясной бульон, копчености, оливки, лимон, сметана.", price: 390, imageUrl: pexels("30852888"), weightGrams: 320, isVegetarian: false, isSpicy: false, isAvailable: true },
  { id: "d10", categoryId: "c3", slug: "harcho", name: "Харчо", description: "Говядина, рис, грецкий орех, острые специи, кинза.", price: 410, imageUrl: img("photo-1603105037880-880cd4edfb0d"), weightGrams: 320, isVegetarian: false, isSpicy: true, isAvailable: true },

  // Гриль и горячее
  { id: "d11", categoryId: "c4", slug: "steak-ribeye", name: "Стейк Рибай", description: "Мраморная говядина, соус демиглас, овощи гриль.", price: 1590, imageUrl: pexels("36734946"), weightGrams: 300, isVegetarian: false, isSpicy: false, isAvailable: true },
  { id: "d12", categoryId: "c4", slug: "losos-na-grile", name: "Лосось на гриле", description: "Филе лосося, соус beurre blanc, спаржа, лимон.", price: 890, imageUrl: img("photo-1467003909585-2f8a72700288"), weightGrams: 280, isVegetarian: false, isSpicy: false, isAvailable: true },
  { id: "d13", categoryId: "c4", slug: "shashlyk-iz-baraniny", name: "Шашлык из баранины", description: "Молодая баранина, маринад из трав, печеный картофель, соус наршараб.", price: 750, imageUrl: pexels("36169141"), weightGrams: 320, isVegetarian: false, isSpicy: false, isAvailable: true },
  { id: "d14", categoryId: "c4", slug: "kuritsa-tabaka", name: "Курица табака", description: "Цыпленок под прессом, чесночный соус, зелень, аджика.", price: 620, imageUrl: img("photo-1598515214211-89d3c73ae83b"), weightGrams: 350, isVegetarian: false, isSpicy: true, isAvailable: true },
  { id: "d15", categoryId: "c4", slug: "ovoshi-grile", name: "Овощи гриль", description: "Сезонные овощи на углях, соус на основе йогурта и трав.", price: 420, imageUrl: pexels("18426530"), weightGrams: 300, isVegetarian: true, isSpicy: false, isAvailable: true },

  // Паста и ризотто
  { id: "d16", categoryId: "c5", slug: "pasta-karbonara", name: "Паста Карбонара", description: "Спагетти, гуанчале, яичный желток, пармезан, черный перец.", price: 480, imageUrl: img("photo-1612874742237-6526221588e3"), weightGrams: 300, isVegetarian: false, isSpicy: false, isAvailable: true },
  { id: "d17", categoryId: "c5", slug: "rizotto-s-belymi-gribami", name: "Ризотто с белыми грибами", description: "Рис карнароли, белые грибы, пармезан, трюфельное масло.", price: 560, imageUrl: pexels("11190139"), weightGrams: 300, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d18", categoryId: "c5", slug: "pasta-s-moreprodyktami", name: "Паста с морепродуктами", description: "Тальятелле, креветки, мидии, кальмар, томатный соус, чили.", price: 690, imageUrl: img("photo-1563379926898-05f4575a45d8"), weightGrams: 320, isVegetarian: false, isSpicy: true, isAvailable: true },

  // Десерты
  { id: "d19", categoryId: "c6", slug: "tiramisu", name: "Тирамису", description: "Классический итальянский десерт с маскарпоне и кофе.", price: 340, imageUrl: pexels("35135510"), weightGrams: 150, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d20", categoryId: "c6", slug: "chizkeyk", name: "Чизкейк Нью-Йорк", description: "Нежный сырный крем, песочная основа, ягодный соус.", price: 360, imageUrl: pexels("9008502"), weightGrams: 160, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d21", categoryId: "c6", slug: "shokoladny-fondan", name: "Шоколадный фондан", description: "Тёплый шоколадный кекс с жидкой начинкой, ванильное мороженое.", price: 380, imageUrl: img("photo-1624353365286-3f8d62daad51"), weightGrams: 180, isVegetarian: true, isSpicy: false, isAvailable: true },

  // Напитки
  { id: "d22", categoryId: "c7", slug: "limonad-domashniy", name: "Домашний лимонад", description: "Цитрусы, мята, содовая.", price: 250, imageUrl: img("photo-1621263764928-df1444c5e859"), weightGrams: 400, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d23", categoryId: "c7", slug: "mors-yagodny", name: "Ягодный морс", description: "Клюква, брусника, мед.", price: 220, imageUrl: pexels("11066831"), weightGrams: 400, isVegetarian: true, isSpicy: false, isAvailable: true },
  { id: "d24", categoryId: "c7", slug: "cappuchino", name: "Капучино", description: "Эспрессо, взбитое молоко.", price: 210, imageUrl: img("photo-1509042239860-f550ce710b93"), weightGrams: 200, isVegetarian: true, isSpicy: false, isAvailable: true },
];
