import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import Loader from './components/common/Loader';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {user && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {user && <Navbar />}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
            <Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((route, i) =>
                  route.isPrivate ? (
                    <PrivateRoute
                      key={i}
                      path={route.path}
                      exact={route.exact}
                      allowedRoles={route.allowedRoles}
                    >
                      <route.component />
                    </PrivateRoute>
                  ) : (
                    <PublicRoute key={i} path={route.path} exact={route.exact}>
                      <route.component />
                    </PublicRoute>
                  )
                )}
              </Switch>
            </Suspense>
          </main>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Router>
  );
}

export default App;