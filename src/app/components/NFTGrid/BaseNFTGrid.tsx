"use client";

import { Wallet } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Nft {
  address: string;
  name: string;
  imageUrl: string;
}

const TEST_NFTS: Nft[] = [
  {
    address: "nft1-address",
    name: "nft1",
    imageUrl: "http://nft1-url",
  },
  {
    address: "nft2-address",
    name: "nft2",
    imageUrl: "http://nft2-url",
  },
  {
    address: "nft3-address",
    name: "nft3",
    imageUrl: "http://nft3-url",
  },
  {
    address: "nft4-address",
    name: "nft4",
    imageUrl: "http://nft4-url",
  },
  {
    address: "nft5-address",
    name: "nft5",
    imageUrl: "http://nft5-url",
  },
  {
    address: "nft6-address",
    name: "nft6",
    imageUrl: "http://nft6-url",
  },
];

export const BaseNFTGrid = ({ wallet }: { wallet?: Wallet }) => {
  const [nfts, setNfts] = useState<Nft[]>(TEST_NFTS);

  useEffect(() => {
    if (!wallet) {
      return;
    }

    fetch(
      `${
        process.env.NEXT_PUBLIC_ALCHEMY_ETH_BASE_URL as string
      }/getNFTsForOwner/?owner=${wallet.address}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(wallet.chain);
        console.log(data);
      });
  }, [wallet]);

  if (!wallet) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <span
        className="flex flex-row w-fit text-sm items-center justify-center gap-3 px-4 py-2 border
      border-dynamic-base-3 rounded-lg"
      >
        {nfts.length} items
      </span>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {nfts.map((nft, idx) => {
          return (
            <div
              className="flex flex-col rounded-lg bg-dynamic-button-primary-background group hover:bg-dynamic-base-3 p-5 transition-all ease-in-out duration-200"
              key={idx}
            >
              <img
                src={nft.imageUrl}
                alt={nft.name}
                width={128}
                height={128}
                className="group-hover:scale-110 transition-all ease-in-out duration-200"
              />
              <span>{nft.name}</span>
              <span>{nft.address}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
