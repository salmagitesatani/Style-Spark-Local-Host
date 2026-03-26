import { Button } from "@/app/components/ui/button";
import { Sparkles, Heart, Palette, Wand2 } from "lucide-react";
import { useNavigate } from "react-router";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ }: WelcomeScreenProps) {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 inline-block">
              <Heart className="w-16 h-16 text-primary mx-auto mb-6 fill-primary" strokeWidth={1.5} />
              <h1 
                className="text-5xl md:text-7xl mb-6 text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Style Spark
              </h1>
              <p 
                className="text-2xl md:text-3xl text-muted-foreground italic mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your Personal Style Companion
              </p>
            </div>

            <p 
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Discover your perfect colour palette, define your unique style, 
              and see yourself in AI-generated outfits tailored just for you.
            </p>

            <Button 
              onClick={handleGetStarted}
              className="px-10 py-7 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Get Started ✨
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl text-center text-primary mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            How It Works
          </h2>
          <p 
            className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Three simple steps to discover your signature style
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white/50 border border-border/50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <h3 
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                1. Colour Analysis
              </h3>
              <p 
                className="text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Take our quiz to discover which colours complement your natural beauty
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/50 border border-border/50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                2. Style Selection
              </h3>
              <p 
                className="text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Choose from coquette, vintage, romantic, and more aesthetic styles
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/50 border border-border/50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <Wand2 className="w-8 h-8 text-primary" />
              </div>
              <h3 
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                3. AI Styling
              </h3>
              <p 
                className="text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Upload your photo and let AI create perfectly styled outfits for you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl text-primary mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Transform Your Style?
          </h2>
          <p 
            className="text-lg text-muted-foreground mb-8"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Join thousands of users discovering their perfect aesthetic
          </p>
          <Button 
            onClick={handleGetStarted}
            className="px-10 py-7 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Start Your Journey ✨
          </Button>
        </div>
      </div>
    </div>
  );
}