import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useNavigate } from "react-router";

interface AuthScreenProps {
  onAuth: () => void;
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth();
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-40 h-40 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-primary rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-xl border-border/50">
        <CardHeader className="text-center">
          <CardTitle 
            className="text-4xl text-primary mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Welcome to Dolly
          </CardTitle>
          <CardDescription style={{ fontFamily: 'var(--font-body)' }}>
            Create your account or sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup" style={{ fontFamily: 'var(--font-body)' }}>
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="login" style={{ fontFamily: 'var(--font-body)' }}>
                Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ fontFamily: 'var(--font-body)' }}>
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-border/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" style={{ fontFamily: 'var(--font-body)' }}>
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" style={{ fontFamily: 'var(--font-body)' }}>
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" style={{ fontFamily: 'var(--font-body)' }}>
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" style={{ fontFamily: 'var(--font-body)' }}>
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}