import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; import './App.css';
import SignIn from './screen/sign-in/SignIn'
import SignUp from './screen/sign-up/SignUp'
import AddPlace from "./screen/add-place/AddPlace";
import ReviewPlace from "./screen/review-place/ReviewPlace";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
