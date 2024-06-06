"use client";

import { UserProfileIcon } from "@dynamic-labs/iconic";
import {
  Wallet,
  useDynamicContext,
  useIsLoggedIn,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BalanceSummary } from "../components/BalanceSummary";
import { LogoutButton } from "../components/LogoutButton";
import { BaseNFTGrid } from "../components/NFTGrid";

const Dashboard = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const userWallets = useUserWallets();

  const { user } = useDynamicContext();
  const [solanaWallet, setSolanaWallet] =
    useState<[Wallet, string | undefined]>();
  const [baseWallet, setBaseWallet] = useState<[Wallet, string | undefined]>();

  useEffect(() => {
    const handleWallets = async () => {
      for (const userWallet of userWallets) {
        const balance = await userWallet.connector.getBalance();
        if (userWallet.chain === "eip155") {
          setBaseWallet([userWallet, balance]);
        } else {
          setSolanaWallet([userWallet, balance]);
        }
      }
    };
    handleWallets();
  }, [userWallets]);

  if (!isLoggedIn || !user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-row justify-center">
      <div className="flex h-full w-full flex-col items-center justify-start p-5">
        <div className="flex flex-col w-full py-5">
          <div className="flex flex-row w-full justify-between bg-gradient-to-t from-dynamic-button-primary-background rounded-t-lg p-3 pb-6 border-b border-b-dynamic-base-3">
            <div className="flex flex-col gap-3 text-2xl font-semibold">
              <UserProfileIcon
                height={128}
                width={128}
                className="border-4 border-black rounded-full"
              />
              {user.email}
            </div>
            <LogoutButton />
          </div>
          <div className="flex flex-col w-full rounded-b-lg bg-dynamic-button-primary-background">
            {solanaWallet && (
              <BalanceSummary
                isFirst
                wallet={solanaWallet[0]}
                balance={solanaWallet[1]}
              />
            )}
            {baseWallet && (
              <BalanceSummary wallet={baseWallet[0]} balance={baseWallet[1]} />
            )}
          </div>
        </div>
        <hr className="w-full border border-dynamic-base-4" />
        <div className="flex flex-col gap-5 w-full py-5">
          <h1 className="text-xl">Owned NFTs</h1>
          <BaseNFTGrid wallet={baseWallet ? baseWallet[0] : undefined} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
