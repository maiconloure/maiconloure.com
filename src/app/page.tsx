import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-between p-10 pt-24 mx-[22%] z-50">
      <div className="w-full">
        <h1 className="text-4xl text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white font-[800]">
          Maicon Lourenço
        </h1>
        <h2 className="text-xl font-semibold">Mid Full Stack Developer</h2>
        <br />
      </div>
      <article className="font-medium">
        <div className="text-zinc-700 dark:text-zinc-300">
          <p className="hover:text-black dark:hover:text-white">
            Hi, I'm 24 years old, currently living in Brazil.
          </p>
          <p className="hover:text-black dark:hover:text-white">
            Working at{' '}
            <a
              className="text-black dark:text-zinc-100"
              href="https://webhelp.com/"
              target="_blank"
              rel="noopener"
            >
              <b>Webhelp</b>
            </a>
          </p>
          <p>
            I'm eternally curious about how everything works and how to solve
            the most challenging problems created by humans.
          </p>
          <br />
          <p className="hover:text-black dark:hover:text-white">
            Currently I'm working mainly with web technologies, internal
            systems, and artificial intelligence mechanisms, with the following
            stacks: PHP, Javascript, NodeJS, Python.
          </p>
          <p className="hover:text-black dark:hover:text-white">
            I have experience with these technologies:{' '}
            <u>
              Git, HTML5, CSS3, Laravel, TypeScript, NestJS, ReactJS, NextJS,
              Flask, Django, MySQL, PostgreSQL, Redis, RabbitMQ, Docker.
            </u>
          </p>
          <br />
          <p className="hover:text-black dark:hover:text-white">
            Outside of programming, I like to build computers and servers, do
            some automation, and build robots. I also have a great admiration
            for the marine life, and I like to do some deep diving. One of my
            dreams is to visit the Great Barrier Reef in Australia, one of the
            most beautiful places on earth.
          </p>
          <br />
          <p>Find me on</p>
          <p className="flex gap-4 font-semibold text-black dark:text-white">
            <span className="flex items-center gap-1 hover:underline hover:text-indigo-500">
              <MdEmail /> maiconloure@gmail.com
            </span>
            <a
              className="flex items-center gap-1 hover:underline hover:text-indigo-500"
              href="https://github.com/maiconloure"
              target="_blank"
              rel="noopener"
            >
              <BsGithub />
              GitHub
            </a>
            <a
              className="flex items-center gap-1 hover:underline hover:text-indigo-500"
              href="https://www.linkedin.com/in/maiconlourenco/"
              target="_blank"
              rel="noopener"
            >
              <BsLinkedin />
              LinkedIn
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
