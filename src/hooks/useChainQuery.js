import { useEffect, useRef, useState } from 'react';
import { atomFamily, useRecoilState } from 'recoil';
import { useAccounts, usePriorityAccount, usePriorityProvider, useProvider } from '../lib/connectors';

const contractState = atomFamily({
  key: 'ContractState',
  default: {},
});

var contractStateInitialized = {};
var contractStateLoading = {};

export function useChainQuery({ key, fetchState, initialState, initializer }) {
  const [state, setState] = useRecoilState(contractState(key));
  const [componentDidMount, setComponentDidMount] = useState(false);

  const isMounted = useRef(false);

  const provider = usePriorityProvider();
  const accounts = usePriorityAccount();

  const updateState = () => {
    fetchState()
      .then((state) => {
        if (isMounted.current) {
          setState({ ...state, loaded: true });
          contractStateInitialized[key] = true;
        }
      })
      .finally(() => {
        contractStateLoading[key] = false;
      });
  };

  useEffect(() => {
    // ensures that this will only be called once on init
    // or per provider update (if component has mounted already)
    // doesn't re-trigger when a component re-mounts
    isMounted.current = true;
    if (
      provider &&
      accounts?.length &&
      !contractStateLoading[key] &&
      (componentDidMount || !contractStateInitialized[key])
    ) {
      // console.log('running expensive fetch:', key, accounts);
      contractStateLoading[key] = true;
      if (initializer !== undefined) initializer(); // should be called once every "update"?
      updateState();
      setComponentDidMount(true);
    }
    return () => {
      isMounted.current = false;
    };
  }, [provider, accounts]);

  if (!contractStateInitialized[key] && initialState !== undefined) return [initialState, updateState];

  return [state, updateState];
}
