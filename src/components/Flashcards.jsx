export default function Flashcards({ children: flashcards }) {
  return (
    <section>
      <div className="p-2 flex flex-row items-center justify-center flex-wrap">{flashcards}</div>
    </section>
  )
}