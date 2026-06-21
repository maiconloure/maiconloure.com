export default function About() {
  return (
    <main className="flex flex-col items-center justify-between p-8 lg:pt-10 lg:mx-[12%] z-50">
      <article className="flex flex-col lg:flex-row gap-10 bg-zinc-50 dark:bg-zinc-950 py-8 px-20 bg-opacity-90 rounded-md shadow-xl">
        <div className="flex flex-col min-w-[180px]">
          <h1 className="text-xl font-bold mt-2">Maicon Lourenço</h1>
          <h2 className="text-base font-semibold text-zinc-400">
            Full Stack Developer
          </h2>
          <h3 className="text-sm font-semibold text-zinc-500">
            4 years of experience
          </h3>
          <p className="text-sm font-bold mt-2">STACK:</p>
          <p className="text-sm text-zinc-500">
            HTML5, CSS3, JavaScript, PHP, Python, Java
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">About Me</h1>
          <p className="my-4 font-inter text-zinc-700 dark:text-zinc-500 hover:text-black dark:hover:text-white">
            I&apos;m a software developer based in Brazil with 4 years of experience in web development.
          </p>
        </div>
      </article>
    </main>
  )
}
