import { ButtonPrimary } from "components/Button/buttonPrimary";
import { FieldError } from "components/FiledError/FiledError";
import { useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ValidatorService } from "utills/validator";
import s from "./style.module.css";

const VALIDATOR = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: (value) => {
    return ValidatorService.min(value, 3);
  },
};

export function NoteForm({
  isEditable = true,
  note,
  title,
  onCLickEdit,
  onClickDelete,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });
  const [formErrors, setFormError] = useState({
    title: note?.title ? undefined : true,
    content: note?.content ? undefined : true,
  });
  const updateFormValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  };

  const validate = (fieldName, fieldValue) => {
    setFormError({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  };
  const actionIcons = (
    <>
      <div className="col-1">
        {onCLickEdit && <PencilFill onClick={onCLickEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickDelete && (
          <TrashFill onClick={onClickDelete} className={s.icon} />
        )}
      </div>
    </>
  );
  const hasError = () => {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  };
  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );
  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Content</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="5"
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitBtn = (
    <div className={s.submit_btn}>
      {onSubmit && (
        <ButtonPrimary
          isDisabled={hasError()}
          onClick={() => onSubmit(formValues)}
        >
          Submit
        </ButtonPrimary>
      )}
    </div>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className="mb-3">
        <pre>{isEditable ? contentInput : note.content}</pre>
      </div>
      {submitBtn}
    </div>
  );
}
