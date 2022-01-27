import './styles.css';

type Props = {
  name: string;
};

const CategoryBadge = function (props: Props) {
  const { name } = props;

  return <div className="category-badge-container">{name}</div>;
};

export default CategoryBadge;
