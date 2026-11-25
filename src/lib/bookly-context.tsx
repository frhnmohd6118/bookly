"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BOOKS,
  DEMO_POSTS,
  GENRES,
  READERS,
  isReaderPost,
  type ReaderPost,
} from "@/lib/bookly-data";

type BooklyContextValue = {
  savedBookIds: string[];
  posts: ReaderPost[];
  interests: string[];
  hydrated: boolean;
  storageNotice: string;
  toggleSavedBook: (bookId: string) => void;
  addPost: (post: ReaderPost) => void;
  toggleInterest: (interest: string) => void;
};

const STORAGE_KEY = "bookly-prototype-v1";
const POST_RECOVERY_KEY = `${STORAGE_KEY}-post-recovery`;
const BooklyContext = createContext<BooklyContextValue | null>(null);

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isSavedBookIds(value: unknown): value is string[] {
  return (
    isStringArray(value) &&
    value.every((id) => BOOKS.some((book) => book.id === id))
  );
}

function isInterestList(value: unknown): value is string[] {
  return (
    isStringArray(value) &&
    value.every((item) => GENRES.some((genre) => genre === item))
  );
}

function preserveUnreadablePosts(value: unknown) {
  try {
    const stored = window.localStorage.getItem(POST_RECOVERY_KEY);
    const previous: unknown = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(previous)) {
      throw new Error("Saved Bookly post recovery data has an invalid shape.");
    }
    window.localStorage.setItem(
      POST_RECOVERY_KEY,
      JSON.stringify([...previous, value]),
    );
    return true;
  } catch (error) {
    console.error("Could not preserve unreadable Bookly posts.", error);
    return false;
  }
}

export function BooklyProvider({ children }: { children: ReactNode }) {
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);
  const [posts, setPosts] = useState<ReaderPost[]>(DEMO_POSTS);
  const [interests, setInterests] = useState<string[]>(["Fantasy", "Romance"]);
  const [hydrated, setHydrated] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");
  const [persistenceBlocked, setPersistenceBlocked] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (typeof parsed !== "object" || parsed === null) {
            throw new Error("Saved Bookly data has an invalid shape.");
          }

          const data = parsed as Record<string, unknown>;
          if (isSavedBookIds(data.savedBookIds)) {
            setSavedBookIds(data.savedBookIds);
          } else if (data.savedBookIds !== undefined) {
            console.error("Could not load Bookly saved books: invalid data.");
          }
          if (data.posts !== undefined) {
            const recoveredPosts = Array.isArray(data.posts)
              ? data.posts.filter(isReaderPost)
              : [];
            if (Array.isArray(data.posts) && recoveredPosts.length === data.posts.length) {
              setPosts(recoveredPosts);
            } else {
              const preserved = preserveUnreadablePosts(data.posts);
              if (!preserved) setPersistenceBlocked(true);
              if (recoveredPosts.length > 0) setPosts(recoveredPosts);
              setStorageNotice(
                preserved
                  ? "Some saved posts could not be restored. An untouched copy is preserved in this browser."
                  : "Some saved posts could not be restored or backed up. Avoid clearing this browser's saved data.",
              );
              console.warn("Some saved Bookly posts could not be restored.");
            }
          }
          if (isInterestList(data.interests)) {
            setInterests(data.interests);
          } else if (data.interests !== undefined) {
            console.error("Could not load Bookly interests: invalid data.");
          }
        }
      } catch (error) {
        console.error("Could not read Bookly data from local storage.", error);
        setPersistenceBlocked(true);
        setStorageNotice(
          "Saved Bookly data could not be read. Avoid clearing this browser's saved data.",
        );
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated || persistenceBlocked) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ savedBookIds, posts, interests }),
      );
    } catch (error) {
      console.error("Could not save Bookly data to local storage.", error);
    }
  }, [hydrated, interests, persistenceBlocked, posts, savedBookIds]);

  const toggleSavedBook = useCallback((bookId: string) => {
    if (!BOOKS.some((book) => book.id === bookId)) {
      console.error(`Could not save unknown Bookly book: ${bookId}`);
      return;
    }
    setSavedBookIds((current) =>
      current.includes(bookId)
        ? current.filter((id) => id !== bookId)
        : [...current, bookId],
    );
  }, []);

  const addPost = useCallback((post: ReaderPost) => {
    if (!isReaderPost(post) || post.userId !== "you" || post.isDemo) {
      console.error("Could not publish invalid Bookly post data.");
      return;
    }
    setPosts((current) => [post, ...current]);
  }, []);

  const toggleInterest = useCallback((interest: string) => {
    if (!GENRES.some((genre) => genre === interest)) {
      console.error(`Could not select unknown Bookly interest: ${interest}`);
      return;
    }
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }, []);

  const value = useMemo(
    () => ({
      savedBookIds,
      posts,
      interests,
      hydrated,
      storageNotice,
      toggleSavedBook,
      addPost,
      toggleInterest,
    }),
    [
      addPost,
      hydrated,
      interests,
      posts,
      savedBookIds,
      storageNotice,
      toggleInterest,
      toggleSavedBook,
    ],
  );

  return (
    <BooklyContext.Provider value={value}>{children}</BooklyContext.Provider>
  );
}

export function useBookly() {
  const context = useContext(BooklyContext);
  if (!context) {
    throw new Error("useBookly must be used inside BooklyProvider.");
  }
  return context;
}

export { READERS };
