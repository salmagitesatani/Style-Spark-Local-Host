import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Plus, Trash2, Edit, Shirt, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  image: string;
  season: string;
}

interface WardrobeScreenProps {
  palette: string;
}

export function WardrobeScreen({ palette }: WardrobeScreenProps) {
  const [wardrobeItems, setWardrobeItems] = useState<ClothingItem[]>([
    {
      id: "1",
      name: "Pink Satin Blouse",
      category: "tops",
      color: "#FFB6D9",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      season: "all",
    },
    {
      id: "2",
      name: "White Lace Dress",
      category: "dresses",
      color: "#FFFFFF",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      season: "summer",
    },
    {
      id: "3",
      name: "Pearl Cardigan",
      category: "tops",
      color: "#F5F3EE",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
      season: "winter",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "tops",
    color: "#FFB6D9",
    season: "all",
  });
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const categories = ["all", "tops", "bottoms", "dresses", "outerwear", "accessories"];
  const [activeCategory, setActiveCategory] = useState("all");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    if (newItem.name && uploadedImage) {
      const item: ClothingItem = {
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category,
        color: newItem.color,
        image: uploadedImage,
        season: newItem.season,
      };
      setWardrobeItems([...wardrobeItems, item]);
      setNewItem({ name: "", category: "tops", color: "#FFB6D9", season: "all" });
      setUploadedImage("");
      setIsDialogOpen(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setWardrobeItems(wardrobeItems.filter(item => item.id !== id));
  };

  const filteredItems = activeCategory === "all" 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen px-6 py-12 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 
              className="text-4xl text-primary mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              My Wardrobe
            </h2>
            <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
              {wardrobeItems.length} items in your collection
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90" style={{ fontFamily: 'var(--font-body)' }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>
                  Add New Item
                </DialogTitle>
                <DialogDescription style={{ fontFamily: 'var(--font-body)' }}>
                  Add a new piece to your wardrobe collection
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label style={{ fontFamily: 'var(--font-body)' }}>Photo</Label>
                  {uploadedImage ? (
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Upload preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => setUploadedImage("")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center cursor-pointer hover:bg-secondary/30 transition-colors">
                      <Shirt className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                        Click to upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-name" style={{ fontFamily: 'var(--font-body)' }}>
                    Item Name
                  </Label>
                  <Input
                    id="item-name"
                    placeholder="Pink Satin Blouse"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" style={{ fontFamily: 'var(--font-body)' }}>
                    Category
                  </Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger style={{ fontFamily: 'var(--font-body)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tops" style={{ fontFamily: 'var(--font-body)' }}>Tops</SelectItem>
                      <SelectItem value="bottoms" style={{ fontFamily: 'var(--font-body)' }}>Bottoms</SelectItem>
                      <SelectItem value="dresses" style={{ fontFamily: 'var(--font-body)' }}>Dresses</SelectItem>
                      <SelectItem value="outerwear" style={{ fontFamily: 'var(--font-body)' }}>Outerwear</SelectItem>
                      <SelectItem value="accessories" style={{ fontFamily: 'var(--font-body)' }}>Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color" style={{ fontFamily: 'var(--font-body)' }}>
                    Primary Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={newItem.color}
                      onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={newItem.color}
                      onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                      placeholder="#FFB6D9"
                      className="flex-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season" style={{ fontFamily: 'var(--font-body)' }}>
                    Season
                  </Label>
                  <Select
                    value={newItem.season}
                    onValueChange={(value) => setNewItem({ ...newItem, season: value })}
                  >
                    <SelectTrigger style={{ fontFamily: 'var(--font-body)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontFamily: 'var(--font-body)' }}>All Seasons</SelectItem>
                      <SelectItem value="spring" style={{ fontFamily: 'var(--font-body)' }}>Spring</SelectItem>
                      <SelectItem value="summer" style={{ fontFamily: 'var(--font-body)' }}>Summer</SelectItem>
                      <SelectItem value="fall" style={{ fontFamily: 'var(--font-body)' }}>Fall</SelectItem>
                      <SelectItem value="winter" style={{ fontFamily: 'var(--font-body)' }}>Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleAddItem} 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!newItem.name || !uploadedImage}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Add to Wardrobe
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Wardrobe Grid */}
        {filteredItems.length === 0 ? (
          <Card className="shadow-xl border-border/50">
            <CardContent className="py-16 text-center">
              <Shirt className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                No items in this category yet
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                variant="outline"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group shadow-lg border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white h-8 w-8 p-0"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs capitalize" style={{ fontFamily: 'var(--font-body)' }}>
                        {item.category}
                      </Badge>
                      {item.season !== "all" && (
                        <Badge variant="outline" className="text-xs capitalize" style={{ fontFamily: 'var(--font-body)' }}>
                          {item.season}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
