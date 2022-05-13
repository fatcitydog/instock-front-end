import "./ManageWarehouse.scss";
import { Component } from "react";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import axios from "axios";

class ManageWarehouse extends Component {
	state = {
		name: "",
		address: "",
		city: "",
		country: "",
		contact: "",
		position: "",
		phone: "",
		email: "",
		nameIsValid: true,
		addressIsValid: true,
		cityIsValid: true,
		countryIsValid: true,
		contactIsValid: true,
		positionIsValid: true,
		phoneIsValid: true,
		emailIsValid: true,
		phoneErrorMessage: "This field is required",
		emailErrorMessage: "This field is required",
	};

	componentDidMount() {
		//if path to edit warehouse
		const currentPath = this.props.match.path;
		const currentId = this.props.match.params.warehouseId;
		if (currentPath !== `/warehouse/add`) {
			axios
				.get(`${process.env.REACT_APP_BACKEND_URL}/warehouses/${currentId}`)
				.then(res => {
					const {
						name,
						address,
						city,
						country,
						contact: contactInfo,
					} = res.data.data;
					const { name: contact, position, phone, email } = contactInfo;
					this.setState({
						name,
						address,
						city,
						country,
						contact,
						position,
						phone,
						email,
					});
				})
				.catch(err => console.log(err));
		}
	}

	handelSubmit = e => {
		e.preventDefault();
		const currentPath = this.props.match.path;
		const currentId = this.props.match.params.warehouseId;
		const { name, address, city, country, contact, position, phone, email } =
			this.state;

		// Validation
		const emailRe = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
		const isEmailValid = email.match(emailRe);

		const phoneRe =
			/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
		const isPhoneValid = phone.match(phoneRe);

		if (
			name &&
			address &&
			city &&
			country &&
			contact &&
			position &&
			phone &&
			email &&
			isEmailValid &&
			isPhoneValid
		) {
			const newWarehouse = {
				name,
				address,
				city,
				country,
				contact: { name: contact, position, phone, email },
			};
			const editWarehouse = { ...newWarehouse, id: currentId };
			if (currentPath === `/warehouse/add`) {
				axios
					.post(`${process.env.REACT_APP_BACKEND_URL}/warehouses`, newWarehouse)
					.then(() => {
						this.handleGoBack();
					})
					.catch(err => console.log(err));
			} else {
				axios
					.put(
						`${process.env.REACT_APP_BACKEND_URL}/warehouses/${currentId}`,
						editWarehouse
					)
					.then(() => {
						this.handleGoBack();
					})
					.catch(err => console.log(err));
			}
		} else {
			this.setState({
				nameIsValid: !name ? false : true,
				addressIsValid: !address ? false : true,
				cityIsValid: !city ? false : true,
				countryIsValid: !country ? false : true,
				contactIsValid: !contact ? false : true,
				positionIsValid: !position ? false : true,
				phoneIsValid: phone && isPhoneValid ? true : false,
				emailIsValid: email && isEmailValid ? true : false,
				phoneErrorMessage: !phone
					? "This field is required"
					: !isPhoneValid
					? "Example: +1 (123) 123-1234"
					: "",
				emailErrorMessage: !email
					? "This field is required"
					: !isEmailValid
					? "Example: example@example.example"
					: "",
			});
		}
	};

	handleChange = e => {
		const inputName = e.target.name;
		const inputValid = inputName + "IsValid";
		const inputValue = e.target.value;
		this.setState({
			[inputName]: inputValue,
			[inputValid]: inputValue ? true : false,
		});
	};

	handleGoBack = e => {
		if (e) {
			e.preventDefault();
		}
		window.history.back();
	};

