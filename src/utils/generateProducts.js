const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Automotive',
  'Health',
  'Food & Beverage'
];

const adjectives = [
  'Premium', 'Luxury', 'Essential', 'Classic', 'Modern',
  'Professional', 'Elegant', 'Durable', 'Compact', 'Advanced'
];

const generateRandomPrice = () => {
  return (Math.random() * 990 + 10).toFixed(2);
};

const generateRandomRating = () => {
  return {
    rate: (Math.random() * 3 + 2).toFixed(1),
    count: Math.floor(Math.random() * 1000 + 50)
  };
};

export const generateProducts = (count = 100) => {
  const products = [];
  
  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    products.push({
      id: i + 20,
      title: `${adjective} ${category} Item ${i}`,
      price: generateRandomPrice(),
      description: `High-quality ${category.toLowerCase()} product with premium features.`,
      category: category,
      image: `https://picsum.photos/id/${i + 100}/200/200`,
      rating: generateRandomRating()
    });
  }
  
  return products;
}; 