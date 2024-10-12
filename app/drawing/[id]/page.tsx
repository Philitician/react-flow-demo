import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Params } from "./schemas";
import { Toolbar } from "./_components/toolbar";
import { Board } from "./_components/board";
import { getBoardDrawingById } from "./queries";
import { SaveBoard } from "./_components/save-board";

type DrawingPageProps = {
  params: Params;
};

export default function BoardPage({ params }: DrawingPageProps) {
  return (
    <main className="h-screen w-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <LeftToolbar />
        <Toolbar />
        <div className="flex gap-2">
          <Button variant="ghost">Del</Button>
        </div>
      </div>
      <Board boardDrawingPromise={getBoardDrawingById(params.id)} />
    </main>
  );
}

function LeftToolbar() {
  return (
    <div className="space-x-2">
      <Title />
      <SaveBoard />
    </div>
  );
}

function Title() {
  return <Input type="text" placeholder="<tegningNavn>" className="max-w-48" />;
}
