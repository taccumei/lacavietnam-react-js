import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import { useLoading } from "./hooks/useLoading";
import { setLoadingInterceptor } from './components/Interceptors/LoadingInterceptor.js';
import Loading from "./components/Loading/Loading";
import { useEffect } from "react";


function App() {
  const { showLoading, hideLoading } = useLoading();
  
  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  
  return (
    <>
      <Loading/>
      <Header />
      <AppRoutes/>
    </>
  );
}

export default App;
