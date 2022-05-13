import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InventoryList from "../../components/InventoryList/InventoryList";
import DeleteInventoryItem from "../../components/DeleteInventoryItem/DeleteInventoryItem";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import "./WarehouseInfo.scss";

class WarehouseInfo extends React.Component {
	state = {
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
		const { id } = this.props.warehouseInfo;
		let query = `warehouseID=${id}`;
		if (sortKey && sortKey !== "") {
			query += `&sort=${sortKey}&order=${sortOrder === 1 ? "asc" : "desc"}`;
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
		const { name, address, city, country, contact, id } =
			this.props.warehouseInfo;
		const { inventoryList, deleteItem, itemToDelete } = this.state;
		return (
			<div className='wh-info'>
				<div className='wh-info__wrapper'>
					<div className='wh-info__title-wrapper'>
						<img
							onClick={() => {
								window.history.back();
							}}
							className='wh-info__back-arrow'
							src={backArrow}
							alt='back arrow'
						/>
						<h2 className='wh-info__title'>{name}</h2>
						<Link to={`/warehouse/edit/${id}`} className='wh-info__edit-wh-btn'>
							<img
								src={editIcon}
								alt='edit icon'
								className='wh-info__edit-icon'
							/>
							<p className='wh-info__edit-text'>Edit</p>
						</Link>
					</div>
					<div className='wh-info__bottom-wrapper'>
						<div className='wh-info__tag-wrapper-address'>
							<p className='wh-info__tag'>Warehouse Address:</p>
							<p className='wh-info__address'>
								{address}, {city}, {country}
							</p>
						</div>
						<div className='wh-info__right-container'>
							<div className='wh-info__tag-wrapper-name'>
								<p className='wh-info__tag'>Contact Name:</p>
								<p className='wh-info__contact-name'>{contact.name}</p>
								<p className='wh-info__contact-position'>{contact.position}</p>
							</div>
							<div className='wh-info__tag-wrapper-contact'>
								<p className='wh-info__tag'>Contact Information:</p>
								<p className='wh-info__contact'>{contact.phone}</p>
								<p className='wh-info__contact'>{contact.email}</p>
							</div>
						</div>
					</div>
					<InventoryList
						searchValue=''
						inventoryList={inventoryList}
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

export default WarehouseInfo;
