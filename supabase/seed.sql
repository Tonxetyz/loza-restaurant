-- Run after schema.sql to load the same demo menu used in the local seed data.

insert into categories (slug, name, sort_order) values
  ('starters', 'Закуски', 1),
  ('salads', 'Салаты', 2),
  ('soups', 'Супы', 3),
  ('grill', 'Гриль и горячее', 4),
  ('pasta', 'Паста и ризотто', 5),
  ('desserts', 'Десерты', 6),
  ('drinks', 'Напитки', 7)
on conflict (slug) do nothing;

insert into dishes (category_id, slug, name, description, price, image_url, weight_grams, is_vegetarian, is_spicy) values
  ((select id from categories where slug = 'starters'), 'hummus-s-batonom', 'Хумус с гриль-батоном', 'Нежный хумус из нута, оливковое масло, паприка, теплый батон на углях.', 420, 'https://images.pexels.com/photos/6252735/pexels-photo-6252735.jpeg?auto=compress&cs=tinysrgb&w=800', 220, true, false),
  ((select id from categories where slug = 'starters'), 'syrnye-shary', 'Сырные шарики во фритюре', 'Три вида сыра, панировка из трав, соус ткемали.', 380, 'https://images.pexels.com/photos/34692572/pexels-photo-34692572.jpeg?auto=compress&cs=tinysrgb&w=800', 180, true, false),
  ((select id from categories where slug = 'starters'), 'karpaccho-iz-govyadiny', 'Карпаччо из говядины', 'Тонкие ломтики вырезки, руккола, пармезан, каперсы, трюфельное масло.', 590, 'https://images.pexels.com/photos/26932238/pexels-photo-26932238.jpeg?auto=compress&cs=tinysrgb&w=800', 150, false, false),
  ((select id from categories where slug = 'starters'), 'ostrye-krylyshki', 'Острые куриные крылышки', 'Крылышки в соусе на основе перца чили и меда, сельдерей, соус блю-чиз.', 450, 'https://images.pexels.com/photos/38366578/pexels-photo-38366578.jpeg?auto=compress&cs=tinysrgb&w=800', 300, false, true),

  ((select id from categories where slug = 'salads'), 'grecheskiy-salat', 'Греческий салат', 'Помидоры, огурцы, сыр фета, оливки каламата, красный лук, орегано.', 380, 'https://images.pexels.com/photos/34293330/pexels-photo-34293330.jpeg?auto=compress&cs=tinysrgb&w=800', 250, true, false),
  ((select id from categories where slug = 'salads'), 'cezar-s-kuricey', 'Цезарь с курицей гриль', 'Романо, куриное филе гриль, пармезан, гренки, классический соус цезарь.', 420, 'https://images.pexels.com/photos/19938473/pexels-photo-19938473.jpeg?auto=compress&cs=tinysrgb&w=800', 280, false, false),
  ((select id from categories where slug = 'salads'), 'salat-s-tuncom', 'Салат с тунцом гриль', 'Тунец на гриле, микс листьев, стручковая фасоль, яйцо пашот, оливки.', 520, 'https://images.pexels.com/photos/6544221/pexels-photo-6544221.jpeg?auto=compress&cs=tinysrgb&w=800', 260, false, false),

  ((select id from categories where slug = 'soups'), 'krem-sup-iz-tykvy', 'Крем-суп из тыквы', 'Печеная тыква, имбирь, кокосовое молоко, тыквенные семечки.', 320, 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80', 300, true, false),
  ((select id from categories where slug = 'soups'), 'solyanka', 'Сборная солянка', 'Наваристый мясной бульон, копчености, оливки, лимон, сметана.', 390, 'https://images.pexels.com/photos/30852888/pexels-photo-30852888.jpeg?auto=compress&cs=tinysrgb&w=800', 320, false, false),
  ((select id from categories where slug = 'soups'), 'harcho', 'Харчо', 'Говядина, рис, грецкий орех, острые специи, кинза.', 410, 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80', 320, false, true),

  ((select id from categories where slug = 'grill'), 'steak-ribeye', 'Стейк Рибай', 'Мраморная говядина, соус демиглас, овощи гриль.', 1590, 'https://images.pexels.com/photos/36734946/pexels-photo-36734946.jpeg?auto=compress&cs=tinysrgb&w=800', 300, false, false),
  ((select id from categories where slug = 'grill'), 'losos-na-grile', 'Лосось на гриле', 'Филе лосося, соус beurre blanc, спаржа, лимон.', 890, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80', 280, false, false),
  ((select id from categories where slug = 'grill'), 'shashlyk-iz-baraniny', 'Шашлык из баранины', 'Молодая баранина, маринад из трав, печеный картофель, соус наршараб.', 750, 'https://images.pexels.com/photos/36169141/pexels-photo-36169141.jpeg?auto=compress&cs=tinysrgb&w=800', 320, false, false),
  ((select id from categories where slug = 'grill'), 'kuritsa-tabaka', 'Курица табака', 'Цыпленок под прессом, чесночный соус, зелень, аджика.', 620, 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80', 350, false, true),
  ((select id from categories where slug = 'grill'), 'ovoshi-grile', 'Овощи гриль', 'Сезонные овощи на углях, соус на основе йогурта и трав.', 420, 'https://images.pexels.com/photos/18426530/pexels-photo-18426530.jpeg?auto=compress&cs=tinysrgb&w=800', 300, true, false),

  ((select id from categories where slug = 'pasta'), 'pasta-karbonara', 'Паста Карбонара', 'Спагетти, гуанчале, яичный желток, пармезан, черный перец.', 480, 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80', 300, false, false),
  ((select id from categories where slug = 'pasta'), 'rizotto-s-belymi-gribami', 'Ризотто с белыми грибами', 'Рис карнароли, белые грибы, пармезан, трюфельное масло.', 560, 'https://images.pexels.com/photos/11190139/pexels-photo-11190139.jpeg?auto=compress&cs=tinysrgb&w=800', 300, true, false),
  ((select id from categories where slug = 'pasta'), 'pasta-s-moreprodyktami', 'Паста с морепродуктами', 'Тальятелле, креветки, мидии, кальмар, томатный соус, чили.', 690, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80', 320, false, true),

  ((select id from categories where slug = 'desserts'), 'tiramisu', 'Тирамису', 'Классический итальянский десерт с маскарпоне и кофе.', 340, 'https://images.pexels.com/photos/35135510/pexels-photo-35135510.jpeg?auto=compress&cs=tinysrgb&w=800', 150, true, false),
  ((select id from categories where slug = 'desserts'), 'chizkeyk', 'Чизкейк Нью-Йорк', 'Нежный сырный крем, песочная основа, ягодный соус.', 360, 'https://images.pexels.com/photos/9008502/pexels-photo-9008502.jpeg?auto=compress&cs=tinysrgb&w=800', 160, true, false),
  ((select id from categories where slug = 'desserts'), 'shokoladny-fondan', 'Шоколадный фондан', 'Тёплый шоколадный кекс с жидкой начинкой, ванильное мороженое.', 380, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80', 180, true, false),

  ((select id from categories where slug = 'drinks'), 'limonad-domashniy', 'Домашний лимонад', 'Цитрусы, мята, содовая.', 250, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80', 400, true, false),
  ((select id from categories where slug = 'drinks'), 'mors-yagodny', 'Ягодный морс', 'Клюква, брусника, мед.', 220, 'https://images.pexels.com/photos/11066831/pexels-photo-11066831.jpeg?auto=compress&cs=tinysrgb&w=800', 400, true, false),
  ((select id from categories where slug = 'drinks'), 'cappuchino', 'Капучино', 'Эспрессо, взбитое молоко.', 210, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', 200, true, false)
on conflict (slug) do nothing;