	render() {
		const {
			name,
			address,
			city,
			country,
			contact,
			position,
			phone,
			email,
			nameIsValid,
			addressIsValid,
			cityIsValid,
			countryIsValid,
			contactIsValid,
			positionIsValid,
			phoneIsValid,
			emailIsValid,
		} = this.state;

		const currentPath = this.props.match.path;

		return (
			<section className='addWh'>
				<div className='addWh__wrapper'>
					<div className='addWh__title-wrapper'>
						<img
							onClick={this.handleGoBack}
							className='addWh__img'
							src={backArrow}
							alt='back arrow'
						/>
						<h2 className='addWh__title'>
							{currentPath === "/warehouse/add"
								? "Add New Warehouse"
								: "Edit Warehouse"}
						</h2>
					</div>
					<form className='addWh__wh-form'>
						<div className='addWh__forms-wrapper'>
							<div className='addWh__wh-wrapper'>
								<h3 className='addWh__details'>Warehouse Details</h3>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='name'>
										Warehouse Name
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!nameIsValid && "addWh__input--error"
										}`}
										type='text'
										name='name'
										id='name'
										value={name}
										placeholder='Warehouse Name'
									/>
									{!nameIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>This field is required</p>
										</div>
									)}
								</div>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='address'>
										Street Address
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!addressIsValid && "addWh__input--error"
										}`}
										type='text'
										name='address'
										id='address'
										value={address}
										placeholder='Street Address'
									/>
									{!addressIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>This field is required</p>
										</div>
									)}
								</div>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='city'>
										City
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!cityIsValid && "addWh__input--error"
										}`}
										type='text'
										name='city'
										id='city'
										value={city}
										placeholder='City'
									/>
									{!cityIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>This field is required</p>
										</div>
									)}
								</div>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='country'>
										Country
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!countryIsValid && "addWh__input--error"
										}`}
										type='text'
										name='country'
										id='country'
										value={country}
										placeholder='Country'
									/>
									{!countryIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>This field is required</p>
										</div>
									)}
								</div>
							</div>
							<div className='addWh__contact-wrapper'>
								<h3 className='addWh__details'>Contact Details</h3>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='contact'>
										Contact Name
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!contactIsValid && "addWh__input--error"
										}`}
										type='text'
										name='contact'
										id='contact'
										value={contact}
										placeholder='Contact Name'
									/>
									{!contactIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>This field is required</p>
										</div>
									)}
								</div>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='position'>
										Position
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!positionIsValid && "addWh__input--error"
										}`}
										type='text'
										name='position'
										id='position'
										value={position}
										placeholder='Position'
									/>
									{!positionIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>This field is required</p>
										</div>
									)}
								</div>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='phone'>
										Phone Number
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!phoneIsValid && "addWh__input--error"
										}`}
										type='text'
										name='phone'
										id='phone'
										value={phone}
										placeholder='Phone Number'
									/>
									{!phoneIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>
												{this.state.phoneErrorMessage}
											</p>
										</div>
									)}
								</div>
								<div className='addWh__input-wrapper'>
									<label className='addWh__label' htmlFor='email'>
										Email
									</label>
									<input
										onChange={this.handleChange}
										className={`addWh__input ${
											!emailIsValid && "addWh__input--error"
										}`}
										type='email'
										name='email'
										id='email'
										value={email}
										placeholder='Email'
									/>
									{!emailIsValid && (
										<div className='addWh__error-wrapper'>
											<img
												className='addWh__error-icon'
												src={errorIcon}
												alt='error'
											/>
											<p className='addWh__error'>
												{this.state.emailErrorMessage}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className='addWh__btn-wrapper'>
							<button
								className='addWh__cancel-btn'
								type='reset'
								onClick={this.handleGoBack}
							>
								Cancel
							</button>
							{currentPath === "/warehouse/add" ? (
								<button
									className='addWh__add-btn'
									type='submit'
									onClick={this.handelSubmit}
								>
									+ Add Warehouse
								</button>
							) : (
								<button
									className='addWh__save-btn'
									type='submit'
									onClick={this.handelSubmit}
								>
									Save
								</button>
							)}
						</div>
					</form>
				</div>
			</section>
		);
	}
}

export default ManageWarehouse;
