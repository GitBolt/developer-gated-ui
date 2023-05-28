import NextAuth, { SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.username = token.username;
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user" },
      },
      profile: (profile, tokens) => {
        const username = profile.login;
        console.log(username);
        return {
          id: profile.id.toString(),
          name: profile.name,
          username: username || "hey",
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
