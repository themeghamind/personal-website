
'use client'
import { useRouter } from 'next/navigation';

type Page = { name: string, href: string; backIcon?: boolean }
export function PageButtons({ pages }: { pages: Page[] }) {
    const router = useRouter();

    return (
        /* should be taking in a list of pages and return them as buttons. look at navbar to see how this works 
        the buttons should have page title and nav link passed in as param/attributes */
        <div className="flex flex-col items-start space-y-2 pb-10">
            {pages.map(({ name, href, backIcon }) => (
                <button key={href} type="button" onClick={() => router.push(href)} className="border border-stone-200  px-4 py-1 hover:border-[#0B99FF] hover:border-2 hover:text-[#0B99FF] hover:font-bold font-medium  rounded-lg">
                    {backIcon && <span aria-hidden className="text-base leading-none">← </span>}
                    { name }
                </button>
            ))}
        </div>
    )
}