import type { Author } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { CareerTimeline } from '~/components/author/career'
import { SocialAccounts } from '~/components/author/social-accounts'
import { ProfileCard } from '~/components/cards/profile'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Image } from '~/components/ui/image'
import { PageHeader } from '~/components/ui/page-header'
import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'

interface Props {
  children?: ReactNode
  content: Omit<Author, '_id' | '_raw' | 'body'>
}

export function AuthorLayout({ children }: Props) {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="About"
        description="A quick portfolio about me and my technology career."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-8 md:grid md:grid-cols-3">
        <div className="pr-4">
          <ProfileCard />
        </div>
        <div className="md:col-span-2 md:pl-12 xl:pl-16">
          <div className="prose prose-lg dark:prose-invert">
            <div>
              <h2 className="mt-0">
                Hi there <Twemoji emoji="waving-hand" />
              </h2>
              <p>
               I'm Rusty, a results-driven Enterprise System Administrator with over <strong>11</strong> years of experience managing and optimizing 
               large-scale IT infrastructures. Skilled in managing diverse IT environments, including cloud-based and 
               on-premises systems, while maintaining top-tier performance and security. I enjoy fine tuning of tools 
               and configurations to customize the business experience and enforce policies.   
              </p>
              <p>
              This site is my blog/portfolio for my love of technology. I use this site not only as a personal blog, but also as 
              a “resume” for anyone interested.
              
              I will post projects and technology updates on this site as a way to reach out to the community and 
              expand knowledge. Maybe I will help someone else out or maybe I will learn new things by sharing.<Twemoji emoji="clinking-beer-mugs" />
              </p>
              
            </div>
            <div>
              <div className="mb-[1em] mt-[2em] flex items-center justify-between [&>h2]:my-0">
                <h2>My career</h2>
                <Button as="a" href="/static/resume.docx" target="_blank">
                  <span>Resume</span>
                  <Twemoji emoji="page-facing-up" />
                </Button>
              </div>
              <CareerTimeline />
            </div>
            <div>
              <h2>Site Tech Info</h2>
              <p>
              The code to this site is not mine to claim. I'm using a <strong>Next.js</strong> template created 
              by <a href="https://github.com/hta218/leohuynh.dev">https://github.com/hta218/leohuynh.dev</a>. 
              I'm still learning JavaScript and so I would rather use a template that works beautifully and be able to modify it to my liking if needed.

              I host on <a href="https://vercel.com/">Vercel</a>, deploy from GitLabs.
              </p>
              
            </div>

            
            <div>
              <h2>Contact</h2>
              <p>
                Reach out to me at{' '}
                <a href={`mailto:${SITE_METADATA.email}`}>{SITE_METADATA.email}</a> or find me on
                social media:
              </p>
              <SocialAccounts />
            </div>
            
          </div>
        </div>
      </div>
    </Container>
  )
}
