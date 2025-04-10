import { type YogaInitialContext } from "graphql-yoga";
import { User } from "@/generated/generated-graphql";

export interface Context extends YogaInitialContext {
    auth: User;
}