import { useWeb3React } from "@web3-react/core";
import { config } from "../../config";

export function UnsupportedChainIdBanner() {
  const { error } = useWeb3React();

  if (error?.name === "UnsupportedChainIdError")
    return (
      <div className="bg-orange-500 text-black text-center">
        Warning: Unsupported chain id. Please switch to the{" "}
        {config.validChainName} network.
      </div>
    );
  return null;
}
