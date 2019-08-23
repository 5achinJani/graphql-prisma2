# Migration `20190820212212-init`

This migration has been generated by Sachin Jani at 8/20/2019, 9:22:12 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "lift"."Post"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"published" BOOLEAN NOT NULL DEFAULT false ,"title" TEXT NOT NULL DEFAULT '' ,"content" TEXT   ,"author" TEXT   REFERENCES "User"(id) ON DELETE SET NULL,PRIMARY KEY ("id"))
;

CREATE TABLE "lift"."User"("id" TEXT NOT NULL  ,"email" TEXT NOT NULL DEFAULT '' ,"password" TEXT NOT NULL DEFAULT '' ,"name" TEXT   ,PRIMARY KEY ("id"))
;

CREATE UNIQUE INDEX "lift"."Post.id._UNIQUE" ON "Post"("id")

CREATE UNIQUE INDEX "lift"."User.id._UNIQUE" ON "User"("id")

CREATE UNIQUE INDEX "lift"."User.email._UNIQUE" ON "User"("email")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190820212212-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,31 @@
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+  default  = true
+}
+
+generator photon {
+  provider = "photonjs"
+}
+
+generator nexus_prisma {
+  provider = "nexus-prisma"
+}
+
+model Post {
+  id        String   @default(cuid()) @id @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  published Boolean
+  title     String
+  content   String?
+  author    User?
+}
+
+model User {
+  id       String  @default(cuid()) @id @unique
+  email    String  @unique
+  password String
+  name     String?
+  posts    Post[]
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190820212212-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190820212212-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```