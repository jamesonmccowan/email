import './App.css';

import Email from './email';
import autocomplete from './emails.json';

function App() {
  var App = (
    <div className="App">
      <header className="App-header">
        <div>To: <Email autocomplete={ autocomplete } /></div>
      </header>
    </div>
  );

  return App;
}

export default App;
