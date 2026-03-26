import { Link, useLocation } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Sparkles, Shirt, User, Heart } from "lucide-react";

export function Header() {
  const location = useLocation();
  
  const navItems = [
    { path: "/style", label: "AI Style", icon: Sparkles },
    { path: "/wardrobe", label: "Wardrobe", icon: Shirt },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/style" className="flex items-center gap-2">
            <Heart className="w-6 h-6 fill-primary text-primary" />
            <span 
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Style Spark
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  asChild
                  variant="ghost"
                  className={`gap-2 ${
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Link to={item.path}>
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
