import "../styles/globals.css"
import { ApolloProvider } from "@apollo/client";
import client from "../lib/init-apollo";

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App
