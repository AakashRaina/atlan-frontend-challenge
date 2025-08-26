import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAppStore from "@/store";
import { Play, Loader2Icon, Star, StarIcon } from "lucide-react";
import { useParams } from "react-router";

function Editor({
  handleRun,
  isLoading,
}: {
  handleRun: () => void;
  isLoading: boolean;
}): React.JSX.Element {
  const { id } = useParams();
  const updateQueryName = useAppStore((state) => state.updateQueryName);
  const updateQueryString = useAppStore((state) => state.updateQueryString);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  const queryDetails = useAppStore((state) =>
    state.recentQueries.find((q) => q.id === id)
  );
  const queryName = queryDetails?.name ?? (id as string);
  const queryString = queryDetails?.query ?? "";

  const handleQueryUpdateName = (name: string) => {
    updateQueryName(id as string, name);
  };

  const handleQueryUpdateString = (query: string) => {
    updateQueryString(id as string, query);
  };

  return (
    <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
      <div className='shrink-0 pb-2 font-medium flex items-center gap-2'>
        <Input
          type='text'
          placeholder='Query Name'
          value={queryName}
          onChange={(e) => handleQueryUpdateName(e.target.value)}
        />
      </div>
      <div className='flex-1 min-h-0 mt-2'>
        <textarea
          className='w-full h-full resize-none rounded-md border p-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
          placeholder='Write your SQL here...'
          value={queryString}
          onChange={(e) => handleQueryUpdateString(e.target.value)}
        />
      </div>
      <div className='shrink-0 pt-2 flex items-center justify-end gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => toggleFavorite(id as string)}
          disabled={isLoading}
        >
          {queryDetails?.isFavorite ? <StarIcon fill='black' /> : <Star />}
          {queryDetails?.isFavorite
            ? "Remove from favorites"
            : "Mark as favorite"}
        </Button>
        <Button
          size='sm'
          disabled={queryString.length <= 10 || isLoading}
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
