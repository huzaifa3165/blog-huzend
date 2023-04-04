interface Subscription {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: string;
}
interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserState {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  subscriptions: Subscription[];
  savedPosts: Post[];
}
export const initialState: {
  user: null | UserState;
  login: (userData: UserState) => void;
  logout: () => void;
} = { user: null, login: () => {}, logout: () => {} };

const userReducer = (
  state: { user: UserState | null } = initialState,
  action: { type: string; payload: UserState | null }
) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: payload };
    default:
      throw new Error(`No case for type ${type} found in userReducer.`);
  }
};

export default userReducer;
