"use client";

import Link from "next/link";
import { BOOKS, READERS, type ReaderPost } from "@/lib/bookly-data";
import { Icon } from "@/components/icon";
import { BookCover } from "@/components/book-cover";
import { useBookly } from "@/lib/bookly-context";

export function PostCard({
  post,
  immersive = false,
  index,
  currentNumber,
  totalPosts,
  onNavigate,
}: {
  post: ReaderPost;
  immersive?: boolean;
  index?: number;
  currentNumber?: number;
  totalPosts?: number;
  onNavigate?: (direction: -1 | 1) => void;
}) {
  const { savedBookIds, toggleSavedBook } = useBookly();
  const book = BOOKS.find((item) => item.id === post.bookId);
  const reader = READERS.find((item) => item.id === post.userId);

  if (!book || !reader) return null;

  const isSaved = savedBookIds.includes(book.id);
  const typeClass = post.type.toLowerCase().replaceAll(" ", "-");

  return (
    <article
      className={`post-card${immersive ? " post-card-immersive" : ""} post-type-${typeClass}`}
      data-feed-index={immersive ? index : undefined}
      aria-label={immersive ? `${post.type} about ${book.title}` : undefined}
    >
      <div className="post-content">
        <div className="post-byline">
          <span className="avatar" style={{ backgroundColor: reader.color }} aria-hidden="true">
            {reader.initials}
          </span>
          <div className="post-reader">
            <strong>{reader.name}</strong>
            <span>@{reader.handle}</span>
          </div>
          <span className="post-dot" aria-hidden="true">·</span>
          <time>{post.createdAt}</time>
          {post.isDemo && <span className="demo-pill">DEMO</span>}
        </div>

        <div className="post-copy-block">
          <span className="post-type-label">
            <Icon name={post.type === "Recommendation" ? "spark" : post.type === "Excerpt" ? "book" : "leaf"} />
            {post.type}
          </span>
          {post.type === "Excerpt" && <span className="quote-mark" aria-hidden="true">“</span>}
          <p className="post-copy">{post.content}</p>
        </div>

        <div className="post-tags" aria-label="Tags">
          {post.tags.map((tag) => (
            <span className="post-tag" key={tag}>#{tag.replaceAll(" ", "")}</span>
          ))}
        </div>
      </div>

      <div className="post-book-row">
        <Link
          href={`/books/${book.id}`}
          className="post-book-link"
          aria-label={`View ${book.title} by ${book.author}`}
        >
          <BookCover book={book} />
          <span className="post-book-meta">
            <span className="book-preview-eyebrow">THE BOOK BEHIND THE POST</span>
            <strong>{book.title}</strong>
            <span>{book.author} <span aria-hidden="true">·</span> {book.genre}</span>
          </span>
          {!immersive && <span className="post-book-arrow" aria-hidden="true">↗</span>}
        </Link>
        {!immersive && (
          <div className="post-book-actions">
            <Link className="view-book-button" href={`/books/${book.id}`}>
              View book <Icon name="arrow" />
            </Link>
            <button
              type="button"
              className={`save-icon-button${isSaved ? " is-saved" : ""}`}
              onClick={() => toggleSavedBook(book.id)}
              aria-pressed={isSaved}
              aria-label={isSaved ? `Remove ${book.title} from My Library` : `Save ${book.title} to My Library`}
              title={isSaved ? "Saved to My Library" : "Save book"}
            >
              <Icon name={isSaved ? "check" : "bookmark"} />
            </button>
          </div>
        )}
      </div>

      {immersive && (
        <aside className="post-action-rail" aria-label="Post actions">
          <button
            type="button"
            className={`post-rail-button${isSaved ? " is-saved" : ""}`}
            onClick={() => toggleSavedBook(book.id)}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Remove ${book.title} from My Library` : `Save ${book.title} to My Library`}
          >
            <span className="post-rail-icon"><Icon name={isSaved ? "check" : "bookmark"} /></span>
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
          <Link
            className="post-rail-button"
            href={`/books/${book.id}`}
            aria-label={`View ${book.title} details`}
          >
            <span className="post-rail-icon"><Icon name="book" /></span>
            <span>View book</span>
          </Link>
          <div className="post-rail-divider" />
          <button
            type="button"
            className="post-rail-button post-rail-navigation post-rail-previous"
            onClick={() => onNavigate?.(-1)}
            disabled={currentNumber === 1}
            aria-label="Previous post"
          >
            <span className="post-rail-icon"><Icon name="arrow" /></span>
            <span>Previous</span>
          </button>
          <span className="post-rail-position" aria-live="polite">
            {currentNumber} / {totalPosts}
          </span>
          <button
            type="button"
            className="post-rail-button post-rail-navigation"
            onClick={() => onNavigate?.(1)}
            disabled={currentNumber === totalPosts}
            aria-label="Next post"
          >
            <span className="post-rail-icon"><Icon name="arrow" /></span>
            <span>Next</span>
          </button>
        </aside>
      )}
    </article>
  );
}
