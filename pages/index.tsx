import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import HomeFeed from "../components/HomeFeed";
import Sidebar from "../components/Sidebar";
import { Anime, IMain } from "../interface";

import {
  getAnimeNews,
  getSeasonNowAnime,
  getSeasonUpcomingAnime,
  getSeasonYearAnime,
} from "./api/anime";

const Home = ({ seasonsNow, seasonYear, seasonsUpcoming }: IMain) => {
  const homeFeed = {
    seasonsNow,
    seasonYear,
    seasonsUpcoming,
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeFeed {...homeFeed} />

      {/* <div className=''>
        {seasonsNow?.map((anime:any)=>(
          <div key={anime.mal_id}>
               <h1 key={anime.mal_id}>{anime.title}</h1>
              <p>{anime.season}</p>
          </div>
     
        ))}
      </div> */}
    </div>
  );
};

export const getStaticProps = async () => {
  const [seasonsNow, seasonYear, seasonsUpcoming] = [
    await getSeasonNowAnime(),
    await getSeasonYearAnime(2022, "spring"),
    await getSeasonUpcomingAnime(),
  ];

  // const data = [...seasonsNow,...seasonYear,...seasonsUpcoming,...animeNews];

  return {
    props: {
      seasonsNow: seasonsNow || null,
      seasonYear: seasonYear || null,
      seasonsUpcoming: seasonsUpcoming || null,
    },
    revalidate: 60,
  };
};

export default Home;
