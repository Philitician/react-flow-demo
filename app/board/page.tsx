import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Board } from "./_components/board";
import { Toolbar } from "./_components/toolbar";

type BoardPageProps = {
  searchParams: {
    blueprintUrl: string;
  };
};

export default function BoardPage({ searchParams }: BoardPageProps) {
  return (
    <main className="h-screen w-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <Title />
        <Toolbar />
        <div className="flex gap-2">
          <Button variant="ghost">Del</Button>
        </div>
      </div>
      <Board />
    </main>
  );
}

function Title() {
  return (
    <Input
      type="text"
      placeholder="<tegningNavn>"
      className="border rounded px-2 py-1 max-w-48"
    />
  );
}
