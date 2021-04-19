import React, { ReactElement, useState, useEffect } from "react";
import { Grid } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";

interface Props {}

async function getQuotes() {
  try {
    const response = await fetch("https://animechan.vercel.app/api/quotes");
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error(error);
  }
}

function AnimeQuotes({}: Props): ReactElement {
  const [quotes, setQuotes] = useState<
    Array<{
      name: string;
      quote: string;
      character: string;
    }>
  >([]);

  // Fetch data on 1st render
  useEffect(() => {
    getQuotes().then((quotes) => setQuotes(quotes));
  }, []);

  return (
    <Grid
      data={quotes.map((item) => [item.name, item.character, item.quote])}
      columns={["Anime", "Character", "Quote"]}
      search={true}
      pagination={{
        enabled: true,
        limit: 5,
      }}
    />
  );
}

export default AnimeQuotes;
