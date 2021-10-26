import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

import './styles.css';

type Props = {
   text: string;
};

const ButtonIcon = (props: Props) => {
   const { text } = props;
   
   return (
      <div className="btn-container">
         <button className="btn btn-primary">
            <h6>{text}</h6>
         </button>
         <div className="btn-icon-container">
            <ArrowIcon />
         </div>
      </div>
   );
};

export default ButtonIcon;
