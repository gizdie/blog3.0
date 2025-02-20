import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'
import { Image } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { GrowingUnderline } from '~/components/ui/growing-underline'

const EXPERIENCES = [
  {
    org: 'UT Southwestern',
    url: 'https://utsouthwestern.edu',
    logo: '/static/images/utlogo.png',
    start: '2024',
    end: 'Present',
    title: 'Enterprise System Administrator II & Database Administrator',
    icon: 'briefcase',
    event: 'career-weaverse',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            Along with my normal duties of System Administrator, I am now also a DBA backup.
          </li>
        </ul>
      )
    },
  },
  {
    org: 'UT Southwestern',
    url: 'https://utsouthwestern.edu/',
    logo: '/static/images/utlogo.png',
    start: '2018',
    end: '2024',
    title: 'Enterprise System Administrator II',
    icon: 'man-technologist',
    event: 'career-foxecom',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
          Support 200+ windows-based VM severs in VmWare. These include, but are not limited to: Exchange 2010-2019, Domain Controllers, Rightfax, MoveIT FTP, WSUS, Docstar ECM, Eclinical Works EMR, Print Servers, Spiceworks, Quickbooks, Jira.  
          </li>
          <li>
          Azure Administration for AD, Exchange, Intune (client updates/roll outs).
          </li>
          <li>
          Manage all Office 365 administrative systems. Exchange, Share point, endpoint/intune, Teams, active directory, Azure.
          </li>
          <li>
          For full details download my resume above.
          </li>
          
        </ul>
      )
    },
  },
  {
    org: 'North Texas Specialty Physicians ',
    url: 'https://ntsp.com',
    logo: '/static/images/ntsplogo.jpg',
    start: '2012',
    end: '2018',
    title: 'Technical Support Analyst',
    icon: 'man-technologist',
    event: 'career-coc-coc',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
          Provided end-user hardware/software support for 1500+ employees across 5 locations / 2 states. Includes: 
          laptops, desktops, printers, Avaya phones, tablets and cell phones.
          </li>
          <li>
          Worked closely with HR and Legal department to on-boarding and off-boarding employees. 
          Provided weekly new hire orientation meetings.
          </li>
          <li>
          Work directly with vendors to order inventory and configure machines based on company budget needs.
          </li>
          <li>
          For full details download my resume above.
          </li>
         
        </ul>
      )
    },
  },
  
]

export function CareerTimeline() {
  return (
    <ul className="m-0 list-none p-0">
      {EXPERIENCES.map((exp, idx) => (
        <li key={exp.url} className="m-0 p-0">
          <TimelineItem exp={exp} last={idx === EXPERIENCES.length - 1} />
        </li>
      ))}
    </ul>
  )
}

function TimelineItem({ exp, last }: { exp: (typeof EXPERIENCES)[0]; last?: boolean }) {
  let { org, title, icon, url, logo, start, end, event, details: Details } = exp
  return (
    <div
      className={clsx(
        'group/timeline-item',
        'relative -mx-3 flex flex-row items-start gap-3 rounded-lg p-3',
        'cursor-pointer bg-transparent transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
        !last && [
          'before:absolute before:left-9 before:top-15',
          'before:h-full before:w-px',
          'before:bg-gray-300 dark:before:bg-gray-500',
        ]
      )}
    >
      <Image
        src={logo}
        alt={org}
        className="h-12 w-12 shrink-0 rounded-md"
        style={{ objectFit: 'contain' }}
        width={200}
        height={200}
      />
      <details className="w-full [&_.minus]:open:block [&_.plus]:open:hidden">
        <summary className="relative pr-10 marker:content-none">
          <Plus
            size={18}
            className={clsx([
              'plus',
              'group-hover/timeline-item:visible md:invisible',
              'absolute right-1 top-1',
              'transition-transform duration-300 ease-in-out',
              'text-gray-600 dark:text-gray-500',
            ])}
            data-umami-event={`${event}-expand`}
          />
          <Minus
            size={18}
            className={clsx([
              'minus hidden',
              'absolute right-1 top-1',
              'transition-transform duration-300 ease-in-out',
              'text-gray-600 dark:text-gray-500',
            ])}
            data-umami-event={`${event}-collapse`}
          />
          <div className="flex flex-col">
            <div className="line-clamp-1 text-xs tabular-nums text-gray-500 dark:text-gray-400">
              <span>{start}</span> – <span>{end}</span>
            </div>
            <Link
              href={url}
              className="line-clamp-1 w-fit font-semibold text-gray-900 no-underline hover:text-gray-900 dark:text-white dark:hover:text-white"
            >
              <GrowingUnderline data-umami-event={event}>{org}</GrowingUnderline>
            </Link>
            <div className="flex items-center gap-1 pt-1 text-sm text-gray-700 dark:text-gray-200">
              <Twemoji emoji={icon} className="!-mt-1" />
              <span>{title}</span>
            </div>
          </div>
        </summary>
        <div className="pt-1 text-base">
          <Details />
        </div>
      </details>
    </div>
  )
}
