import { createContext, useState, useContext, Fragment } from "react";

import { getTransactionLink } from "../lib";
import { usePriorityAccount, usePriorityChainId } from "../lib/connectors";
import { Alert, Link } from "../lib/Primitives";

export const TransactionContext = createContext({});

export const TransactionLink = ({ txHash, message, chainId }) => {
  return (
    <a
      className="underline"
      href={getTransactionLink(txHash, chainId)}
      target="_blank"
      rel="noreferrer"
    >
      {message}
    </a>
  );
};

const parseTxError = (e) => {
  console.error("error", e);
  let msg;
  try {
    msg = JSON.parse(/\(error=(.+), method.+\)/g.exec(e.message)[1]).message;
  } catch (error) {
    msg = e?.data?.message || e?.message || e;
  }
  if (msg.includes("insufficient funds")) return "Insufficient funds";
  return msg;
};

export function TransactionContextProvider({ children }) {
  const [isSendingTx, setIsSendingTx] = useState(false);

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
    key: 0,
  });

  const account = usePriorityAccount();

  // ------- handle transactions --------

  const alert = (msg, severity) => {
    setAlertState({
      open: true,
      message: msg,
      severity: severity || "alert",
      key: new Date().getTime(), // force update
    });
  };

  const handleTxError = (error) => {
    setIsSendingTx(false);
    if (error.reason === "sending a transaction requires a signer") {
      // XXX this shouldn't show up
      if (!account) alert("Please connect your wallet");
      else alert("Please switch to a valid network");
    } else {
      alert(parseTxError(error));
    }
  };

  const handleTx = async (tx) => {
    setIsSendingTx(true);
    const txLink = getTransactionLink(tx.hash);
    alert(<Link href={txLink}>Processing Transaction.</Link>, "info");
    const receipt = await tx.wait();
    alert(<Link href={txLink}>Transaction successful!</Link>, "success");
    setIsSendingTx(false);
    return receipt;
  };

  const onClose = () => setAlertState({ ...alertState, open: false });

  // console.log(alertState);

  const context = {
    alert,
    handleTx,
    handleTxError,
    isSendingTx,
  };

  return (
    <TransactionContext.Provider value={context}>
      <Fragment>{children}</Fragment>
      {alertState.open && (
        <Alert {...alertState} onClose={onClose}>
          {alertState.message}
        </Alert>
      )}
    </TransactionContext.Provider>
  );
}

export function useTx() {
  return useContext(TransactionContext);
}

// export { useUserState } from './userState';
// export { useChainQuery } from './contractState';
