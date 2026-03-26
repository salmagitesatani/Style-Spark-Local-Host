import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

interface ColorResultProps {
  palette: string;
  onContinue: () => void;
}

const paletteInfo = {
  winter: {
    title: "Winter Palette",
    description: "You shine in high-contrast, cool, and saturated colors.",
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Icy Pink", hex: "#F8C8DC" },
      { name: "Emerald", hex: "#50C878" },
      { name: "Cyan", hex: "#00FFFF" },
      { name: "Magenta", hex: "#FF00FF" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Royal Blue", hex: "#002366" },
      { name: "Black", hex: "#000000" },


    ],
    bestColors: "Cool Colors, Jewel Tones, Cool Neutrals, Icy Pastels, and Metallics",
    avoid: "Warm Colors, Earthy Tones, and Muted colors",
  },
  summer: {
    title: "Summer Palette",
    description: "You look best in cool, soft, and muted tones.",
    colors: [
      { name: "Soft Beige", hex: "#E2DAD3" },
      { name: "Powder Pink", hex: "#FFB2D0" },
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Periwinkle", hex: "#CCCCFF" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Sage", hex: "#BCB88A" },
      { name: "Cool Grey", hex: "#8E9294" },
      { name: "Cocoa", hex: "#766a5f" },
      { name: "Raven", hex: "#727B89" },

    ],
    bestColors: "Cool Colors, Icy Pastels, and Muted Neutrals",
    avoid: "Warm Tones, Bright, Bold Colors, Harsh Contrasts, and Earth Tones",
  },
  spring: {
    title: "Spring Palette",
    description: "You glow in warm, bright, and clear colors.",
    colors: [
      { name: "Warm Beige", hex: "#F5F5DC" },
      { name: "Peach", hex: "#FFDAB9" },
      { name: "Golden Yellow", hex: "#FFDF00" },
      { name: "Coral", hex: "#FF7F50" },
      { name: "Rose Pink", hex: "#FF66CC" },
      { name: "Apple Green", hex: "#8DB600" },
      { name: "Aquamarine", hex: "#7FFFD4" },
      { name: "Periwinkle", hex: "#CCCCFF" },
      { name: "Black-Violet", hex: "#632673" },
    ],
    bestColors: "Warm Colors, Light colors, and Soft Neutrals",
    avoid: "Cool Tones, Harsh Blacks, Jewel Tones, Muted Colors, and Grayish Browns",
  },
  autumn: {
    title: "Autumn Palette",
    description: "You shine in rich, warm, and earthy tones.",
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Mustard", hex: "#E1AD01" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Burnt Orange", hex: "#CC5500" },
      { name: "Olive Green", hex: "#808000" },
      { name: "Deep Teal", hex: "#014D4E" },
      { name: "Group", hex: "#6F2DA8" },
      { name: "Chocolate", hex: "#7B3F00" },
    ],
    bestColors: "Earthy Greens, Warm colors, Mustard Yellow, and Burnt Orange",
    avoid: "Cool Tones, Pastels, Bright White, and Cool Metallics",
  },
};

export function ColorResult({ palette, onContinue }: ColorResultProps) {
  const navigate = useNavigate();

  const info = paletteInfo[palette as keyof typeof paletteInfo] || paletteInfo.winter;

  const handleContinue = () => {
    onContinue(); // Fix: Actually call the prop here
    navigate("/style-selection");
  };

  return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-5xl text-primary mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {info.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              {info.description}
            </p>
          </div>

          <Card className="shadow-xl border-border/50 mb-6">
            <CardContent className="pt-8">
              <h3 className="text-xl mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                Your Perfect Colour Palette
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {info.colors.map((colour) => (
                    <div key={colour.name} className="text-center">
                      <div
                          className="w-full aspect-square rounded-2xl mb-2 shadow-md border-2 border-white"
                          style={{ backgroundColor: colour.hex }}
                      />
                      <p className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {colour.name}
                      </p>
                    </div>
                ))}
              </div>

              <div className="space-y-4 bg-secondary/30 rounded-lg p-6">
                <div>
                  <p className="font-medium text-primary mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    ✨ Best Colors for You
                  </p>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                    {info.bestColors}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-primary mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    💭 Colors to Avoid
                  </p>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                    {info.avoid}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
              onClick={handleContinue}
              className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
              style={{ fontFamily: 'var(--font-body)' }}
          >
            Continue to Style Selection ✨
          </Button>
        </div>
      </div>
  );
}