import { CopyIcon, Wallet } from "@dynamic-labs/sdk-react-core";
import { displayAddress } from "../utils";
import { NativeIcon } from "./NativeIcon";
import { TransferButton } from "./TransferButton";

export const BalanceSummary = ({
  wallet,
  balance,
  isFirst,
}: {
  wallet: Wallet;
  balance: string | undefined;
  isFirst?: boolean;
}) => {
  return (
    <div
      className={`flex flex-row gap-1 p-3 ${
        isFirst ? "border-b border-b-dynamic-base-3" : ""
      }`}
    >
      <div className="flex w-full gap-2 text-base flex-row items-center justify-between">
        <button
          className="flex items-center font-mono text-dynamic-text-secondary gap-2 hover:text-white focus:text-white active:text-white h-full w-full text-sm"
          onClick={() => navigator.clipboard.writeText(wallet.address)}
        >
          {displayAddress(wallet.address, 7)}
          <CopyIcon />
        </button>
        {!isFirst && <TransferButton />}
        <NativeIcon
          chain={wallet.chain}
          balance={balance}
          connectedChain={wallet.connector.connectedChain}
        />
      </div>
    </div>
  );
};
