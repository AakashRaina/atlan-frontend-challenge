import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Editor({ id }: { id: string }): React.JSX.Element {
  return (
    <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
      <div className='shrink-0 pb-2 font-medium'>
        <Input type='text' placeholder='Query Name' value={id} />
      </div>
      <div className='flex-1 min-h-0 mt-2'>
        <textarea
          className='w-full h-full resize-none rounded-md border p-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
          placeholder='Write your SQL here...'
        />
      </div>
      <div className='shrink-0 pt-2 flex items-center justify-end gap-2'>
        <Button variant='outline' size='sm'>
          Save Query
        </Button>
        <Button size='sm'>Execute Query</Button>
      </div>
    </div>
  );
}

export default Editor;
