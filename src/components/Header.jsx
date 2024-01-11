export default function Header({ children: title = '' }) {
  return (
    <header>
      <div className="bg-blue-100 mx-auto p-4 text-2xl font-bold">
        <h1 className="text-center">{title}</h1>
      </div>
    </header>
  )
}
