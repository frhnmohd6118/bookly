"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { GENRES, READERS } from "@/lib/bookly-data";
import { useBookly } from "@/lib/bookly-context";

export default function ProfilePage() {
  const { interests, toggleInterest, savedBookIds, posts } = useBookly();

  return (
    <div className="page-wrap profile-page">
      <header className="page-topline">
        <div>
          <span className="eyebrow"><Icon name="user" /> YOUR READING CORNER</span>
          <h1>A shelf that feels <span>like you.</span></h1>
          <p>Choose a few moods. We&apos;ll bring more of them to your feed.</p>
        </div>
      </header>

      <section className="profile-card">
        <div className="profile-card-cover"><Icon name="spark" /><span>YOUR BOOKLY</span></div>
        <div className="profile-card-main">
          <span className="avatar avatar-profile">Y</span>
          <span className="profile-badge">LOCAL READER</span>
          <h2>Your reading nook</h2>
          <p className="profile-handle">@your.bookly</p>
          <p className="profile-bio">A little corner of Bookly just for you. Your saved books and posts stay on this device.</p>
          <div className="profile-stats">
            <span><strong>{savedBookIds.length}</strong> saved {savedBookIds.length === 1 ? "book" : "books"}</span>
            <span><strong>{posts.filter((post) => post.userId === "you").length}</strong> posts shared</span>
          </div>
          <div className="profile-card-actions">
            <Link href="/library" className="text-link">Go to my library <Icon name="arrow" /></Link>
            <Link href="/create" className="text-link">Write a post <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="interests-section" aria-labelledby="interests-title">
        <div className="section-heading">
          <div><span className="eyebrow"><Icon name="sliders" /> YOUR TASTE, YOUR CALL</span><h2 id="interests-title">What are you in the mood for?</h2></div>
          <span className="interest-saved"><Icon name="check" /> saved on this device</span>
        </div>
        <p>Pick a few genres. The Discover feed gives these a little extra love and still leaves room for surprises.</p>
        <div className="interest-picker" role="group" aria-label="Choose reading interests">
          {GENRES.map((genre) => {
            const selected = interests.includes(genre);
            return (
              <button
                type="button"
                key={genre}
                className={`interest-chip${selected ? " interest-chip-active" : ""}`}
                onClick={() => toggleInterest(genre)}
                aria-pressed={selected}
              >
                {selected && <Icon name="check" />}
                {genre}
              </button>
            );
          })}
        </div>
      </section>

      <section className="readers-section" aria-labelledby="readers-title">
        <div className="section-heading">
          <div><span className="eyebrow"><Icon name="heart" /> THE BOOKLY BOOK CLUB</span><h2 id="readers-title">A few familiar faces</h2></div>
          <span className="demo-pill">DEMO PROFILES</span>
        </div>
        <p>Meet the fictional readers sharing their bookish notes around Bookly.</p>
        <div className="reader-grid">
          {READERS.filter((reader) => reader.isDemo).map((reader) => (
            <article className="reader-card" key={reader.id}>
              <span className="avatar" style={{ backgroundColor: reader.color }}>{reader.initials}</span>
              <div><strong>{reader.name}</strong><span>@{reader.handle}</span></div>
              <p>{reader.bio}</p>
              <span className="reader-demo-note">FICTIONAL DEMO READER</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
