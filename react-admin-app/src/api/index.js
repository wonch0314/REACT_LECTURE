import { user } from './user';
import { codes } from './codes';

export const useApi = () => {
  return { api: { user, codes } };
};
