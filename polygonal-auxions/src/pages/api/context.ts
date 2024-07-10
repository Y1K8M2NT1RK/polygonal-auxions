import { type YogaInitialContext } from "graphql-yoga";
import { Session } from "next-auth";

export interface Context extends YogaInitialContext {
    auth: Session;
}