"use client";
export default function Error({ error }) {
  return (
    <main className={"error"}>
      <h1>Error occured!</h1>
      <p>Something went wrong while fetching the meals.</p>
    </main>
  );
} 