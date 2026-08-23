// import { allBlogs, allSnippets } from 'contentlayer/generated' // re-enable when blog/snippets feed is turned back on
import { Home } from '~/components/home-page'
// import { allCoreContent } from '~/utils/contentlayer'
// import { sortPosts } from '~/utils/misc'

// const MAX_POSTS_DISPLAY = 5
// const MAX_SNIPPETS_DISPLAY = 6

export default async function HomePage() {
  return (
    <Home
    // posts={allCoreContent(sortPosts(allBlogs)).slice(0, MAX_POSTS_DISPLAY)}
    // snippets={allCoreContent(sortPosts(allSnippets))
    //   .filter((snippet) => !snippet.draft)
    //   .slice(0, MAX_SNIPPETS_DISPLAY)}
    />
  )
}
