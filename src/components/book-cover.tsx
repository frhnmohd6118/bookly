import type { CSSProperties } from "react";
import type { Book } from "@/lib/bookly-data";

export function BookCover({
  book,
  size = "small",
}: {
  book: Book;
  size?: "small" | "large";
}) {
  const style = {
    "--cover-one": book.palette[0],
    "--cover-two": book.palette[1],
    "--cover-three": book.palette[2],
  } as CSSProperties;

  return (
    <div
      className={`book-cover book-cover-${size}`}
      style={style}
      role="img"
      aria-label={`Illustrated cover for ${book.title}`}
    >
      <span className="cover-orbit cover-orbit-one" />
      <span className="cover-orbit cover-orbit-two" />
      <span className="cover-mark">{book.genre}</span>
      <span className="cover-title">{book.title}</span>
      <span className="cover-author">{book.author}</span>
      <span className="cover-note">{book.coverNote}</span>
    </div>
  );
}
