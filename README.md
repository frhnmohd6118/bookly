# Bookly

Bookly is a CGT 390 progress-checkpoint prototype for discovering books through
reader-created posts. It is built with Next.js App Router, TypeScript, and
Tailwind CSS (with a small layer of custom CSS for the visual system).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What works in this prototype

- Discover a feed of reader notes linked to a local catalog of 15 books.
- Browse one immersive post at a time with vertical scroll snapping, touch,
  wheel, keyboard, and visible previous/next controls.
- Filter by genre and search post text, tags, titles, and authors.
- Set genre interests to prioritize matching posts while leaving room for
  recommendations outside those interests.
- Open book detail pages, read related posts, and save or remove books from
  My Library.
- Create a review, recommendation, reaction, excerpt, or plot hook linked to
  a catalog book. New posts appear at the top of Discover.
- Keep saved books, new posts, and reading interests in browser localStorage.
- Browse eight fictional demo reader profiles. Demo readers and demo posts are
  explicitly labeled; the one included verbatim excerpt is from Mary Shelley's
  public-domain *Frankenstein* (1818).
- Use responsive desktop sidebar and mobile navigation, visible keyboard focus,
  reduced-motion support, and semantic form controls.

The demo profile and sample content are fictional. There is no authentication,
backend, synchronization between devices, comments, or social graph in this
checkpoint prototype.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Next steps

- Add an account and backend when the prototype moves beyond local-only storage.
- Replace the CSS-created book-cover illustrations with licensed cover artwork.
- Add user testing and refine the feed and recommendation controls.
