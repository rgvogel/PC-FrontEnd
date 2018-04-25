import Comments from './components/comments';
import CommentForm from './components/comment_form';
import Home from './components/home';
import TopNav from './components/top_nav';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Professors from './components/professors';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import Raven from 'raven-js';

Raven.config('https://bcc9f682b2964389a6b0673e9d9a0a2d@sentry.io/1195438').install();

ReactDOM.render(
  <BrowserRouter>
    <div>
      <TopNav />
      <Switch>
        <Route path="/professors/:id/comments/create" component={CommentForm} />
        <Route path="/professors/:id/comments/:pid" component={CommentForm} />
        <Route path="/professors/:id/comments" component={Comments} />
        <Route path="/professors" component={Professors} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
  registerServiceWorker();
