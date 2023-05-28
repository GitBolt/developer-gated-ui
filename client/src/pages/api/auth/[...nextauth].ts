import NextAuth, { SessionStrategy } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import * as jwt from 'jsonwebtoken';
export const authOptions = {
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.accessToken = token;
        session.user.username = token.username;
      }
      return session;
    },
    encode: async ({ secret, token, maxAge }: any) => {
      const encodedToken = jwt.sign(token, secret, { algorithm: 'HS512' });

      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }: any) => {
      const verify = jwt.verify(token, secret);

      return verify;
    },
    jwt: async ({ user, token }: any) => {
      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: { scope: 'read:user' },
      },
      profile: (profile, tokens) => {
        const username = profile.login;
        console.log(username);

        return {
          id: profile.id.toString(),
          name: profile.name,
          username: username || 'hey',
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
