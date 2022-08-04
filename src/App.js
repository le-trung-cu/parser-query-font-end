import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; import './App.css';
import { Fragment } from "react";
import SignIn from './screen/sign-in/SignIn'
import SignUp from './screen/sign-up/SignUp'
import AddPlace from "./screen/add-place/AddPlace";
import ReviewPlace from "./screen/review-place/ReviewPlace";
import ListPlace from "./screen/list-place/ListPlace";
import Review from "./screen/review-place/review";
function App() {
  return (
    <Fragment >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path ="/addPlace" element={<AddPlace/>} />
          <Route path ="/review" element={<ReviewPlace/>}/>
          <Route path ="/list" element={<ListPlace/>}/>
          <Route path="/1" element={<Review/> }/>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
