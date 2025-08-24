import React from "react";
import { useParams } from "react-router";
import Editor from "@/views/editor";
import QueryResults from "@/views/query-results";

function Query(): React.JSX.Element {
  const { id } = useParams();

  return (
    <div className='p-3.5 h-full flex flex-col gap-2'>
      <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
        <Editor id={id || ""} />
      </section>
      <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
        <QueryResults />
      </section>
    </div>
  );
}

export default Query;
