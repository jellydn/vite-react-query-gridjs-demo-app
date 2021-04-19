import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AnimeQuotes from "./AnimeQuotes";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Anime Quotes</h1>
      <AnimeQuotes />
    </QueryClientProvider>
  );
}

export default App;
