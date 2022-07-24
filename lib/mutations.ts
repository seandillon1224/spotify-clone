import fetcher from "./fetcher";

export type Mode = "signin" | "signup";
export const auth = (mode: Mode, body: { email: string; password: string }) => {
  return fetcher(mode, body);
};
