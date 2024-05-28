import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";

export const NativeIcon = ({
  chain,
  balance,
  connectedChain,
}: {
  chain: string;
  balance: string | undefined;
  connectedChain: string;
}) => {
  const { networkConfigurations } = useDynamicContext();

  if (!networkConfigurations) {
    return null;
  }

  const chainKey = chain === "eip155" ? "evm" : "solana";
  const networkConfig = networkConfigurations[chainKey];

  if (!networkConfig) {
    return null;
  }

  return (
    <div className="flex flex-row gap-4 w-full justify-end items-center">
      <div className="flex flex-row gap-2 w-full justify-end items-center">
        <Image
          src={networkConfig[0].iconUrls[0]}
          width={16}
          height={16}
          alt="icon"
        />
        <span className="text-sm">{networkConfig[0].name}</span>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <span>{Number(balance).toFixed(1)}</span>
        <span className="text-dynamic-text-secondary">{connectedChain}</span>
      </div>
    </div>
  );
};
