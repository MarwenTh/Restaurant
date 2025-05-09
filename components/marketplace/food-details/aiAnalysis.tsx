"use client";
import { useState, useEffect, useRef } from "react";
import { MenuItem } from "@/interface";
import { Loader2, RefreshCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  foodItem: MenuItem;
};

const AiAnalysis = ({ foodItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, loading]);

  const detectLanguage = async (text: string) => {
    try {
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
                    text: `Detect the language of this text and respond with only the language name in English (e.g., "English", "Spanish", "French", etc.): "${text}"`,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        return "English"; // Default to English if detection fails
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts[0]?.text?.trim() || "English";
    } catch (error) {
      console.error("Error detecting language:", error);
      return "English"; // Default to English if detection fails
    }
  };

  const generateInitialAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);

      const prompt = `Generate a concise, appetizing description for this food item (keep it under 150 words): 
        Name: ${foodItem.name}
        Description: ${foodItem.description}
        Category: ${foodItem.category.join(", ")}
        Ingredients: ${foodItem.ingredients?.join(", ") || "Not specified"}
        Dietary Info: ${foodItem.dietaryInfo?.isVegetarian ? "Vegetarian, " : ""}${foodItem.dietaryInfo?.isVegan ? "Vegan, " : ""}${foodItem.dietaryInfo?.isGlutenFree ? "Gluten Free" : ""}
        Spicy: ${foodItem.isSpicy ? "Yes" : "No"}
        Calories: ${foodItem.calories || "Not specified"}
        
        Please provide a natural, conversational description that highlights the flavors, textures, and unique aspects of this dish. Include suggestions for what occasions it would be perfect for and what it pairs well with. Do not use markdown formatting like ** or * in your response.`;

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
        let cleanText = data.candidates[0].content.parts[0].text
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .replace(/`/g, "");

        setMessages([
          {
            role: "assistant",
            content: cleanText,
          },
        ]);
      } else {
        throw new Error("Invalid response format from AI API");
      }
    } catch (err) {
      console.error("Error generating AI description:", err);
      setError("Failed to generate AI description. Please try again later.");
      setMessages([
        {
          role: "assistant",
          content:
            "This delicious dish is prepared with the finest ingredients and cooked to perfection. Each bite is a burst of flavor that will leave you wanting more.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    setUserInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      setLoading(true);
      setError(null);

      // Detect the language of the user's message
      const detectedLanguage = await detectLanguage(userMessage);

      // Check if the message is an acknowledgment
      const isAcknowledgment =
        /^(thanks|thank you|thank|gracias|merci|danke|ありがとう|谢谢|감사합니다)/i.test(
          userMessage.toLowerCase(),
        );

      const prompt = `You are a food expert assistant. The user is asking about this dish in ${detectedLanguage}. Please respond in the same language (${detectedLanguage}).

        Dish Information:
        Name: ${foodItem.name}
        Description: ${foodItem.description}
        Category: ${foodItem.category.join(", ")}
        Ingredients: ${foodItem.ingredients?.join(", ") || "Not specified"}
        Dietary Info: ${foodItem.dietaryInfo?.isVegetarian ? "Vegetarian, " : ""}${foodItem.dietaryInfo?.isVegan ? "Vegan, " : ""}${foodItem.dietaryInfo?.isGlutenFree ? "Gluten Free" : ""}
        Spicy: ${foodItem.isSpicy ? "Yes" : "No"}
        Calories: ${foodItem.calories || "Not specified"}

        User's message: ${userMessage}

        ${
          isAcknowledgment
            ? `The user is just acknowledging your previous response. Respond with a simple acknowledgment like "You're welcome!" or "Happy to help!" in ${detectedLanguage}. Keep it very brief and don't provide additional information.`
            : `Please provide a helpful, informative response about this dish in ${detectedLanguage}. Keep your response concise and natural. Do not use markdown formatting.`
        }`;

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
        let cleanText = data.candidates[0].content.parts[0].text
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .replace(/`/g, "");

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: cleanText },
        ]);
      } else {
        throw new Error("Invalid response format from AI API");
      }
    } catch (err) {
      console.error("Error generating AI response:", err);
      setError("Failed to generate AI response. Please try again later.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble generating a response right now. Please try asking your question again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateInitialAnalysis();
  }, [foodItem]);

  const isRTL = (text: string) => {
    // Check if the text contains Arabic characters or other RTL scripts
    return /[\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(
      text,
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-medium mb-6 font-playfair">
        Chat with our AI about this dish
      </h3>

      <div className="flex flex-col h-[400px]">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 scroll-smooth"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                message.role === "user"
                    ? "bg-[#D4AF37] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                dir={isRTL(message.content) ? "rtl" : "ltr"}
                style={{
                  textAlign: isRTL(message.content) ? "right" : "left",
                  fontFamily: isRTL(message.content)
                    ? "'Noto Sans Arabic', sans-serif"
                    : "inherit",
                }}
              >
                <p className="whitespace-pre-line leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Ask about this dish..."
            className="flex-1"
            dir="auto"
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading || !userInput.trim()}
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
          <Button
            onClick={generateInitialAnalysis}
            className="mt-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default AiAnalysis;
