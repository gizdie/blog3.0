import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'

export function TechitPromo() {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900/40 md:mt-12 md:py-14">
      <a
        href="https://techit.org"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-baseline gap-0 no-underline"
        data-umami-event="techit-logo"
      >
        <span className="font-mono text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
          tech
        </span>
        <span className="font-mono text-2xl font-medium tracking-tight text-[#D85A30]">it</span>
        <span className="ml-0.5 font-mono text-sm text-gray-400 dark:text-gray-500">.org</span>
      </a>
      <p className="mx-auto mt-4 max-w-md text-base text-gray-600 dark:text-gray-400">
        Looking for my tech blog with game reviews and other super nerdy things? Check out{' '}
        <span className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
          Techit.org
        </span>
        .
      </p>
      <Button
        as="a"
        href="https://techit.org"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6"
        data-umami-event="techit-promo-cta"
      >
        <span>Visit Techit.org</span>
        <ArrowRight size={16} strokeWidth={1.75} />
      </Button>
    </div>
  )
}
