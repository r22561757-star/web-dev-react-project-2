import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Target, Calendar, DollarSign } from "lucide-react";

const mockGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 7800,
    deadline: "Dec 2024",
    icon: "🛡️",
    color: "hsl(var(--chart-1))",
  },
  {
    id: 2,
    name: "Vacation to Japan",
    target: 5000,
    current: 3200,
    deadline: "Jun 2025",
    icon: "✈️",
    color: "hsl(var(--chart-2))",
  },
  {
    id: 3,
    name: "New iPhone",
    target: 1200,
    current: 950,
    deadline: "Mar 2024",
    icon: "📱",
    color: "hsl(var(--chart-3))",
  },
  {
    id: 4,
    name: "Home Down Payment",
    target: 50000,
    current: 15000,
    deadline: "Dec 2026",
    icon: "🏠",
    color: "hsl(var(--chart-4))",
  },
];

export default function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Goals</h1>
          <p className="text-muted-foreground">Track progress toward your savings goals</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input id="goal-name" placeholder="e.g., Vacation Fund" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount ($)</Label>
                <Input id="target-amount" type="number" placeholder="5000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date</Label>
                <Input id="deadline" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-amount">Current Amount ($)</Label>
                <Input id="current-amount" type="number" placeholder="0" />
              </div>
              <Button className="w-full">Create Goal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockGoals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const monthlyRequired = remaining > 0 ? (remaining / 6).toFixed(0) : 0;

          return (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{goal.icon}</span>
                  {goal.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Current
                    </span>
                    <span className="font-semibold">${goal.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Target className="h-3 w-3" />
                      Target
                    </span>
                    <span className="font-semibold">${goal.target.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="text-lg font-bold">${remaining.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly needed</p>
                    <p className="text-lg font-bold">${monthlyRequired}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Deadline
                  </div>
                  <span className="font-semibold">{goal.deadline}</span>
                </div>

                <Button className="w-full" variant="outline">
                  Add Contribution
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
