# Добавьте сюда PNG-файлы проекта

Приложенные изображения в текущей копии исходного проекта отсутствуют: здесь находятся только SVG-заполнители в `app/assets`. Когда PNG-файлы будут переданы, положите их в эти каталоги. Код уже использует указанные публичные URL, а до добавления PNG показывает прежние SVG-иллюстрации.

## Фото мастера и изделия каталога

- `about/master.png`
- `catalog/bracelet-dark-star.png` — пробел перед `.png` в исходном списке убран
- `catalog/bracelet-lilith.png`
- `catalog/earrings-black-rose.png`
- `catalog/necklace-onyx-drop.png`
- `catalog/necklace-rose.png`

## Компоненты конструктора

- `components/bracelet/beads-black.png`
- `components/bracelet/beads-chain.png`
- `components/bracelet/beads-white.png`
- `components/bracelet/charm-angel.png`
- `components/bracelet/charm-cross.png`
- `components/bracelet/charm-him.png`
- `components/bracelet/charm-lilith.png`
- `components/bracelet/charm-oval.png`
- `components/bracelet/charm-star.png`
- `components/bracelet/clasp-bracelet.png`
- `components/bracelet/clasp-heart.png`
- `components/bracelet/clasp-magnetic.png`
- `components/necklace/beads-onyx.png`
- `components/necklace/chain-1.png`
- `components/necklace/chain-2.png`
- `components/necklace/choker.png`
- `components/necklace/clasp-bracelet.png`
- `components/necklace/clasp-magnetic.png`
- `components/necklace/pendant-cross.png`
- `components/necklace/pendant-him.png`
- `components/necklace/pendant-lilith.png`
- `components/necklace/pendant-onyx.png`
- `components/necklace/pendant-rose.png`
- `components/earrings/lock-english.png`
- `components/earrings/lock-studs.png`
- `components/earrings/stone-black-rose.png`
- `components/earrings/stone-cross.png`
- `components/earrings/stone-onyx.png`
- `components/earrings/stone-pearle.png` — сохранено написание из исходного списка
- `components/ring/profile-classic-gold.png`
- `components/ring/profile-classic-silver.png`
- `components/ring/profile-flat-gold.png`
- `components/ring/profile-flat-silver.png`
- `components/ring/stone-onyx-gold.png`
- `components/ring/stone-onyx-silver.png`
- `components/ring/stone-pearl.png`

Всего ожидается 42 PNG: 1 фото мастера, 5 фото изделий и 36 картинок компонентов. В SQL в `products.imageUrl` и `components.imageUrl` хранятся публичные пути `/assets/...`; сами бинарные изображения остаются файлами сайта, а не записываются в PostgreSQL.
