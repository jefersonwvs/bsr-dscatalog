import './styles.css';

const Navbar = function () {
  return (
    <nav className="admin-nav-container">
      <ul className="admin-nav">
        <li>
          <a href="link" className="admin-nav-item active">
            <p>Produtos</p>
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">
            <p>Categorias</p>
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">
            <p>Usuários</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
