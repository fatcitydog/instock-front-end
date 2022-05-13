import React from "react";
import { Link } from "react-router-dom";
import sortIcon from "../../assets/icons/sort-24px.svg";
import gotoIcon from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import "./InventoryList.scss";

class InventoryList extends React.Component {
	constructor(props) {
		super(props);
		this.sortActiveRef = {
			itemName: React.createRef(),
			category: React.createRef(),
			status: React.createRef(),
			quantity: React.createRef(),
			warehouseName: React.createRef(),
		};
	}

	handleSort = (event, sortKey) => {
		event.preventDefault();
		const { handleSortFunction } = this.props;
		for (const sortBy in this.sortActiveRef) {
			const { current } = this.sortActiveRef[sortBy];
			if (sortBy === sortKey) {
				current.classList.add("inventory-list__sort-icon--active");
			} else {
				current.classList.remove("inventory-list__sort-icon--active");
			}
		}
		handleSortFunction(sortKey);
	};

	getClassesHeader(columnName) {
		let classes = "inventory-list__sort-button";
		if (columnName === "itemName") {
			classes += " inventory-list__sort-button--fat";
		}
		if (columnName === "quantity") {
			classes += " inventory-list__sort-button--thin";
		}
		if (this.props.warehouseId) {
			if (columnName === "warehouseName") {
				classes += " inventory-list__sort-button--hide";
			} else {
				classes += " inventory-list__sort-button--show";
			}
		}
		return classes;
	}

	getClassesItem(columnName) {
		let classes = columnName
			? "inventory-item__property"
			: "inventory-item__properties";
		if (columnName === "itemName") {
			classes += " inventory-item__property--fat";
		}
		if (columnName === "quantity") {
			classes += " inventory-item__property--thin";
		}
		if (this.props.warehouseId) {
			if (columnName === "warehouseName") {
				classes += " inventory-item__property--hide";
			} else {
				classes += columnName
					? " inventory-item__property--show"
					: " inventory-item__properties--show";
			}
		}
		return classes;
	}

	render() {
		const { warehouseId, inventoryList, handleDeleteFunction } = this.props;
		return (
			<div className='inventory-list'>
				<div className='inventory-list__header'>
					<div
						onClick={event => {
							this.handleSort(event, "itemName");
						}}
						className={this.getClassesHeader("itemName")}
					>
						<p className='inventory-list__sort-by'>inventory item</p>
						<img
							ref={this.sortActiveRef["itemName"]}
							src={sortIcon}
							alt={`inventory-sort-by-name`}
							className='iconBox inventory-list__sort-icon'
						/>
					</div>
					<div
						onClick={event => {
							this.handleSort(event, "category");
						}}
						className={this.getClassesHeader("category")}
					>
						<p className='inventory-list__sort-by'>category</p>
						<img
							ref={this.sortActiveRef["category"]}
							src={sortIcon}
							alt={`inventory-sort-by-category`}
							className='iconBox inventory-list__sort-icon'
						/>
					</div>
					<div
						onClick={event => {
							this.handleSort(event, "status");
						}}
						className={this.getClassesHeader("status")}
					>
						<p className='inventory-list__sort-by'>status</p>
						<img
							ref={this.sortActiveRef["status"]}
							src={sortIcon}
							alt={`inventory-sort-by-status`}
							className='iconBox inventory-list__sort-icon'
						/>
					</div>
					<div
						onClick={event => {
							this.handleSort(event, "quantity");
						}}
						className={this.getClassesHeader("quantity")}
					>
						<p className='inventory-list__sort-by'>qty</p>
						<img
							ref={this.sortActiveRef["quantity"]}
							src={sortIcon}
							alt={`inventory-sort-by-qty`}
							className='iconBox inventory-list__sort-icon'
						/>
					</div>
					<div
						onClick={event => {
							this.handleSort(event, "warehouseName");
						}}
						className={this.getClassesHeader("warehouseName")}
					>
						<p className='inventory-list__sort-by'>warehouse</p>
						<img
							ref={this.sortActiveRef["warehouseName"]}
							src={sortIcon}
							alt={`inventory-sort-by-warehouse`}
							className='iconBox inventory-list__sort-icon'
						/>
					</div>
					<div className='inventory-list__action-button'>
						<p className='inventory-list__action'>actions</p>
					</div>
				</div>
				<div className='inventory-item-container'>
					{inventoryList.map(inventoryItem => {
						const { id, itemName, status, category, quantity, warehouseName } =
							inventoryItem;
						return (
							<div key={id} className='inventory-item'>
								<div className={this.getClassesItem()}>
									<div className={this.getClassesItem("itemName")}>
										<p className='inventory-item__property-name'>
											inventory item
										</p>
										<Link
											to={`/inventory/${id}`}
											className='inventory-item__link'
										>
											<p className='inventory-item__name'>{itemName}</p>
											<img
												src={gotoIcon}
												alt='inventory-item-goto-icon'
												className='inventory-item__goto-icon'
											/>
										</Link>
									</div>
									<div className={this.getClassesItem("category")}>
										<p className='inventory-item__property-name'>category</p>
										<p className='inventory-item__category'>{category}</p>
									</div>
									{!warehouseId && (
										<div
											className='
                      inventory-item__property
                      inventory-item__property--mobile-only
                    '
										></div>
									)}
									<div className={this.getClassesItem("status")}>
										<p className='inventory-item__property-name'>status</p>
										{status === "In Stock" ? (
											<div
												className='
                          inventory-item__status-tag
                          inventory-item__status-tag--in-stock
                        '
											>
												<p className='inventory-item__status'>{status}</p>
											</div>
										) : (
											<div
												className='
                          inventory-item__status-tag
                          inventory-item__status-tag--out-of-stock
                        '
											>
												<p className='inventory-item__status'>{status}</p>
											</div>
										)}
									</div>
									<div className={this.getClassesItem("quantity")}>
										<p className='inventory-item__property-name'>qty</p>
										<p className='inventory-item__qty'>{quantity}</p>
									</div>
									<div className={this.getClassesItem("warehouseName")}>
										<p className='inventory-item__property-name'>warehouse</p>
										<p className='inventory-item__warehouse'>{warehouseName}</p>
									</div>
								</div>
								<div className='inventory-item__action'>
									<button
										onClick={event => {
											handleDeleteFunction(event, inventoryItem);
										}}
										className='inventory-item__delete-button'
									>
										<img
											src={deleteIcon}
											alt={`${id}-delete-icon`}
											className='inventory-item__delete-icon'
										/>
									</button>
									<button className='inventory-item__edit-button'>
										<Link
											to={`/inventory/edit/${id}`}
											className='inventory-item__edit-link'
										>
											<img
												src={editIcon}
												alt={`${itemName}-edit-icon`}
												className='inventory-item__edit-icon'
											/>
										</Link>
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default InventoryList;
