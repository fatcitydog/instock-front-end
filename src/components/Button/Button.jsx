import { Link } from 'react-router-dom';
import './Button.scss';

const Button = (props) => {
  const { isLink, to, icon, iconAlt, className, children, onClick } = props;
  const CustomTag = isLink ? Link : 'button';

  return (
    <CustomTag
      className={`btn ${className ? className : 'null'}`}
      to={to ? to : null}
      onClick={onClick}
    >
      {icon && <img src={icon} alt={iconAlt} className="btn__icon" />}
      <span className="btn__text">{children}</span>
    </CustomTag>
  );
};
export default Button;
