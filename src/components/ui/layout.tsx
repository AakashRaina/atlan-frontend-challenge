function Layout(): React.JSX.Element {
  return (
    <div className='h-screen flex md:flex-row flex-col'>
      <aside className='hidden md:block md:w-[20%] h-full border-r bg-sidebar text-sidebar-foreground overflow-y-auto'>
        <div className='py-4 md:py-6 space-y-3'>
          <div className='text-sm font-medium uppercase tracking-wide'>
            Sidebar
          </div>
          <ul className='space-y-2'>
            <li>
              <a
                href='#'
                className='block rounded-md px-3 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block rounded-md px-3 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block rounded-md px-3 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              >
                Reports
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block rounded-md px-3 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main className='w-full md:w-[80%] h-full flex flex-col overflow-hidden'>
        <div className='p-3.5 border-b flex items-center justify-between'>
          <div className='font-semibold text-lg'>App Header</div>
        </div>
        <div className='flex-1 overflow-hidden'>
          <div className='p-3.5 h-full flex flex-col gap-4'>
            <section className='flex-1 min-h-0'>
              <div className='h-full rounded-lg border p-4'>
                <div className='font-medium mb-2'>Section A</div>
                <p className='text-sm text-muted-foreground'>Some content…</p>
              </div>
            </section>
            <section className='flex-1 min-h-0'>
              <div className='h-full rounded-lg border p-4'>
                <div className='font-medium mb-2'>Section B</div>
                <p className='text-sm text-muted-foreground'>More content…</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
