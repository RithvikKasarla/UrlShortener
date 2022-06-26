import "./App.css";
import Inputs from "./components/Inputs/Inputs";
import Saved from "./components/Saved/Saved";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Forwarding from "./components/Forwarding/Forwarding";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route path="/:key">
//             <Forwarding />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

function App() {
  return (
    <div>
      <header className="App-header">Rithvik's App Shortener</header>
      <Inputs></Inputs>
      <Saved></Saved>
    </div>
  );
}

export default App;
