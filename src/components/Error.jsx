export default function Error({ children: error }) {
  return (
    <div className="text-red-900 font-semibold">{error}</div>
  )
}
