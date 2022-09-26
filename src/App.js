import './App.css';
import Navbar from './Components/Navbar';
import Minter from './Components/Minter';
import UserState from './Components/Context/userState';

function App() {

  return (
    <>
      <UserState>
        <Navbar />
        <Minter />
      </UserState>
    </>
  );
}

export default App;
