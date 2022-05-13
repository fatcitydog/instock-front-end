import "./WarehouseCard.scss";
import { Link } from "react-router-dom";
import rightChevron from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

function WarehouseCard(props) {
	const { name, address, city, country, contact, id } = props.warehouse;

	return (
		<div className='wh-card'>
			<div className='wh-card__tag-wrapper wh-card__tag-wrapper--wh'>
				<p className='wh-card__tag'>Warehouse</p>
				<Link to={`/warehouse/${id}`}>
					<div className='wh-card__name-wrapper'>
						<p className='wh-card__name'>{name}</p>
						<img
							className='wh-card__chevron-icon'
							src={rightChevron}
							alt='right chevron'
						/>
					</div>
				</Link>
			</div>
			<div className='wh-card__tag-wrapper wh-card__tag-wrapper--address'>
				<p className='wh-card__tag'>Address</p>
				<p className='wh-card__address'>
					{address}, {city}, {country}
				</p>
			</div>
			<div className='wh-card__tag-wrapper wh-card__tag-wrapper--name'>
				<p className='wh-card__tag'>Contact Name</p>
				<p className='wh-card__contact-name'>{contact.name}</p>
			</div>
			<div className='wh-card__tag-wrapper wh-card__tag-wrapper--contact'>
				<p className='wh-card__tag'>Contact Information</p>
				<p className='wh-card__contact'>{contact.phone}</p>
				<p className='wh-card__contact'>{contact.email}</p>
			</div>
			<div className='wh-card__btn-wrapper'>
				<img
					onClick={() => props.deleteConfirmation(props.warehouse)}
					className='wh-card__delete-btn'
					src={deleteIcon}
					alt='delete button'
				/>
				<Link to={`/warehouse/edit/${id}`}>
					<img className='wh-card__edit-btn' src={editIcon} alt='edit button' />
				</Link>
			</div>
		</div>
	);
}

export default WarehouseCard;
