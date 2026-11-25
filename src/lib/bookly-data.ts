export type PostType =
  | "Review"
  | "Recommendation"
  | "Reaction"
  | "Excerpt"
  | "Plot hook";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  description: string;
  palette: [string, string, string];
  coverNote: string;
};

export type Reader = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  color: string;
  bio: string;
  isDemo?: boolean;
};

export type ReaderPost = {
  id: string;
  userId: string;
  bookId: string;
  type: PostType;
  content: string;
  tags: string[];
  createdAt: string;
  isDemo: boolean;
};

export const GENRES = [
  "Fantasy",
  "Romance",
  "Mystery",
  "Sci-fi",
  "Literary",
  "Thriller",
  "Classics",
  "Nonfiction",
] as const;

export const POST_TYPES: PostType[] = [
  "Review",
  "Recommendation",
  "Reaction",
  "Excerpt",
  "Plot hook",
];

export const BOOKS: Book[] = [
  {
    id: "midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Literary",
    year: 2020,
    pages: 304,
    description:
      "Between life and death sits a library of unwritten possibilities. Nora Seed gets to try a few on for size and ask what makes a life feel like your own.",
    palette: ["#203b38", "#78a69b", "#f0d7a1"],
    coverNote: "one life, many doors",
  },
  {
    id: "six-of-crows",
    title: "Six of Crows",
    author: "Leigh Bardugo",
    genre: "Fantasy",
    year: 2015,
    pages: 465,
    description:
      "Six sharp-edged outcasts take on an impossible heist in a city built on secrets, shifting alliances, and the kind of magic nobody can quite trust.",
    palette: ["#172c34", "#bd7956", "#f0d2a4"],
    coverNote: "no mourners. no funerals.",
  },
  {
    id: "yellowface",
    title: "Yellowface",
    author: "R. F. Kuang",
    genre: "Thriller",
    year: 2023,
    pages: 336,
    description:
      "A writer grabs the wrong story and becomes famous for it. A sharp, unsettling novel about authorship, ambition, and the stories we tell about ourselves.",
    palette: ["#c34537", "#f1b645", "#f9e3be"],
    coverNote: "who gets to tell a story?",
  },
  {
    id: "normal-people",
    title: "Normal People",
    author: "Sally Rooney",
    genre: "Romance",
    year: 2018,
    pages: 273,
    description:
      "Connell and Marianne keep finding their way into one another's orbit, growing up and apart in a story attentive to the fragile things people leave unsaid.",
    palette: ["#9a4f56", "#db9686", "#f3d9bd"],
    coverNote: "say what you mean",
  },
  {
    id: "tomorrow-and-tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    genre: "Literary",
    year: 2022,
    pages: 401,
    description:
      "Two friends build video games together across years of invention, estrangement, and return. A story about making something and making it with someone.",
    palette: ["#305c79", "#e27055", "#f2c469"],
    coverNote: "a game is a world",
  },
  {
    id: "circe",
    title: "Circe",
    author: "Madeline Miller",
    genre: "Fantasy",
    year: 2018,
    pages: 393,
    description:
      "The daughter of Helios finds her own power in exile. Myth becomes a deeply human story about making a life outside the lines drawn for you.",
    palette: ["#345c4a", "#8db18e", "#e8d596"],
    coverNote: "a voice of her own",
  },
  {
    id: "the-house-in-cerulean-sea",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    genre: "Fantasy",
    year: 2020,
    pages: 396,
    description:
      "A rule-following caseworker visits an unusual orphanage on a faraway island and discovers that home can be the place you never expected.",
    palette: ["#24717d", "#8ac6bd", "#f3d695"],
    coverNote: "a little more wonder",
  },
  {
    id: "piranesi",
    title: "Piranesi",
    author: "Susanna Clarke",
    genre: "Fantasy",
    year: 2020,
    pages: 272,
    description:
      "An enormous House of halls, tides, and statues is the whole world—or so its lone resident believes, until a few details refuse to fit.",
    palette: ["#295168", "#6db1b0", "#ead9b5"],
    coverNote: "the House remembers",
  },
  {
    id: "educated",
    title: "Educated",
    author: "Tara Westover",
    genre: "Nonfiction",
    year: 2018,
    pages: 334,
    description:
      "A memoir about growing up far from formal schooling and the complicated, hard-won freedom of learning to imagine another life.",
    palette: ["#765a42", "#d0a878", "#eee1c6"],
    coverNote: "a story of learning",
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Sci-fi",
    year: 2021,
    pages: 496,
    description:
      "A scientist wakes alone on a spacecraft with a fading memory and an impossible problem. The solution turns out to involve more than clever math.",
    palette: ["#263850", "#527ca0", "#e4bd70"],
    coverNote: "one unlikely friendship",
  },
  {
    id: "the-song-of-achilles",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    genre: "Romance",
    year: 2011,
    pages: 378,
    description:
      "A tender retelling of the friendship between Patroclus and Achilles, from a quiet beginning to the edge of a legendary war.",
    palette: ["#773b48", "#c37b69", "#ecd1ab"],
    coverNote: "remember us",
  },
  {
    id: "where-the-crawdads-sing",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Mystery",
    year: 2018,
    pages: 384,
    description:
      "A young woman grows up close to the marsh and far from town. When a local mystery draws attention her way, the place she knows becomes evidence.",
    palette: ["#426752", "#9eb38b", "#e4d3a5"],
    coverNote: "listen to the marsh",
  },
  {
    id: "the-seven-husbands",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Romance",
    year: 2017,
    pages: 400,
    description:
      "A retired screen icon finally tells her life story to an unexpected biographer, revealing the private choices behind a public image.",
    palette: ["#486d83", "#87aeb2", "#f1d4ae"],
    coverNote: "the story behind the star",
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    genre: "Classics",
    year: 1818,
    pages: 280,
    description:
      "An ambitious experiment sets loose a question that outlives its creator: what do we owe the lives we bring into the world?",
    palette: ["#363844", "#89949b", "#d7c8af"],
    coverNote: "who makes a monster?",
  },
  {
    id: "good-omens",
    title: "Good Omens",
    author: "Terry Pratchett & Neil Gaiman",
    genre: "Fantasy",
    year: 1990,
    pages: 432,
    description:
      "An angel, a demon, and an inconveniently missing Antichrist complicate the end of the world in this warm, mischievous fantasy.",
    palette: ["#342a4c", "#e7834e", "#f0cf73"],
    coverNote: "the end can wait",
  },
];

