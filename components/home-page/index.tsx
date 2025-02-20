import type { Blog, Snippet } from '~/.contentlayer/generated'
import { ProfileCard } from '~/components/cards/profile'
import { Container } from '~/components/ui/container'
import { Twemoji } from '~/components/ui/twemoji'
import type { CoreContent } from '~/types/data'
import { Greeting } from './greeting'
import { Intro } from './intro'
import { LatestPosts } from './latest-posts'
import { BlogLinks } from './links'
import { TypedBios } from './typed-bios'
import NextImage from 'next/image'

export function Home({
  posts,
  snippets,
}: {
  posts: CoreContent<Blog>[]
  snippets: CoreContent<Snippet>[]
}) {
  return (
    <Container as="div" className="pt-4 lg:pt-12">
     
            
          <div className="divide-y">
          <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
            <div className="flex flex-col items-center pt-8 space-x-2">
            <NextImage
              src="/static/images/profilepic.jpeg"
              alt="avatar"
              width={192}
              height={192}
              className="w-48 h-48 rounded-full"
            />
            </div>

            <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2 dark:text-gray-400">
            <p>Hey I'm Rusty, a System Administrator for the University of Texas. I have 10 years of experience managing server
              infrastructures and data-center operations across multiple platforms and organizations. Effectively plan, install,
              configure and optimize the IT infrastructure to consistently achieve high availability and performance.</p>
              <p>You have stumbled upon my blog and personal website. Here I post projects I work on or just anything that 
                crosses my mind that I feel like sharing. Below are some links that might intreset you.
              </p>
            </div>


          </div></div>

          



      <LatestPosts posts={posts} snippets={snippets} />
      {/* {SITE_METADATA.newsletter?.provider && (
        <div className="flex items-center justify-center py-4 lg:py-10">
          <NewsletterForm />
        </div>
      )} */}
    </Container>
  )
}
