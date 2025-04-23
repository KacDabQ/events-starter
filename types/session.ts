export default interface SessionI {
  user: {
    name: string;
    email: string;
    image: undefined;
  } | null;
}
