'use client'

import { Switch } from '@/components/Switch'
import Image from 'next/image'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

export default function Home() {
  return (
    <div>
      <header className="w-full flex items-center justify-between p-4">
        <a href="#">
          <Image
            className="rounded-full"
            src="/knight.png"
            width={60}
            height={60}
            alt="profile icon"
          />
        </a>
        <nav className="flex gap-4 text-zinc-600 dark:text-zinc-300 font-semibold mr-8">
          <a className="hover:text-black hover:dark:text-white" href="">
            About
          </a>
          <a className="hover:text-black hover:dark:text-white" href="">
            Blog
          </a>
          <a className="hover:text-black hover:dark:text-white" href="">
            Projects
          </a>
          <Switch />
        </nav>
      </header>
      <main className="flex flex-col items-center justify-between p-10 pt-24 mx-[22%] z-50">
        <div className="w-full">
          <h1 className="text-4xl text-black dark:text-white font-[800] text-left">
            Maicon Lourenço
          </h1>
          <br />
        </div>
        <article className="font-medium">
          <div className="text-zinc-700 dark:text-zinc-400">
            <p>
              Hi, I'm Maicon, 24, a software developer passionate about this
              wonderful planet and all the things that make it works.
            </p>
            <p>
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
            <br />
            <p>
              I am fascinated by technology and how it can help many people. My
              whole life, I have been involved with technology. I started my
              career as a designer and illustrator, and after a while I migrated
              to 3D modeling, where I worked for approx. 3 years, you can check
              out some of my work on{' '}
              <a href="https://www.artstation.com/maiconloure">
                <b className="text-black dark:text-white">ArtStation</b>
              </a>
              , and at the moment I've been focusing my career on software
              development, and I've been studying and working in this area for 4
              years.
            </p>
            <br />
            <p>
              Currently I'm working mainly with web technologies, internal
              systems, and artificial intelligence mechanisms, with the
              following stacks: PHP, Javascript, NodeJS, Python.
            </p>
            <p>
              I have experience with these technologies:{' '}
              <u>
                Git, HTML5, CSS3, Laravel, TypeScript, NestJS, ReactJS, NextJS,
                Flask, Django, MySQL, PostgreSQL, Redis, RabbitMQ, Docker.
              </u>
            </p>
            <br />
            <p>
              I always stay up to date, and I'm always excited to learn a new
              language or technology and I love solving problems in the best way
              possible, always studying the best technologies and architectures.
            </p>
            <br />
            <br />
            <p>Find me on</p>
            <br />
            <p className="flex gap-2 font-semibold text-black dark:text-white">
              <a
                className="flex items-center gap-1 "
                href="https://github.com/maiconloure"
                target="_blank"
                rel="noopener"
              >
                <BsGithub />
                GitHub
              </a>
              <a
                className="flex items-center gap-1 "
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
      <div className="patterns">
        <svg
          width="100%"
          height="100%"
          className="stroke-zinc-400 dark:stroke-violet-700"
          strokeWidth="2"
        >
          <defs>
            <pattern
              id="puzzle"
              x="0"
              y="0"
              width="192"
              height="192"
              patternUnits="userSpaceOnUse"
            >
              <path d="M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z"></path>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#puzzle)" />
        </svg>
      </div>
    </div>
  )
}
