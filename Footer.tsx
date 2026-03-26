import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white/50 border-t border-border/50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 fill-primary text-primary" />
              <span 
                className="text-xl font-semibold tracking-tight text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Style Spark
              </span>
            </div>
            <p 
              className="text-muted-foreground text-sm max-w-md"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Your personal AI-powered style companion. Discover your perfect colour palette 
              and create stunning outfits that match your unique aesthetic.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-semibold mb-4 text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 
              className="font-semibold mb-4 text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Legal
            </h3>
            <ul className="space-y-2 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p 
            className="text-sm text-muted-foreground"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © 2026 Style Spark. All rights reserved. Made with ✨ and 💕
          </p>
        </div>
      </div>
    </footer>
  );
}
