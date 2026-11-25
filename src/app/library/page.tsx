"use client";

import Link from "next/link";
import { BOOKS } from "@/lib/bookly-data";
import { useBookly } from "@/lib/bookly-context";
import { BookCover } from "@/components/book-cover";
import { Icon } from "@/components/icon";

export default function LibraryPage() {
  const { savedBookIds, toggleSavedBook, posts } = useBookly();
  const savedBooks = BOOKS.filter((book) => savedBookIds.includes(book.id));

  return (
    <div className="page-wrap library-page">
      <header className="page-topline library-topline">
        <div>
          <span className="eyebrow"><Icon name="bookmark" /> YOUR PERSONAL SHELF</span>
          <h1>My little <span>library.</span></h1>
          <p>Every book you saved, right where you left it.</p>
        </div>
        <span className="library-count"><strong>{savedBooks.length.toString().padStart(2, "0")}</strong> BOOKS SAVED</span>
      </header>

      {savedBooks.length === 0 ? (
        <div className="empty-state library-empty">
          <span className="empty-state-icon"><Icon name="bookmark" /></span>
          <h2>Your shelf is still a blank page.</h2>
          <p>When a reader post catches your eye, save its book and it&apos;ll be waiting here.</p>
          <Link className="button button-primary" href="/">Explore reader posts <Icon name="arrow" /></Link>
        </div>
      ) : (
        <section className="library-grid" aria-label="Saved books">
          {savedBooks.map((book, index) => {
            const relatedCount = posts.filter((post) => post.bookId === book.id).length;
            return (
              <article className="library-book" key={book.id}>
                <Link className="library-book-cover" href={`/books/${book.id}`} aria-label={`View ${book.title}`}>
                  <BookCover book={book} size="large" />
                  <span className="library-index">{(index + 1).toString().padStart(2, "0")}</span>
                </Link>
                <div className="library-book-details">
                  <span className="book-genre-label">{book.genre} <span aria-hidden="true">·</span> {book.year}</span>
                  <h2><Link href={`/books/${book.id}`}>{book.title}</Link></h2>
                  <p>{book.author}</p>
                  <span className="library-post-count">{relatedCount} reader {relatedCount === 1 ? "note" : "notes"}</span>
                  <div className="library-book-actions">
                    <Link href={`/books/${book.id}`} className="text-link">View book <Icon name="arrow" /></Link>
                    <button
                      type="button"
                      className="remove-book-button"
                      onClick={() => toggleSavedBook(book.id)}
                      aria-label={`Remove ${book.title} from My Library`}
                    >
                      <Icon name="close" /> Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <footer className="local-note"><Icon name="leaf" /> Your library is stored only in this browser.</footer>
    </div>
  );
}
