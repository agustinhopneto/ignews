import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';
import { FaunaIndexes } from '../_lib/contants';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index(FaunaIndexes.USER_BY_EMAIL),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } },
            ),
            q.Get(
              q.Match(
                q.Index(FaunaIndexes.USER_BY_EMAIL),
                q.Casefold(user.email)
              )
            )
          )
        );

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {      
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index(FaunaIndexes.SUBSCRIPTION_BY_USER_REF),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index(FaunaIndexes.USER_BY_EMAIL),
                      q.Casefold(session.user.email),
                    ),
                  ),
                ),
              ),
              q.Match(
                q.Index(FaunaIndexes.SUBSCRIPTION_BY_STATUS),
                'active'
              ),
            ]),
          ),
        );
        
        return {
          ...session,
          activeSubscription: userActiveSubscription,
        }
      } catch (error) {        
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },
  }
})