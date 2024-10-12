import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Params } from "./schemas";
import { Toolbar } from "./_components/toolbar";
import { Board } from "./_components/board";
import { getBoardDrawingById } from "./queries";

type DrawingPageProps = {
  params: Params;
};

export default function BoardPage({ params }: DrawingPageProps) {
  return (
    <main className="h-screen w-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <Title />
        <Toolbar />
        <div className="flex gap-2">
          <Button variant="ghost">Del</Button>
        </div>
      </div>
      <Board boardDrawingPromise={getBoardDrawingById(params.id)} />
    </main>
  );
}

function Title() {
  return <Input type="text" placeholder="<tegningNavn>" className="max-w-48" />;
}
