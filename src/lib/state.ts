import { createGlobalState } from 'react-hooks-global-state'

interface typeState {
  textErrorAlert: string,
  displayErrorAlert: 'hidden' | 'fixed'
};

const initialState: typeState = {
  textErrorAlert: '',
  displayErrorAlert: 'hidden'
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }