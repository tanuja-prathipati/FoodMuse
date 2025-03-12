import React, { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = "7027877e32824be4bf0f2a81e8ada389";



const userHealthProfile = {
    height: "170cm",
    weight: "65kg",
    dietaryPreferences: ["vegetarian", "dairyFree", "lowCarb"],
    // healthConditions: ["diabetes", "high_bp", "heart_disease", "low_bp"],
    healthConditions: ["diabetes", "heart_disease"],
    fitnessGoal: "Lose Weight"
  };

const nutrientConstraints: Record<string, any> = {
  diabetes: { minSugar: 5 },
  high_bp: { maxSodium: 500 },
  heart_disease: { maxSaturatedFat: 5 },
  low_bp: { minSodium: 300 },
};

export function HealthRecipes() {
  const [healthRecipes, setHealthRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealthRecipes();
  }, []);

  const fetchHealthRecipes = async () => {
    setLoading(true);
    setError(null);

    let nutrientParams: Record<string, any> = {};
    userHealthProfile.healthConditions.forEach((condition) => {
      if (nutrientConstraints[condition]) {
        nutrientParams = { ...nutrientParams, ...nutrientConstraints[condition] };
      }
    });

    try {
      const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
        params: {
          apiKey: API_KEY,
          number: 10,
          diet: userHealthProfile.dietaryPreferences.join(","),
          ...nutrientParams,
        },
      });

      setHealthRecipes(response.data.results);
    } catch (err) {
      setError("Failed to fetch health-based recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recipes Based On Your Health Profile </h1>
      {loading && <p className="text-emerald-600">Loading recipes...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer"
          >
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h4 className="font-semibold text-lg mb-2">{recipe.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