export const READERS: Reader[] = [
  {
    id: "mara",
    name: "Mara Chen",
    handle: "marareads",
    initials: "MC",
    color: "#b86f58",
    bio: "Fantasy doorstopper enthusiast. Usually reading two books at once.",
    isDemo: true,
  },
  {
    id: "theo",
    name: "Theo James",
    handle: "theo.afterhours",
    initials: "TJ",
    color: "#527a91",
    bio: "Mysteries for the commute, essays for the long weekend.",
    isDemo: true,
  },
  {
    id: "imani",
    name: "Imani Brooks",
    handle: "imaniinmargin",
    initials: "IB",
    color: "#89704a",
    bio: "Collecting small sentences that stay with me.",
    isDemo: true,
  },
  {
    id: "leo",
    name: "Leo Park",
    handle: "leoparkreads",
    initials: "LP",
    color: "#526c58",
    bio: "Sci-fi, speculative fiction, and the occasional cookbook.",
    isDemo: true,
  },
  {
    id: "sana",
    name: "Sana Patel",
    handle: "sanasundaybooks",
    initials: "SP",
    color: "#a86175",
    bio: "Romance reader who always notices the side characters.",
    isDemo: true,
  },
  {
    id: "rory",
    name: "Rory Ellis",
    handle: "roryreadsroom",
    initials: "RE",
    color: "#796494",
    bio: "Here for a good plot hook and a better cup of tea.",
    isDemo: true,
  },
  {
    id: "jules",
    name: "Jules Morgan",
    handle: "jules.in.chapter",
    initials: "JM",
    color: "#73804f",
    bio: "Reading my way through a very optimistic TBR list.",
    isDemo: true,
  },
  {
    id: "nia",
    name: "Nia Williams",
    handle: "niareadsoutside",
    initials: "NW",
    color: "#9b6849",
    bio: "Usually reading outdoors, weather permitting.",
    isDemo: true,
  },
  {
    id: "you",
    name: "You",
    handle: "your.bookly",
    initials: "Y",
    color: "#d56f58",
    bio: "Your posts and reading interests live on this device.",
  },
];

