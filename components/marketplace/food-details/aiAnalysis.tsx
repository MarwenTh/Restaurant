"use client";
import { useState, useEffect } from "react";
import { MenuItem } from "@/interface";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  foodItem: MenuItem;
};

const AiAnalysis = ({ foodItem }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiDescription, setAiDescription] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  const generateAiDescription = async () => {
    try {
      setLoading(true);
      setError(null);
      setDisplayedText("");
      setTypingComplete(false);

      // Prepare the prompt for the AI
      const prompt = `Generate a concise, appetizing description for this food item (keep it under 150 words): 
        Name: ${foodItem.name}
        Description: ${foodItem.description}
        Category: ${foodItem.category.join(", ")}
        Ingredients: ${foodItem.ingredients?.join(", ") || "Not specified"}
        Dietary Info: ${foodItem.dietaryInfo?.isVegetarian ? "Vegetarian, " : ""}${foodItem.dietaryInfo?.isVegan ? "Vegan, " : ""}${foodItem.dietaryInfo?.isGlutenFree ? "Gluten Free" : ""}
        Spicy: ${foodItem.isSpicy ? "Yes" : "No"}
        Calories: ${foodItem.calories || "Not specified"}
        
        Please provide a natural, conversational description that highlights the flavors, textures, and unique aspects of this dish. Include suggestions for what occasions it would be perfect for and what it pairs well with. Do not use markdown formatting like ** or * in your response.`;

      // Call the Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        // Clean up any markdown formatting that might still be present
        let cleanText = data.candidates[0].content.parts[0].text
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .replace(/`/g, "");

        setAiDescription(cleanText);
      } else {
        throw new Error("Invalid response format from AI API");
      }
    } catch (err) {
      console.error("Error generating AI description:", err);
      setError("Failed to generate AI description. Please try again later.");
      setAiDescription(
        "This delicious dish is prepared with the finest ingredients and cooked to perfection. Each bite is a burst of flavor that will leave you wanting more.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateAiDescription();
  }, [foodItem]);

  // Typing effect
  useEffect(() => {
    if (!loading && aiDescription && !typingComplete) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < aiDescription.length) {
          setDisplayedText((prev) => prev + aiDescription[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setTypingComplete(true);
        }
      }, 15); // Slightly faster typing speed

      return () => clearInterval(interval);
    }
  }, [loading, aiDescription, typingComplete]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-medium mb-6 font-playfair">
        See what our AI thinks about this dish
      </h3>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mb-4" />
          <p className="text-muted-foreground">
            Analyzing this dish with AI...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
          <p className="mt-2 text-sm">
            An error occurred while generating the AI analysis. Please try
            again.
          </p>
          <Button
            onClick={generateAiDescription}
            className="mt-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      ) : (
        <div className="prose max-w-none">
          <p className="whitespace-pre-line text-gray-700 leading-relaxed capitalize">
            {displayedText}
          </p>

          {!typingComplete && (
            <div className="inline-block w-2 h-4 bg-[#D4AF37] animate-pulse ml-1"></div>
          )}

          {typingComplete && (
            <div className="mt-6 p-4 bg-[#D4AF37]/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Note:</span> This AI-generated
                analysis is based on the available information about this dish.
                The actual taste and experience may vary.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiAnalysis;
