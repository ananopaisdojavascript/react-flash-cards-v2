import { useState, useEffect } from "react"
import Header from "../components/Header"
import Main from "../components/Main"
import Flashcard from "../components/Flashcard"
import Flashcards from "../components/Flashcards"
import Button from "../components/Button"
import RadioButton from "../components/RadioButton"
import { helperShuffleArray } from "../helpers/arrayHelpers"
import { flashcardsArr } from "../data/flashcards"

export default function FlashcardsPage() {
  const [cards, setCards] = useState(flashcardsArr)

  // Estado para alternar entre o título e a descrição do cartão
  const [radioButtonDisplayTitle, setRadioButtonDisplayTitle] = useState(true)

  // Função para embaralhar os cartões
  function handleButtonClick() {
    const shuffle = helperShuffleArray(cards)
    setCards(shuffle)
  }

  // Funções para alternar entre o título e a descrição do cartão
  function handleDisplayTitle() {
    const update = [...cards].map(card => {
      return {
        ...card, showTitle: true
      }
    })
    setCards(update)
    setRadioButtonDisplayTitle(true)
  }

  function handleDisplayDescription() {
    const update = [...cards].map(card => {
      return {
        ...card, showTitle: false
      }
    })
    setCards(update)
    setRadioButtonDisplayTitle(false)
  }

  function handleToggleFlashcard(cardId) {
    // Fazer uma cópia de "cards"
    const update = [...cards]
    const index = update.findIndex((card) => card.id === cardId)
    update[index].showTitle = !update[index].showTitle
    setCards(update)
  }


  return (
    <>
      <Header>React Flashcards</Header>
      <Main>
        <div className='text-center'>
          <Button onButtonClick={handleButtonClick}>Embaralhar</Button>
        </div>
        <div className='flex flex-row items-center justify-center space-x-4'>
          <RadioButton description="Mostrar título" buttonChecked={radioButtonDisplayTitle} id='showTitle' name='showInfo' onButtonChange={handleDisplayTitle} />
          <RadioButton description="Mostrar descrição" buttonChecked={!radioButtonDisplayTitle} id="showDescription" name='showInfo' onButtonChange={handleDisplayDescription} />
        </div>
        <Flashcards>
          {
            cards.map(({ id, title, description, showTitle }) => {
              return (
                <Flashcard key={id} id={id} title={title} description={description} showTitle={showTitle} onToggle={handleToggleFlashcard} />
              )
            })
          }
        </Flashcards>
      </Main>
    </>
  )
}
