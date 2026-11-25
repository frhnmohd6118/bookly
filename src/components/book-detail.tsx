"use client";

import Link from "next/link";
import { BOOKS } from "@/lib/bookly-data";
import { useBookly } from "@/lib/bookly-context";
import { BookCover } from "@/components/book-cover";
import { Icon } from "@/components/icon";
import { PostCard } from "@/components/post-card";

export function BookDetail({ bookId }: { bookId: string }) {
  const { posts, savedBookIds, toggleSavedBook } = useBookly();
  const book = BOOKS.find((item) => item.id === bookId);
  if (!book) return null;

  const relatedPosts = posts.filter((post) => post.bookId === book.id);
  const saved = savedBookIds.includes(book.id);

  return (
    <div className="page-wrap book-detail-page">
      <Link href="/" className="back-link book-back-link"><span aria-hidden="true">←</span> Back to reader posts</Link>

      <section className="book-detail-hero">
        <div className="book-detail-cover"><BookCover book={book} size="large" /><span className="cover-shadow" aria-hidden="true" /></div>
        <div className="book-detail-info">
          <span className="eyebrow"><Icon name="book" /> THE BOOK BEHIND THE POSTS</span>
          <span className="book-detail-genre">{book.genre} <span aria-hidden="true">·</span> {book.year}</span>
          <h1>{book.title}</h1>
          <p className="book-detail-author">by <strong>{book.author}</strong></p>
          <p className="book-detail-description">{book.description}</p>
          <div className="book-metadata">
            <span><strong>{book.pages}</strong><small>pages</small></span>
            <span><strong>{book.year}</strong><small>published</small></span>
            <span><strong>{relatedPosts.length}</strong><small>reader {relatedPosts.length === 1 ? "note" : "notes"}</small></span>
          </div>
          <button
            type="button"
            className={`button ${saved ? "button-saved" : "button-primary"}`}
            onClick={() => toggleSavedBook(book.id)}
            aria-pressed={saved}
          >
            <Icon name={saved ? "check" : "bookmark"} />
            {saved ? "Saved to My Library" : "Save to My Library"}
          </button>
          <p className="detail-storage-note"><Icon name="leaf" /> Saves on this device</p>
        </div>
        <span className="detail-sparkle detail-sparkle-one" aria-hidden="true">✳</span>
        <span className="detail-sparkle detail-sparkle-two" aria-hidden="true">✳</span>
      </section>

      <section className="related-posts-section" aria-labelledby="related-posts-title">
        <div className="section-heading">
          <div><span className="eyebrow"><Icon name="spark" /> READERS MADE THE CONNECTION</span><h2 id="related-posts-title">Notes about this book</h2></div>
          <span className="feed-count">{relatedPosts.length} posts</span>
        </div>
        {relatedPosts.length > 0 ? (
          <div className="post-feed related-post-feed">
            {relatedPosts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        ) : (
          <div className="empty-state related-empty">
            <span className="empty-state-icon"><Icon name="book" /></span>
            <h2>This book is waiting for its first note.</h2>
            <p>Want to be the first to share what you thought?</p>
            <Link href="/create" className="button button-outline">Write a post <Icon name="arrow" /></Link>
          </div>
        )}
      </section>
    </div>
  );
}
