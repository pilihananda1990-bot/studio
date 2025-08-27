import { Bell, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
           <Leaf className="h-8 w-8" />
           <h1 className="text-2xl font-bold tracking-tight">EcoCollect</h1>
        </div>
        <div className="flex items-center gap-4">
           <p className="hidden text-sm md:block">Hello, Eco-Warrior!</p>
           <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/80 focus-visible:bg-primary/80">
            <Bell className="h-6 w-6" />
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground p-0">3</Badge>
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
