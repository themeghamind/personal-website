import { PageButtons } from 'app/components/pagebuttons'

export default function Page() {
  return (
    <section>
      <p className="mb-8 text-2xl [font-family:var(--font-instrument)]">
        hi there! welcome to megha's cloud.
      </p>
      <p className="mb-8 text-2xl [font-family:var(--font-instrument)]">
        if you’re interested in{' '}
        <span className="hover:text-amber-500 transition-colors cursor-text">
          energy resilience
        </span>
        ,{' '}
        <span className="hover:text-rose-500 transition-colors cursor-text">
          public transportation
        </span>
        ,{' '}
        <span className="hover:text-purple-500 transition-colors cursor-text">
          building elegant software
        </span>{' '}
        — or are just a  <span className="hover:text-[#0B99FF] hover:italic transition-colors cursor-text"> curious </span> 
        human — you’ve come to the right place :-)
      </p>
      {/* Leaving this out for now because I can see myself getting into trouble with it -- 
      e.g need to add protections against inappropriate names before deploying*/}
      {/* <p className="text-2xl [font-family:var(--font-instrument)] ">
        what's your name?
      </p>
      <div className="relative inline-block">
        <input className="border-none outline-none focus:ring-0 caret-black bg-transparent">
        </input>
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 w-[1px] h-5 bg-black animate-blink peer-focus:opacity-0"></span>
      </div> */}
      <p className="text-2xl [font-family:var(--font-instrument)]">
        {'feel free to explore:'}
      </p>
      <div className="my-8">
        <PageButtons pages={[
          {
            href: '/personal-projects', 
            name: "personal projects"
          },
          {
            href: '/rabbitholes', 
            name: "rabbitholes"
          },
          {
            href: '/writing', 
            name: "writing"
          },
          {
            href: '/side-quests', 
            name: "sidequests"
          },
          {
            href: '/about-me', 
            name: "about me"
          }
          
        ]}/>
      </div>
      <p className="mb-8 text-2xl [font-family:var(--font-instrument)]"> and don't forget to say <a className="text-[#0B99FF] hover:underline" href="https://x.com/themeghamachine">hi</a>!</p>
    </section>
  )
}
