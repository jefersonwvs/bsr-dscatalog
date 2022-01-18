import Navbar from './Navbar';

import './styles.css';

const Admin = function () {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <h1>Conteúdo</h1>
      </div>
    </div>
  );
};

export default Admin;
