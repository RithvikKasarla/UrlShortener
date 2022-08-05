import "./App.css";
import { useState } from "react";
import Inputs from "./components/Inputs/Inputs";
import Saved from "./components/Saved/Saved";
import QuerySearch from "./components/QuerySearch/QuerySearch";
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
//   );s
// }

function App() {
  const basename = process.env.REACT_APP_BASENAME || null;
  var [query, setQuery] = useState("");

  return (
    <div>
      <header className="App-header text-[70px] text-center box-border h-32 bg-blue-200 ">
        URL Shortener
      </header>
      <div className="grid grid-cols-5 gap-3 h-screen bg-gray-200">
        <div className="bg-gray-300 pt-10 mr-2 pr-10">
          <Inputs></Inputs>
        </div>
        <div className=" pt-6 pl-3 pb-10 bg-gray-100 col-span-4  w-full">
          <QuerySearch handleChange={setQuery}></QuerySearch>
          <Saved query={query}></Saved>
        </div>
      </div>
    </div>
  );
}

export default App;
