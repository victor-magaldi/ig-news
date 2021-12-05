import { PrismicLink } from "apollo-link-prismic";
import { ApolloClient, InMemoryCache } from '@apollo/client';


export const newclient = new ApolloClient({
  link: PrismicLink({
    uri: "https://ignewsmagaldi.cdn.prismic.io/graphql",
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  }),
  cache: new InMemoryCache(),
});