import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
