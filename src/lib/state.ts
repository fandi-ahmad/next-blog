import { createGlobalState } from 'react-hooks-global-state'

interface typeState {
  textErrorAlert: string,
  displayErrorAlert: 'hidden' | 'fixed',
  isShowNavbar: boolean,
  usernameLogin: string,
  isShowLoading: boolean,
};

const initialState: typeState = {
  textErrorAlert: '',
  displayErrorAlert: 'hidden',
  isShowNavbar: false,
  usernameLogin: '',
  isShowLoading: true
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }