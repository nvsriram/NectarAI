"use client";

import { UserProfileIcon } from "@dynamic-labs/iconic";
import {
  CopyIcon,
  Wallet,
  useDynamicContext,
  useIsLoggedIn,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import { NativeIcon } from "../components/NativeIcon";
import { TransferButton } from "../components/TransferButton";
import { displayAddress } from "../utils";

const Dashboard = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const userWallets = useUserWallets();

  const { user } = useDynamicContext();
  const [wallets, setWallets] = useState<[Wallet, string | undefined][]>([]);

  useEffect(() => {
    const handleWallets = async () => {
      const wallets: [Wallet, string | undefined][] = [];
      for (const userWallet of userWallets) {
        const balance = await userWallet.connector.getBalance();
        wallets.push([userWallet, balance]);
      }
      setWallets(wallets);
    };
    handleWallets();
  }, [userWallets]);

  if (!isLoggedIn || !user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-row items-center justify-center p-24">
      <div className="flex w-full flex-col gap-3 items-center justify-start">
        <div className="flex flex-col gap-3 w-full rounded-lg bg-dynamic-base-1 border border-dynamic-base-4 p-5">
          <div className="flex flex-row w-full gap-3 p-2 rounded-lg text-base bg-dynamic-button-primary-background">
            <UserProfileIcon height={24} width={24} />
            {user.email}
          </div>
          <div className="flex flex-col w-full rounded-lg bg-dynamic-button-primary-background">
            {wallets.map(([wallet, balance], idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-row gap-1 p-3 border-b border-b-dynamic-base-3"
                >
                  <div className="flex w-full gap-2 text-base flex-row items-center justify-between">
                    <button
                      className="flex text-dynamic-text-secondary gap-2 hover:text-white focus:text-white active:text-white h-full w-full text-sm"
                      onClick={() =>
                        navigator.clipboard.writeText(wallet.address)
                      }
                    >
                      {displayAddress(wallet.address, 7)}
                      <CopyIcon />
                    </button>
                    <NativeIcon
                      chain={wallet.chain}
                      balance={balance}
                      connectedChain={wallet.connector.connectedChain}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <TransferButton />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Dashboard;
