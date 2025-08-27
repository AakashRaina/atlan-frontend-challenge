import React from "react";
import { Button } from "@/components/ui/button";
import { Database, Play, Save, History } from "lucide-react";
import { useNavigate } from "react-router";
import { makeId } from "@/lib/common";
import useAppStore, { Query } from "@/store";

function Home(): React.JSX.Element {
  const navigate = useNavigate();
  const updateRecentQueries = useAppStore((state) => state.updateRecentQueries);

  const handleStartWriting = () => {
    const newId = makeId();
    const newQuery: Query = {
      id: newId,
      name: null,
      query: null,
      data: null,
      isFavorite: false,
      columns: null,
      rowCount: null,
      executionTime: null,
    };
    updateRecentQueries(newQuery);
    navigate(`/${newId}`);
  };

  return (
    <div className='h-full flex flex-col items-center justify-center p-8'>
      <div className='max-w-2xl mx-auto text-center space-y-8'>
        <div className='space-y-4'>
          <Database className='w-16 h-16 mx-auto text-primary' />
          <h1 className='text-4xl font-bold tracking-tight'>
            SQL Query Runner
          </h1>
          <p className='text-xl text-muted-foreground'>
            A demo application for running SQL queries against mock data
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          <div className='p-6 rounded-lg border bg-card'>
            <Play className='w-8 h-8 mb-4 text-primary' />
            <h3 className='font-semibold mb-2'>Execute Queries</h3>
            <p className='text-sm text-muted-foreground'>
              Write and execute SQL queries against our mock database with 8
              related tables
            </p>
          </div>

          <div className='p-6 rounded-lg border bg-card'>
            <Save className='w-8 h-8 mb-4 text-primary' />
            <h3 className='font-semibold mb-2'>Save Queries</h3>
            <p className='text-sm text-muted-foreground'>
              Save your favorite queries and access them anytime from the
              sidebar
            </p>
          </div>

          <div className='p-6 rounded-lg border bg-card'>
            <History className='w-8 h-8 mb-4 text-primary' />
            <h3 className='font-semibold mb-2'>Query History</h3>
            <p className='text-sm text-muted-foreground'>
              Keep track of your recent queries and easily re-run them
            </p>
          </div>
        </div>

        <div className='space-y-4 mt-12'>
          <Button
            size='lg'
            className='text-lg px-8 py-3'
            onClick={handleStartWriting}
          >
            Start Writing Queries
          </Button>
          <p className='text-sm text-muted-foreground pt-4'>
            Or explore the database schema in the sidebar
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
