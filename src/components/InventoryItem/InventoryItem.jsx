import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import gobackIcon from '../../assets/icons/arrow_back-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import './InventoryItem.scss';

class InventoryItem extends React.Component {
  state = {
    item: {}
  }

  componentDidMount() {
    const { inventoryId } = this.props.match.params;
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/inventories/${inventoryId}`)
      .then((response) => {
        this.setState({
          item: response.data.data
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
  }

  render() {
    const {
      id,
      itemName,
      description,
      category,
      status,
      quantity,
      warehouseName
    } = this.state.item;
    return (
      itemName ?
        <div className="item-detail-container">
          <div className="item-detail">
            <div className="item-detail__header">
              <div className="item-detail__header1">
                <button
                  onClick={this.goBack}
                  className="item-detail__goback-button"
                >
                  <img
                    src={gobackIcon}
                    alt="item-detail-goback-icon"
                    className="item-detail__goback-icon"
                  />
                </button>
                <h1 className="item-detail__name">
                  {itemName}
                </h1>
              </div>
              <div className="item-detail__header2">
                <Link
                  to={`/inventory/edit/${id}`}
                  className="item-detail__edit-link"
                >
                  <div className="item-detail__edit-button">
                    <img
                      src={editIcon}
                      alt={`${itemName}-edit-icon`}
                      className="iconBox item-detail__edit-icon"
                    />
                    <p className="item-detail__edit-text">
                      Edit
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="item-detail__info">
              <div className="item-detail__info1">
                <div className="item-detail__description">
                  <p className="item-detail__description-title">
                    item description:
                  </p>
                  <p className="item-detail__description-content">
                    {description}
                  </p>
                </div>
                <div className="item-detail__category">
                  <p className="item-detail__category-title">
                    category:
                  </p>
                  <p className="item-detail__category-content">
                    {category}
                  </p>
                </div>
              </div>
              <div className="item-detail__info2">
                <div className="item-detail__status">
                  <p className="item-detail__status-title">
                    status:
                  </p>
                  {
                    status === 'In Stock' ?
                      <div className="
                        item-detail__status-tag
                        item-detail__status-tag--in-stock
                      ">
                        <p className="item-detail__status-content">
                          {status}
                        </p>
                      </div> :
                      <div className="
                        item-detail__status-tag
                        item-detail__status-tag--out-of-stock
                      ">
                        <p className="item-detail__status-content">
                          {status}
                        </p>
                      </div>
                  }
                </div>
                <div className="item-detail__quantity">
                  <p className="item-detail__quantity-title">
                    quantity:
                  </p>
                  <p className="item-detail__quantity-content">
                    {quantity}
                  </p>
                </div>
                <div className="item-detail__warehouse">
                  <p className="item-detail__warehouse-title">
                    warehouse:
                  </p>
                  <p className="item-detail__warehouse-content">
                    {warehouseName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> :
        <></>
    );
  }
}

export default InventoryItem;
