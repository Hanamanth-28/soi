export const soilTypes = [
  { value: "black_soil", label: "Black Soil (Regur)" },
  { value: "red_soil", label: "Red Soil" },
  { value: "alluvial_soil", label: "Alluvial Soil" },
  { value: "laterite_soil", label: "Laterite Soil" },
  { value: "sandy_soil", label: "Sandy Soil" },
  { value: "clay_soil", label: "Clay Soil" },
  { value: "loamy_soil", label: "Loamy Soil" },
  { value: "sandy_loam", label: "Sandy Loam" },
  { value: "silty_soil", label: "Silty Soil" },
]

export const cropCategories = [
  {
    label: "Cereals",
    crops: [
      { value: "rice", label: "Rice" },
      { value: "wheat", label: "Wheat" },
      { value: "maize", label: "Maize" },
      { value: "ragi", label: "Ragi" },
      { value: "jowar", label: "Jowar" },
    ],
  },
  {
    label: "Pulses",
    crops: [
      { value: "black_gram", label: "Black Gram" },
      { value: "green_gram", label: "Green Gram" },
      { value: "bengal_gram", label: "Bengal Gram" },
      { value: "horse_gram", label: "Horse Gram" },
      { value: "tur", label: "Tur" },
    ],
  },
  {
    label: "Oilseeds",
    crops: [
      { value: "groundnut", label: "Groundnut" },
      { value: "sunflower", label: "Sunflower" },
      { value: "soybean", label: "Soybean" },
      { value: "sesame", label: "Sesame" },
    ],
  },
  {
    label: "Commercial Crops",
    crops: [
      { value: "sugarcane", label: "Sugarcane" },
      { value: "cotton", label: "Cotton" },
    ],
  },
  {
    label: "Vegetables",
    crops: [
      { value: "tomato", label: "Tomato" },
      { value: "onion", label: "Onion" },
      { value: "green_chilli", label: "Green Chilli" },
      { value: "beans", label: "Beans" },
      { value: "brinjal", label: "Brinjal" },
    ],
  },
  {
    label: "Fruits",
    crops: [
      { value: "banana", label: "Banana" },
      { value: "mango", label: "Mango" },
      { value: "papaya", label: "Papaya" },
      { value: "grapes", label: "Grapes" },
      { value: "sapota", label: "Sapota" },
    ],
  },
]

export const soilNutrientRanges = {
  nitrogen: {
    low: { min: 0, max: 140 },
    medium: { min: 141, max: 280 },
    high: { min: 281, max: Number.POSITIVE_INFINITY },
  },
  phosphorous: {
    low: { min: 0, max: 10 },
    medium: { min: 11, max: 25 },
    high: { min: 26, max: Number.POSITIVE_INFINITY },
  },
  potassium: {
    low: { min: 0, max: 110 },
    medium: { min: 111, max: 280 },
    high: { min: 281, max: Number.POSITIVE_INFINITY },
  },
}

export const cropRequirements = {
  rice: {
    ph: { min: 5.5, max: 6.5 },
    nitrogen: "high",
    phosphorous: "medium",
    potassium: "medium",
    humidity: { min: 60, max: 80 },
  },
  wheat: {
    ph: { min: 6.0, max: 7.5 },
    nitrogen: "medium",
    phosphorous: "medium",
    potassium: "medium",
    humidity: { min: 50, max: 70 },
  },
  maize: {
    ph: { min: 5.5, max: 7.0 },
    nitrogen: "high",
    phosphorous: "medium",
    potassium: "medium",
    humidity: { min: 50, max: 75 },
  },
  // Add more crops as needed
}

export const soilProperties = {
  black_soil: {
    ph: { min: 7.5, max: 8.5 },
    nitrogen: "low",
    phosphorous: "medium",
    potassium: "high",
    characteristics: "High water retention, good for cotton and wheat",
  },
  red_soil: {
    ph: { min: 6.0, max: 6.5 },
    nitrogen: "low",
    phosphorous: "low",
    potassium: "medium",
    characteristics: "Well-drained, good for pulses and oilseeds",
  },
  // Add more soil types as needed
}
