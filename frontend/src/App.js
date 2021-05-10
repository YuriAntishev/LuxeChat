import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import Join from './components/Join';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat/name=:name-room=:room" component={ChatRoom} />
    </Router>
  )
}

export default App;