export const DEMO_POSTS: ReaderPost[] = [
  {
    id: "post-01",
    userId: "mara",
    bookId: "six-of-crows",
    type: "Recommendation",
    content:
      "For when you want a found-family heist crew where everyone has a plan, a backup plan, and a very good reason not to trust each other.",
    tags: ["found family", "heist", "can't-put-down"],
    createdAt: "2h ago",
    isDemo: true,
  },
  {
    id: "post-02",
    userId: "imani",
    bookId: "the-midnight-library",
    type: "Review",
    content:
      "A quiet nudge to stop measuring your life against the ones you didn't choose. I finished it on the train and just sat there for a minute.",
    tags: ["life lately", "thoughtful"],
    createdAt: "3h ago",
    isDemo: true,
  },
  {
    id: "post-03",
    userId: "leo",
    bookId: "project-hail-mary",
    type: "Reaction",
    content:
      "I thought I was signing up for a clever space puzzle. I did not expect to get this emotionally invested in a scientific problem-solving friendship.",
    tags: ["space", "unexpectedly sweet"],
    createdAt: "4h ago",
    isDemo: true,
  },
  {
    id: "post-04",
    userId: "sana",
    bookId: "normal-people",
    type: "Reaction",
    content:
      "A quiet scene about the way two people shape each other made me stop and reread the page.",
    tags: ["favorite line", "quiet feelings"],
    createdAt: "5h ago",
    isDemo: true,
  },
  {
    id: "post-05",
    userId: "rory",
    bookId: "yellowface",
    type: "Plot hook",
    content:
      "Two writers. One unfinished manuscript. One career-making decision that should have been an easy no. The tension starts on page one.",
    tags: ["messy people", "book club pick"],
    createdAt: "6h ago",
    isDemo: true,
  },
  {
    id: "post-06",
    userId: "jules",
    bookId: "circe",
    type: "Recommendation",
    content:
      "If you like your mythology with a complicated, capable woman at the center, take this one to the park and let the afternoon disappear.",
    tags: ["myth retelling", "strong voice"],
    createdAt: "7h ago",
    isDemo: true,
  },
  {
    id: "post-07",
    userId: "theo",
    bookId: "the-midnight-library",
    type: "Reaction",
    content:
      "I came for the premise, stayed for the reminder that an ordinary Tuesday can be a whole life too.",
    tags: ["second chances", "gentle read"],
    createdAt: "8h ago",
    isDemo: true,
  },
  {
    id: "post-08",
    userId: "nia",
    bookId: "where-the-crawdads-sing",
    type: "Review",
    content:
      "The marsh feels like its own character here. I loved the atmosphere and the way the setting quietly shapes every choice.",
    tags: ["atmospheric", "nature"],
    createdAt: "9h ago",
    isDemo: true,
  },
  {
    id: "post-09",
    userId: "mara",
    bookId: "piranesi",
    type: "Plot hook",
    content:
      "You live in a house made of endless halls and ocean tides. There may be another person in it. That's all I'm saying.",
    tags: ["strange worlds", "go in curious"],
    createdAt: "10h ago",
    isDemo: true,
  },
  {
    id: "post-10",
    userId: "sana",
    bookId: "the-song-of-achilles",
    type: "Review",
    content:
      "A myth I thought I knew, told with so much tenderness that it felt new again. Keep tissues nearby; I am not being dramatic.",
    tags: ["myth retelling", "beautifully sad"],
    createdAt: "11h ago",
    isDemo: true,
  },
  {
    id: "post-11",
    userId: "leo",
    bookId: "tomorrow-and-tomorrow",
    type: "Recommendation",
    content:
      "For the people who make things together, drift apart, and somehow keep finding a way to make one more thing.",
    tags: ["creative lives", "friendship"],
    createdAt: "12h ago",
    isDemo: true,
  },
  {
    id: "post-12",
    userId: "imani",
    bookId: "educated",
    type: "Review",
    content:
      "A thoughtful memoir about education and independence, without pretending that change comes neatly or without grief.",
    tags: ["memoir", "big questions"],
    createdAt: "13h ago",
    isDemo: true,
  },
  {
    id: "post-13",
    userId: "rory",
    bookId: "good-omens",
    type: "Reaction",
    content:
      "An angel and a demon try to prevent the apocalypse because they're rather fond of Earth. A very good day to read something silly.",
    tags: ["comic fantasy", "comfort read"],
    createdAt: "1d ago",
    isDemo: true,
  },
  {
    id: "post-14",
    userId: "jules",
    bookId: "the-house-in-cerulean-sea",
    type: "Recommendation",
    content:
      "A warm blanket of a book about making room for the people the world would rather misunderstand.",
    tags: ["cozy fantasy", "hopeful"],
    createdAt: "1d ago",
    isDemo: true,
  },
  {
    id: "post-15",
    userId: "theo",
    bookId: "frankenstein",
    type: "Plot hook",
    content:
      "What if the most unsettling thing isn't creating life—but refusing to care for it afterward?",
    tags: ["classic", "big questions"],
    createdAt: "1d ago",
    isDemo: true,
  },
  {
    id: "post-16",
    userId: "nia",
    bookId: "normal-people",
    type: "Reaction",
    content:
      "Every time they almost say the thing, I put the book down and stare at the wall. Going back in now.",
    tags: ["quiet feelings", "one more chapter"],
    createdAt: "1d ago",
    isDemo: true,
  },
  {
    id: "post-17",
    userId: "mara",
    bookId: "circe",
    type: "Review",
    content:
      "Ocean air, herbs, gods behaving badly, and a narrator who earns every bit of her hard-won confidence.",
    tags: ["myth retelling", "slow magic"],
    createdAt: "1d ago",
    isDemo: true,
  },
  {
    id: "post-18",
    userId: "leo",
    bookId: "six-of-crows",
    type: "Reaction",
    content:
      "Started for the impossible heist. Stayed for all the tiny trust-building moments between people who swore they didn't trust anyone.",
    tags: ["found family", "character-first"],
    createdAt: "1d ago",
    isDemo: true,
  },
  {
    id: "post-19",
    userId: "sana",
    bookId: "the-seven-husbands",
    type: "Plot hook",
    content:
      "An aging movie star agrees to tell the real story of her life—but only to a journalist nobody expected her to choose.",
    tags: ["old Hollywood", "secrets"],
    createdAt: "1d ago",
    isDemo: true,
  },
  {
    id: "post-20",
    userId: "imani",
    bookId: "piranesi",
    type: "Reaction",
    content:
      "A beautiful moment where the narrator describes the House with such wonder that I wanted to stay there too.",
    tags: ["favorite line", "dreamlike"],
    createdAt: "2d ago",
    isDemo: true,
  },
  {
    id: "post-21",
    userId: "rory",
    bookId: "yellowface",
    type: "Reaction",
    content:
      "The narrator makes such confident choices that you keep waiting for the ground to move under her. It does.",
    tags: ["unreliable narrator", "tense"],
    createdAt: "2d ago",
    isDemo: true,
  },
  {
    id: "post-22",
    userId: "jules",
    bookId: "project-hail-mary",
    type: "Recommendation",
    content:
      "A great pick if you want science explained with enthusiasm and a plot that keeps giving you fresh little puzzles.",
    tags: ["science-y", "page turner"],
    createdAt: "2d ago",
    isDemo: true,
  },
  {
    id: "post-23",
    userId: "theo",
    bookId: "where-the-crawdads-sing",
    type: "Plot hook",
    content:
      "A quiet girl raised in the marsh becomes the center of a town's most talked-about mystery. The setting is everything.",
    tags: ["slow mystery", "sense of place"],
    createdAt: "2d ago",
    isDemo: true,
  },
  {
    id: "post-24",
    userId: "nia",
    bookId: "educated",
    type: "Reaction",
    content:
      "A story that lets complicated family feelings stay complicated. I appreciated how much room it gave the reader.",
    tags: ["memoir", "reflective"],
    createdAt: "2d ago",
    isDemo: true,
  },
  {
    id: "post-25",
    userId: "mara",
    bookId: "good-omens",
    type: "Recommendation",
    content:
      "For a friendship between an angel and demon that has absolutely no business being this charming.",
    tags: ["odd-couple", "funny"],
    createdAt: "3d ago",
    isDemo: true,
  },
  {
    id: "post-26",
    userId: "sana",
    bookId: "tomorrow-and-tomorrow",
    type: "Review",
    content:
      "The way it treats creative work as both a place to escape and a way to reach other people really got me.",
    tags: ["creative lives", "friendship"],
    createdAt: "3d ago",
    isDemo: true,
  },
  {
    id: "post-27",
    userId: "imani",
    bookId: "the-house-in-cerulean-sea",
    type: "Recommendation",
    content:
      "A reminder from this book: being seen as you are can change the shape of an entire day.",
    tags: ["kindness", "save this thought"],
    createdAt: "3d ago",
    isDemo: true,
  },
  {
    id: "post-28",
    userId: "leo",
    bookId: "frankenstein",
    type: "Review",
    content:
      "The old novel surprised me with how contemporary its questions about ambition and responsibility still feel.",
    tags: ["classic", "reread"],
    createdAt: "3d ago",
    isDemo: true,
  },
  {
    id: "post-29",
    userId: "theo",
    bookId: "frankenstein",
    type: "Excerpt",
    content:
      "“I ought to be thy Adam, but I am rather the fallen angel.” — Mary Shelley, Frankenstein (1818).",
    tags: ["public domain", "classic"],
    createdAt: "4d ago",
    isDemo: true,
  },
  {
    id: "post-30",
    userId: "jules",
    bookId: "the-seven-husbands",
    type: "Reaction",
    content:
      "I went in expecting gossip, and left thinking about who gets to decide which parts of a life become a story.",
    tags: ["secrets", "unexpected depth"],
    createdAt: "4d ago",
    isDemo: true,
  },
];

export function isPostType(value: unknown): value is PostType {
  return POST_TYPES.some((type) => type === value);
}

export function isReaderPost(value: unknown): value is ReaderPost {
  if (typeof value !== "object" || value === null) return false;
  const post = value as Record<string, unknown>;
  return (
    typeof post.id === "string" &&
    typeof post.userId === "string" &&
    READERS.some((reader) => reader.id === post.userId) &&
    typeof post.bookId === "string" &&
    BOOKS.some((book) => book.id === post.bookId) &&
    isPostType(post.type) &&
    typeof post.content === "string" &&
    Array.isArray(post.tags) &&
    post.tags.every((tag) => typeof tag === "string") &&
    typeof post.createdAt === "string" &&
    typeof post.isDemo === "boolean"
  );
}
