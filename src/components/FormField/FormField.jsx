import Dropdown from 'react-dropdown';
import arrowIcon from '../../assets/icons/arrow_drop_down-24px.svg';
import errorIcon from '../../assets/icons/error-24px.svg';
import "./FormField.scss";

function TextField(props) {
  const {
    fieldName,
    labelName,
    handleChangeFunction,
    defaultValue,
    placeholderValue,
    firstGroup,
    lastGroup,
  } = props;
  return (
    <div
      className={`
      text-field
      ${firstGroup ? " text-field--top" : ""}
      ${lastGroup ? " text-field--bottom" : ""}
    `}
    >
      <label htmlFor={fieldName} className="text-field__label">
        {labelName}
      </label>
      <input
        type="text"
        onChange={handleChangeFunction}
        value={defaultValue}
        name={fieldName}
        placeholder={placeholderValue}
        className="inputStyle text-field__input"
      />
      <span className="input-error input-error--hide">
        <img
          src={errorIcon}
          alt="input-error-icon"
          className="input-error__icon"
        />
        This field is required
      </span>
    </div>
  );
}

function TextareaField(props) {
  const {
    fieldName,
    labelName,
    handleChangeFunction,
    defaultValue,
    placeholderValue,
    firstGroup,
    lastGroup,
  } = props;
  return (
    <div
      className={`
      textarea-field
      ${firstGroup ? " textarea-field--top" : ""}
      ${lastGroup ? " textarea-field--bottom" : ""}
    `}
    >
      <label htmlFor={fieldName} className="textarea-field__label">
        {labelName}
      </label>
      <textarea
        onChange={handleChangeFunction}
        value={defaultValue}
        name={fieldName}
        placeholder={placeholderValue}
        className="textarea-field__input"
      />
      <span className="input-error input-error--hide">
        <img
          src={errorIcon}
          alt="input-error-icon"
          className="input-error__icon"
        />
        This field is required
      </span>
    </div>
  );
}

function SelectField(props) {
  const { labelName, handleChangeFunction, defaultValue, optionList } = props;
  const arrowClosed = (
    <img
      src={arrowIcon}
      alt="dropdown-arrow-closed"
      className="dropdown__arrow dropdown__arrow--closed"
    />
  );
  const arrowOpen = (
    <img
      src={arrowIcon}
      alt="dropdown-arrow-open"
      className="dropdown__arrow dropdown__arrow--open"
    />
  );
  return (
    <div className="dropdown">
      <label className="dropdown__label">
        {labelName}
      </label>
      <Dropdown
        className="dropdown__bar"
        menuClassName="dropdown__menu"
        arrowClosed={arrowClosed}
        arrowOpen={arrowOpen}
        controlClassName="inputStyle dropdown__control"
        placeholderClassName={
          defaultValue === 'Please select' ?
            "dropdown__placeholder" :
            "dropdown__plcaeholder dropdown__plcaeholder--selected"
        }
        onChange={handleChangeFunction}
        value={defaultValue}
        options={optionList}
      />
      <span className="input-error input-error--hide">
        <img
          src={errorIcon}
          alt="input-error-icon"
          className="input-error__icon"
        />
        This field is required
      </span>
    </div>
  );
}

function StatusField(props) {
  const {
    fieldName,
    labelName,
    handleCheckFunction1,
    handleCheckFunction2,
    defaultValue,
    firstGroup,
    lastGroup,
  } = props;
  return (
    <div
      className={`
      status-field
      ${firstGroup ? " status-field--top" : ""}
      ${lastGroup ? " status-field--bottom" : ""}
    `}
    >
      <label htmlFor={fieldName} className="status-field__label">
        {labelName}
      </label>
      <div className="status-field__choice">
        <div className="status-field__choice-group">
          {defaultValue ? (
            <input
              type="radio"
              onChange={handleCheckFunction1}
              name={fieldName}
              value="In stock"
              defaultChecked
              className="status-field__choice-input"
            />
          ) : (
            <input
              type="radio"
              onChange={handleCheckFunction1}
              name={fieldName}
              value="In stock"
              className="status-field__choice-input"
            />
          )}
          <label className="status-field__choice-label">In stock</label>
        </div>
        <div className="status-field__choice-group">
          {defaultValue ? (
            <input
              type="radio"
              onChange={handleCheckFunction2}
              name={fieldName}
              value="Out of stock"
              className="status-field__choice-input"
            />
          ) : (
            <input
              type="radio"
              onChange={handleCheckFunction2}
              name={fieldName}
              value="Out of stock"
              defaultChecked
              className="status-field__choice-input"
            />
          )}
          <label className="status-field__choice-label">Out of stock</label>
        </div>
      </div>
    </div>
  );
}

export { TextField, TextareaField, SelectField, StatusField };
