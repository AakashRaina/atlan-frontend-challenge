import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { makeId } from "@/lib/utils";

function Header(): React.JSX.Element {
  const navigate = useNavigate();

  const handleNewQuery = () => {
    const newId = makeId();
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
