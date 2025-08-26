import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { makeId } from "@/lib/utils";
import useAppStore, { Query } from "@/store";

function Header(): React.JSX.Element {
  const navigate = useNavigate();
  const updateRecentQueries = useAppStore((state) => state.updateRecentQueries);

  const handleNewQuery = () => {
    const newId = makeId();
    const newQuery: Query = {
      id: newId,
      name: null,
      query: null,
      data: null,
      columns: null,
      rowCount: null,
      executionTime: null,
      isFavorite: false,
    };
    updateRecentQueries(newQuery);
    navigate(`/${newId}`);
  };

  return (
    <div className='p-4.5 border-b flex items-center justify-start'>
      <div className='font-semibold text-lg'>
        <SidebarTrigger className='md:hidden' />
      </div>
      <div className='flex gap-2 justify-start'>
        <Button variant='secondary' onClick={handleNewQuery}>
          <Plus />
          New Query
        </Button>
      </div>
    </div>
  );
}

export default Header;
