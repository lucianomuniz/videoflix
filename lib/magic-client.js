import { Magic } from 'magic-sdk';

const createMagic = () => {
  return (
    typeof window !== 'undefined' &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)
  );
};

export const magic = createMagic();

export const loginWithEmail = (email) => {
  return magic.auth.loginWithMagicLink({ email });
};

export const logout = async () => {
  return await magic.user.logout();
};

export const getUserLogin = async () => {
  return await magic.user.getMetadata();
};

export const isLoggedIn = async () => {
  return await magic.user.isLoggedIn();
};
