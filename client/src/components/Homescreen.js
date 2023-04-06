import React, { useState } from "react";
import SearchBar from "./SearchBar";
import GameList from "./GameList";

function Homescreen() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <GameList search={search} sort={sort} />
    </div>
  );
}

export default <Homescreen />;