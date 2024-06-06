import { LogoutIcon, useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const LogoutButton = () => {
  const { handleLogOut } = useDynamicContext();
  return (
    <button
      className="flex flex-row h-fit text-sm focus:text-[#fe4f45] hover:text-[#fe4f45] active:text-[#fe4f45] focus:border-[#fe4f45] hover:border-[#fe4f45] active:border-[#fe4f45] items-center justify-center gap-3 p-2 border border-slate-400 rounded-lg"
      onClick={() => handleLogOut()}
    >
      Log out <LogoutIcon />
    </button>
  );
};
