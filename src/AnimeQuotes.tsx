import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { Grid } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";

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

function AnimeQuotes(): ReactElement {
  const { isLoading, error, data } = useQuery<
    Array<{
      anime: string;
      character: string;
      quote: string;
    }>
  >("quotes", getQuotes);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p role="alert">{(error as Error).message}</p>;
  }

  return (
    <Grid
      data={data?.map((item) => [item.anime, item.character, item.quote])}
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
