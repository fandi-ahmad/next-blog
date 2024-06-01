import { createGlobalState } from 'react-hooks-global-state'

interface typeState {
  textErrorAlert: string,
  displayErrorAlert: 'hidden' | 'fixed',
  isShowNavbar: boolean,
  isShowLoading: boolean,
  usernameLogin: string,
  idUser: number | null,
  thumbnailUpload: any,
  thumbnailBlob: string,
  headPost: string,
  bodyPost: string,
  labelPost: string,
  idArticle: number | null,
};

const initialState: typeState = {
  textErrorAlert: '',
  displayErrorAlert: 'hidden',
  isShowNavbar: false,
  isShowLoading: true,
  usernameLogin: '',
  idUser: null,
  thumbnailUpload: null,
  thumbnailBlob: '/blank-thumbnail.webp',
  headPost: '',
  bodyPost: '',
  labelPost: '',
  idArticle: null,
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }