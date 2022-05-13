import "./CurrentWarehouse.scss";
import { Component } from "react";
import WarehouseInfo from "../../components/WarehouseInfo/WarehouseInfo";
import axios from "axios";

class CurrentWarehouse extends Component {
	state = {
		warehouse: null,
	};

	componentDidMount() {
		this.getWarehouseInfo();
	}

	getWarehouseInfo = () => {
		const currentId = this.props.match.params.warehouseId;
		return axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/warehouses/${currentId}`)
			.then(res => {
				this.setState({ warehouse: res.data.data });
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<section className='wh-details'>
				{this.state.warehouse && (
					<WarehouseInfo warehouseInfo={this.state.warehouse} />
				)}
			</section>
		);
	}
}

export default CurrentWarehouse;
