import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const mockBudgets = [
  { id: 1, category: "Food & Dining", limit: 800, spent: 620, icon: "🍔" },
  { id: 2, category: "Transportation", limit: 300, spent: 280, icon: "🚗" },
  { id: 3, category: "Entertainment", limit: 200, spent: 150, icon: "🎬" },
  { id: 4, category: "Shopping", limit: 500, spent: 520, icon: "🛍️" },
  { id: 5, category: "Utilities", limit: 400, spent: 385, icon: "⚡" },
  { id: 6, category: "Healthcare", limit: 250, spent: 120, icon: "🏥" },
];

export default function Budgets() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUsageColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return "destructive";
    if (percentage >= 80) return "warning";
    return "success";
  };

  const getUsageStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return "Over budget";
    if (percentage >= 80) return "Approaching limit";
    return "On track";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground">Track your spending across categories</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit">Budget Limit ($)</Label>
                <Input id="limit" type="number" placeholder="500" />
              </div>
              <Button className="w-full">Create Budget</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockBudgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const remaining = budget.limit - budget.spent;
          const status = getUsageStatus(budget.spent, budget.limit);

          return (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{budget.icon}</span>
                  {budget.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-semibold">${budget.spent.toFixed(2)}</span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={cn(
                      "h-2",
                      percentage >= 100 && "[&>div]:bg-destructive",
                      percentage >= 80 && percentage < 100 && "[&>div]:bg-warning",
                    )}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-semibold">${budget.limit.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className={cn(
                      "text-lg font-bold",
                      remaining < 0 ? "text-destructive" : "text-foreground"
                    )}>
                      ${Math.abs(remaining).toFixed(2)}
                    </p>
                  </div>
                  <div className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    percentage >= 100 && "bg-destructive/10 text-destructive",
                    percentage >= 80 && percentage < 100 && "bg-warning/10 text-warning",
                    percentage < 80 && "bg-success/10 text-success",
                  )}>
                    {status}
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  {percentage.toFixed(0)}% of budget used
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
