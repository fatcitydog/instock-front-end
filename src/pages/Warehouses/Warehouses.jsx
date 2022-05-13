import "./Warehouses.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import sortIcon from "../../assets/icons/sort-24px.svg";
import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";
import axios from "axios";
import Modal from "../../components/Modal/Modal";

class Warehouses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      sortKey: "",
      sortOrder: {
        name: 1,
        address: 1,
        "contact.name": 1,
        "contact.phone": 1,
      },
      warehouses: [],
      handleDelete: false,
      currentWarehouseId: "",
      currentWarehouseName: "",
    };
    this.sortActiveRef = {
      name: React.createRef(),
      address: React.createRef(),
      "contact.name": React.createRef(),
      "contact.phone": React.createRef(),
    };
  }

  componentDidMount() {
    console.log(process.env.REACT_APP_BACKEND_URL);
    this.updateWarehouses();
  }

  updateWarehouses(sortKey, sortOrder) {
    const query =
      sortKey && sortKey !== ""
        ? `sort=${sortKey}&order=${sortOrder === 1 ? "asc" : "desc"}`
        : "";
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/warehouses?${query}`)
      .then((response) => {
        if (sortKey === "") {
          this.setState({
            warehouses: response.data.data,
          });
        } else {
          this.setState({
            sortOrder: {
              name: "name" === sortKey ? -sortOrder : 1,
              address: "address" === sortKey ? -sortOrder : 1,
              "contact.name": "contact.name" === sortKey ? -sortOrder : 1,
              "contact.phone": "contact.phone" === sortKey ? -sortOrder : 1,
            },
            sortKey,
            warehouses: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteConfirmation = (currentWarehouseObj) => {
    this.setState({
      handleDelete: true,
      currentWarehouseName: currentWarehouseObj.name,
      currentWarehouseId: currentWarehouseObj.id,
    });
  };

  deleteWarehouse = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/${this.state.currentWarehouseId}`
      )
      .then((res) => {
        this.setState({
          warehouses: res.data.data,
          handleDelete: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCloseModal = () => {
    this.setState({ handleDelete: false });
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.setState({
      searchValue: event.target.value,
    });
  };

  matchWithSearch(warehouse) {
    const searchValue = this.state.searchValue.toLowerCase();
    const { name, address, contact } = warehouse;
    return (
      name.toLowerCase().includes(searchValue) ||
      address.toLowerCase().includes(searchValue) ||
      contact.name.toLowerCase().includes(searchValue) ||
      contact.phone.toLowerCase().includes(searchValue) ||
      contact.email.toLowerCase().includes(searchValue)
    );
  }

  handleSort(event, sortKey) {
    event.preventDefault();
    const { sortOrder } = this.state;
    for (const sortBy in this.sortActiveRef) {
      const { current } = this.sortActiveRef[sortBy];
      if (sortBy === sortKey) {
        current.classList.add("wh__sort-icon--active");
      } else {
        current.classList.remove("wh__sort-icon--active");
      }
    }
    this.updateWarehouses(sortKey, sortOrder[sortKey]);
  }

  render() {
    const { searchValue, warehouses } = this.state;
    const deleteMessage = `Please confirm that you’d like to delete the ${this.state.currentWarehouseName} from the list of warehouses. You won’t be able to undo this action.`;

    return (
      <section className="wh">
        <div className="wh__wrapper">
          <div className="wh__top-wrapper">
            <h2 className="wh__title">Warehouses</h2>
            <form className="wh__form">
              <input
                onChange={this.handleSearch}
                value={searchValue}
                className="wh__search"
                type="text"
                name="search"
                placeholder="Search..."
              />
              <Link to="/warehouse/add" className="wh__add-btn">
                + Add New Warehouse
              </Link>
            </form>
          </div>
          <div className="wh__label-container">
            <div
              onClick={(event) => {
                this.handleSort(event, "name");
              }}
              className="wh__label-wrapper wh__label-wrapper--wh"
            >
              <p className="wh__label">Warehouse</p>
              <img
                ref={this.sortActiveRef["name"]}
                className="wh__sort-icon"
                src={sortIcon}
                alt="sort button"
              />
            </div>
            <div
              onClick={(event) => {
                this.handleSort(event, "address");
              }}
              className="wh__label-wrapper wh__label-wrapper--address"
            >
              <p className="wh__label">Address</p>
              <img
                ref={this.sortActiveRef["address"]}
                className="wh__sort-icon"
                src={sortIcon}
                alt="sort button"
              />
            </div>
            <div
              onClick={(event) => {
                this.handleSort(event, "contact.name");
              }}
              className="wh__label-wrapper wh__label-wrapper--name"
            >
              <p className="wh__label">Contact Name</p>
              <img
                ref={this.sortActiveRef["contact.name"]}
                className="wh__sort-icon"
                src={sortIcon}
                alt="sort button"
              />
            </div>
            <div
              onClick={(event) => {
                this.handleSort(event, "contact.phone");
              }}
              className="wh__label-wrapper wh__label-wrapper--contact"
            >
              <p className="wh__label">Contact Information</p>
              <img
                ref={this.sortActiveRef["contact.phone"]}
                className="wh__sort-icon"
                src={sortIcon}
                alt="sort button"
              />
            </div>
            <div className="wh__label-wrapper wh__label-wrapper--actions">
              <p className="wh__label wh__label--action">Actions</p>
            </div>
          </div>
          {warehouses
            .filter((warehouse) => {
              return this.matchWithSearch(warehouse);
            })
            .map((warehouse) => (
              <WarehouseCard
                key={warehouse.id}
                warehouse={warehouse}
                deleteConfirmation={this.deleteConfirmation}
              />
            ))}
        </div>
        {this.state.handleDelete && (
          <Modal
            heading={this.state.currentWarehouseName}
            text={deleteMessage}
            closeModal={this.handleCloseModal}
            action={this.deleteWarehouse}
          />
        )}
      </section>
    );
  }
}

export default Warehouses;
