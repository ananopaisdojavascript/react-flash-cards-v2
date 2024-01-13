import { Fragment } from 'react'

export default function RadioButton({
  id,
  name = "nome",
  description,
  buttonChecked = false,
  onButtonChange = null
}) {
  function handleButtonChange() {
    if (onButtonChange) {
      onButtonChange()
    }
  }
  return (
    <Fragment>
      <div className='flex flex-row items-center space-x-2'>
        <input type="radio"
          id={id}
          name={name}
          checked={buttonChecked}
          onChange={handleButtonChange}
        />
        <label htmlFor={id}>{description}</label>
      </div>
    </Fragment>
  )
}