import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import routes
import { routesAuth, routesDashboard } from '~/routes';

// import layouts
import { AuthLayout, DashboardLayout } from '~/layouts';

// others
import { NotFoundPage } from '~/pages/Other';

const Routing = () => (
  <Router>
    <Switch>
      {routesAuth.map(({ id, path, component }) => (
        <AuthLayout key={id} path={path} component={component} exact />
      ))}
      {routesDashboard.map(({ id, path, component }) => (
        <DashboardLayout key={id} path={path} component={component} exact />
      ))}
      <Route path="*" component={NotFoundPage} exact />
    </Switch>
  </Router>
);

export default Routing;
