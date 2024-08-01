import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Icons } from "./icons";

export function Header() {
  return (
    <header className="container-grid border-b py-2">
      <div className="flex items-center justify-between gap-4">
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/">
              <Icons.ChefHat className="mr-2 text-xl" />
              <span>Главная</span>
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/">
              <Icons.Notebook className="text-xl mr-2" />
              <span>Меню</span>
            </Link>
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full group">
            <Icons.Search className="text-xl mr-2" />
            <span>Поиск</span>
            <span className="rounded-md text-xs bg-secondary text-muted-foreground px-2 py-1 tracking-widest ml-6 group-hover:bg-background shadow">
              CTRL K
            </span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
