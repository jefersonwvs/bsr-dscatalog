import Navbar from 'components/Navbar';

import './assets/styles/custom.scss'; // bootstrap theme
import './App.css'; // global styles

function App() {
  return (
    // React components are written in JSX - it's sort of HTML mixed with JS
    <>
      <Navbar />
      <h1>Hello, DSCatalog</h1>
    </>
  );
}

export default App;
