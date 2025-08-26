import { PageButtons } from '../components/pagebuttons'
import Image from 'next/image'

export default function Page() {
    return (
        <section>
            <div className="mb-4">
                <Image
                    src="/assets/avatar.jpg"
                    alt="Megha Jain"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-cover border border-stone-200 shadow-sm"
                />
            </div>
            <h1 className="text-3xl mb-8 [font-family:var(--font-instrument)]"> {'a little more about me'} </h1>
            <p className="text-lg [font-family:var(--font-instrument)] mb-4 tracking-wide"> I'm currently working as a full stack engineer at <a className="hover:underline text-[#0B99FF]" href="https://www.cruxclimate.com/"> Crux </a> (a capital marketplace for energy infrastructure project financing) and living in San Francisco. I've spent many years working on software for grid infrastructure, previously at <a className="hover:underline text-[#0B99FF]" href="https://www.banyaninfrastructure.com/"> Banyan Infrastructure </a> and <a className="hover:underline text-[#0B99FF]" href="https://www.sce.com/">Southern California Edison</a>. I am a systems thinker at heart, and enjoy building software for physical infrastructure, developer tooling, and the AI era.</p>
            <p className="text-lg [font-family:var(--font-instrument)] mb-4 tracking-wide"> {`I was previously a learner @ UC Berkeley, where I was involved with the tech, startup/VC, and energy communities (via Contrary, Free Ventures, and BERCU). Going to college in the Bay was an awesome experience, and it made me fall in love with the sheer curiosity, ingenuity, and scrappiness of the people here :-)`} </p>
            <p className="text-lg [font-family:var(--font-instrument)] mb-4 tracking-wide"> Outside of building full stack apps and writing, I enjoy trying <a className="hover:text-[#0B99FF]" href="https://maps.app.goo.gl/Tutkd7ZviNUsB4kE6"> restaurants </a> and matcha spots in SF, reading scifi, and exploring the great outdoors. </p>
            <p className="text-lg [font-family:var(--font-instrument)] mt-4 mb-4 tracking-wide"> Feel free to hit me up if any of this resonates: </p>
            <PageButtons pages={[
                {
                    href: 'https://x.com/themeghamachine',
                    name: 'twitter',
                },
                {
                    href: 'https://www.linkedin.com/in/meghamjain',
                    name: 'linkedin',
                },
            ]}/>
            <div className="mt-4">
                <PageButtons pages={[
                    {
                        href: '/',
                        name: 'back to homepage',
                        backIcon: true
                    }
                ]}/>
            </div>
       </section>
    )
}