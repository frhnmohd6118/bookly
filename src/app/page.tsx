"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { PostCard } from "@/components/post-card";
import { Icon } from "@/components/icon";
import { BOOKS, GENRES } from "@/lib/bookly-data";
import { useBookly } from "@/lib/bookly-context";

export default function DiscoverPage() {
  const { interests, posts, storageNotice } = useBookly();
  const [activeGenre, setActiveGenre] = useState("For you");
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedRef = useRef<HTMLElement>(null);

  const visiblePosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matching = posts.filter((post) => {
      const book = BOOKS.find((item) => item.id === post.bookId);
      if (!book) return false;
      const genreMatches =
        activeGenre === "For you" ||
        activeGenre === "All genres" ||
        book.genre === activeGenre;
      const searchMatches =
        !query ||
        [post.content, post.type, book.title, book.author, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return genreMatches && searchMatches;
    });

    if (activeGenre !== "For you" || interests.length === 0) return matching;

    const favored = matching.filter((post) =>
      interests.includes(BOOKS.find((book) => book.id === post.bookId)?.genre ?? ""),
    );
    const discovery = matching.filter(
      (post) =>
        !interests.includes(
          BOOKS.find((book) => book.id === post.bookId)?.genre ?? "",
        ),
    );
    const mixed: typeof posts = [];
    let favoredIndex = 0;
    let discoveryIndex = 0;
    while (favoredIndex < favored.length || discoveryIndex < discovery.length) {
      mixed.push(...favored.slice(favoredIndex, favoredIndex + 3));
      favoredIndex += 3;
      if (discovery[discoveryIndex]) mixed.push(discovery[discoveryIndex]);
      discoveryIndex += 1;
    }
    return mixed;
  }, [activeGenre, interests, posts, search]);

  const filters = ["For you", "All genres", ...GENRES];

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    feed.scrollTop = 0;
    setCurrentIndex(0);

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = mostVisible?.target.getAttribute("data-feed-index");
        if (index !== null && index !== undefined) setCurrentIndex(Number(index));
      },
      { root: feed, threshold: [0.55, 0.75, 1] },
    );

    feed.querySelectorAll("[data-feed-index]").forEach((post) => observer.observe(post));
    return () => observer.disconnect();
  }, [visiblePosts]);

  function navigateFeed(direction: -1 | 1) {
    const nextIndex = Math.max(0, Math.min(currentIndex + direction, visiblePosts.length - 1));
    if (nextIndex === currentIndex) return false;
    const nextPost = feedRef.current?.querySelector<HTMLElement>(
      `[data-feed-index="${nextIndex}"]`,
    );
    if (!nextPost) return false;
    setCurrentIndex(nextIndex);
    nextPost.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    return true;
  }

  function handleFeedKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
      if (navigateFeed(1)) event.preventDefault();
    } else if (event.key === "ArrowUp" || event.key === "PageUp") {
      if (navigateFeed(-1)) event.preventDefault();
    }
  }

  return (
    <div className="page-wrap discover-page">
      <header className="discover-header">
        <h1>Discover</h1>
        <span className="discover-post-count">{visiblePosts.length} reader posts</span>
        <Link className="discover-create" href="/create"><Icon name="plus" /> Write</Link>
      </header>

      {storageNotice && <p className="discover-storage-notice" role="status">{storageNotice}</p>}

      <div className="feed-controls">
        <div className="filter-row" role="group" aria-label="Filter posts by genre">
          {filters.map((genre) => (
            <button
              type="button"
              key={genre}
              className={`filter-chip${activeGenre === genre ? " filter-chip-active" : ""}`}
              onClick={() => setActiveGenre(genre)}
              aria-pressed={activeGenre === genre}
            >
              {genre === "For you" && <Icon name="spark" />}
              {genre}
            </button>
          ))}
        </div>
        <label className="feed-search">
          <Icon name="search" />
          <span className="sr-only">Search posts, books, or tags</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search a mood, title, or tag"
          />
        </label>
      </div>

      {visiblePosts.length > 0 ? (
        <section
          className="post-feed immersive-feed"
          aria-label="Reader-created book posts"
          aria-describedby="feed-keyboard-hint"
          aria-keyshortcuts="ArrowUp ArrowDown PageUp PageDown Space"
          tabIndex={0}
          ref={feedRef}
          onKeyDown={handleFeedKeyDown}
        >
          <span id="feed-keyboard-hint" className="sr-only">
            Focus this feed and use the up and down arrow keys, Page Up, Page Down, or Space to browse posts.
          </span>
          {visiblePosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              immersive
              index={index}
              currentNumber={index + 1}
              totalPosts={visiblePosts.length}
              onNavigate={navigateFeed}
            />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <span className="empty-state-icon"><Icon name="search" /></span>
          <h2>No notes on this shelf just yet.</h2>
          <p>Try a different search or pick another genre to keep wandering.</p>
          <button type="button" className="button button-outline" onClick={() => { setSearch(""); setActiveGenre("For you"); }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
