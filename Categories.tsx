import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";

const mockCategories = [
  { id: 1, name: "Food & Dining", icon: "🍔", color: "#FF6B6B", transactionCount: 145 },
  { id: 2, name: "Transportation", icon: "🚗", color: "#4ECDC4", transactionCount: 67 },
  { id: 3, name: "Entertainment", icon: "🎬", color: "#95E1D3", transactionCount: 43 },
  { id: 4, name: "Shopping", icon: "🛍️", color: "#F38181", transactionCount: 89 },
  { id: 5, name: "Utilities", icon: "⚡", color: "#FEC89A", transactionCount: 24 },
  { id: 6, name: "Healthcare", icon: "🏥", color: "#A8E6CF", transactionCount: 12 },
  { id: 7, name: "Education", icon: "📚", color: "#FFD93D", transactionCount: 8 },
  { id: 8, name: "Travel", icon: "✈️", color: "#6BCF7F", transactionCount: 15 },
];

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Manager</h1>
          <p className="text-muted-foreground">Organize and customize your transaction categories</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input id="category-name" placeholder="e.g., Subscriptions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-icon">Icon (Emoji)</Label>
                <Input id="category-icon" placeholder="📱" maxLength={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-color">Color</Label>
                <Input id="category-color" type="color" defaultValue="#FF6B6B" />
              </div>
              <Button className="w-full">Create Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <GripVertical className="h-4 w-4" />
            Drag and drop to reorder categories
          </div>
          <div className="space-y-2">
            {mockCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
              >
                <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.transactionCount} transactions
                  </p>
                </div>

                <div
                  className="h-4 w-4 rounded-full border-2 border-background"
                  style={{ backgroundColor: category.color }}
                />

                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            💡 Tip: Organize categories in the order you use them most. Categories at the top 
            will appear first in dropdowns and filters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
