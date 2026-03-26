import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Check } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router";

interface StyleSelectionProps {
  onComplete: (style: string) => void;
}

const styles = [
  {
    id: "coquette",
    name: "Coquette",
    description: "Bows, ribbons, soft pinks, and romantic vintage vibes",
    image: "https://images.unsplash.com/photo-1558350499-3c74b90f4b78?w=400&h=500&fit=crop",
  },
  {
    id: "vintage",
    name: "Vintage Glam",
    description: "Old Hollywood elegance with timeless sophistication",
    image: "https://images.unsplash.com/photo-1617790274211-cbe0e677b425?w=400&h=500&fit=crop",
  },
  {
    id: "romantic",
    name: "Romantic",
    description: "Flowing fabrics, florals, and dreamy silhouettes",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
  },
  {
    id: "cottage",
    name: "Cottage Core",
    description: "Whimsical, nature-inspired with soft feminine touches",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
  },
  {
    id: "soft",
    name: "Soft Girl",
    description: "Pastel colors, cozy knits, and gentle aesthetics",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop",
  },
  {
    id: "parisian",
    name: "Parisian Chic",
    description: "Effortless elegance with neutral tones and classic pieces",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
  },
];

export function StyleSelection({ onComplete }: StyleSelectionProps) {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const handleContinue = () => {
    if (selectedStyle) {
      onComplete(selectedStyle);
      navigate("/style");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 
            className="text-4xl text-primary mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Choose Your Style
          </h2>
          <p 
            className="text-muted-foreground"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Select the aesthetic that speaks to your soul
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {styles.map((style) => (
            <Card
              key={style.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedStyle === style.id
                  ? "ring-2 ring-primary shadow-xl"
                  : "border-border/50"
              }`}
              onClick={() => setSelectedStyle(style.id)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedStyle === style.id && (
                    <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-2">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 
                    className="text-xl mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {style.name}
                  </h3>
                  <p 
                    className="text-sm text-muted-foreground"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {style.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <Button
            onClick={handleContinue}
            disabled={!selectedStyle}
            className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Continue to AI Styling ✨
          </Button>
        </div>
      </div>
    </div>
  );
}