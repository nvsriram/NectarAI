import { ArrowRightIcon, useSendBalance } from "@dynamic-labs/sdk-react-core";
import { displayAddress } from "../utils";

const DEST_ADDRESS = process.env.NEXT_PUBLIC_DEST_ETH_ADDRESS as string;

export const TransferButton = () => {
  const { open } = useSendBalance();

  const handleTransfer = async () => {
    // if (!primaryWallet) {
    //   return;
    // }

    // const provider = (await primaryWallet.connector.getSigner<
    //   WalletClient<Transport, Chain, Account>
    // >());

    // if (!provider) return;

    // const transaction = {
    //   account: primaryWallet.address as Hex,
    //   chain: getChain(await provider.getChainId()),
    //   to: DEST_ADDRESS as Hex,
    //   value: 1000,
    // };

    // const hash = await provider.sendTransaction(transaction);

    // const client =
    //   await primaryWallet.connector.getPublicClient<PublicClient>();

    // const { transactionHash } = await client.getTransactionReceipt({
    //   hash,
    // });
    // console.log(transactionHash);
    try {
      const tx = await open({
        recipientAddress: DEST_ADDRESS,
        value: BigInt(100000),
      });
    } catch (err) {
      // Handle the promise rejection
      console.log(err);
    }
  };

  return (
    <button
      className="flex flex-row text-sm focus:text-emerald-500 hover:text-emerald-500 active:text-emerald-500 focus:border-emerald-500 hover:border-emerald-500 active:border-emerald-500 items-center justify-center gap-3 p-2 border border-slate-400 rounded-lg"
      onClick={handleTransfer}
    >
      Transfer to
      <span>{displayAddress(DEST_ADDRESS)}</span>
      <ArrowRightIcon />
    </button>
  );
};
