import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

import './styles.css';

const ButtonIcon = function () {
  return (
    <div className="btn-primary btn-container">
      <button className="btn">
        <h6>INICIE AGORA A SUA BUSCA</h6>
      </button>
      <div className="btn-icon-container">
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ButtonIcon;
