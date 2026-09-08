import { DiningOutlet } from '../types/hotel';

export const diningOutlets: DiningOutlet[] = [
  {
    id: 'citrus-terrace',
    name: 'The Citrus Terrace',
    slug: 'the-citrus-terrace',
    tagline: 'Al fresco California garden dining under shaded olive canopies',
    hours: 'Breakfast 7:00 AM – 11:00 AM | Lunch 12:00 PM – 3:30 PM | Dinner 5:30 PM – 10:00 PM',
    dressCode: 'Resort casual',
    description: 'Surrounded by century-old olive trees and citrus planters, The Citrus Terrace celebrates coastal California agriculture. Open-fire wood grilling, estate olive oil tastings, and produce sourced directly from nearby Santa Monica and Ojai farmers markets.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    menu: [
      {
        category: 'Morning Fare',
        items: [
          { name: 'Valencia Citrus Brioche French Toast', description: 'Caramelized Meyer lemon curd, whipped crème fraîche, candied kumquats', price: 22, dietary: 'Vegetarian' },
          { name: 'Santa Barbara Smoked Salmon Tartine', description: 'Seeded country levain, dill mascarpone, pickled shallots, caperberries', price: 26 },
          { name: 'Heirloom Grain Avocado Bowl', description: 'Poached farm egg, sprouted farro, charred scallion chimichurri, watermelon radish', price: 21, dietary: 'Gluten-Free, Vegetarian' },
          { name: 'Pastured Eggs Benedict', description: 'Niman Ranch smoked pork loin, hollandaise, blood orange micro-greens', price: 24 }
        ]
      },
      {
        category: 'Midday & Evening',
        items: [
          { name: 'Charred Spanish Octopus', description: 'Fingerling potatoes, Spanish chorizo emulsion, pimentón de la Vera, garden citrus', price: 28, dietary: 'Gluten-Free' },
          { name: 'Santa Monica Farmers Market Lettuces', description: 'Shaved raw fennel, Cara Cara orange segments, sheep milk pecorino, citrus vinaigrette', price: 19, dietary: 'Vegetarian' },
          { name: 'Wood-Grilled Pacific Halibut', description: 'Braised baby leeks, saffron fumet, preserved lemon and herb salsa verde', price: 44, dietary: 'Gluten-Free' },
          { name: 'Prime Creekstone Ribeye (14 oz)', description: 'Bone marrow butter, blistered shishito peppers, chimichurri, smoked sea salt', price: 62, dietary: 'Gluten-Free' },
          { name: 'Handcrafted Casarecce Pasta', description: 'Wild morel mushrooms, black truffle butter, aged parmesan, lemon zest', price: 34, dietary: 'Vegetarian' }
        ]
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Warm Olive Oil & Citrus Cake', description: 'Rosemary gelato, honeycomb crunch, macerated Burbank figs', price: 16, dietary: 'Vegetarian' },
          { name: 'Valrhona Dark Chocolate Ganache Tart', description: 'Sea salt flakes, candied blood orange peel, espresso foam', price: 16, dietary: 'Vegetarian' }
        ]
      }
    ]
  },
  {
    id: 'shade-lounge',
    name: 'Shade Poolside Lounge & Bar',
    slug: 'shade-poolside-lounge',
    tagline: 'Artisanal mezcals, cold-pressed spritzes, and poolside crudos',
    hours: 'Daily 11:00 AM – 11:00 PM | Poolside Food Service 11:30 AM – 8:00 PM',
    dressCode: 'Swimwear with casual coverup',
    description: 'Nestled between the 75-foot resort pool and lush palm foliage, Shade Lounge is our daytime refuge and evening rendezvous. Sip low-intervention California wines, bespoke agave spirits, and enjoy light crudos right on your sun lounger.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    menu: [
      {
        category: 'Poolside Crudo & Small Plates',
        items: [
          { name: 'Pacific Yellowtail Ceviche', description: 'El Royale aguachile, diced jicama, serrano chili, avocado, blue corn chips', price: 24, dietary: 'Gluten-Free' },
          { name: 'Chilled Baja White Prawns', description: 'Horseradish cocktail sauce, charred lemon cheek, smoked paprika', price: 26, dietary: 'Gluten-Free' },
          { name: 'Crispy Squash Blossom Tempura', description: 'Herbed goat cheese stuffing, local wildflower honey drizzle', price: 18, dietary: 'Vegetarian' },
          { name: 'Wagyu Smash Sliders (2)', description: 'Aged white cheddar, caramelized shallot aioli, house milk buns, duck fat fries', price: 23 }
        ]
      },
      {
        category: 'Craft Cocktails & Spritzes',
        items: [
          { name: 'El Royale Hotel Spritz', description: 'Amaro Nonino, freshly pressed Valencia orange, prosecco, rosemary sprig', price: 19 },
          { name: 'NoHo Mezcalita', description: 'Siete Misterios Doba-Yej, charred pineapple shrub, lime, agave, sal de gusano', price: 20 },
          { name: 'California Olive Grove Martini', description: 'St. George Botanivore gin, vermouth blanc, Castelvetrano olive brine, citrus twist', price: 21 },
          { name: 'Canyon Hibiscus Zero-Proof Spritz', description: 'Wild hibiscus cordial, blood orange, clarified mint soda, lime wheel', price: 14, dietary: 'Non-Alcoholic' }
        ]
      }
    ]
  },
  {
    id: 'tangerine-pantry',
    name: 'El Royale Pantry & Espresso',
    slug: 'tangerine-pantry-espresso',
    tagline: 'Specialty pour-overs, fresh morning pastries, and curated provisions',
    hours: 'Daily 6:30 AM – 4:00 PM',
    dressCode: 'Casual',
    description: 'The morning pulse of the resort. Serving beans roasted locally in the Arts District, buttery pastries laminated fresh at 5:00 AM, pressed juices, and artisanal provisions perfect for day trips into the canyon trails.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    menu: [
      {
        category: 'Coffee & Botanicals',
        items: [
          { name: 'Single Origin Ethiopia Yirgacheffe Pour-Over', description: 'Floral jasmine, peach blossom, bright bergamot acidity', price: 7 },
          { name: 'Orange Blossom Honey Cortado', description: 'Espresso with warm steamed oat milk and local orange blossom infusion', price: 6.5 },
          { name: 'Matcha Citrus Tonic', description: 'Uji ceremonial grade matcha, tonic water, fresh yuzu squeeze', price: 8 },
          { name: 'Cold-Pressed Valencia & Ginger Juice', description: 'Pure 100% California Valencia orange, organic Peruvian ginger', price: 9, dietary: 'Vegan' }
        ]
      },
      {
        category: 'Morning Bakes & Provisions',
        items: [
          { name: 'Cardamom & Blood Orange Morning Bun', description: 'Flaky laminated dough, orange sugar crust, ground green cardamom', price: 6.5, dietary: 'Vegetarian' },
          { name: 'Almond Frangipane Croissant', description: 'Twice-baked butter croissant filled with toasted California almond cream', price: 7, dietary: 'Vegetarian' },
          { name: 'House Granola & Greek Yogurt Parfait', description: 'Toasted pepitas, wild buckwheat honey, macerated organic blackberries', price: 12, dietary: 'Gluten-Free, Vegetarian' }
        ]
      }
    ]
  }
];
