import { Fragment } from "react";

export default function TextArea({
  labelDescription,
  textAreaValue = "Valor padrão",
  onTextAreaChange = null,
  flashcardId,
  labelName,
  maxLength = 230,
  rows = 4,
  cols = 10
}) {
  function handleInputChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = textAreaValue.length;

  return (
    <Fragment>
      <div className="flex flex-col my-4">
        <label htmlFor={labelName} className="text-sm">
          {labelDescription}
        </label>
        <textarea
          name={labelName}
          cols={cols}
          rows={rows}
          maxLength={maxLength}
          type="text"
          className="p-1"
          id={flashcardId}
          value={textAreaValue}
          onChange={handleInputChange}
          autoFocus
        ></textarea>

        <div className="text-right ">
          <span>
            {currentCharacterCount} / {maxLength}
          </span>
        </div>
      </div>
    </Fragment>
  );
}