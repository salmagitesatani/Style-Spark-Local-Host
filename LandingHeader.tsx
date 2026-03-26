import { Button } from "@/app/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router";

export function LandingHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 fill-primary text-primary" />
            <span 
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Style Spark
            </span>
          </div>

          {/* CTA */}
          <Button
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
