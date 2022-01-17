import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

import './styles.css';

type Props = {
  text: string;
};

const ButtonIcon = function (props: Props) {
  const { text } = props;

  return (
    <div className="btn-primary btn-container">
      <button className="btn">
        <h6>{text}</h6>
      </button>
      <div className="btn-icon-container">
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ButtonIcon;
