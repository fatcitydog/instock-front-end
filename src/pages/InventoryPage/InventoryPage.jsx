import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InventoryList from "../../components/InventoryList/InventoryList";
import DeleteInventoryItem from "../../components/DeleteInventoryItem/DeleteInventoryItem";
import "./InventoryPage.scss";

class InventoryPage extends React.Component {
	state = {
		searchValue: "",
		sortOrder: {
			itemName: 1,
			category: 1,
			status: 1,
			quantity: 1,
			warehouseName: 1,
		},
		sortKey: "",
		deleteItem: false,
		itemToDelete: {},
		inventoryList: [],
	};

	handleSearch = event => {
		event.preventDefault();
		this.setState({
			searchValue: event.target.value,
		});
	};

	updateInventories(sortKey, sortOrder) {
		let query = "";
		if (sortKey && sortKey !== "") {
			query += `sort=${sortKey}&order=${sortOrder === 1 ? "asc" : "desc"}`;
		}
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/inventories?${query}`)
			.then(response => {
				if (sortKey === "") {
					this.setState({
						inventoryList: response.data.data,
					});
				} else {
					this.setState({
						sortOrder: {
							itemName: "itemName" === sortKey ? -sortOrder : 1,
							category: "category" === sortKey ? -sortOrder : 1,
							status: "status" === sortKey ? -sortOrder : 1,
							quantity: "quantity" === sortKey ? -sortOrder : 1,
							warehouseName: "warehouseName" === sortKey ? -sortOrder : 1,
						},
						sortKey,
						inventoryList: response.data.data,
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.updateInventories();
	}

	matchWithSearch(itemName, category, warehouseName) {
		const searchValue = this.state.searchValue.toLowerCase();
		return (
			itemName.toLowerCase().includes(searchValue) ||
			category.toLowerCase().includes(searchValue) ||
			warehouseName.toLowerCase().includes(searchValue)
		);
	}

	handleSort = sortKey => {
		const { sortOrder } = this.state;
		for (const sortBy in this.sortActiveRef) {
			const { current } = this.sortActiveRef[sortBy];
			if (sortBy === sortKey) {
				current.classList.add("inventory-list__sort-icon--active");
			} else {
				current.classList.remove("inventory-list__sort-icon--active");
			}
		}
		this.updateInventories(sortKey, sortOrder[sortKey]);
	};

	handleDeleteItem = (event, itemToDelete) => {
		event.preventDefault();
		this.setState({
			deleteItem: true,
			itemToDelete,
		});
	};

	confirmDeleteItem = (event, isConfirmed = false) => {
		event.preventDefault();
		const { id } = this.state.itemToDelete;
		if (isConfirmed) {
			axios
				.delete(`${process.env.REACT_APP_BACKEND_URL}/inventories/${id}`)
				.then(response => {
					this.setState({
						deleteItem: false,
						inventoryList: response.data.data,
					});
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			this.setState({
				deleteItem: false,
			});
		}
	};

	render() {
		const { searchValue, inventoryList, deleteItem, itemToDelete } = this.state;
		return (
			<div className='inventory-container'>
				<div className='inventory'>
					<div className='inventory__navigation'>
						<div className='inventory__title-container'>
							<h1 className='inventory__title'>Inventory</h1>
						</div>
						<div className='inventory__action-container'>
							<form className='inventory__search-form'>
								<input
									type='search'
									onChange={this.handleSearch}
									placeholder='Search...'
									className='inputStyle inventory__search-input'
								/>
							</form>
							<button
								className='buttonSytle
                primaryButton
                inventory__add-item-button
              '
							>
								<Link to='/inventory/add' className='inventory__add-link'>
									+ Add New Item
								</Link>
							</button>
						</div>
					</div>
					<InventoryList
						searchValue={searchValue}
						inventoryList={inventoryList.filter(inventoryItem => {
							return this.matchWithSearch(
								inventoryItem.itemName,
								inventoryItem.category,
								inventoryItem.warehouseName
							);
						})}
						handleSortFunction={this.handleSort}
						handleDeleteFunction={this.handleDeleteItem}
					/>
				</div>
				{deleteItem && (
					<DeleteInventoryItem
						itemName={itemToDelete.itemName}
						confirmDeleteItem={this.confirmDeleteItem}
					/>
				)}
			</div>
		);
	}
}

export default InventoryPage;
