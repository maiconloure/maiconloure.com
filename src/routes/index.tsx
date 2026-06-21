import { A } from "@solidjs/router"

export default function Home() {
  return (
    <main class="flex flex-col items-start justify-between p-14 lg:pt-22 lg:mx-[16%] lg:my-10 z-50 bg-zinc-100 dark:bg-zinc-900 shadow-lg rounded-md">
      <h1 class="text-5xl text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white font-[800]">
        Maicon Lourenço
      </h1>
      <h2 class="text-2xl text-zinc-500 font-semibold">Full Stack Developer</h2>
      <br />
      <article class="w-full font-light text-lg">
        <p class="hover:text-black dark:hover:text-white">
          I'm a software developer based in Brazil with 4 year of experience in web development.
        </p>
        <p class="hover:text-black dark:hover:text-white">
          Working at{" "}
          <a
            class="text-black dark:text-zinc-200"
            href="https://concentrix.com/"
            target="_blank"
            rel="noopener"
          >
            <b class="font-bold">Concentrix</b>
          </a>
        </p>
        <p>
          I'm eternally curious about how everything works and how to solve the most challenging
          problems to help the world.
        </p>
        <br />
        <p class="hover:text-black dark:hover:text-white">
          Currently I'm working mainly with web technologies, internal systems, and artificial
          intelligence mechanisms, with the following stacks:{" "}
          <b class="font-bold">PHP, Javascript, NodeJS, Python and Java</b>
        </p>
        <p class="hover:text-black dark:hover:text-white">
          I have experience with these technologies:{" "}
          <b class="font-bold">
            Git, HTML5, CSS3, Laravel, TypeScript, NestJS, ReactJS, NextJS, Flask, Django, MySQL,
            PostgreSQL, Redis, RabbitMQ, Docker.
          </b>
        </p>
        <br />
        <p class="hover:text-black dark:hover:text-white">
          Outside of programming, I like to build computers and game servers, do some automation,
          and build robots. I also have a great admiration for the nature and especially the marine
          life, and I like to do some deep diving in my free time.
        </p>
        <p class="hover:text-black dark:hover:text-white">
          Ah, I also love music, my favorites styles are: Rock, Pop, Electronic, Classic and
          Post-punk.
        </p>
        <p class="mt-1 hover:text-black dark:hover:text-white">
          Check more about me{" "}
          <A href="/about">
            <u class="font-bold">here.</u>
          </A>
        </p>
        <br />
        <p>
          <b class="font-bold">Find me on</b>
        </p>
        <p class="flex gap-4 font-bold text-black dark:text-white flex-wrap mt-2">
          <a class="hover:underline hover:text-indigo-500" href="mailto:maiconloure@gmail.com">
            maiconloure@gmail.com
          </a>
          <a
            class="hover:underline hover:text-indigo-500"
            href="https://github.com/maiconloure"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          <a
            class="hover:underline hover:text-indigo-500"
            href="https://www.linkedin.com/in/maiconlourenco/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
        </p>
      </article>
    </main>
  )
}
