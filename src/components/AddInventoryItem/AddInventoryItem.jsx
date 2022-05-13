import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  TextField,
  TextareaField,
  SelectField,
  StatusField,
} from "../FormField/FormField";
import gobackIcon from "../../assets/icons/arrow_back-24px.svg";
import "./AddInventoryItem.scss";

class AddInventoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemAdded: false,
      categoryValue: "Please select",
      warehouseValue: "Please select",
      toggleQuantityInputBox: false,
      nameValue: "",
      descriptionValue: "",
      quantityValue: "0",
      categoryList: [],
      warehouseList: [],
    };
    this.categoryOptionRef = React.createRef();
    this.warehouseOptionRef = React.createRef();
  }

  componentDidMount() {
    let categoryList = [];
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
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouses`);
      })
      .then((response) => {
        this.setState({
          categoryList,
          warehouseList: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  goBack = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.goBack();
  };

  handleCancel = (event) => {
    event.preventDefault();
    // re-use itemAdded flag to go back to inventory page
    this.setState({
      itemAdded: true,
    });
  };

  handleAddItem = (event) => {
    event.preventDefault();
    const {
      warehouseList,
      warehouseValue,
      nameValue,
      descriptionValue,
      quantityValue,
      categoryValue,
      toggleQuantityInputBox,
    } = this.state;
    let itemValid = true;
    if (nameValue === "") {
      itemValid = false;
      event.target.name.classList.add("text-field__input--error");
      event.target.name.parentElement.children[2].classList
        .remove("input-error--hide");
    }
    if (descriptionValue === "") {
      itemValid = false;
      event.target.description.classList.add("textarea-field__input--error");
      event.target.description.parentElement.children[2].classList
        .remove("input-error--hide");
    }
    if (quantityValue === "") {
      itemValid = false;
      event.target.quantity.classList.add("text-field__input--error");
      event.target.quantity.parentElement.children[2].classList
        .remove("input-error--hide");
    }
    if (categoryValue === 'Please select') {
      const target = this.categoryOptionRef.current.children[0];
      target.children[1].children[0].classList.add("dropdown__control--error");
      target.children[2].classList.remove("input-error--hide");
    }
    if (warehouseValue === 'Please select') {
      const target = this.warehouseOptionRef.current.children[0];
      target.children[1].children[0].classList.add("dropdown__control--error");
      target.children[2].classList.remove("input-error--hide");
    }
    if (itemValid) {
      const itemToAdd = {
        warehouseID: warehouseList.find((warehouse) => {
          return warehouse.name === warehouseValue;
        }).id,
        warehouseName: warehouseValue,
        itemName: nameValue,
        description: descriptionValue,
        quantity: toggleQuantityInputBox ? quantityValue : '0',
        category: categoryValue,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/inventories`, itemToAdd)
        .then(() => {
          this.setState({
            itemAdded: true,
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
    if (value !== "") {
      classList.remove("text-field__input--error");
      event.target.parentElement.children[2].classList
        .add("input-error--hide");
    }
    this.setState({
      nameValue: value,
    });
  };

  handleDescriptionChange = (event) => {
    event.preventDefault();
    const { value, classList } = event.target;
    if (value !== "") {
      classList.remove("textarea-field__input--error");
      event.target.parentElement.children[2].classList
        .add("input-error--hide");
    }
    this.setState({
      descriptionValue: value,
    });
  };

  handleCategoryChange = (option) => {
    const target = this.categoryOptionRef.current
      .children[0]
      .children[1]
      .children[0];
    const { value } = option;
    if (value !== 'Please select') {
      target.classList.remove("dropdown__control--error");
      target.parentElement.parentElement.children[2].classList
        .add("input-error--hide");
      target.children[0].classList.add("dropdown__placeholder--selected");
    } else {
      target.children[0].classList
        .remove("dropdown__placeholder--selected");
    }
    this.setState({
      categoryValue: value,
    });
  };

  handleQuantityChange = (event) => {
    event.preventDefault();
    const { value, classList } = event.target;
    if (value !== "") {
      classList.remove("text-field__input--error");
      event.target.parentElement.children[2].classList
        .add("input-error--hide");
    }
    this.setState({
      quantityValue: value,
    });
  };

  handleWarehouseChange = (option) => {
    const target = this.warehouseOptionRef.current
      .children[0]
      .children[1]
      .children[0];
    const { value } = option;
    if (value !== 'Please select') {
      target.classList.remove("dropdown__control--error");
      target.parentElement.parentElement.children[2].classList
        .add("input-error--hide");
      target.children[0].classList.add("dropdown__placeholder--selected");
    } else {
      target.children[0].classList
        .remove("dropdown__placeholder--selected");
    }
    this.setState({
      warehouseValue: value,
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
      itemAdded,
      toggleQuantityInputBox,
      categoryList,
      warehouseList,
      nameValue,
      descriptionValue,
      categoryValue,
      quantityValue,
      warehouseValue,
    } = this.state;
    console.log(categoryList);
    return itemAdded ? (
      <Redirect to="/inventory" />
    ) : (
      <div className="add-item-container">
        <div className="add-item">
          <div className="add-item__header">
            <button onClick={this.goBack} className="add-item__goback-button">
              <img
                src={gobackIcon}
                alt="add-item-goback-icon"
                className="add-item__goback-icon"
              />
            </button>
            <h1 className="add-item__title">Add New Inventory Item</h1>
          </div>
          <form onSubmit={this.handleAddItem} className="add-item__form">
            <div className="add-item__input-fields">
              <div className="add-item__details">
                <h2 className="add-item__subtitle">Item Details</h2>
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
                <div ref={this.categoryOptionRef}
  >               <SelectField 
                    labelName="Category"
                    handleChangeFunction={this.handleCategoryChange}
                    defaultValue={categoryValue}
                    optionList={categoryList}
                  />
                </div>
              </div>
              <div className="add-item__availability">
                <h2 className="add-item__subtitle">Item Availability</h2>
                <StatusField
                  fieldName="status"
                  labelName="Status"
                  handleCheckFunction1={this.handleInStockChecked}
                  handleCheckFunction2={this.handleOutOfStockChecked}
                  defaultValue={toggleQuantityInputBox}
                  firstGroup={true}
                  lastGroup={false}
                />
                {toggleQuantityInputBox && (
                  <TextField
                    fieldName="quantity"
                    labelName="Quantity"
                    handleChangeFunction={this.handleQuantityChange}
                    defaultValue={quantityValue}
                    placeholderValue=""
                    firstGroup={false}
                    lastGroup={false}
                  />
                )}
                <div ref={this.warehouseOptionRef}>
                  <SelectField 
                    labelName="Warehouse"
                    handleChangeFunction={this.handleWarehouseChange}
                    defaultValue={warehouseValue}
                    optionList={warehouseList.map(warehouse => warehouse.name)}
                  />
                </div>
              </div>
            </div>
            <div className="add-item__action">
              <button
                onClick={this.handleCancel}
                className="add-item__cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="add-item__add-button">
                + Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddInventoryItem;
