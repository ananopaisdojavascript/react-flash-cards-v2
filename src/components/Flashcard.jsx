import { Fragment } from 'react'

export default function Flashcard({
  title = "Título",
  description = "Descrição",
  showTitle = true,
  onToggle = null,
  id
}) {

  function handleCardClick() {
    if (onToggle) {
      onToggle(id)
    }
  }

  const fontSize = showTitle ? "text-xl" : "text-md"
  const fontWeight = showTitle ? "font-bold" : ""

  return (
    <Fragment>
      <div className={`shadow-lg p-2 m-4 w-80 h-48 flex flex-row items-center justify-center cursor-pointer ${fontSize} ${fontWeight}`} onClick={handleCardClick}>
        {showTitle ? title : description}
      </div>
    </Fragment>
  )
}
