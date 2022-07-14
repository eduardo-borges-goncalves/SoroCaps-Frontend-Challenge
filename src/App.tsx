import { Router } from './routes';
import 'antd/dist/antd.css';
import { useAuthentication } from './contexts/Authentication';

function App() {
  const { loading } = useAuthentication()
  return (
    loading ?
      <></>
      :
      <>
        <Router />
      </>
  );
}

export default App;
