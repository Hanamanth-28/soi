type FormData = {
  soilType: string
  cropType: string
  nitrogen: number
  phosphorous: number
  potassium: number
  ph: number
  humidity: number
}

type Recommendation = {
  parameter: string
  type: "success" | "warning"
  message: string
  action: string
}

export function analyzeData(data: FormData) {
  const recommendations: Recommendation[] = []

  // Check pH levels
  if (data.ph < 5.5) {
    recommendations.push({
      parameter: "Soil pH (Acidic)",
      type: "warning",
      message: `Your soil pH of ${data.ph} is too acidic for most crops. This can limit nutrient availability and affect plant growth.`,
      action:
        "Apply agricultural lime to raise pH. The recommended application rate is 2-3 tons per hectare, depending on soil type and current pH level.",
    })
  } else if (data.ph > 7.5) {
    recommendations.push({
      parameter: "Soil pH (Alkaline)",
      type: "warning",
      message: `Your soil pH of ${data.ph} is too alkaline for most crops. This can cause micronutrient deficiencies and affect plant growth.`,
      action:
        "Apply agricultural sulfur or gypsum to lower pH. For sulfur, apply 300-500 kg per hectare. For gypsum, apply 1-2 tons per hectare.",
    })
  } else {
    recommendations.push({
      parameter: "Soil pH (Optimal)",
      type: "success",
      message: `Your soil pH of ${data.ph} is within the optimal range for most crops.`,
      action: "Continue monitoring pH levels annually to ensure they remain in the optimal range.",
    })
  }

  // Check nitrogen levels
  if (data.nitrogen < 140) {
    recommendations.push({
      parameter: "Nitrogen (N) - Low",
      type: "warning",
      message: `Your nitrogen level of ${data.nitrogen} PPM is low. Nitrogen is essential for leaf and stem growth and overall plant development.`,
      action:
        "Apply nitrogen-rich fertilizers such as urea (46-0-0) at 100-150 kg per hectare or ammonium sulfate (21-0-0) at 200-300 kg per hectare. Consider split applications for better efficiency.",
    })
  } else if (data.nitrogen > 280) {
    recommendations.push({
      parameter: "Nitrogen (N) - High",
      type: "warning",
      message: `Your nitrogen level of ${data.nitrogen} PPM is high. Excessive nitrogen can lead to lush foliage but poor fruit development and increased susceptibility to pests and diseases.`,
      action:
        "Reduce nitrogen fertilizer applications. Plant cover crops like legumes that can help balance nitrogen levels. Consider crops that are heavy nitrogen feeders for the next growing season.",
    })
  } else {
    recommendations.push({
      parameter: "Nitrogen (N) - Optimal",
      type: "success",
      message: `Your nitrogen level of ${data.nitrogen} PPM is within the optimal range.`,
      action:
        "Maintain current nitrogen management practices. Apply maintenance fertilizer based on crop requirements.",
    })
  }

  // Check phosphorous levels
  if (data.phosphorous < 10) {
    recommendations.push({
      parameter: "Phosphorous (P) - Low",
      type: "warning",
      message: `Your phosphorous level of ${data.phosphorous} PPM is low. Phosphorous is critical for root development, flowering, and fruiting.`,
      action:
        "Apply phosphate fertilizers such as single superphosphate (0-16-0) at 300-400 kg per hectare or diammonium phosphate (18-46-0) at 100-150 kg per hectare.",
    })
  } else if (data.phosphorous > 25) {
    recommendations.push({
      parameter: "Phosphorous (P) - High",
      type: "success",
      message: `Your phosphorous level of ${data.phosphorous} PPM is high. While not typically harmful, excessive phosphorous can interfere with the uptake of other nutrients.`,
      action:
        "Avoid additional phosphorous applications. Consider crops with high phosphorous demands for the next growing season.",
    })
  } else {
    recommendations.push({
      parameter: "Phosphorous (P) - Optimal",
      type: "success",
      message: `Your phosphorous level of ${data.phosphorous} PPM is within the optimal range.`,
      action:
        "Maintain current phosphorous management practices. Apply maintenance fertilizer based on crop requirements.",
    })
  }

  // Check potassium levels
  if (data.potassium < 110) {
    recommendations.push({
      parameter: "Potassium (K) - Low",
      type: "warning",
      message: `Your potassium level of ${data.potassium} PPM is low. Potassium is essential for overall plant health, disease resistance, and water regulation.`,
      action:
        "Apply potassium-rich fertilizers such as muriate of potash (0-0-60) at 100-150 kg per hectare or potassium sulfate (0-0-50) at 150-200 kg per hectare.",
    })
  } else if (data.potassium > 280) {
    recommendations.push({
      parameter: "Potassium (K) - High",
      type: "success",
      message: `Your potassium level of ${data.potassium} PPM is high. While generally not harmful, excessive potassium can interfere with the uptake of other nutrients.`,
      action:
        "Avoid additional potassium applications. Consider crops with high potassium demands for the next growing season.",
    })
  } else {
    recommendations.push({
      parameter: "Potassium (K) - Optimal",
      type: "success",
      message: `Your potassium level of ${data.potassium} PPM is within the optimal range.`,
      action:
        "Maintain current potassium management practices. Apply maintenance fertilizer based on crop requirements.",
    })
  }

  // Check humidity
  if (data.humidity < 40) {
    recommendations.push({
      parameter: "Humidity - Low",
      type: "warning",
      message: `Your humidity level of ${data.humidity}% is low. Low humidity can lead to increased water stress and reduced crop yield.`,
      action:
        "Consider irrigation methods that increase humidity such as drip irrigation or micro-sprinklers. Mulching can also help retain soil moisture and increase local humidity.",
    })
  } else if (data.humidity > 80) {
    recommendations.push({
      parameter: "Humidity - High",
      type: "warning",
      message: `Your humidity level of ${data.humidity}% is high. High humidity can increase the risk of fungal diseases and affect pollination.`,
      action:
        "Ensure good air circulation by proper spacing between plants. Consider raised beds for better drainage. Monitor for fungal diseases and apply preventative fungicides if necessary.",
    })
  } else {
    recommendations.push({
      parameter: "Humidity - Optimal",
      type: "success",
      message: `Your humidity level of ${data.humidity}% is within the optimal range for most crops.`,
      action:
        "Continue monitoring humidity levels and adjust irrigation practices as needed based on weather conditions.",
    })
  }

  // Crop-specific recommendations based on soil type
  const cropSoilRecommendation = getCropSoilRecommendation(data.cropType, data.soilType)
  if (cropSoilRecommendation) {
    recommendations.push(cropSoilRecommendation)
  }

  return {
    success: true,
    recommendations: recommendations,
  }
}

function getCropSoilRecommendation(cropType: string, soilType: string): Recommendation | null {
  // This is a simplified version - in a real application, you would have a more comprehensive database
  // of crop-soil compatibility and specific recommendations

  const cropSoilMatrix: Record<string, Record<string, { suitable: boolean; message: string; action: string }>> = {
    rice: {
      clay_soil: {
        suitable: true,
        message: "Clay soil is well-suited for rice cultivation due to its water retention properties.",
        action:
          "Ensure proper leveling of fields for uniform water distribution. Add organic matter to improve soil structure over time.",
      },
      sandy_soil: {
        suitable: false,
        message: "Sandy soil is not ideal for rice cultivation due to poor water retention.",
        action:
          "Add organic matter and clay to improve water retention. Consider alternative crops better suited to sandy soils.",
      },
    },
    cotton: {
      black_soil: {
        suitable: true,
        message: "Black soil is excellent for cotton cultivation due to its moisture retention and nutrient content.",
        action:
          "Implement proper drainage to prevent waterlogging during heavy rains. Rotate with legumes to maintain soil fertility.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil can support cotton cultivation with proper management.",
        action:
          "Add organic matter to improve water retention. Apply balanced fertilizers to address potential nutrient deficiencies.",
      },
    },
    wheat: {
      loamy_soil: {
        suitable: true,
        message: "Loamy soil is ideal for wheat cultivation due to its balanced properties.",
        action:
          "Maintain organic matter content through crop residue incorporation. Follow recommended fertilizer application rates.",
      },
      sandy_soil: {
        suitable: false,
        message: "Sandy soil is not ideal for wheat cultivation due to poor water and nutrient retention.",
        action:
          "Add organic matter and clay to improve soil structure. Consider alternative crops better suited to sandy soils.",
      },
    },
  }

  // Check if we have a recommendation for this crop-soil combination
  if (cropSoilMatrix[cropType]?.[soilType]) {
    const recommendation = cropSoilMatrix[cropType][soilType]
    return {
      parameter: `${getCropName(cropType)} on ${getSoilName(soilType)}`,
      type: recommendation.suitable ? "success" : "warning",
      message: recommendation.message,
      action: recommendation.action,
    }
  }

  // Generic recommendation if specific combination not found
  return {
    parameter: "Crop-Soil Compatibility",
    type: "warning",
    message: `We don't have specific data for ${getCropName(cropType)} on ${getSoilName(soilType)}. Consider consulting with a local agricultural extension service for tailored advice.`,
    action:
      "Conduct a small test plot before full-scale planting. Monitor crop performance closely and adjust practices as needed.",
  }
}

function getCropName(cropType: string): string {
  const cropMap: Record<string, string> = {
    rice: "Rice",
    wheat: "Wheat",
    maize: "Maize",
    cotton: "Cotton",
    // Add more as needed
  }
  return cropMap[cropType] || cropType.charAt(0).toUpperCase() + cropType.slice(1).replace(/_/g, " ")
}

function getSoilName(soilType: string): string {
  const soilMap: Record<string, string> = {
    black_soil: "Black Soil",
    red_soil: "Red Soil",
    clay_soil: "Clay Soil",
    sandy_soil: "Sandy Soil",
    loamy_soil: "Loamy Soil",
    // Add more as needed
  }
  return soilMap[soilType] || soilType.charAt(0).toUpperCase() + soilType.slice(1).replace(/_/g, " ")
}
