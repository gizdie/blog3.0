// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import { writeFileSync } from "fs";
import { slug as slug2 } from "github-slugger";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import path from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCitation from "rehype-citation";
import rehypePresetMinify from "rehype-preset-minify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkMath from "remark-math";

// data/site-metadata.ts
var SITE_METADATA = {
  title: `Rusty's Blog and Portfolio`,
  author: "Rusty Yow",
  headerTitle: `Rusty's Blog`,
  description: "A compendium of my knowledge... or just my blog, however you want to look at it.",
  language: "en-us",
  theme: "system",
  // system, dark or light
  siteUrl: "https://www.rustyyow.com",
  siteRepo: "",
  siteLogo: `${process.env.BASE_PATH || ""}/static/images/profilepic.jpeg`,
  socialBanner: `${process.env.BASE_PATH || ""}/static/images/twitter-card.jpeg`,
  email: "other@rustyyow.com",
  github: "",
  x: "",
  facebook: "",
  youtube: "",
  linkedin: "https://www.linkedin.com/in/rusty-yow-88906548/",
  threads: "",
  instagram: "",
  locale: "en-US",
  stickyNav: true,
  goodreadsBookshelfUrl: "",
  goodreadsFeedUrl: "",
  imdbRatingsList: "https://www.imdb.com/list/ls591501098/?ref_=uspf_ttl_1&view=grid",
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl: ""
    }
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: "buttondown"
  },
  comments: {
    giscusConfigs: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "title",
      // supported options: pathname, url, title
      reactions: "1",
      // Emoji reactions: 1 = enable / 0 = disable
      metadata: "0",
      theme: "light",
      darkTheme: "transparent_dark",
      themeURL: "",
      lang: "en"
    }
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ""}/search.json`
    }
  },
  support: {
    buyMeACoffee: "",
    paypal: "",
    kofi: ""
  }
};

// utils/contentlayer.ts
var isProduction = process.env.NODE_ENV === "production";
function omit(obj, keys) {
  const result = Object.assign({}, obj);
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}
function coreContent(content) {
  return omit(content, ["body", "_raw", "_id"]);
}
function allCoreContent(contents) {
  if (isProduction)
    return contents.map((c) => coreContent(c)).filter((c) => !("draft" in c && c.draft === true));
  return contents.map((c) => coreContent(c));
}

// utils/misc.ts
function sortPosts(allBlogs, dateKey = "date") {
  return allBlogs.sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]));
}
function dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

// utils/remark-code-titles.ts
import { visit } from "unist-util-visit";
function remarkCodeTitles() {
  return (tree) => visit(tree, "code", (node, index, parent) => {
    let nodeLang = node.lang || "";
    let language = "";
    let title = "";
    if (nodeLang.includes(":")) {
      language = nodeLang.slice(0, nodeLang.search(":"));
      title = nodeLang.slice(nodeLang.search(":") + 1, nodeLang.length);
    }
    if (!title) return;
    parent.children.splice(index, 0, {
      type: "mdxJsxFlowElement",
      // @ts-ignore
      name: "CodeTitle",
      attributes: [
        { type: "mdxJsxAttribute", name: "lang", value: language },
        { type: "mdxJsxAttribute", name: "title", value: title }
      ],
      data: { _xdmExplicitJsx: true }
    });
    node.lang = language;
  });
}

// utils/remark-extract-frontmatter.ts
import { visit as visit2 } from "unist-util-visit";
import yaml from "js-yaml";
function remarkExtractFrontmatter() {
  return (tree, file) => {
    visit2(tree, "yaml", (node) => {
      file.data.frontmatter = yaml.load(node.value);
    });
  };
}

// utils/remark-img-to-jsx.ts
import { visit as visit3 } from "unist-util-visit";
import { sync as sizeOf } from "probe-image-size";
import fs from "fs";
function remarkImgToJsx() {
  return (tree) => {
    visit3(
      tree,
      // only visit p tags that contain an img element
      (node) => node.type === "paragraph" && node.children.some((n) => n.type === "image"),
      (node) => {
        let imageNodeIndex = node.children.findIndex((n) => n.type === "image");
        let imageNode = node.children[imageNodeIndex];
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          let dimensions = sizeOf(fs.readFileSync(`${process.cwd()}/public${imageNode.url}`));
          imageNode.type = "mdxJsxFlowElement", imageNode.name = "Image", imageNode.attributes = [
            { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
            { type: "mdxJsxAttribute", name: "src", value: imageNode.url },
            { type: "mdxJsxAttribute", name: "width", value: dimensions.width },
            { type: "mdxJsxAttribute", name: "height", value: dimensions.height }
          ];
          node.type = "div";
          node.children[imageNodeIndex] = imageNode;
        }
      }
    );
  };
}

// utils/remark-toc-headings.ts
import { slug } from "github-slugger";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import { visit as visit4 } from "unist-util-visit";
function remarkTocHeadings() {
  return (tree, file) => {
    let toc = [];
    visit4(tree, "heading", (node) => {
      let textContent = toString(node).replace(/<[^>]*(>|$)/g, "");
      if (textContent) {
        toc.push({
          value: textContent,
          url: "#" + slug(textContent),
          // @ts-ignore
          depth: node.depth
        });
      }
    });
    file.data.toc = toc;
  };
}
async function extractTocHeadings(markdown) {
  let vfile = await remark().use(remarkTocHeadings).process(markdown);
  return vfile.data.toc;
}

// contentlayer.config.ts
var root = process.cwd();
var isProduction2 = process.env.NODE_ENV === "production";
var icon = fromHtmlIsomorphic(
  `
    <span class="content-header-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
    </svg>
    </span>
  `,
  { fragment: true }
);
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: { type: "json", resolve: (doc) => extractTocHeadings(doc.body.raw) }
};
function createTagCount(documents) {
  let tagCount = {};
  documents.forEach((file) => {
    if (file.tags && (!isProduction2 || file.draft !== true)) {
      file.tags.forEach((tag) => {
        let formattedTag = slug2(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync("./json/tag-data.json", JSON.stringify(tagCount));
  console.log("\u{1F3F7}\uFE0F. Tag list generated.");
}
function createSearchIndex(allBlogs) {
  let searchDocsPath = SITE_METADATA.search.kbarConfigs.searchDocumentsPath;
  if (searchDocsPath) {
    writeFileSync(
      `public/${path.basename(searchDocsPath)}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    );
    console.log("\u{1F50D} Local search index generated.");
  }
}
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : SITE_METADATA.socialBanner,
        url: `${SITE_METADATA.siteUrl}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/**/*.mdx",
  contentType: "mdx",
  fields: {
    heading: { type: "string", required: true },
    title: { type: "string", required: true },
    icon: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "CodeSnippet",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : SITE_METADATA.socialBanner,
        url: `${SITE_METADATA.siteUrl}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Snippet, Author],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: {
            className: ["content-header"]
          },
          content: icon
        }
      ],
      // rehypeKatex,
      [rehypeCitation, { path: path.join(root, "data") }],
      // [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark-dimmed",
            light: "solarized-light"
          }
        }
      ],
      rehypePresetMinify
    ]
  },
  onSuccess: async (importData) => {
    let { allBlogs, allSnippets } = await importData();
    let allPosts = [...allBlogs, ...allSnippets];
    createTagCount(allPosts);
    createSearchIndex(allPosts);
    console.log("\u2728 Content source generated successfully!");
  }
});
export {
  Author,
  Blog,
  Snippet,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-HBPIA6H6.mjs.map
