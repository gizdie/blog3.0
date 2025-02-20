export const SITE_METADATA = {
  title: `Rusty's Blog and Portfolio`,
  author: 'Rusty Yow',
  headerTitle: `Rusty's Blog`,
  description:
    'A compendium of my knowledge... or just my blog, however you want to look at it.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.rustyyow.com',
  siteRepo: '',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/profilepic.jpeg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.jpeg`,
  email: 'other@rustyyow.com',
  github: '',
  x: '',
  facebook: '',
  youtube: '',
  linkedin: 'https://www.linkedin.com/in/rusty-yow-88906548/',
  threads: '',
  instagram: '',
  locale: 'en-US',
  stickyNav: true,
  goodreadsBookshelfUrl: '',
  goodreadsFeedUrl: '',
  imdbRatingsList: 'https://www.imdb.com/list/ls591501098/?ref_=uspf_ttl_1&view=grid',
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl: '',
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    giscusConfigs: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO!,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID!,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
  support: {
    buyMeACoffee: '',
    paypal: '',
    kofi: '',
  },
}
