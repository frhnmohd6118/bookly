"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { BookCover } from "@/components/book-cover";
import { BOOKS, POST_TYPES, type PostType } from "@/lib/bookly-data";
import { useBookly } from "@/lib/bookly-context";

export default function CreatePostPage() {
  const router = useRouter();
  const { addPost } = useBookly();
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState<PostType>("Recommendation");
  const [content, setContent] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [error, setError] = useState("");
  const selectedBook = BOOKS.find((book) => book.id === bookId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean);

    if (!selectedBook) {
      setError("Choose the book your post is about.");
      return;
    }
    if (content.trim().length < 20) {
      setError("Add a little more detail (at least 20 characters).");
      return;
    }
    if (tags.length > 5) {
      setError("Keep it to five tags or fewer.");
      return;
    }
    if (tags.some((tag) => tag.length > 24)) {
      setError("Each tag needs to be 24 characters or fewer.");
      return;
    }

    addPost({
      id: `post-you-${Date.now()}`,
      userId: "you",
      bookId: selectedBook.id,
      type,
      content: content.trim(),
      tags,
      createdAt: "just now",
      isDemo: false,
    });
    router.push("/");
  }

  return (
    <div className="page-wrap create-page">
      <header className="page-topline">
        <div>
          <span className="eyebrow"><Icon name="plus" /> A NOTE FOR THE BOOKISH</span>
          <h1>Put it into <span>words.</span></h1>
          <p>Tell someone what made you stay up for one more chapter.</p>
        </div>
        <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to discover</Link>
      </header>

      <form className="create-form" onSubmit={handleSubmit} noValidate>
        <div className="create-form-main">
          <div className="form-section-heading">
            <span className="form-step">01</span>
            <div><h2>Start with the book</h2><p>Pick the book at the heart of your post.</p></div>
          </div>
          <label className="field-label" htmlFor="book-choice">Book <span aria-hidden="true">*</span></label>
          <select
            id="book-choice"
            className="form-control"
            value={bookId}
            onChange={(event) => setBookId(event.target.value)}
            required
            aria-describedby="book-choice-help"
          >
            <option value="">Choose from the Bookly shelf</option>
            {BOOKS.map((book) => (
              <option value={book.id} key={book.id}>{book.title} — {book.author}</option>
            ))}
          </select>
          <span className="field-help" id="book-choice-help">Demo catalog · {BOOKS.length} books</span>

          {selectedBook && (
            <div className="selected-book">
              <BookCover book={selectedBook} />
              <span><strong>{selectedBook.title}</strong><small>{selectedBook.author} · {selectedBook.genre}</small></span>
              <Icon name="check" />
            </div>
          )}

          <div className="form-section-heading post-type-heading">
            <span className="form-step">02</span>
            <div><h2>Pick your kind of note</h2><p>What would you like readers to know?</p></div>
          </div>
          <fieldset className="post-type-options">
            <legend className="sr-only">Post type</legend>
            {POST_TYPES.map((postType) => (
              <label className={`post-type-option${type === postType ? " post-type-option-active" : ""}`} key={postType}>
                <input
                  type="radio"
                  name="post-type"
                  value={postType}
                  checked={type === postType}
                  onChange={() => setType(postType)}
                />
                <span className="post-type-option-icon">
                  <Icon name={postType === "Recommendation" ? "spark" : postType === "Review" ? "book" : postType === "Reaction" ? "heart" : postType === "Excerpt" ? "leaf" : "arrow"} />
                </span>
                <span className="post-type-option-text"><strong>{postType}</strong><small>{typeDescription(postType)}</small></span>
                <span className="radio-indicator" />
              </label>
            ))}
          </fieldset>

          <div className="form-section-heading writing-heading">
            <span className="form-step">03</span>
            <div><h2>Write your note</h2><p>Your words might find their next reader.</p></div>
          </div>
          <label className="field-label" htmlFor="post-content">Your post <span aria-hidden="true">*</span></label>
          <textarea
            id="post-content"
            className="form-control post-textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What stayed with you? Who would you pass this book to?"
            minLength={20}
            maxLength={280}
            required
            aria-describedby="post-content-help"
          />
          <div className="textarea-meta" id="post-content-help">
            <span>Keep it kind, spoiler-light, and yours.</span>
            <span>{content.length}/280</span>
          </div>

          <label className="field-label tags-label" htmlFor="post-tags">Add a few tags <span className="optional">(optional)</span></label>
          <input
            id="post-tags"
            className="form-control"
            value={tagsText}
            onChange={(event) => setTagsText(event.target.value)}
            placeholder="found family, slow burn, made me think"
            maxLength={160}
            aria-describedby="post-tags-help"
          />
          <span className="field-help" id="post-tags-help">Separate tags with commas. Up to five.</span>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="form-actions">
            <Link href="/" className="cancel-link">Cancel</Link>
            <button type="submit" className="button button-primary">
              Publish post <Icon name="arrow" />
            </button>
          </div>
          <p className="create-disclaimer"><Icon name="leaf" /> Your post is saved on this device. Sample reader posts are marked demo.</p>
        </div>

        <aside className="create-preview">
          <div className="preview-heading"><span>THE LITTLE PREVIEW</span><Icon name="spark" /></div>
          <div className="preview-card">
            <div className="preview-reader">
              <span className="avatar avatar-you">Y</span>
              <span><strong>You</strong><small>@your.bookly · just now</small></span>
            </div>
            <div className="preview-copy">
              <span>{type}</span>
              <p>{content || "Your little bookish note will appear right here…"}{type === "Excerpt" && <span className="preview-quote" aria-hidden="true">”</span>}</p>
            </div>
            {tagsText.trim() && <div className="post-tags preview-tags">{tagsText.split(",").filter((tag) => tag.trim()).slice(0, 5).map((tag) => <span className="post-tag" key={tag}>#{tag.trim().replace(/^#/, "").replaceAll(" ", "")}</span>)}</div>}
            <div className="preview-book">
              {selectedBook ? <BookCover book={selectedBook} /> : <span className="preview-empty-cover"><Icon name="book" /></span>}
              <span><small>THE BOOK BEHIND THE POST</small><strong>{selectedBook?.title ?? "Your chosen book"}</strong><span>{selectedBook?.author ?? "Pick one from the catalog"}</span></span>
            </div>
          </div>
          <p className="preview-note">Small notes make big reading lists. Thanks for sharing yours.</p>
        </aside>
      </form>
    </div>
  );
}

function typeDescription(type: PostType) {
  const descriptions: Record<PostType, string> = {
    Review: "Your honest take",
    Recommendation: "Pass it to a reader",
    Reaction: "A first feeling",
    Excerpt: "A passage that stayed",
    "Plot hook": "A spoiler-free teaser",
  };
  return descriptions[type];
}
