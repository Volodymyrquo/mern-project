import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import LinksPage from './pages/LinksPage';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/links' exact render={() => <LinksPage />} />
        <Route path='/create' exact render={() => <CreatePage />} />
        <Route path='/detail/:id' render={() => <DetailPage />} />
        <Redirect to='/create' />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path='/' exact render={() => <AuthPage />} />
      <Redirect to='/' />
    </Switch>
  );
};

export default useRoutes;
