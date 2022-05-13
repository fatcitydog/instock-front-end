import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { TextField, TextareaField, SelectField, StatusField } from '../FormField/FormField';
import gobackIcon from '../../assets/icons/arrow_back-24px.svg';
import './EditInventoryItem.scss';

class EditInventoryItem extends React.Component {
  state = {
    itemUpdated: false,
    categoryList: [],
    warehouseList: [],
  }

  componentDidMount() {
    const { inventoryId } = this.props.match.params;
    let categoryList = [], item = {};
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/inventories`)
      .then((response) => {
        categoryList = [
          ...new Set(
            response.data.data.map((inventoryItem) => {
              return inventoryItem.category;
            })
          ),
        ];
        item = response.data.data.find((inventoryItem) => {
          return inventoryItem.id === inventoryId;
        });
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouses`);
      })
      .then((response) => {
        this.setState({
          id: inventoryId,
          warehouseValue: item.warehouseName,
          nameValue: item.itemName,
          descriptionValue: item.description,
          categoryValue: item.category,
          toggleQuantityInputBox: item.status === 'In Stock',
          quantityValue: item.quantity,
          categoryList,
          warehouseList: response.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  goBack = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.goBack();
  };

  handleCancel = (event) => {
    event.preventDefault();
    // re-use itemUpdated flag to go back to inventory page
    this.setState({
      itemUpdated: true,
    });
  };

  handleEditItem = (event) => {
    event.preventDefault();
    const {
      warehouseList,
      id,
      warehouseValue,
      nameValue,
      descriptionValue,
      quantityValue,
      categoryValue,
      toggleQuantityInputBox
    } = this.state;
    let itemValid = true;
    if (nameValue === '') {
      itemValid = false;
      event.target.name.classList.add("text-field__input--error");
      event.target.name.parentElement.children[2].classList
        .remove("input-error--hide");
    }
    if (descriptionValue === '') {
      itemValid = false;
      event.target.description.classList
        .add("textarea-field__input--error");
      event.target.description.parentElement.children[2].classList
        .remove("input-error--hide");
    }
    if (quantityValue === '') {
      itemValid = false;
      event.target.quantity.classList.add("text-field__input--error");
      event.target.quantity.parentElement.children[2].classList
        .remove("input-error--hide");
    }
    if (itemValid) {
      const itemToUpdate = {
        'warehouseID': warehouseList.find((warehouse) => {
          return warehouse.name === warehouseValue;
        }).id,
        'warehouseName': warehouseValue,
        'itemName': nameValue,
        'description': descriptionValue,
        'quantity': toggleQuantityInputBox ? quantityValue : '0',
        'category': categoryValue,
        'status': toggleQuantityInputBox ? 'In Stock' : 'Out of Stock'
      }
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/inventories/${id}`, itemToUpdate)
        .then(() => {
          this.setState({
            itemUpdated: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleNameChange = (event) => {
    event.preventDefault();
    const { value, classList } = event.target;
    if (value !== '') {
      classList.remove('text-field__input--error');
      event.target.parentElement.children[2].classList
        .add("input-error--hide");
    }
    this.setState({
      nameValue: value
    });
  }

  handleDescriptionChange = (event) => {
    event.preventDefault();
    const { value, classList } = event.target;
    if (value !== '') {
      classList.remove('textarea-field__input--error');
      event.target.parentElement.children[2].classList
        .add("input-error--hide");
    }
    this.setState({
      descriptionValue: value
    });
  }

  handleCategoryChange = (option) => {
    this.setState({
      categoryValue: option.value,
    });
  };

  handleQuantityChange = (event) => {
    event.preventDefault();
    const { value, classList } = event.target;
    if (value !== '') {
      classList.remove('text-field__input--error');
      event.target.parentElement.children[2].classList
        .add("input-error--hide");
    }
    this.setState({
      quantityValue: event.target.value
    });
  }

  handleWarehouseChange = (option) => {
    this.setState({
      warehouseValue: option.value
    });
  };

  handleInStockChecked = () => {
    if (!this.state.toggleQuantityInputBox) {
      this.setState({
        toggleQuantityInputBox: true,
      });
    }
  };

  handleOutOfStockChecked = () => {
    if (this.state.toggleQuantityInputBox) {
      this.setState({
        toggleQuantityInputBox: false,
      });
    }
  };

  render() {
    const {
      itemUpdated,
      categoryList,
      warehouseList,
      id,
      warehouseValue,
      nameValue,
      descriptionValue,
      quantityValue,
      categoryValue,
      toggleQuantityInputBox
    } = this.state;
    return id ? (
      itemUpdated ?
        <Redirect to="/inventory" /> :
        <div className="edit-item-container">
          <div className="edit-item">
            <div className="edit-item__header">
              <button
                onClick={this.goBack}
                className="edit-item__goback-button"
              >
                <img
                  src={gobackIcon}
                  alt="edit-item-goback-icon"
                  className="edit-item__goback-icon"
                />
              </button>
              <h1 className="edit-item__title">Edit Inventory Item</h1>
            </div>
            <form onSubmit={this.handleEditItem} className="edit-item__form">
              <div className="edit-item__input-fields">
                <div className="edit-item__details">
                  <h2 className="edit-item__subtitle">Item Details</h2>
                  <TextField
                    fieldName="name"
                    labelName="Item Name"
                    handleChangeFunction={this.handleNameChange}
                    defaultValue={nameValue}
                    placeholderValue="Item Name"
                    firstGroup={true}
                    lastGroup={false}
                  />
                  <TextareaField
                    fieldName="description"
                    labelName="Description"
                    handleChangeFunction={this.handleDescriptionChange}
                    defaultValue={descriptionValue}
                    placeholderValue="Please enter a brief item description..."
                    firstGroup={false}
                    lastGroup={false}
                  />
                  <SelectField 
                    labelName="Category"
                    handleChangeFunction={this.handleCategoryChange}
                    defaultValue={categoryValue}
                    optionList={categoryList}
                  />
                </div>
                <div className="edit-item__availability">
                  <h2 className="edit-item__subtitle">Item Availability</h2>
                  <StatusField
                    fieldName="status"
                    labelName="Status"
                    handleCheckFunction1={this.handleInStockChecked}
                    handleCheckFunction2={this.handleOutOfStockChecked}
                    defaultValue={toggleQuantityInputBox}
                    firstGroup={true}
                    lastGroup={false}
                  />
                  {
                    toggleQuantityInputBox &&
                      <TextField
                        fieldName="quantity"
                        labelName="Quantity"
                        handleChangeFunction={this.handleQuantityChange}
                        defaultValue={quantityValue}
                        placeholderValue=""
                        firstGroup={false}
                        lastGroup={false}
                      />
                  }
                  <SelectField 
                    labelName="Warehouse"
                    handleChangeFunction={this.handleWarehouseChange}
                    defaultValue={warehouseValue}
                    optionList={warehouseList.map(warehouse => warehouse.name)}
                  />
                </div>
              </div>
              <div className="edit-item__action">
                <button
                  onClick={this.handleCancel}
                  className="edit-item__cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="edit-item__save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
    ) :
      <></>;
  }
}

export default EditInventoryItem;
