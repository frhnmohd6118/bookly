import { notFound } from "next/navigation";
import { BookDetail } from "@/components/book-detail";
import { BOOKS } from "@/lib/bookly-data";

export function generateStaticParams() {
  return BOOKS.map((book) => ({ id: book.id }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = BOOKS.find((item) => item.id === id);

  if (!book) notFound();

  return <BookDetail bookId={book.id} />;
}
