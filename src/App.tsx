import { Router } from './routes';
import 'antd/dist/antd.css';
import { AuthenticationProvider } from './context/Authentication';

function App() {
  return (
    <>
      <AuthenticationProvider>
        <Router />
      </AuthenticationProvider>
    </>
  );
}

export default App;
