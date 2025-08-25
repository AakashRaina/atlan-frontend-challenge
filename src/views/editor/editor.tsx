import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Play, Loader2Icon } from "lucide-react";

function Editor({
  id,
  name,
  query,
  setQuery,
  handleSave,
  handleRun,
  isLoading,
  handleQueryUpdateName,
}: {
  id: string;
  name: string;
  query: string;
  setQuery: (query: string) => void;
  handleSave: () => void;
  handleRun: () => void;
  isLoading: boolean;
  handleQueryUpdateName: (id: string, name: string) => void;
}): React.JSX.Element {
  return (
    <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
      <div className='shrink-0 pb-2 font-medium flex items-center gap-2'>
        <Input
          type='text'
          placeholder='Query Name'
          value={name ?? id}
          onChange={(e) => handleQueryUpdateName(id, e.target.value)}
        />
      </div>
      <div className='flex-1 min-h-0 mt-2'>
        <textarea
          className='w-full h-full resize-none rounded-md border p-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
          placeholder='Write your SQL here...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className='shrink-0 pt-2 flex items-center justify-end gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={handleSave}
          disabled={isLoading}
        >
          <Save />
        </Button>
        <Button
          size='sm'
          disabled={query.length <= 10 || isLoading}
          onClick={handleRun}
        >
          {isLoading ? <Loader2Icon className='animate-spin' /> : <Play />}
          Run
        </Button>
      </div>
    </div>
  );
}

export default Editor;
