import React from "react";
import Link from "next/link";
import ExploreCard from "../components/ExploreCard";

function ExploreMore() {
  return (
    <div className="pageWrapper">
      <h2>What are you looking for ?</h2>
      <p>
        Search a number for Entrepreneurs, Investors, Enablers and many more.
      </p>
      <div className="grid">
        <Link href="/investors">
          <a>
            <ExploreCard img="/investor.svg" title="Investors" />
          </a>
        </Link>
        <Link href="/entrepreneurs">
          <a>
            <ExploreCard img="/entrepreneur.svg" title="Entrepreneurs" />
          </a>
        </Link>
        <Link href="enablers">
          <a>
            <ExploreCard img="/enabler.svg" title="Enablers" />
          </a>
        </Link>
        <Link href="/individuals">
          <a>
            <ExploreCard img="/individual.svg" title="Individuals" />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default ExploreMore;
