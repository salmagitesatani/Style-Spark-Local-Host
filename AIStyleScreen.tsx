import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Upload, Sparkles, Download, RefreshCw, Share2, Facebook, Twitter, Instagram, Link2 } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { toast } from "sonner";

interface AIStyleScreenProps {
  palette: string;
  style: string;
  onSaveOutfit?: (image: string) => void;
}

export function AIStyleScreen({ palette, style, onSaveOutfit }: AIStyleScreenProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<string | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedOutfit(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedOutfit("https://images.unsplash.com/photo-1617790274211-cbe0e677b425?w=600&h=800&fit=crop");
      setIsGenerating(false);
    }, 2500);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedOutfit("https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop");
      setIsGenerating(false);
    }, 2500);
  };

  const handleSaveOutfit = () => {
    if (generatedOutfit && onSaveOutfit) {
      onSaveOutfit(generatedOutfit);
      toast.success("Outfit saved to your profile! ✨");
    }
  };

  const handleShareOutfit = () => {
    setIsShareDialogOpen(true);
  };

  const handleSharePlatform = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out my AI-generated ${style} outfit with ${palette} tones from Dolly! ✨`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        toast.success("Opening Facebook share dialog...");
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        toast.success("Opening Twitter share dialog...");
        break;
      case 'instagram':
        // Instagram doesn't support direct web sharing, so copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        toast.success("Caption copied! Open Instagram to share your outfit.");
        break;
      case 'link':
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        break;
    }
    setIsShareDialogOpen(false);
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 
            className="text-4xl text-primary mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            AI Style Generator
          </h2>
          <p 
            className="text-muted-foreground mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Upload your photo and let AI create the perfect outfit for you
          </p>
          <div 
            className="flex items-center justify-center gap-4 text-sm"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="text-primary">Your Palette: {palette}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary">Your Style: {style}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-xl border-border/50">
            <CardContent className="p-8">
              <h3 
                className="text-xl mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your Photo
              </h3>
              
              {!uploadedImage ? (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-primary/50 rounded-2xl p-12 text-center hover:bg-secondary/30 transition-colors">
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p 
                      className="text-primary mb-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Click to upload your photo
                    </p>
                    <p 
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="block">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      style={{ fontFamily: 'var(--font-body)' }}
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Change Photo
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Outfit Section */}
          <Card className="shadow-xl border-border/50">
            <CardContent className="p-8">
              <h3 
                className="text-xl mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your AI-Generated Outfit
              </h3>
              
              {!generatedOutfit && !isGenerating && (
                <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center aspect-[3/4] flex flex-col items-center justify-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                  <p 
                    className="text-muted-foreground"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {uploadedImage
                      ? "Ready to generate your outfit!"
                      : "Upload a photo to get started"}
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="border-2 border-dashed border-primary/50 rounded-2xl p-12 text-center aspect-[3/4] flex flex-col items-center justify-center bg-secondary/30">
                  <div className="animate-spin mb-4">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <p 
                    className="text-primary"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Creating your perfect outfit...
                  </p>
                  <p 
                    className="text-sm text-muted-foreground mt-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Analyzing colors and style preferences
                  </p>
                </div>
              )}

              {generatedOutfit && !isGenerating && (
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={generatedOutfit}
                      alt="Generated outfit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleRegenerate}
                      variant="outline"
                      className="flex-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      style={{ fontFamily: 'var(--font-body)' }}
                      onClick={handleSaveOutfit}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      style={{ fontFamily: 'var(--font-body)' }}
                      onClick={handleShareOutfit}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              )}

              {uploadedImage && !generatedOutfit && !isGenerating && (
                <Button
                  onClick={handleGenerate}
                  className="w-full bg-primary hover:bg-primary/90 py-6 text-lg mt-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Outfit
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          <Card className="bg-secondary/30 border-primary/30">
            <CardContent className="p-6">
              <p 
                className="text-sm text-center text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                💡 <strong>Tip:</strong> For best results, upload a clear photo with good lighting. 
                The AI will analyze your features and create an outfit that matches your {palette} colour palette 
                and {style} style preferences.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Share Dialog */}
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share Your Outfit</DialogTitle>
              <DialogDescription>
                Share your AI-generated outfit on social media or via a link.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleSharePlatform('facebook')}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Facebook className="w-5 h-5 text-[#1877F2] mr-3" />
                Share on Facebook
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleSharePlatform('twitter')}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Twitter className="w-5 h-5 text-[#1DA1F2] mr-3" />
                Share on Twitter
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleSharePlatform('instagram')}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Instagram className="w-5 h-5 text-[#E4405F] mr-3" />
                Copy for Instagram
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleSharePlatform('link')}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Link2 className="w-5 h-5 text-primary mr-3" />
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}