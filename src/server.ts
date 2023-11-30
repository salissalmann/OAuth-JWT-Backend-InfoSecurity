import { UserRoute } from "@modules/user/users.route";
import "reflect-metadata";
import { App } from "./app";
import { AuthRoute } from "./modules/auth/auth.route";
//import { DisciplineRoute } from "./modules/discipline/discipline.route";
import { RoleRoute } from "./modules/roles/roles.route";

const app = new App([
  new UserRoute(),
  //new DisciplineRoute(),
  new AuthRoute(),
  new RoleRoute(),
]);

app.listen();
