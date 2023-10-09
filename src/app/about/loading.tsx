export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-between lg:pt-10 lg:mx-[12%] z-50 ">
      <div className="bg-zinc-50 dark:bg-zinc-900 shadow rounded-md p-12 w-full h-80 mx-auto ">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-zinc-600 h-44 w-44 mr-4"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-5 bg-zinc-600 rounded"></div>
            <div className="h-5 bg-zinc-600 rounded"></div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-5 bg-zinc-600 rounded col-span-2"></div>
                <div className="h-5 bg-zinc-600 rounded col-span-1"></div>
              </div>
              <div className="h-5 bg-zinc-600 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-5 bg-zinc-600 rounded col-span-2"></div>
                <div className="h-5 bg-zinc-600 rounded col-span-1"></div>
              </div>
              <div className="h-5 bg-zinc-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
