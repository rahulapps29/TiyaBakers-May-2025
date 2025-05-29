const products = [
  {
    name: 'Chocolate Truffle Cake',
    images: [
      { url: '/images/chocolate-truffle.jpg', primary: true },
      { url: '/images/chocolate-truffle2.webp', primary: false },
    ],
    description:
      'Rich and moist chocolate sponge layered with creamy chocolate ganache. Perfect for birthdays and celebrations.',
    brand: 'Tiya Bakers',
    category: 'Cake',
    price: 550,
    countInStock: 8,
    rating: 4.8,
    numReviews: 18,
  },
  {
    name: 'Red Velvet Cupcake',
    images: [
      { url: '/images/red-velvet-cupcake.png', primary: true },
      { url: '/images/red-velvet-cupcake2.png', primary: false },
    ],
    description:
      'Soft and moist red velvet cupcake topped with velvety cream cheese frosting. A treat in every bite.',
    brand: 'Tiya Bakers',
    category: 'Cupcake',
    price: 90,
    countInStock: 30,
    rating: 4.7,
    numReviews: 22,
  },
  {
    name: 'Classic Butter Cookies',
    images: [{ url: '/images/butter-cookies.jpg', primary: true }],
    description:
      'Crispy, buttery cookies made with premium ingredients. Great for tea time or gifting.',
    brand: 'Tiya Bakers',
    category: 'Cookie',
    price: 150,
    countInStock: 50,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: 'Strawberry Pastry',
    images: [{ url: '/images/strawberry-pastry.jpg', primary: true }],
    description:
      'Fresh strawberry cream layered between fluffy vanilla sponge, finished with juicy strawberry glaze.',
    brand: 'Tiya Bakers',
    category: 'Pastry',
    price: 120,
    countInStock: 15,
    rating: 4.6,
    numReviews: 14,
  },
  {
    name: 'Choco Chip Muffin',
    images: [{ url: '/images/choco-chip-muffin.jpg', primary: true }],
    description:
      'Soft muffins loaded with chocolate chips, perfect for breakfast or a sweet snack on the go.',
    brand: 'Tiya Bakers',
    category: 'Muffin',
    price: 80,
    countInStock: 25,
    rating: 4.4,
    numReviews: 9,
  },
  {
    name: 'Vanilla Birthday Cake',
    images: [{ url: '/images/vanilla-cake.jpg', primary: true }],
    description:
      'Elegant vanilla sponge with layers of whipped cream and your choice of design and message. Ideal for any celebration.',
    brand: 'Tiya Bakers',
    category: 'Cake',
    price: 500,
    countInStock: 10,
    rating: 4.9,
    numReviews: 16,
  },
];

export default products;
