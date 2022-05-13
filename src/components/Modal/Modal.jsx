import './Modal.scss';
import closeIcon from '../../assets/icons/close-24px.svg';
import Button from '../Button/Button';

const Modal = ({ closeModal, heading, text, action }) => {
  return (
    <div className="modal" onClick={closeModal}>
      <section className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={closeModal}>
          <img
            src={closeIcon}
            alt="close the modal"
            className="modal__close-icon"
          />
        </button>
        <div className="modal__textbox">
          <h2 className="modal__title">{heading}</h2>
          <p className="modal__text">{text}</p>
        </div>
        <div className="modal__btns">
          <Button className="btn--cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button className="btn--delete" onClick={action}>
            Delete
          </Button>
        </div>
      </section>
    </div>
  );
};
export default Modal;
