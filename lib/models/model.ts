import { model, models } from "mongoose";
import { adminSchema } from "./admin.schema";
import { attorneySchema } from "./attorney.schema";
import { postSchema } from "./post.schema";
import { tokenSchema } from "./token.schema";

const Admin = models.Admin || model("Admin", adminSchema);
const Attorney = models.Attorney || model("Attorney", attorneySchema);
const Post = models.Post || model("Post", postSchema);
const Token = models.Token || model("Token", tokenSchema);

export { Admin, Attorney, Post, Token };
