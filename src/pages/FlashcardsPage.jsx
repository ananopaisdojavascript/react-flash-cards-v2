import { useState, useEffect } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Header from "../components/Header"
import Main from "../components/Main"
import Flashcard from "../components/Flashcard"
import Flashcards from "../components/Flashcards"
import FlashcardItem from "../components/FlashcardItem";
import FlashcardForm from "../components/FlashcardForm";
import Button from "../components/Button"
import RadioButton from "../components/RadioButton"
import Loading from "../components/Loading";
import Error from "../components/Error"

import { helperShuffleArray } from "../helpers/arrayHelpers"
import apiService from "../services/apiService";

export default function FlashcardsPage() {
  const [cards, setCards] = useState([])

  const [studyCards, setStudyCards] = useState([])

  // Estado para alternar entre o título e a descrição do cartão
  const [radioButtonDisplayTitle, setRadioButtonDisplayTitle] = useState(true)

  // Mostrar um "spinner" para o usuário
  const [loading, setLoading] = useState(true)

  // Tratamento de erros
  const [error, setError] = useState("")

  // Criar ou editar o cartão
  const [createMode, setCreateMode] = useState(true);

  // Controlar a abertura das abas
  const [selectedTab, setSelectedTab] = useState(0);

  // Editar o cartão selecionado
  const [selectFlashcard, setSelectFlashcard] = useState(null);

  // Função assíncrona para chamada da API
  useEffect(() => {
    async function getAllCards() {
      try {
        const allCards = await apiService.getAllFlashcards()
        setCards(allCards)
        setInterval(() => {
          setLoading(false)
        }, 500)
      } catch (error) {
        setError(error.message)
      }
    }

    getAllCards()
  }, [])

  console.log(cards)

  // Função para embaralhar os cartões
  function handleButtonClick() {
    const shuffle = helperShuffleArray(studyCards)
    setStudyCards(shuffle)
  }

  useEffect(() => {
    setStudyCards(cards.map(card => ({ ...card, showTitle: true })))
  }, [cards])

  // Funções para alternar entre o título e a descrição do cartão
  function handleDisplayTitle() {
    const update = [...studyCards].map(card => {
      return {
        ...card, showTitle: true
      }
    })
    setStudyCards(update)
    setRadioButtonDisplayTitle(true)
  }

  function handleDisplayDescription() {
    const update = [...studyCards].map(card => {
      return {
        ...card, showTitle: false
      }
    })
    setStudyCards(update)
    setRadioButtonDisplayTitle(false)
  }

  function handleToggleFlashcard(cardId) {
    // Fazer uma cópia de "cards"
    const update = [...studyCards]
    const index = update.findIndex((card) => card.flashcardId === cardId)
    update[index].showTitle = !update[index].showTitle
    setStudyCards(update)
  }

  // Função para apagar o cartão
  async function handleDeleteFlashcard(cardId) {
    try {
      await apiService.deleteFlashcard(cardId);
      const deleteCard = (card) => card.flashcardId !== cardId;
      setCards(cards.filter(deleteCard));
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  // Função para editar o cartão
  function handleEditFlashcard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectFlashcard(card);
    setCreateMode(false)
  }

  // Funcão para criar o cartão
  function handleCreateNewFlashcard() {
    setCreateMode(true);
    setSelectFlashcard(null);
  }

  // Função de seleção das abas
  function handleSelectTab(tabIndex) {
    setSelectedTab(tabIndex);
  }

  // Função de gravação dos dados na API
  async function handlePersistData(title, description) {
    if (createMode) {
      try {
        const newFlashcard = await apiService.createFlashcard(title, description);
        setCards([...cards, newFlashcard]);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await apiService.editFlashcard(selectFlashcard.flashcardId, title, description);
        setCards(
          cards.map((card) => {
            if (card.flashcardId === selectFlashcard.flashcardId) {
              return { ...card, title, description };
            }
            return card;
          })
        );
        setSelectFlashcard(null);
        setCreateMode(true);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    }
  }

  // Condição para mostrar o "spinner"
  let mainJSX = (
    <Loading />
  )

  // Mostrar mensgem de erro
  if (error) {
    mainJSX = (
      <Error>{error}</Error>
    )
  }

  if (!loading && !error) {
    mainJSX = (
      <div>

        <Tabs selectedIndex={selectedTab} onSelect={handleSelectTab}>
          <TabList>
            <Tab>Lista</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {
              cards.map((card) => {
                return (
                  <FlashcardItem
                    key={card.flashcardId}
                    onEdit={handleEditFlashcard}
                    onDelete={handleDeleteFlashcard}>
                    {card}
                  </FlashcardItem>
                )
              })
            }
          </TabPanel>

          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleCreateNewFlashcard}>
                Novo cartão
              </Button>
            </div>
            <FlashcardForm
              createMode={createMode}
              textAreaValue={selectFlashcard}
              onPersist={handlePersistData}>
              {selectFlashcard}
            </FlashcardForm>
          </TabPanel>

          <TabPanel>
            <div className='text-center'>
              <Button onButtonClick={handleButtonClick}>Embaralhar</Button>
            </div>
            <div className='flex flex-row items-center justify-center space-x-4'>
              <RadioButton description="Mostrar título" buttonChecked={radioButtonDisplayTitle} id='showTitle' name='showInfo' onButtonChange={handleDisplayTitle} />
              <RadioButton description="Mostrar descrição" buttonChecked={!radioButtonDisplayTitle} id="showDescription" name='showInfo' onButtonChange={handleDisplayDescription} />
            </div>
            <Flashcards>
              {
                studyCards.map(({ flashcardId, title, description, showTitle }) => {
                  return (
                    <Flashcard key={flashcardId} id={flashcardId} title={title} description={description} showTitle={showTitle} onToggle={handleToggleFlashcard} />
                  )
                })
              }
            </Flashcards>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  return (
    <>
      <Header>React Flashcards</Header>

      <Main>
        <div>
          {mainJSX}
        </div>
      </Main>
    </>
  )
}
