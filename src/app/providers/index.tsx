"use client";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SocialSignInProviderEnum } from "@dynamic-labs/sdk-api-core";
import {
  DynamicContextProvider,
  IsBrowser,
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useRouter } from "next/navigation";

export const DynamicProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_ENV_ID as string,
        socialProvidersFilter: (_providers) => [
          SocialSignInProviderEnum.Google,
        ],
        walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
        events: {
          onAuthSuccess: () => {
            router.push("/dashboard");
          },
        },
      }}
    >
      <IsBrowser>{children}</IsBrowser>
    </DynamicContextProvider>
  );
};
