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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
