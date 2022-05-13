import Modal from '../Modal/Modal';
import './DeleteInventoryItem.scss';

function DeleteInventoryItem(props) {
  const { itemName, confirmDeleteItem } = props;
  return (
    <Modal 
      heading={`Delete ${itemName} inventory item?`}
      text={`Please confirm that you'd like to delete ${itemName} from then inventory list. You won't be able to undo this action.`}
      closeModal={confirmDeleteItem}
      action={(event) => {
        confirmDeleteItem(event, true);
      }}
    />
  );
}

export default DeleteInventoryItem;
