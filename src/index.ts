import { config } from "dotenv";
config();
import { nexusPrismaPlugin } from "@generated/nexus-prisma";
import Photon from "@generated/photon";
import { makeSchema } from "@prisma/nexus";
import { GraphQLServer } from "graphql-yoga";
import { join } from "path";
import { path as appRootPath } from "app-root-path";
import { permissions } from "./permissions";
import * as allTypes from "./resolvers";
import { Context } from "./types";
import { getUserId } from "./utils";

const photon = new Photon({
  debug: true
});

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon
});

const schema = makeSchema({
  types: [allTypes, nexusPrisma],
  outputs: {
    typegen: join(appRootPath, "generated/nexus-typegen.ts"),
    schema: join(appRootPath, "src/schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@generated/photon",
        alias: "photon"
      },
      {
        source: join(appRootPath, "src/types.ts"),
        alias: "ctx"
      }
    ],
    contextType: "ctx.Context"
  }
});

const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: (request: Context): Context => {
    return {
      ...request,
      photon,
      userId: getUserId(request)
    };
  }
});

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`));
