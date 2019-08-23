import { objectType } from "@prisma/nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.posts({ pagination: false });
    t.string("uppercaseName", {
      resolve: (parent, args, ctx) => parent.name.toUpperCase()
    });
  }
});
