import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Sparkles, Palette, Heart, Share2, Download } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { toast } from "sonner";

interface ProfileScreenProps {
  palette: string;
  style: string;
  savedOutfits: Array<{ id: string; image: string; date: string }>;
}

const paletteColors = {
  cool: [
    { name: "Icy Pink", hex: "#FFB6D9" },
    { name: "Lavender", hex: "#E0BBE4" },
    { name: "Sky Blue", hex: "#B4E7F5" },
    { name: "Mint", hex: "#C7EFCF" },
  ],
  warm: [
    { name: "Peachy Pink", hex: "#FFD4C4" },
    { name: "Coral", hex: "#FF9999" },
    { name: "Golden Yellow", hex: "#FFE4B5" },
    { name: "Warm Beige", hex: "#F5E6D3" },
  ],
  neutral: [
    { name: "Soft Pink", hex: "#FFD6E8" },
    { name: "Dusty Rose", hex: "#DCADB0" },
    { name: "Sage", hex: "#C9D5B5" },
    { name: "Taupe", hex: "#D4C4B0" },
  ],
};

export function ProfileScreen({ palette, style, savedOutfits }: ProfileScreenProps) {
  const colors = paletteColors[palette as keyof typeof paletteColors] || paletteColors.neutral;

  const handleShare = () => {
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: 'My Dolly Outfit',
        text: 'Check out my AI-generated outfit!',
        url: window.location.href,
      }).then(() => {
        toast.success('Outfit shared successfully!');
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    toast.success('Outfit downloaded! ✨');
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-10">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
            <AvatarFallback className="bg-primary text-white text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
              JD
            </AvatarFallback>
          </Avatar>
          <h2 
            className="text-3xl text-primary mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Jane Doe
          </h2>
          <p 
            className="text-muted-foreground mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            jane.doe@example.com
          </p>
          <div className="flex items-center justify-center gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30" style={{ fontFamily: 'var(--font-body)' }}>
              {palette} tones
            </Badge>
            <Badge className="bg-accent/50 text-accent-foreground border-accent" style={{ fontFamily: 'var(--font-body)' }}>
              {style} style
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center shadow-lg border-border/50">
            <CardContent className="pt-6 pb-6">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                {savedOutfits.length}
              </p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Outfits
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg border-border/50">
            <CardContent className="pt-6 pb-6">
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                24
              </p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Favorites
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg border-border/50">
            <CardContent className="pt-6 pb-6">
              <Palette className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                {colors.length}
              </p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Colors
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Color Palette */}
        <Card className="mb-8 shadow-xl border-border/50">
          <CardHeader>
            <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>
              Your Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {colors.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className="w-full aspect-square rounded-xl mb-2 shadow-md border-2 border-white"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Saved Outfits */}
        <Card className="shadow-xl border-border/50">
          <CardHeader>
            <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>
              Saved Outfits
            </CardTitle>
          </CardHeader>
          <CardContent>
            {savedOutfits.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                  No saved outfits yet. Generate your first outfit!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {savedOutfits.map((outfit) => (
                  <div key={outfit.id} className="group relative">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={outfit.image}
                        alt="Saved outfit"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => handleShare()}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => handleDownload()}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                      {outfit.date}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <Button
            variant="outline"
            className="w-full"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Edit Profile
          </Button>
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}