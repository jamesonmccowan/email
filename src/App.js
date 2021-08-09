import './App.css';

import Email from './email';
import autocomplete from './emails.json';

function App() {
  var App = (
    <div className="App">
      <header className="App-header">
        <Email autocomplete={ autocomplete } placeholder="Enter recipients..." />
      </header>
    </div>
  );

  return App;
}

export default App;
