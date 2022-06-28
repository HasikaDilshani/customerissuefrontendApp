import './App.css';

import Appbar from './components/Appbar';
//import Issue from './components/Issue';
import IssueTable from './components/IssueTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <Appbar/>
      <IssueTable />
    

    
    {/* <Issue/> */}
    </div>
  );
}

export default App;
