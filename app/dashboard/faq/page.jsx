import React from 'react'

const page = () => {
  return (
 
   
<div
  class="rounded-lg mt-12 ml-5 border-2 border-gray-900 bg-card text-card-foreground shadow-sm w-full max-w-md dark:bg-gray-950"
  data-v0-t="card"
>
  <div class="space-y-1.5 bg-gray-900 dark:bg-gray-800 p-6 flex flex-col items-center gap-4">
    <span class="relative flex shrink-0 overflow-hidden rounded-full w-20 h-20">
      <img class="aspect-square h-full w-full object-contain" alt="Deeptanu" src="/pic.jpeg" />
    </span>
    <div class="text-center">
      <h3 class="text-xl font-bold text-white">Deeptanu Bhatta</h3>
      <p class="text-gray-300">MERN Stack Developer</p>
      <p class="text-gray-300">Next.js Developer</p>
    </div>
  </div>
  <div class="p-6 grid gap-4">
    <div class="prose prose-invert prose-sm">
      <p class="text-black">
         I am a full-stack developer with over 2 years of experience in building modern, responsive web
        applications. I am specialized in JavaScript, React, Nextjs,Nodejs,Expressjs and MongoDB also creating intuitive and visually appealing
        user interfaces.
      </p>

    </div>
    <div class="flex justify-center gap-4">
      <a
        href="https://github.com/deeptanu20"
        class="inline-flex items-center justify-center rounded-md border border-gray-800 bg-gray-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5 mr-2"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
        Github
      </a>
      <a href="https://www.linkedin.com/in/deeptanu-bhatta-a0788925b/"
        class="inline-flex items-center justify-center rounded-md border border-pink-800 bg-pink-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-pink-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50">
          Linkedin
        </a>
    </div>
  </div>
 
</div>

  )
}

export default page
