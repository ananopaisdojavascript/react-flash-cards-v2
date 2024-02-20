import { useState, useEffect } from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import Button from "./Button";
import Error from "./Error";

export default function FlashcardForm({
  createMode = true,
  onPersist = null,
  children: flashcard = null
}) {
  // Mudança da cor de fundo em caso de criação ou edição de cartões
  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";

  // Mudança do título em caso de criação ou edição de cartões
  const formTitle = createMode ? "Criação de cartões" : "Edição de cartões";

  const [inputValue, setInputValue] = useState(flashcard?.title || "");
  const [textAreaValue, setTextAreaValue] = useState(flashcard?.description || "");

  // Mensagem de erro
  const [error, setError] = useState("");

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  function clearFields() {
    setInputValue("");
    setTextAreaValue("");
  }

  function handleInputChange(newValue) {
    setInputValue(newValue);
  }

  function handleTextAreaValueChange(newValue) {
    setTextAreaValue(newValue);
  }

  // Função para verificar se o formulário está preenchido
  function validateForm() {
    return inputValue.trim() !== "" && textAreaValue.trim() !== "";
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm) {
      setError("");
      if (onPersist) {
        onPersist(inputValue, textAreaValue);
        clearFields();
      }
    } else {
      setError("O preenchimento dos campos é obrigatório!!!!!");
    }
  }

  function handleFormReset() {
    clearFields();
  }

  return (
    <div className={`${backgroundClassName} p-4 m-4`}>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <h2 className="text-center font-semibold">{formTitle}</h2>

        <TextInput
          labelDescription="Título: "
          inputValue={inputValue}
          onInputChange={handleInputChange}
        />
        <TextArea
          labelDescription="Descrição: "
          textAreaValue={textAreaValue}
          onTextAreaChange={handleTextAreaValueChange}
        />
        <div className="flex items-center justify-between">
          {error.trim() !== "" ? <Error>{error}</Error> : <span>&nbsp;</span>}
          <div>
            <Button type="submit">Salvar</Button>
            <Button onButtonClick={handleFormReset} type="reset">
              Limpar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}