import NextAuth, { SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.access_token = token.access_token
      }
      return session;
    },
    jwt: async ({ user, token, account }: any) => {
      if (user) {
        token.uid = user.id;
        token.access_token = account.access_token
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
    jwt: true,
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
