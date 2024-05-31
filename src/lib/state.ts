import { createGlobalState } from 'react-hooks-global-state'

interface typeState {
  textErrorAlert: string,
  displayErrorAlert: 'hidden' | 'fixed',
  isShowNavbar: boolean,
  usernameLogin: string,
  isShowLoading: boolean,
  thumbnailUpload: any,
  thumbnailBlob: string,
};

const initialState: typeState = {
  textErrorAlert: '',
  displayErrorAlert: 'hidden',
  isShowNavbar: false,
  usernameLogin: '',
  isShowLoading: true,
  thumbnailUpload: null,
  thumbnailBlob: '/blank-thumbnail.webp',
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }