import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import typeDefs from "./gqlSchemas.js";
import resolvers from "./gqlResolvers.js";
import jwt from "jsonwebtoken";

// connect compass server
mongoose.connect("mongodb://127.0.0.1:27017/GraphQl").then(() => {
  console.log("Mongoose server connected");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization || "";
    if (authorization) {
      const { _id } = jwt.verify(authorization, process.env.SECRET_KEY);
      return { _id };
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});
server.listen(process.env.PORT, () => {
  console.log("server is listning :" + process.env.PORT);
});
