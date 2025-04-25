
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AuthPayload
 * 
 */
export type AuthPayload = $Result.DefaultSelection<Prisma.$AuthPayloadPayload>
/**
 * Model Follow
 * 
 */
export type Follow = $Result.DefaultSelection<Prisma.$FollowPayload>
/**
 * Model Artwork
 * 
 */
export type Artwork = $Result.DefaultSelection<Prisma.$ArtworkPayload>
/**
 * Model ArtworkFile
 * 
 */
export type ArtworkFile = $Result.DefaultSelection<Prisma.$ArtworkFilePayload>
/**
 * Model ArtworkGizmo
 * 
 */
export type ArtworkGizmo = $Result.DefaultSelection<Prisma.$ArtworkGizmoPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model ArtworkRanks
 * 
 */
export type ArtworkRanks = $Result.DefaultSelection<Prisma.$ArtworkRanksPayload>
/**
 * Model Ranks
 * 
 */
export type Ranks = $Result.DefaultSelection<Prisma.$RanksPayload>
/**
 * Model RankTypes
 * 
 */
export type RankTypes = $Result.DefaultSelection<Prisma.$RankTypesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authPayload`: Exposes CRUD operations for the **AuthPayload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthPayloads
    * const authPayloads = await prisma.authPayload.findMany()
    * ```
    */
  get authPayload(): Prisma.AuthPayloadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follow.findMany()
    * ```
    */
  get follow(): Prisma.FollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artwork`: Exposes CRUD operations for the **Artwork** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artworks
    * const artworks = await prisma.artwork.findMany()
    * ```
    */
  get artwork(): Prisma.ArtworkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artworkFile`: Exposes CRUD operations for the **ArtworkFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArtworkFiles
    * const artworkFiles = await prisma.artworkFile.findMany()
    * ```
    */
  get artworkFile(): Prisma.ArtworkFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artworkGizmo`: Exposes CRUD operations for the **ArtworkGizmo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArtworkGizmos
    * const artworkGizmos = await prisma.artworkGizmo.findMany()
    * ```
    */
  get artworkGizmo(): Prisma.ArtworkGizmoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artworkRanks`: Exposes CRUD operations for the **ArtworkRanks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArtworkRanks
    * const artworkRanks = await prisma.artworkRanks.findMany()
    * ```
    */
  get artworkRanks(): Prisma.ArtworkRanksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ranks`: Exposes CRUD operations for the **Ranks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ranks
    * const ranks = await prisma.ranks.findMany()
    * ```
    */
  get ranks(): Prisma.RanksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rankTypes`: Exposes CRUD operations for the **RankTypes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RankTypes
    * const rankTypes = await prisma.rankTypes.findMany()
    * ```
    */
  get rankTypes(): Prisma.RankTypesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AuthPayload: 'AuthPayload',
    Follow: 'Follow',
    Artwork: 'Artwork',
    ArtworkFile: 'ArtworkFile',
    ArtworkGizmo: 'ArtworkGizmo',
    Comment: 'Comment',
    ArtworkRanks: 'ArtworkRanks',
    Ranks: 'Ranks',
    RankTypes: 'RankTypes'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "authPayload" | "follow" | "artwork" | "artworkFile" | "artworkGizmo" | "comment" | "artworkRanks" | "ranks" | "rankTypes"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AuthPayload: {
        payload: Prisma.$AuthPayloadPayload<ExtArgs>
        fields: Prisma.AuthPayloadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthPayloadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthPayloadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>
          }
          findFirst: {
            args: Prisma.AuthPayloadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthPayloadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>
          }
          findMany: {
            args: Prisma.AuthPayloadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>[]
          }
          create: {
            args: Prisma.AuthPayloadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>
          }
          createMany: {
            args: Prisma.AuthPayloadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthPayloadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>[]
          }
          delete: {
            args: Prisma.AuthPayloadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>
          }
          update: {
            args: Prisma.AuthPayloadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>
          }
          deleteMany: {
            args: Prisma.AuthPayloadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthPayloadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthPayloadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>[]
          }
          upsert: {
            args: Prisma.AuthPayloadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayloadPayload>
          }
          aggregate: {
            args: Prisma.AuthPayloadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthPayload>
          }
          groupBy: {
            args: Prisma.AuthPayloadGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthPayloadGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthPayloadCountArgs<ExtArgs>
            result: $Utils.Optional<AuthPayloadCountAggregateOutputType> | number
          }
        }
      }
      Follow: {
        payload: Prisma.$FollowPayload<ExtArgs>
        fields: Prisma.FollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findFirst: {
            args: Prisma.FollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findMany: {
            args: Prisma.FollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          create: {
            args: Prisma.FollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          createMany: {
            args: Prisma.FollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          delete: {
            args: Prisma.FollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          update: {
            args: Prisma.FollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          deleteMany: {
            args: Prisma.FollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          upsert: {
            args: Prisma.FollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          aggregate: {
            args: Prisma.FollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollow>
          }
          groupBy: {
            args: Prisma.FollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowCountArgs<ExtArgs>
            result: $Utils.Optional<FollowCountAggregateOutputType> | number
          }
        }
      }
      Artwork: {
        payload: Prisma.$ArtworkPayload<ExtArgs>
        fields: Prisma.ArtworkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtworkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtworkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>
          }
          findFirst: {
            args: Prisma.ArtworkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtworkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>
          }
          findMany: {
            args: Prisma.ArtworkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>[]
          }
          create: {
            args: Prisma.ArtworkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>
          }
          createMany: {
            args: Prisma.ArtworkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtworkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>[]
          }
          delete: {
            args: Prisma.ArtworkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>
          }
          update: {
            args: Prisma.ArtworkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>
          }
          deleteMany: {
            args: Prisma.ArtworkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtworkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtworkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>[]
          }
          upsert: {
            args: Prisma.ArtworkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkPayload>
          }
          aggregate: {
            args: Prisma.ArtworkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtwork>
          }
          groupBy: {
            args: Prisma.ArtworkGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtworkGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtworkCountArgs<ExtArgs>
            result: $Utils.Optional<ArtworkCountAggregateOutputType> | number
          }
        }
      }
      ArtworkFile: {
        payload: Prisma.$ArtworkFilePayload<ExtArgs>
        fields: Prisma.ArtworkFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtworkFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtworkFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>
          }
          findFirst: {
            args: Prisma.ArtworkFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtworkFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>
          }
          findMany: {
            args: Prisma.ArtworkFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>[]
          }
          create: {
            args: Prisma.ArtworkFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>
          }
          createMany: {
            args: Prisma.ArtworkFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtworkFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>[]
          }
          delete: {
            args: Prisma.ArtworkFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>
          }
          update: {
            args: Prisma.ArtworkFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>
          }
          deleteMany: {
            args: Prisma.ArtworkFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtworkFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtworkFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>[]
          }
          upsert: {
            args: Prisma.ArtworkFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkFilePayload>
          }
          aggregate: {
            args: Prisma.ArtworkFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtworkFile>
          }
          groupBy: {
            args: Prisma.ArtworkFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtworkFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtworkFileCountArgs<ExtArgs>
            result: $Utils.Optional<ArtworkFileCountAggregateOutputType> | number
          }
        }
      }
      ArtworkGizmo: {
        payload: Prisma.$ArtworkGizmoPayload<ExtArgs>
        fields: Prisma.ArtworkGizmoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtworkGizmoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtworkGizmoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>
          }
          findFirst: {
            args: Prisma.ArtworkGizmoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtworkGizmoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>
          }
          findMany: {
            args: Prisma.ArtworkGizmoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>[]
          }
          create: {
            args: Prisma.ArtworkGizmoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>
          }
          createMany: {
            args: Prisma.ArtworkGizmoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtworkGizmoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>[]
          }
          delete: {
            args: Prisma.ArtworkGizmoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>
          }
          update: {
            args: Prisma.ArtworkGizmoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>
          }
          deleteMany: {
            args: Prisma.ArtworkGizmoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtworkGizmoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtworkGizmoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>[]
          }
          upsert: {
            args: Prisma.ArtworkGizmoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkGizmoPayload>
          }
          aggregate: {
            args: Prisma.ArtworkGizmoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtworkGizmo>
          }
          groupBy: {
            args: Prisma.ArtworkGizmoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtworkGizmoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtworkGizmoCountArgs<ExtArgs>
            result: $Utils.Optional<ArtworkGizmoCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      ArtworkRanks: {
        payload: Prisma.$ArtworkRanksPayload<ExtArgs>
        fields: Prisma.ArtworkRanksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtworkRanksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtworkRanksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>
          }
          findFirst: {
            args: Prisma.ArtworkRanksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtworkRanksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>
          }
          findMany: {
            args: Prisma.ArtworkRanksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>[]
          }
          create: {
            args: Prisma.ArtworkRanksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>
          }
          createMany: {
            args: Prisma.ArtworkRanksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtworkRanksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>[]
          }
          delete: {
            args: Prisma.ArtworkRanksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>
          }
          update: {
            args: Prisma.ArtworkRanksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>
          }
          deleteMany: {
            args: Prisma.ArtworkRanksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtworkRanksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtworkRanksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>[]
          }
          upsert: {
            args: Prisma.ArtworkRanksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtworkRanksPayload>
          }
          aggregate: {
            args: Prisma.ArtworkRanksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtworkRanks>
          }
          groupBy: {
            args: Prisma.ArtworkRanksGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtworkRanksGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtworkRanksCountArgs<ExtArgs>
            result: $Utils.Optional<ArtworkRanksCountAggregateOutputType> | number
          }
        }
      }
      Ranks: {
        payload: Prisma.$RanksPayload<ExtArgs>
        fields: Prisma.RanksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RanksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RanksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>
          }
          findFirst: {
            args: Prisma.RanksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RanksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>
          }
          findMany: {
            args: Prisma.RanksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>[]
          }
          create: {
            args: Prisma.RanksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>
          }
          createMany: {
            args: Prisma.RanksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RanksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>[]
          }
          delete: {
            args: Prisma.RanksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>
          }
          update: {
            args: Prisma.RanksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>
          }
          deleteMany: {
            args: Prisma.RanksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RanksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RanksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>[]
          }
          upsert: {
            args: Prisma.RanksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RanksPayload>
          }
          aggregate: {
            args: Prisma.RanksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRanks>
          }
          groupBy: {
            args: Prisma.RanksGroupByArgs<ExtArgs>
            result: $Utils.Optional<RanksGroupByOutputType>[]
          }
          count: {
            args: Prisma.RanksCountArgs<ExtArgs>
            result: $Utils.Optional<RanksCountAggregateOutputType> | number
          }
        }
      }
      RankTypes: {
        payload: Prisma.$RankTypesPayload<ExtArgs>
        fields: Prisma.RankTypesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RankTypesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RankTypesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>
          }
          findFirst: {
            args: Prisma.RankTypesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RankTypesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>
          }
          findMany: {
            args: Prisma.RankTypesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>[]
          }
          create: {
            args: Prisma.RankTypesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>
          }
          createMany: {
            args: Prisma.RankTypesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RankTypesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>[]
          }
          delete: {
            args: Prisma.RankTypesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>
          }
          update: {
            args: Prisma.RankTypesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>
          }
          deleteMany: {
            args: Prisma.RankTypesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RankTypesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RankTypesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>[]
          }
          upsert: {
            args: Prisma.RankTypesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankTypesPayload>
          }
          aggregate: {
            args: Prisma.RankTypesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRankTypes>
          }
          groupBy: {
            args: Prisma.RankTypesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RankTypesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RankTypesCountArgs<ExtArgs>
            result: $Utils.Optional<RankTypesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    authPayload?: AuthPayloadOmit
    follow?: FollowOmit
    artwork?: ArtworkOmit
    artworkFile?: ArtworkFileOmit
    artworkGizmo?: ArtworkGizmoOmit
    comment?: CommentOmit
    artworkRanks?: ArtworkRanksOmit
    ranks?: RanksOmit
    rankTypes?: RankTypesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    artworks: number
    artwork_ranks: number
    comments: number
    followed_by: number
    following: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artworks?: boolean | UserCountOutputTypeCountArtworksArgs
    artwork_ranks?: boolean | UserCountOutputTypeCountArtwork_ranksArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    followed_by?: boolean | UserCountOutputTypeCountFollowed_byArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArtworksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArtwork_ranksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkRanksWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowed_byArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }


  /**
   * Count Type ArtworkCountOutputType
   */

  export type ArtworkCountOutputType = {
    artwork_file: number
    artwork_ranks: number
    comments: number
  }

  export type ArtworkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork_file?: boolean | ArtworkCountOutputTypeCountArtwork_fileArgs
    artwork_ranks?: boolean | ArtworkCountOutputTypeCountArtwork_ranksArgs
    comments?: boolean | ArtworkCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * ArtworkCountOutputType without action
   */
  export type ArtworkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkCountOutputType
     */
    select?: ArtworkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArtworkCountOutputType without action
   */
  export type ArtworkCountOutputTypeCountArtwork_fileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkFileWhereInput
  }

  /**
   * ArtworkCountOutputType without action
   */
  export type ArtworkCountOutputTypeCountArtwork_ranksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkRanksWhereInput
  }

  /**
   * ArtworkCountOutputType without action
   */
  export type ArtworkCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type ArtworkFileCountOutputType
   */

  export type ArtworkFileCountOutputType = {
    artwork_gizmo: number
  }

  export type ArtworkFileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork_gizmo?: boolean | ArtworkFileCountOutputTypeCountArtwork_gizmoArgs
  }

  // Custom InputTypes
  /**
   * ArtworkFileCountOutputType without action
   */
  export type ArtworkFileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFileCountOutputType
     */
    select?: ArtworkFileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArtworkFileCountOutputType without action
   */
  export type ArtworkFileCountOutputTypeCountArtwork_gizmoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkGizmoWhereInput
  }


  /**
   * Count Type RanksCountOutputType
   */

  export type RanksCountOutputType = {
    artwork_ranks: number
  }

  export type RanksCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork_ranks?: boolean | RanksCountOutputTypeCountArtwork_ranksArgs
  }

  // Custom InputTypes
  /**
   * RanksCountOutputType without action
   */
  export type RanksCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RanksCountOutputType
     */
    select?: RanksCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RanksCountOutputType without action
   */
  export type RanksCountOutputTypeCountArtwork_ranksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkRanksWhereInput
  }


  /**
   * Count Type RankTypesCountOutputType
   */

  export type RankTypesCountOutputType = {
    ranks: number
  }

  export type RankTypesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ranks?: boolean | RankTypesCountOutputTypeCountRanksArgs
  }

  // Custom InputTypes
  /**
   * RankTypesCountOutputType without action
   */
  export type RankTypesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypesCountOutputType
     */
    select?: RankTypesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RankTypesCountOutputType without action
   */
  export type RankTypesCountOutputTypeCountRanksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RanksWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    slug_id: string | null
    name: string | null
    name_kana: string | null
    handle_name: string | null
    password: string | null
    birthday: Date | null
    introduction: string | null
    phone_number: string | null
    email: string | null
    address: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    slug_id: string | null
    name: string | null
    name_kana: string | null
    handle_name: string | null
    password: string | null
    birthday: Date | null
    introduction: string | null
    phone_number: string | null
    email: string | null
    address: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    slug_id: number
    name: number
    name_kana: number
    handle_name: number
    password: number
    birthday: number
    introduction: number
    phone_number: number
    email: number
    address: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    slug_id?: true
    name?: true
    name_kana?: true
    handle_name?: true
    password?: true
    birthday?: true
    introduction?: true
    phone_number?: true
    email?: true
    address?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    slug_id?: true
    name?: true
    name_kana?: true
    handle_name?: true
    password?: true
    birthday?: true
    introduction?: true
    phone_number?: true
    email?: true
    address?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    slug_id?: true
    name?: true
    name_kana?: true
    handle_name?: true
    password?: true
    birthday?: true
    introduction?: true
    phone_number?: true
    email?: true
    address?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    slug_id: string
    name: string
    name_kana: string | null
    handle_name: string
    password: string
    birthday: Date
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    name?: boolean
    name_kana?: boolean
    handle_name?: boolean
    password?: boolean
    birthday?: boolean
    introduction?: boolean
    phone_number?: boolean
    email?: boolean
    address?: boolean
    created_at?: boolean
    updated_at?: boolean
    auth_payload?: boolean | User$auth_payloadArgs<ExtArgs>
    artworks?: boolean | User$artworksArgs<ExtArgs>
    artwork_ranks?: boolean | User$artwork_ranksArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    followed_by?: boolean | User$followed_byArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    name?: boolean
    name_kana?: boolean
    handle_name?: boolean
    password?: boolean
    birthday?: boolean
    introduction?: boolean
    phone_number?: boolean
    email?: boolean
    address?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    name?: boolean
    name_kana?: boolean
    handle_name?: boolean
    password?: boolean
    birthday?: boolean
    introduction?: boolean
    phone_number?: boolean
    email?: boolean
    address?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    slug_id?: boolean
    name?: boolean
    name_kana?: boolean
    handle_name?: boolean
    password?: boolean
    birthday?: boolean
    introduction?: boolean
    phone_number?: boolean
    email?: boolean
    address?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug_id" | "name" | "name_kana" | "handle_name" | "password" | "birthday" | "introduction" | "phone_number" | "email" | "address" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth_payload?: boolean | User$auth_payloadArgs<ExtArgs>
    artworks?: boolean | User$artworksArgs<ExtArgs>
    artwork_ranks?: boolean | User$artwork_ranksArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    followed_by?: boolean | User$followed_byArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      auth_payload: Prisma.$AuthPayloadPayload<ExtArgs> | null
      artworks: Prisma.$ArtworkPayload<ExtArgs>[]
      artwork_ranks: Prisma.$ArtworkRanksPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      followed_by: Prisma.$FollowPayload<ExtArgs>[]
      following: Prisma.$FollowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug_id: string
      name: string
      name_kana: string | null
      handle_name: string
      password: string
      birthday: Date
      introduction: string
      phone_number: string
      email: string
      address: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auth_payload<T extends User$auth_payloadArgs<ExtArgs> = {}>(args?: Subset<T, User$auth_payloadArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    artworks<T extends User$artworksArgs<ExtArgs> = {}>(args?: Subset<T, User$artworksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    artwork_ranks<T extends User$artwork_ranksArgs<ExtArgs> = {}>(args?: Subset<T, User$artwork_ranksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followed_by<T extends User$followed_byArgs<ExtArgs> = {}>(args?: Subset<T, User$followed_byArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly slug_id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly name_kana: FieldRef<"User", 'String'>
    readonly handle_name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly birthday: FieldRef<"User", 'DateTime'>
    readonly introduction: FieldRef<"User", 'String'>
    readonly phone_number: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.auth_payload
   */
  export type User$auth_payloadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    where?: AuthPayloadWhereInput
  }

  /**
   * User.artworks
   */
  export type User$artworksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    where?: ArtworkWhereInput
    orderBy?: ArtworkOrderByWithRelationInput | ArtworkOrderByWithRelationInput[]
    cursor?: ArtworkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtworkScalarFieldEnum | ArtworkScalarFieldEnum[]
  }

  /**
   * User.artwork_ranks
   */
  export type User$artwork_ranksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    where?: ArtworkRanksWhereInput
    orderBy?: ArtworkRanksOrderByWithRelationInput | ArtworkRanksOrderByWithRelationInput[]
    cursor?: ArtworkRanksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtworkRanksScalarFieldEnum | ArtworkRanksScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.followed_by
   */
  export type User$followed_byArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AuthPayload
   */

  export type AggregateAuthPayload = {
    _count: AuthPayloadCountAggregateOutputType | null
    _avg: AuthPayloadAvgAggregateOutputType | null
    _sum: AuthPayloadSumAggregateOutputType | null
    _min: AuthPayloadMinAggregateOutputType | null
    _max: AuthPayloadMaxAggregateOutputType | null
  }

  export type AuthPayloadAvgAggregateOutputType = {
    user_id: number | null
  }

  export type AuthPayloadSumAggregateOutputType = {
    user_id: number | null
  }

  export type AuthPayloadMinAggregateOutputType = {
    id: string | null
    access_token: string | null
    refresh_token: string | null
    user_id: number | null
    created_at: Date | null
    expires_at: Date | null
  }

  export type AuthPayloadMaxAggregateOutputType = {
    id: string | null
    access_token: string | null
    refresh_token: string | null
    user_id: number | null
    created_at: Date | null
    expires_at: Date | null
  }

  export type AuthPayloadCountAggregateOutputType = {
    id: number
    access_token: number
    refresh_token: number
    user_id: number
    created_at: number
    expires_at: number
    _all: number
  }


  export type AuthPayloadAvgAggregateInputType = {
    user_id?: true
  }

  export type AuthPayloadSumAggregateInputType = {
    user_id?: true
  }

  export type AuthPayloadMinAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    user_id?: true
    created_at?: true
    expires_at?: true
  }

  export type AuthPayloadMaxAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    user_id?: true
    created_at?: true
    expires_at?: true
  }

  export type AuthPayloadCountAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    user_id?: true
    created_at?: true
    expires_at?: true
    _all?: true
  }

  export type AuthPayloadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthPayload to aggregate.
     */
    where?: AuthPayloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthPayloads to fetch.
     */
    orderBy?: AuthPayloadOrderByWithRelationInput | AuthPayloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthPayloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthPayloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthPayloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthPayloads
    **/
    _count?: true | AuthPayloadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthPayloadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthPayloadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthPayloadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthPayloadMaxAggregateInputType
  }

  export type GetAuthPayloadAggregateType<T extends AuthPayloadAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthPayload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthPayload[P]>
      : GetScalarType<T[P], AggregateAuthPayload[P]>
  }




  export type AuthPayloadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthPayloadWhereInput
    orderBy?: AuthPayloadOrderByWithAggregationInput | AuthPayloadOrderByWithAggregationInput[]
    by: AuthPayloadScalarFieldEnum[] | AuthPayloadScalarFieldEnum
    having?: AuthPayloadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthPayloadCountAggregateInputType | true
    _avg?: AuthPayloadAvgAggregateInputType
    _sum?: AuthPayloadSumAggregateInputType
    _min?: AuthPayloadMinAggregateInputType
    _max?: AuthPayloadMaxAggregateInputType
  }

  export type AuthPayloadGroupByOutputType = {
    id: string
    access_token: string
    refresh_token: string
    user_id: number
    created_at: Date
    expires_at: Date
    _count: AuthPayloadCountAggregateOutputType | null
    _avg: AuthPayloadAvgAggregateOutputType | null
    _sum: AuthPayloadSumAggregateOutputType | null
    _min: AuthPayloadMinAggregateOutputType | null
    _max: AuthPayloadMaxAggregateOutputType | null
  }

  type GetAuthPayloadGroupByPayload<T extends AuthPayloadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthPayloadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthPayloadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthPayloadGroupByOutputType[P]>
            : GetScalarType<T[P], AuthPayloadGroupByOutputType[P]>
        }
      >
    >


  export type AuthPayloadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    user_id?: boolean
    created_at?: boolean
    expires_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authPayload"]>

  export type AuthPayloadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    user_id?: boolean
    created_at?: boolean
    expires_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authPayload"]>

  export type AuthPayloadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    user_id?: boolean
    created_at?: boolean
    expires_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authPayload"]>

  export type AuthPayloadSelectScalar = {
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    user_id?: boolean
    created_at?: boolean
    expires_at?: boolean
  }

  export type AuthPayloadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "access_token" | "refresh_token" | "user_id" | "created_at" | "expires_at", ExtArgs["result"]["authPayload"]>
  export type AuthPayloadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthPayloadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthPayloadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthPayloadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthPayload"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      access_token: string
      refresh_token: string
      user_id: number
      created_at: Date
      expires_at: Date
    }, ExtArgs["result"]["authPayload"]>
    composites: {}
  }

  type AuthPayloadGetPayload<S extends boolean | null | undefined | AuthPayloadDefaultArgs> = $Result.GetResult<Prisma.$AuthPayloadPayload, S>

  type AuthPayloadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthPayloadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthPayloadCountAggregateInputType | true
    }

  export interface AuthPayloadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthPayload'], meta: { name: 'AuthPayload' } }
    /**
     * Find zero or one AuthPayload that matches the filter.
     * @param {AuthPayloadFindUniqueArgs} args - Arguments to find a AuthPayload
     * @example
     * // Get one AuthPayload
     * const authPayload = await prisma.authPayload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthPayloadFindUniqueArgs>(args: SelectSubset<T, AuthPayloadFindUniqueArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthPayload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthPayloadFindUniqueOrThrowArgs} args - Arguments to find a AuthPayload
     * @example
     * // Get one AuthPayload
     * const authPayload = await prisma.authPayload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthPayloadFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthPayloadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthPayload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthPayloadFindFirstArgs} args - Arguments to find a AuthPayload
     * @example
     * // Get one AuthPayload
     * const authPayload = await prisma.authPayload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthPayloadFindFirstArgs>(args?: SelectSubset<T, AuthPayloadFindFirstArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthPayload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthPayloadFindFirstOrThrowArgs} args - Arguments to find a AuthPayload
     * @example
     * // Get one AuthPayload
     * const authPayload = await prisma.authPayload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthPayloadFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthPayloadFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthPayloads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthPayloadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthPayloads
     * const authPayloads = await prisma.authPayload.findMany()
     * 
     * // Get first 10 AuthPayloads
     * const authPayloads = await prisma.authPayload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authPayloadWithIdOnly = await prisma.authPayload.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthPayloadFindManyArgs>(args?: SelectSubset<T, AuthPayloadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthPayload.
     * @param {AuthPayloadCreateArgs} args - Arguments to create a AuthPayload.
     * @example
     * // Create one AuthPayload
     * const AuthPayload = await prisma.authPayload.create({
     *   data: {
     *     // ... data to create a AuthPayload
     *   }
     * })
     * 
     */
    create<T extends AuthPayloadCreateArgs>(args: SelectSubset<T, AuthPayloadCreateArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthPayloads.
     * @param {AuthPayloadCreateManyArgs} args - Arguments to create many AuthPayloads.
     * @example
     * // Create many AuthPayloads
     * const authPayload = await prisma.authPayload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthPayloadCreateManyArgs>(args?: SelectSubset<T, AuthPayloadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthPayloads and returns the data saved in the database.
     * @param {AuthPayloadCreateManyAndReturnArgs} args - Arguments to create many AuthPayloads.
     * @example
     * // Create many AuthPayloads
     * const authPayload = await prisma.authPayload.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthPayloads and only return the `id`
     * const authPayloadWithIdOnly = await prisma.authPayload.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthPayloadCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthPayloadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthPayload.
     * @param {AuthPayloadDeleteArgs} args - Arguments to delete one AuthPayload.
     * @example
     * // Delete one AuthPayload
     * const AuthPayload = await prisma.authPayload.delete({
     *   where: {
     *     // ... filter to delete one AuthPayload
     *   }
     * })
     * 
     */
    delete<T extends AuthPayloadDeleteArgs>(args: SelectSubset<T, AuthPayloadDeleteArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthPayload.
     * @param {AuthPayloadUpdateArgs} args - Arguments to update one AuthPayload.
     * @example
     * // Update one AuthPayload
     * const authPayload = await prisma.authPayload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthPayloadUpdateArgs>(args: SelectSubset<T, AuthPayloadUpdateArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthPayloads.
     * @param {AuthPayloadDeleteManyArgs} args - Arguments to filter AuthPayloads to delete.
     * @example
     * // Delete a few AuthPayloads
     * const { count } = await prisma.authPayload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthPayloadDeleteManyArgs>(args?: SelectSubset<T, AuthPayloadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthPayloads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthPayloadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthPayloads
     * const authPayload = await prisma.authPayload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthPayloadUpdateManyArgs>(args: SelectSubset<T, AuthPayloadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthPayloads and returns the data updated in the database.
     * @param {AuthPayloadUpdateManyAndReturnArgs} args - Arguments to update many AuthPayloads.
     * @example
     * // Update many AuthPayloads
     * const authPayload = await prisma.authPayload.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthPayloads and only return the `id`
     * const authPayloadWithIdOnly = await prisma.authPayload.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthPayloadUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthPayloadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthPayload.
     * @param {AuthPayloadUpsertArgs} args - Arguments to update or create a AuthPayload.
     * @example
     * // Update or create a AuthPayload
     * const authPayload = await prisma.authPayload.upsert({
     *   create: {
     *     // ... data to create a AuthPayload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthPayload we want to update
     *   }
     * })
     */
    upsert<T extends AuthPayloadUpsertArgs>(args: SelectSubset<T, AuthPayloadUpsertArgs<ExtArgs>>): Prisma__AuthPayloadClient<$Result.GetResult<Prisma.$AuthPayloadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthPayloads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthPayloadCountArgs} args - Arguments to filter AuthPayloads to count.
     * @example
     * // Count the number of AuthPayloads
     * const count = await prisma.authPayload.count({
     *   where: {
     *     // ... the filter for the AuthPayloads we want to count
     *   }
     * })
    **/
    count<T extends AuthPayloadCountArgs>(
      args?: Subset<T, AuthPayloadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthPayloadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthPayload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthPayloadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthPayloadAggregateArgs>(args: Subset<T, AuthPayloadAggregateArgs>): Prisma.PrismaPromise<GetAuthPayloadAggregateType<T>>

    /**
     * Group by AuthPayload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthPayloadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthPayloadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthPayloadGroupByArgs['orderBy'] }
        : { orderBy?: AuthPayloadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthPayloadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthPayloadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthPayload model
   */
  readonly fields: AuthPayloadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthPayload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthPayloadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthPayload model
   */
  interface AuthPayloadFieldRefs {
    readonly id: FieldRef<"AuthPayload", 'String'>
    readonly access_token: FieldRef<"AuthPayload", 'String'>
    readonly refresh_token: FieldRef<"AuthPayload", 'String'>
    readonly user_id: FieldRef<"AuthPayload", 'Int'>
    readonly created_at: FieldRef<"AuthPayload", 'DateTime'>
    readonly expires_at: FieldRef<"AuthPayload", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthPayload findUnique
   */
  export type AuthPayloadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * Filter, which AuthPayload to fetch.
     */
    where: AuthPayloadWhereUniqueInput
  }

  /**
   * AuthPayload findUniqueOrThrow
   */
  export type AuthPayloadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * Filter, which AuthPayload to fetch.
     */
    where: AuthPayloadWhereUniqueInput
  }

  /**
   * AuthPayload findFirst
   */
  export type AuthPayloadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * Filter, which AuthPayload to fetch.
     */
    where?: AuthPayloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthPayloads to fetch.
     */
    orderBy?: AuthPayloadOrderByWithRelationInput | AuthPayloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthPayloads.
     */
    cursor?: AuthPayloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthPayloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthPayloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthPayloads.
     */
    distinct?: AuthPayloadScalarFieldEnum | AuthPayloadScalarFieldEnum[]
  }

  /**
   * AuthPayload findFirstOrThrow
   */
  export type AuthPayloadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * Filter, which AuthPayload to fetch.
     */
    where?: AuthPayloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthPayloads to fetch.
     */
    orderBy?: AuthPayloadOrderByWithRelationInput | AuthPayloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthPayloads.
     */
    cursor?: AuthPayloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthPayloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthPayloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthPayloads.
     */
    distinct?: AuthPayloadScalarFieldEnum | AuthPayloadScalarFieldEnum[]
  }

  /**
   * AuthPayload findMany
   */
  export type AuthPayloadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * Filter, which AuthPayloads to fetch.
     */
    where?: AuthPayloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthPayloads to fetch.
     */
    orderBy?: AuthPayloadOrderByWithRelationInput | AuthPayloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthPayloads.
     */
    cursor?: AuthPayloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthPayloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthPayloads.
     */
    skip?: number
    distinct?: AuthPayloadScalarFieldEnum | AuthPayloadScalarFieldEnum[]
  }

  /**
   * AuthPayload create
   */
  export type AuthPayloadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthPayload.
     */
    data: XOR<AuthPayloadCreateInput, AuthPayloadUncheckedCreateInput>
  }

  /**
   * AuthPayload createMany
   */
  export type AuthPayloadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthPayloads.
     */
    data: AuthPayloadCreateManyInput | AuthPayloadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthPayload createManyAndReturn
   */
  export type AuthPayloadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * The data used to create many AuthPayloads.
     */
    data: AuthPayloadCreateManyInput | AuthPayloadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthPayload update
   */
  export type AuthPayloadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthPayload.
     */
    data: XOR<AuthPayloadUpdateInput, AuthPayloadUncheckedUpdateInput>
    /**
     * Choose, which AuthPayload to update.
     */
    where: AuthPayloadWhereUniqueInput
  }

  /**
   * AuthPayload updateMany
   */
  export type AuthPayloadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthPayloads.
     */
    data: XOR<AuthPayloadUpdateManyMutationInput, AuthPayloadUncheckedUpdateManyInput>
    /**
     * Filter which AuthPayloads to update
     */
    where?: AuthPayloadWhereInput
    /**
     * Limit how many AuthPayloads to update.
     */
    limit?: number
  }

  /**
   * AuthPayload updateManyAndReturn
   */
  export type AuthPayloadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * The data used to update AuthPayloads.
     */
    data: XOR<AuthPayloadUpdateManyMutationInput, AuthPayloadUncheckedUpdateManyInput>
    /**
     * Filter which AuthPayloads to update
     */
    where?: AuthPayloadWhereInput
    /**
     * Limit how many AuthPayloads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthPayload upsert
   */
  export type AuthPayloadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthPayload to update in case it exists.
     */
    where: AuthPayloadWhereUniqueInput
    /**
     * In case the AuthPayload found by the `where` argument doesn't exist, create a new AuthPayload with this data.
     */
    create: XOR<AuthPayloadCreateInput, AuthPayloadUncheckedCreateInput>
    /**
     * In case the AuthPayload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthPayloadUpdateInput, AuthPayloadUncheckedUpdateInput>
  }

  /**
   * AuthPayload delete
   */
  export type AuthPayloadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
    /**
     * Filter which AuthPayload to delete.
     */
    where: AuthPayloadWhereUniqueInput
  }

  /**
   * AuthPayload deleteMany
   */
  export type AuthPayloadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthPayloads to delete
     */
    where?: AuthPayloadWhereInput
    /**
     * Limit how many AuthPayloads to delete.
     */
    limit?: number
  }

  /**
   * AuthPayload without action
   */
  export type AuthPayloadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthPayload
     */
    select?: AuthPayloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthPayload
     */
    omit?: AuthPayloadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthPayloadInclude<ExtArgs> | null
  }


  /**
   * Model Follow
   */

  export type AggregateFollow = {
    _count: FollowCountAggregateOutputType | null
    _avg: FollowAvgAggregateOutputType | null
    _sum: FollowSumAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  export type FollowAvgAggregateOutputType = {
    followed_by_id: number | null
    following_id: number | null
  }

  export type FollowSumAggregateOutputType = {
    followed_by_id: number | null
    following_id: number | null
  }

  export type FollowMinAggregateOutputType = {
    followed_by_id: number | null
    following_id: number | null
  }

  export type FollowMaxAggregateOutputType = {
    followed_by_id: number | null
    following_id: number | null
  }

  export type FollowCountAggregateOutputType = {
    followed_by_id: number
    following_id: number
    _all: number
  }


  export type FollowAvgAggregateInputType = {
    followed_by_id?: true
    following_id?: true
  }

  export type FollowSumAggregateInputType = {
    followed_by_id?: true
    following_id?: true
  }

  export type FollowMinAggregateInputType = {
    followed_by_id?: true
    following_id?: true
  }

  export type FollowMaxAggregateInputType = {
    followed_by_id?: true
    following_id?: true
  }

  export type FollowCountAggregateInputType = {
    followed_by_id?: true
    following_id?: true
    _all?: true
  }

  export type FollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follow to aggregate.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Follows
    **/
    _count?: true | FollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FollowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FollowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowMaxAggregateInputType
  }

  export type GetFollowAggregateType<T extends FollowAggregateArgs> = {
        [P in keyof T & keyof AggregateFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollow[P]>
      : GetScalarType<T[P], AggregateFollow[P]>
  }




  export type FollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithAggregationInput | FollowOrderByWithAggregationInput[]
    by: FollowScalarFieldEnum[] | FollowScalarFieldEnum
    having?: FollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowCountAggregateInputType | true
    _avg?: FollowAvgAggregateInputType
    _sum?: FollowSumAggregateInputType
    _min?: FollowMinAggregateInputType
    _max?: FollowMaxAggregateInputType
  }

  export type FollowGroupByOutputType = {
    followed_by_id: number
    following_id: number
    _count: FollowCountAggregateOutputType | null
    _avg: FollowAvgAggregateOutputType | null
    _sum: FollowSumAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  type GetFollowGroupByPayload<T extends FollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowGroupByOutputType[P]>
            : GetScalarType<T[P], FollowGroupByOutputType[P]>
        }
      >
    >


  export type FollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followed_by_id?: boolean
    following_id?: boolean
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followed_by_id?: boolean
    following_id?: boolean
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followed_by_id?: boolean
    following_id?: boolean
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectScalar = {
    followed_by_id?: boolean
    following_id?: boolean
  }

  export type FollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"followed_by_id" | "following_id", ExtArgs["result"]["follow"]>
  export type FollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Follow"
    objects: {
      followedBy: Prisma.$UserPayload<ExtArgs>
      following: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      followed_by_id: number
      following_id: number
    }, ExtArgs["result"]["follow"]>
    composites: {}
  }

  type FollowGetPayload<S extends boolean | null | undefined | FollowDefaultArgs> = $Result.GetResult<Prisma.$FollowPayload, S>

  type FollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowCountAggregateInputType | true
    }

  export interface FollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Follow'], meta: { name: 'Follow' } }
    /**
     * Find zero or one Follow that matches the filter.
     * @param {FollowFindUniqueArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowFindUniqueArgs>(args: SelectSubset<T, FollowFindUniqueArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Follow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowFindUniqueOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowFindFirstArgs>(args?: SelectSubset<T, FollowFindFirstArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Follows
     * const follows = await prisma.follow.findMany()
     * 
     * // Get first 10 Follows
     * const follows = await prisma.follow.findMany({ take: 10 })
     * 
     * // Only select the `followed_by_id`
     * const followWithFollowed_by_idOnly = await prisma.follow.findMany({ select: { followed_by_id: true } })
     * 
     */
    findMany<T extends FollowFindManyArgs>(args?: SelectSubset<T, FollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Follow.
     * @param {FollowCreateArgs} args - Arguments to create a Follow.
     * @example
     * // Create one Follow
     * const Follow = await prisma.follow.create({
     *   data: {
     *     // ... data to create a Follow
     *   }
     * })
     * 
     */
    create<T extends FollowCreateArgs>(args: SelectSubset<T, FollowCreateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Follows.
     * @param {FollowCreateManyArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowCreateManyArgs>(args?: SelectSubset<T, FollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Follows and returns the data saved in the database.
     * @param {FollowCreateManyAndReturnArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Follows and only return the `followed_by_id`
     * const followWithFollowed_by_idOnly = await prisma.follow.createManyAndReturn({
     *   select: { followed_by_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Follow.
     * @param {FollowDeleteArgs} args - Arguments to delete one Follow.
     * @example
     * // Delete one Follow
     * const Follow = await prisma.follow.delete({
     *   where: {
     *     // ... filter to delete one Follow
     *   }
     * })
     * 
     */
    delete<T extends FollowDeleteArgs>(args: SelectSubset<T, FollowDeleteArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Follow.
     * @param {FollowUpdateArgs} args - Arguments to update one Follow.
     * @example
     * // Update one Follow
     * const follow = await prisma.follow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowUpdateArgs>(args: SelectSubset<T, FollowUpdateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Follows.
     * @param {FollowDeleteManyArgs} args - Arguments to filter Follows to delete.
     * @example
     * // Delete a few Follows
     * const { count } = await prisma.follow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowDeleteManyArgs>(args?: SelectSubset<T, FollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowUpdateManyArgs>(args: SelectSubset<T, FollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows and returns the data updated in the database.
     * @param {FollowUpdateManyAndReturnArgs} args - Arguments to update many Follows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Follows and only return the `followed_by_id`
     * const followWithFollowed_by_idOnly = await prisma.follow.updateManyAndReturn({
     *   select: { followed_by_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Follow.
     * @param {FollowUpsertArgs} args - Arguments to update or create a Follow.
     * @example
     * // Update or create a Follow
     * const follow = await prisma.follow.upsert({
     *   create: {
     *     // ... data to create a Follow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Follow we want to update
     *   }
     * })
     */
    upsert<T extends FollowUpsertArgs>(args: SelectSubset<T, FollowUpsertArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowCountArgs} args - Arguments to filter Follows to count.
     * @example
     * // Count the number of Follows
     * const count = await prisma.follow.count({
     *   where: {
     *     // ... the filter for the Follows we want to count
     *   }
     * })
    **/
    count<T extends FollowCountArgs>(
      args?: Subset<T, FollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FollowAggregateArgs>(args: Subset<T, FollowAggregateArgs>): Prisma.PrismaPromise<GetFollowAggregateType<T>>

    /**
     * Group by Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowGroupByArgs['orderBy'] }
        : { orderBy?: FollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Follow model
   */
  readonly fields: FollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Follow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    followedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    following<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Follow model
   */
  interface FollowFieldRefs {
    readonly followed_by_id: FieldRef<"Follow", 'Int'>
    readonly following_id: FieldRef<"Follow", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Follow findUnique
   */
  export type FollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findUniqueOrThrow
   */
  export type FollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findFirst
   */
  export type FollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findFirstOrThrow
   */
  export type FollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findMany
   */
  export type FollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow create
   */
  export type FollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to create a Follow.
     */
    data: XOR<FollowCreateInput, FollowUncheckedCreateInput>
  }

  /**
   * Follow createMany
   */
  export type FollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Follow createManyAndReturn
   */
  export type FollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow update
   */
  export type FollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to update a Follow.
     */
    data: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
    /**
     * Choose, which Follow to update.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow updateMany
   */
  export type FollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
  }

  /**
   * Follow updateManyAndReturn
   */
  export type FollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow upsert
   */
  export type FollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The filter to search for the Follow to update in case it exists.
     */
    where: FollowWhereUniqueInput
    /**
     * In case the Follow found by the `where` argument doesn't exist, create a new Follow with this data.
     */
    create: XOR<FollowCreateInput, FollowUncheckedCreateInput>
    /**
     * In case the Follow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
  }

  /**
   * Follow delete
   */
  export type FollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter which Follow to delete.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow deleteMany
   */
  export type FollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to delete
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to delete.
     */
    limit?: number
  }

  /**
   * Follow without action
   */
  export type FollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
  }


  /**
   * Model Artwork
   */

  export type AggregateArtwork = {
    _count: ArtworkCountAggregateOutputType | null
    _avg: ArtworkAvgAggregateOutputType | null
    _sum: ArtworkSumAggregateOutputType | null
    _min: ArtworkMinAggregateOutputType | null
    _max: ArtworkMaxAggregateOutputType | null
  }

  export type ArtworkAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    likes: number | null
    bads: number | null
  }

  export type ArtworkSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    likes: number | null
    bads: number | null
  }

  export type ArtworkMinAggregateOutputType = {
    id: number | null
    slug_id: string | null
    user_id: number | null
    title: string | null
    likes: number | null
    bads: number | null
    feature: string | null
    deleted: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ArtworkMaxAggregateOutputType = {
    id: number | null
    slug_id: string | null
    user_id: number | null
    title: string | null
    likes: number | null
    bads: number | null
    feature: string | null
    deleted: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ArtworkCountAggregateOutputType = {
    id: number
    slug_id: number
    user_id: number
    title: number
    likes: number
    bads: number
    feature: number
    deleted: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ArtworkAvgAggregateInputType = {
    id?: true
    user_id?: true
    likes?: true
    bads?: true
  }

  export type ArtworkSumAggregateInputType = {
    id?: true
    user_id?: true
    likes?: true
    bads?: true
  }

  export type ArtworkMinAggregateInputType = {
    id?: true
    slug_id?: true
    user_id?: true
    title?: true
    likes?: true
    bads?: true
    feature?: true
    deleted?: true
    created_at?: true
    updated_at?: true
  }

  export type ArtworkMaxAggregateInputType = {
    id?: true
    slug_id?: true
    user_id?: true
    title?: true
    likes?: true
    bads?: true
    feature?: true
    deleted?: true
    created_at?: true
    updated_at?: true
  }

  export type ArtworkCountAggregateInputType = {
    id?: true
    slug_id?: true
    user_id?: true
    title?: true
    likes?: true
    bads?: true
    feature?: true
    deleted?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ArtworkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artwork to aggregate.
     */
    where?: ArtworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artworks to fetch.
     */
    orderBy?: ArtworkOrderByWithRelationInput | ArtworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artworks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artworks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Artworks
    **/
    _count?: true | ArtworkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtworkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtworkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtworkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtworkMaxAggregateInputType
  }

  export type GetArtworkAggregateType<T extends ArtworkAggregateArgs> = {
        [P in keyof T & keyof AggregateArtwork]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtwork[P]>
      : GetScalarType<T[P], AggregateArtwork[P]>
  }




  export type ArtworkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkWhereInput
    orderBy?: ArtworkOrderByWithAggregationInput | ArtworkOrderByWithAggregationInput[]
    by: ArtworkScalarFieldEnum[] | ArtworkScalarFieldEnum
    having?: ArtworkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtworkCountAggregateInputType | true
    _avg?: ArtworkAvgAggregateInputType
    _sum?: ArtworkSumAggregateInputType
    _min?: ArtworkMinAggregateInputType
    _max?: ArtworkMaxAggregateInputType
  }

  export type ArtworkGroupByOutputType = {
    id: number
    slug_id: string
    user_id: number
    title: string
    likes: number
    bads: number
    feature: string
    deleted: boolean
    created_at: Date
    updated_at: Date
    _count: ArtworkCountAggregateOutputType | null
    _avg: ArtworkAvgAggregateOutputType | null
    _sum: ArtworkSumAggregateOutputType | null
    _min: ArtworkMinAggregateOutputType | null
    _max: ArtworkMaxAggregateOutputType | null
  }

  type GetArtworkGroupByPayload<T extends ArtworkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtworkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtworkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtworkGroupByOutputType[P]>
            : GetScalarType<T[P], ArtworkGroupByOutputType[P]>
        }
      >
    >


  export type ArtworkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    title?: boolean
    likes?: boolean
    bads?: boolean
    feature?: boolean
    deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork_file?: boolean | Artwork$artwork_fileArgs<ExtArgs>
    artwork_ranks?: boolean | Artwork$artwork_ranksArgs<ExtArgs>
    comments?: boolean | Artwork$commentsArgs<ExtArgs>
    _count?: boolean | ArtworkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artwork"]>

  export type ArtworkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    title?: boolean
    likes?: boolean
    bads?: boolean
    feature?: boolean
    deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artwork"]>

  export type ArtworkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    title?: boolean
    likes?: boolean
    bads?: boolean
    feature?: boolean
    deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artwork"]>

  export type ArtworkSelectScalar = {
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    title?: boolean
    likes?: boolean
    bads?: boolean
    feature?: boolean
    deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ArtworkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug_id" | "user_id" | "title" | "likes" | "bads" | "feature" | "deleted" | "created_at" | "updated_at", ExtArgs["result"]["artwork"]>
  export type ArtworkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork_file?: boolean | Artwork$artwork_fileArgs<ExtArgs>
    artwork_ranks?: boolean | Artwork$artwork_ranksArgs<ExtArgs>
    comments?: boolean | Artwork$commentsArgs<ExtArgs>
    _count?: boolean | ArtworkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArtworkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ArtworkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ArtworkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Artwork"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      artwork_file: Prisma.$ArtworkFilePayload<ExtArgs>[]
      artwork_ranks: Prisma.$ArtworkRanksPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug_id: string
      user_id: number
      title: string
      likes: number
      bads: number
      feature: string
      deleted: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["artwork"]>
    composites: {}
  }

  type ArtworkGetPayload<S extends boolean | null | undefined | ArtworkDefaultArgs> = $Result.GetResult<Prisma.$ArtworkPayload, S>

  type ArtworkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtworkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtworkCountAggregateInputType | true
    }

  export interface ArtworkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Artwork'], meta: { name: 'Artwork' } }
    /**
     * Find zero or one Artwork that matches the filter.
     * @param {ArtworkFindUniqueArgs} args - Arguments to find a Artwork
     * @example
     * // Get one Artwork
     * const artwork = await prisma.artwork.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtworkFindUniqueArgs>(args: SelectSubset<T, ArtworkFindUniqueArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Artwork that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtworkFindUniqueOrThrowArgs} args - Arguments to find a Artwork
     * @example
     * // Get one Artwork
     * const artwork = await prisma.artwork.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtworkFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtworkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artwork that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFindFirstArgs} args - Arguments to find a Artwork
     * @example
     * // Get one Artwork
     * const artwork = await prisma.artwork.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtworkFindFirstArgs>(args?: SelectSubset<T, ArtworkFindFirstArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artwork that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFindFirstOrThrowArgs} args - Arguments to find a Artwork
     * @example
     * // Get one Artwork
     * const artwork = await prisma.artwork.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtworkFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtworkFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Artworks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Artworks
     * const artworks = await prisma.artwork.findMany()
     * 
     * // Get first 10 Artworks
     * const artworks = await prisma.artwork.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artworkWithIdOnly = await prisma.artwork.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtworkFindManyArgs>(args?: SelectSubset<T, ArtworkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Artwork.
     * @param {ArtworkCreateArgs} args - Arguments to create a Artwork.
     * @example
     * // Create one Artwork
     * const Artwork = await prisma.artwork.create({
     *   data: {
     *     // ... data to create a Artwork
     *   }
     * })
     * 
     */
    create<T extends ArtworkCreateArgs>(args: SelectSubset<T, ArtworkCreateArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Artworks.
     * @param {ArtworkCreateManyArgs} args - Arguments to create many Artworks.
     * @example
     * // Create many Artworks
     * const artwork = await prisma.artwork.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtworkCreateManyArgs>(args?: SelectSubset<T, ArtworkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Artworks and returns the data saved in the database.
     * @param {ArtworkCreateManyAndReturnArgs} args - Arguments to create many Artworks.
     * @example
     * // Create many Artworks
     * const artwork = await prisma.artwork.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Artworks and only return the `id`
     * const artworkWithIdOnly = await prisma.artwork.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtworkCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtworkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Artwork.
     * @param {ArtworkDeleteArgs} args - Arguments to delete one Artwork.
     * @example
     * // Delete one Artwork
     * const Artwork = await prisma.artwork.delete({
     *   where: {
     *     // ... filter to delete one Artwork
     *   }
     * })
     * 
     */
    delete<T extends ArtworkDeleteArgs>(args: SelectSubset<T, ArtworkDeleteArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Artwork.
     * @param {ArtworkUpdateArgs} args - Arguments to update one Artwork.
     * @example
     * // Update one Artwork
     * const artwork = await prisma.artwork.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtworkUpdateArgs>(args: SelectSubset<T, ArtworkUpdateArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Artworks.
     * @param {ArtworkDeleteManyArgs} args - Arguments to filter Artworks to delete.
     * @example
     * // Delete a few Artworks
     * const { count } = await prisma.artwork.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtworkDeleteManyArgs>(args?: SelectSubset<T, ArtworkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artworks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Artworks
     * const artwork = await prisma.artwork.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtworkUpdateManyArgs>(args: SelectSubset<T, ArtworkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artworks and returns the data updated in the database.
     * @param {ArtworkUpdateManyAndReturnArgs} args - Arguments to update many Artworks.
     * @example
     * // Update many Artworks
     * const artwork = await prisma.artwork.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Artworks and only return the `id`
     * const artworkWithIdOnly = await prisma.artwork.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtworkUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtworkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Artwork.
     * @param {ArtworkUpsertArgs} args - Arguments to update or create a Artwork.
     * @example
     * // Update or create a Artwork
     * const artwork = await prisma.artwork.upsert({
     *   create: {
     *     // ... data to create a Artwork
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Artwork we want to update
     *   }
     * })
     */
    upsert<T extends ArtworkUpsertArgs>(args: SelectSubset<T, ArtworkUpsertArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Artworks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkCountArgs} args - Arguments to filter Artworks to count.
     * @example
     * // Count the number of Artworks
     * const count = await prisma.artwork.count({
     *   where: {
     *     // ... the filter for the Artworks we want to count
     *   }
     * })
    **/
    count<T extends ArtworkCountArgs>(
      args?: Subset<T, ArtworkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtworkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Artwork.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtworkAggregateArgs>(args: Subset<T, ArtworkAggregateArgs>): Prisma.PrismaPromise<GetArtworkAggregateType<T>>

    /**
     * Group by Artwork.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtworkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtworkGroupByArgs['orderBy'] }
        : { orderBy?: ArtworkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtworkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtworkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Artwork model
   */
  readonly fields: ArtworkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Artwork.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtworkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    artwork_file<T extends Artwork$artwork_fileArgs<ExtArgs> = {}>(args?: Subset<T, Artwork$artwork_fileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    artwork_ranks<T extends Artwork$artwork_ranksArgs<ExtArgs> = {}>(args?: Subset<T, Artwork$artwork_ranksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Artwork$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Artwork$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Artwork model
   */
  interface ArtworkFieldRefs {
    readonly id: FieldRef<"Artwork", 'Int'>
    readonly slug_id: FieldRef<"Artwork", 'String'>
    readonly user_id: FieldRef<"Artwork", 'Int'>
    readonly title: FieldRef<"Artwork", 'String'>
    readonly likes: FieldRef<"Artwork", 'Int'>
    readonly bads: FieldRef<"Artwork", 'Int'>
    readonly feature: FieldRef<"Artwork", 'String'>
    readonly deleted: FieldRef<"Artwork", 'Boolean'>
    readonly created_at: FieldRef<"Artwork", 'DateTime'>
    readonly updated_at: FieldRef<"Artwork", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Artwork findUnique
   */
  export type ArtworkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * Filter, which Artwork to fetch.
     */
    where: ArtworkWhereUniqueInput
  }

  /**
   * Artwork findUniqueOrThrow
   */
  export type ArtworkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * Filter, which Artwork to fetch.
     */
    where: ArtworkWhereUniqueInput
  }

  /**
   * Artwork findFirst
   */
  export type ArtworkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * Filter, which Artwork to fetch.
     */
    where?: ArtworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artworks to fetch.
     */
    orderBy?: ArtworkOrderByWithRelationInput | ArtworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artworks.
     */
    cursor?: ArtworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artworks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artworks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artworks.
     */
    distinct?: ArtworkScalarFieldEnum | ArtworkScalarFieldEnum[]
  }

  /**
   * Artwork findFirstOrThrow
   */
  export type ArtworkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * Filter, which Artwork to fetch.
     */
    where?: ArtworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artworks to fetch.
     */
    orderBy?: ArtworkOrderByWithRelationInput | ArtworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artworks.
     */
    cursor?: ArtworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artworks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artworks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artworks.
     */
    distinct?: ArtworkScalarFieldEnum | ArtworkScalarFieldEnum[]
  }

  /**
   * Artwork findMany
   */
  export type ArtworkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * Filter, which Artworks to fetch.
     */
    where?: ArtworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artworks to fetch.
     */
    orderBy?: ArtworkOrderByWithRelationInput | ArtworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Artworks.
     */
    cursor?: ArtworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artworks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artworks.
     */
    skip?: number
    distinct?: ArtworkScalarFieldEnum | ArtworkScalarFieldEnum[]
  }

  /**
   * Artwork create
   */
  export type ArtworkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * The data needed to create a Artwork.
     */
    data: XOR<ArtworkCreateInput, ArtworkUncheckedCreateInput>
  }

  /**
   * Artwork createMany
   */
  export type ArtworkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Artworks.
     */
    data: ArtworkCreateManyInput | ArtworkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artwork createManyAndReturn
   */
  export type ArtworkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * The data used to create many Artworks.
     */
    data: ArtworkCreateManyInput | ArtworkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Artwork update
   */
  export type ArtworkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * The data needed to update a Artwork.
     */
    data: XOR<ArtworkUpdateInput, ArtworkUncheckedUpdateInput>
    /**
     * Choose, which Artwork to update.
     */
    where: ArtworkWhereUniqueInput
  }

  /**
   * Artwork updateMany
   */
  export type ArtworkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Artworks.
     */
    data: XOR<ArtworkUpdateManyMutationInput, ArtworkUncheckedUpdateManyInput>
    /**
     * Filter which Artworks to update
     */
    where?: ArtworkWhereInput
    /**
     * Limit how many Artworks to update.
     */
    limit?: number
  }

  /**
   * Artwork updateManyAndReturn
   */
  export type ArtworkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * The data used to update Artworks.
     */
    data: XOR<ArtworkUpdateManyMutationInput, ArtworkUncheckedUpdateManyInput>
    /**
     * Filter which Artworks to update
     */
    where?: ArtworkWhereInput
    /**
     * Limit how many Artworks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Artwork upsert
   */
  export type ArtworkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * The filter to search for the Artwork to update in case it exists.
     */
    where: ArtworkWhereUniqueInput
    /**
     * In case the Artwork found by the `where` argument doesn't exist, create a new Artwork with this data.
     */
    create: XOR<ArtworkCreateInput, ArtworkUncheckedCreateInput>
    /**
     * In case the Artwork was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtworkUpdateInput, ArtworkUncheckedUpdateInput>
  }

  /**
   * Artwork delete
   */
  export type ArtworkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
    /**
     * Filter which Artwork to delete.
     */
    where: ArtworkWhereUniqueInput
  }

  /**
   * Artwork deleteMany
   */
  export type ArtworkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artworks to delete
     */
    where?: ArtworkWhereInput
    /**
     * Limit how many Artworks to delete.
     */
    limit?: number
  }

  /**
   * Artwork.artwork_file
   */
  export type Artwork$artwork_fileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    where?: ArtworkFileWhereInput
    orderBy?: ArtworkFileOrderByWithRelationInput | ArtworkFileOrderByWithRelationInput[]
    cursor?: ArtworkFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtworkFileScalarFieldEnum | ArtworkFileScalarFieldEnum[]
  }

  /**
   * Artwork.artwork_ranks
   */
  export type Artwork$artwork_ranksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    where?: ArtworkRanksWhereInput
    orderBy?: ArtworkRanksOrderByWithRelationInput | ArtworkRanksOrderByWithRelationInput[]
    cursor?: ArtworkRanksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtworkRanksScalarFieldEnum | ArtworkRanksScalarFieldEnum[]
  }

  /**
   * Artwork.comments
   */
  export type Artwork$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Artwork without action
   */
  export type ArtworkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artwork
     */
    select?: ArtworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artwork
     */
    omit?: ArtworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkInclude<ExtArgs> | null
  }


  /**
   * Model ArtworkFile
   */

  export type AggregateArtworkFile = {
    _count: ArtworkFileCountAggregateOutputType | null
    _avg: ArtworkFileAvgAggregateOutputType | null
    _sum: ArtworkFileSumAggregateOutputType | null
    _min: ArtworkFileMinAggregateOutputType | null
    _max: ArtworkFileMaxAggregateOutputType | null
  }

  export type ArtworkFileAvgAggregateOutputType = {
    id: number | null
    artwork_id: number | null
  }

  export type ArtworkFileSumAggregateOutputType = {
    id: number | null
    artwork_id: number | null
  }

  export type ArtworkFileMinAggregateOutputType = {
    id: number | null
    artwork_id: number | null
    file_name: string | null
    extension: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ArtworkFileMaxAggregateOutputType = {
    id: number | null
    artwork_id: number | null
    file_name: string | null
    extension: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ArtworkFileCountAggregateOutputType = {
    id: number
    artwork_id: number
    file_name: number
    extension: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ArtworkFileAvgAggregateInputType = {
    id?: true
    artwork_id?: true
  }

  export type ArtworkFileSumAggregateInputType = {
    id?: true
    artwork_id?: true
  }

  export type ArtworkFileMinAggregateInputType = {
    id?: true
    artwork_id?: true
    file_name?: true
    extension?: true
    created_at?: true
    updated_at?: true
  }

  export type ArtworkFileMaxAggregateInputType = {
    id?: true
    artwork_id?: true
    file_name?: true
    extension?: true
    created_at?: true
    updated_at?: true
  }

  export type ArtworkFileCountAggregateInputType = {
    id?: true
    artwork_id?: true
    file_name?: true
    extension?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ArtworkFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtworkFile to aggregate.
     */
    where?: ArtworkFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkFiles to fetch.
     */
    orderBy?: ArtworkFileOrderByWithRelationInput | ArtworkFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtworkFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArtworkFiles
    **/
    _count?: true | ArtworkFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtworkFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtworkFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtworkFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtworkFileMaxAggregateInputType
  }

  export type GetArtworkFileAggregateType<T extends ArtworkFileAggregateArgs> = {
        [P in keyof T & keyof AggregateArtworkFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtworkFile[P]>
      : GetScalarType<T[P], AggregateArtworkFile[P]>
  }




  export type ArtworkFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkFileWhereInput
    orderBy?: ArtworkFileOrderByWithAggregationInput | ArtworkFileOrderByWithAggregationInput[]
    by: ArtworkFileScalarFieldEnum[] | ArtworkFileScalarFieldEnum
    having?: ArtworkFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtworkFileCountAggregateInputType | true
    _avg?: ArtworkFileAvgAggregateInputType
    _sum?: ArtworkFileSumAggregateInputType
    _min?: ArtworkFileMinAggregateInputType
    _max?: ArtworkFileMaxAggregateInputType
  }

  export type ArtworkFileGroupByOutputType = {
    id: number
    artwork_id: number
    file_name: string
    extension: string
    created_at: Date
    updated_at: Date
    _count: ArtworkFileCountAggregateOutputType | null
    _avg: ArtworkFileAvgAggregateOutputType | null
    _sum: ArtworkFileSumAggregateOutputType | null
    _min: ArtworkFileMinAggregateOutputType | null
    _max: ArtworkFileMaxAggregateOutputType | null
  }

  type GetArtworkFileGroupByPayload<T extends ArtworkFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtworkFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtworkFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtworkFileGroupByOutputType[P]>
            : GetScalarType<T[P], ArtworkFileGroupByOutputType[P]>
        }
      >
    >


  export type ArtworkFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_id?: boolean
    file_name?: boolean
    extension?: boolean
    created_at?: boolean
    updated_at?: boolean
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    artwork_gizmo?: boolean | ArtworkFile$artwork_gizmoArgs<ExtArgs>
    _count?: boolean | ArtworkFileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkFile"]>

  export type ArtworkFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_id?: boolean
    file_name?: boolean
    extension?: boolean
    created_at?: boolean
    updated_at?: boolean
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkFile"]>

  export type ArtworkFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_id?: boolean
    file_name?: boolean
    extension?: boolean
    created_at?: boolean
    updated_at?: boolean
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkFile"]>

  export type ArtworkFileSelectScalar = {
    id?: boolean
    artwork_id?: boolean
    file_name?: boolean
    extension?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ArtworkFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "artwork_id" | "file_name" | "extension" | "created_at" | "updated_at", ExtArgs["result"]["artworkFile"]>
  export type ArtworkFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    artwork_gizmo?: boolean | ArtworkFile$artwork_gizmoArgs<ExtArgs>
    _count?: boolean | ArtworkFileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArtworkFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }
  export type ArtworkFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }

  export type $ArtworkFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArtworkFile"
    objects: {
      artwork: Prisma.$ArtworkPayload<ExtArgs>
      artwork_gizmo: Prisma.$ArtworkGizmoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      artwork_id: number
      file_name: string
      extension: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["artworkFile"]>
    composites: {}
  }

  type ArtworkFileGetPayload<S extends boolean | null | undefined | ArtworkFileDefaultArgs> = $Result.GetResult<Prisma.$ArtworkFilePayload, S>

  type ArtworkFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtworkFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtworkFileCountAggregateInputType | true
    }

  export interface ArtworkFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArtworkFile'], meta: { name: 'ArtworkFile' } }
    /**
     * Find zero or one ArtworkFile that matches the filter.
     * @param {ArtworkFileFindUniqueArgs} args - Arguments to find a ArtworkFile
     * @example
     * // Get one ArtworkFile
     * const artworkFile = await prisma.artworkFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtworkFileFindUniqueArgs>(args: SelectSubset<T, ArtworkFileFindUniqueArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArtworkFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtworkFileFindUniqueOrThrowArgs} args - Arguments to find a ArtworkFile
     * @example
     * // Get one ArtworkFile
     * const artworkFile = await prisma.artworkFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtworkFileFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtworkFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtworkFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFileFindFirstArgs} args - Arguments to find a ArtworkFile
     * @example
     * // Get one ArtworkFile
     * const artworkFile = await prisma.artworkFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtworkFileFindFirstArgs>(args?: SelectSubset<T, ArtworkFileFindFirstArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtworkFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFileFindFirstOrThrowArgs} args - Arguments to find a ArtworkFile
     * @example
     * // Get one ArtworkFile
     * const artworkFile = await prisma.artworkFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtworkFileFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtworkFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArtworkFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArtworkFiles
     * const artworkFiles = await prisma.artworkFile.findMany()
     * 
     * // Get first 10 ArtworkFiles
     * const artworkFiles = await prisma.artworkFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artworkFileWithIdOnly = await prisma.artworkFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtworkFileFindManyArgs>(args?: SelectSubset<T, ArtworkFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArtworkFile.
     * @param {ArtworkFileCreateArgs} args - Arguments to create a ArtworkFile.
     * @example
     * // Create one ArtworkFile
     * const ArtworkFile = await prisma.artworkFile.create({
     *   data: {
     *     // ... data to create a ArtworkFile
     *   }
     * })
     * 
     */
    create<T extends ArtworkFileCreateArgs>(args: SelectSubset<T, ArtworkFileCreateArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArtworkFiles.
     * @param {ArtworkFileCreateManyArgs} args - Arguments to create many ArtworkFiles.
     * @example
     * // Create many ArtworkFiles
     * const artworkFile = await prisma.artworkFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtworkFileCreateManyArgs>(args?: SelectSubset<T, ArtworkFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArtworkFiles and returns the data saved in the database.
     * @param {ArtworkFileCreateManyAndReturnArgs} args - Arguments to create many ArtworkFiles.
     * @example
     * // Create many ArtworkFiles
     * const artworkFile = await prisma.artworkFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArtworkFiles and only return the `id`
     * const artworkFileWithIdOnly = await prisma.artworkFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtworkFileCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtworkFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArtworkFile.
     * @param {ArtworkFileDeleteArgs} args - Arguments to delete one ArtworkFile.
     * @example
     * // Delete one ArtworkFile
     * const ArtworkFile = await prisma.artworkFile.delete({
     *   where: {
     *     // ... filter to delete one ArtworkFile
     *   }
     * })
     * 
     */
    delete<T extends ArtworkFileDeleteArgs>(args: SelectSubset<T, ArtworkFileDeleteArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArtworkFile.
     * @param {ArtworkFileUpdateArgs} args - Arguments to update one ArtworkFile.
     * @example
     * // Update one ArtworkFile
     * const artworkFile = await prisma.artworkFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtworkFileUpdateArgs>(args: SelectSubset<T, ArtworkFileUpdateArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArtworkFiles.
     * @param {ArtworkFileDeleteManyArgs} args - Arguments to filter ArtworkFiles to delete.
     * @example
     * // Delete a few ArtworkFiles
     * const { count } = await prisma.artworkFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtworkFileDeleteManyArgs>(args?: SelectSubset<T, ArtworkFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtworkFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArtworkFiles
     * const artworkFile = await prisma.artworkFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtworkFileUpdateManyArgs>(args: SelectSubset<T, ArtworkFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtworkFiles and returns the data updated in the database.
     * @param {ArtworkFileUpdateManyAndReturnArgs} args - Arguments to update many ArtworkFiles.
     * @example
     * // Update many ArtworkFiles
     * const artworkFile = await prisma.artworkFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArtworkFiles and only return the `id`
     * const artworkFileWithIdOnly = await prisma.artworkFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtworkFileUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtworkFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArtworkFile.
     * @param {ArtworkFileUpsertArgs} args - Arguments to update or create a ArtworkFile.
     * @example
     * // Update or create a ArtworkFile
     * const artworkFile = await prisma.artworkFile.upsert({
     *   create: {
     *     // ... data to create a ArtworkFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArtworkFile we want to update
     *   }
     * })
     */
    upsert<T extends ArtworkFileUpsertArgs>(args: SelectSubset<T, ArtworkFileUpsertArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArtworkFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFileCountArgs} args - Arguments to filter ArtworkFiles to count.
     * @example
     * // Count the number of ArtworkFiles
     * const count = await prisma.artworkFile.count({
     *   where: {
     *     // ... the filter for the ArtworkFiles we want to count
     *   }
     * })
    **/
    count<T extends ArtworkFileCountArgs>(
      args?: Subset<T, ArtworkFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtworkFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArtworkFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtworkFileAggregateArgs>(args: Subset<T, ArtworkFileAggregateArgs>): Prisma.PrismaPromise<GetArtworkFileAggregateType<T>>

    /**
     * Group by ArtworkFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtworkFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtworkFileGroupByArgs['orderBy'] }
        : { orderBy?: ArtworkFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtworkFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtworkFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArtworkFile model
   */
  readonly fields: ArtworkFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArtworkFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtworkFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    artwork<T extends ArtworkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtworkDefaultArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    artwork_gizmo<T extends ArtworkFile$artwork_gizmoArgs<ExtArgs> = {}>(args?: Subset<T, ArtworkFile$artwork_gizmoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArtworkFile model
   */
  interface ArtworkFileFieldRefs {
    readonly id: FieldRef<"ArtworkFile", 'Int'>
    readonly artwork_id: FieldRef<"ArtworkFile", 'Int'>
    readonly file_name: FieldRef<"ArtworkFile", 'String'>
    readonly extension: FieldRef<"ArtworkFile", 'String'>
    readonly created_at: FieldRef<"ArtworkFile", 'DateTime'>
    readonly updated_at: FieldRef<"ArtworkFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArtworkFile findUnique
   */
  export type ArtworkFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkFile to fetch.
     */
    where: ArtworkFileWhereUniqueInput
  }

  /**
   * ArtworkFile findUniqueOrThrow
   */
  export type ArtworkFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkFile to fetch.
     */
    where: ArtworkFileWhereUniqueInput
  }

  /**
   * ArtworkFile findFirst
   */
  export type ArtworkFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkFile to fetch.
     */
    where?: ArtworkFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkFiles to fetch.
     */
    orderBy?: ArtworkFileOrderByWithRelationInput | ArtworkFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtworkFiles.
     */
    cursor?: ArtworkFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtworkFiles.
     */
    distinct?: ArtworkFileScalarFieldEnum | ArtworkFileScalarFieldEnum[]
  }

  /**
   * ArtworkFile findFirstOrThrow
   */
  export type ArtworkFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkFile to fetch.
     */
    where?: ArtworkFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkFiles to fetch.
     */
    orderBy?: ArtworkFileOrderByWithRelationInput | ArtworkFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtworkFiles.
     */
    cursor?: ArtworkFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtworkFiles.
     */
    distinct?: ArtworkFileScalarFieldEnum | ArtworkFileScalarFieldEnum[]
  }

  /**
   * ArtworkFile findMany
   */
  export type ArtworkFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkFiles to fetch.
     */
    where?: ArtworkFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkFiles to fetch.
     */
    orderBy?: ArtworkFileOrderByWithRelationInput | ArtworkFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArtworkFiles.
     */
    cursor?: ArtworkFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkFiles.
     */
    skip?: number
    distinct?: ArtworkFileScalarFieldEnum | ArtworkFileScalarFieldEnum[]
  }

  /**
   * ArtworkFile create
   */
  export type ArtworkFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * The data needed to create a ArtworkFile.
     */
    data: XOR<ArtworkFileCreateInput, ArtworkFileUncheckedCreateInput>
  }

  /**
   * ArtworkFile createMany
   */
  export type ArtworkFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArtworkFiles.
     */
    data: ArtworkFileCreateManyInput | ArtworkFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArtworkFile createManyAndReturn
   */
  export type ArtworkFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * The data used to create many ArtworkFiles.
     */
    data: ArtworkFileCreateManyInput | ArtworkFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtworkFile update
   */
  export type ArtworkFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * The data needed to update a ArtworkFile.
     */
    data: XOR<ArtworkFileUpdateInput, ArtworkFileUncheckedUpdateInput>
    /**
     * Choose, which ArtworkFile to update.
     */
    where: ArtworkFileWhereUniqueInput
  }

  /**
   * ArtworkFile updateMany
   */
  export type ArtworkFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArtworkFiles.
     */
    data: XOR<ArtworkFileUpdateManyMutationInput, ArtworkFileUncheckedUpdateManyInput>
    /**
     * Filter which ArtworkFiles to update
     */
    where?: ArtworkFileWhereInput
    /**
     * Limit how many ArtworkFiles to update.
     */
    limit?: number
  }

  /**
   * ArtworkFile updateManyAndReturn
   */
  export type ArtworkFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * The data used to update ArtworkFiles.
     */
    data: XOR<ArtworkFileUpdateManyMutationInput, ArtworkFileUncheckedUpdateManyInput>
    /**
     * Filter which ArtworkFiles to update
     */
    where?: ArtworkFileWhereInput
    /**
     * Limit how many ArtworkFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtworkFile upsert
   */
  export type ArtworkFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * The filter to search for the ArtworkFile to update in case it exists.
     */
    where: ArtworkFileWhereUniqueInput
    /**
     * In case the ArtworkFile found by the `where` argument doesn't exist, create a new ArtworkFile with this data.
     */
    create: XOR<ArtworkFileCreateInput, ArtworkFileUncheckedCreateInput>
    /**
     * In case the ArtworkFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtworkFileUpdateInput, ArtworkFileUncheckedUpdateInput>
  }

  /**
   * ArtworkFile delete
   */
  export type ArtworkFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
    /**
     * Filter which ArtworkFile to delete.
     */
    where: ArtworkFileWhereUniqueInput
  }

  /**
   * ArtworkFile deleteMany
   */
  export type ArtworkFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtworkFiles to delete
     */
    where?: ArtworkFileWhereInput
    /**
     * Limit how many ArtworkFiles to delete.
     */
    limit?: number
  }

  /**
   * ArtworkFile.artwork_gizmo
   */
  export type ArtworkFile$artwork_gizmoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    where?: ArtworkGizmoWhereInput
    orderBy?: ArtworkGizmoOrderByWithRelationInput | ArtworkGizmoOrderByWithRelationInput[]
    cursor?: ArtworkGizmoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtworkGizmoScalarFieldEnum | ArtworkGizmoScalarFieldEnum[]
  }

  /**
   * ArtworkFile without action
   */
  export type ArtworkFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkFile
     */
    select?: ArtworkFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkFile
     */
    omit?: ArtworkFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkFileInclude<ExtArgs> | null
  }


  /**
   * Model ArtworkGizmo
   */

  export type AggregateArtworkGizmo = {
    _count: ArtworkGizmoCountAggregateOutputType | null
    _avg: ArtworkGizmoAvgAggregateOutputType | null
    _sum: ArtworkGizmoSumAggregateOutputType | null
    _min: ArtworkGizmoMinAggregateOutputType | null
    _max: ArtworkGizmoMaxAggregateOutputType | null
  }

  export type ArtworkGizmoAvgAggregateOutputType = {
    id: number | null
    artwork_file_id: number | null
    transportX: number | null
    transportY: number | null
    transportZ: number | null
    rotateX: number | null
    rotateY: number | null
    rotateZ: number | null
    scaleX: number | null
    scaleY: number | null
    scaleZ: number | null
  }

  export type ArtworkGizmoSumAggregateOutputType = {
    id: number | null
    artwork_file_id: number | null
    transportX: number | null
    transportY: number | null
    transportZ: number | null
    rotateX: number | null
    rotateY: number | null
    rotateZ: number | null
    scaleX: number | null
    scaleY: number | null
    scaleZ: number | null
  }

  export type ArtworkGizmoMinAggregateOutputType = {
    id: number | null
    artwork_file_id: number | null
    transportX: number | null
    transportY: number | null
    transportZ: number | null
    rotateX: number | null
    rotateY: number | null
    rotateZ: number | null
    scaleX: number | null
    scaleY: number | null
    scaleZ: number | null
  }

  export type ArtworkGizmoMaxAggregateOutputType = {
    id: number | null
    artwork_file_id: number | null
    transportX: number | null
    transportY: number | null
    transportZ: number | null
    rotateX: number | null
    rotateY: number | null
    rotateZ: number | null
    scaleX: number | null
    scaleY: number | null
    scaleZ: number | null
  }

  export type ArtworkGizmoCountAggregateOutputType = {
    id: number
    artwork_file_id: number
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
    _all: number
  }


  export type ArtworkGizmoAvgAggregateInputType = {
    id?: true
    artwork_file_id?: true
    transportX?: true
    transportY?: true
    transportZ?: true
    rotateX?: true
    rotateY?: true
    rotateZ?: true
    scaleX?: true
    scaleY?: true
    scaleZ?: true
  }

  export type ArtworkGizmoSumAggregateInputType = {
    id?: true
    artwork_file_id?: true
    transportX?: true
    transportY?: true
    transportZ?: true
    rotateX?: true
    rotateY?: true
    rotateZ?: true
    scaleX?: true
    scaleY?: true
    scaleZ?: true
  }

  export type ArtworkGizmoMinAggregateInputType = {
    id?: true
    artwork_file_id?: true
    transportX?: true
    transportY?: true
    transportZ?: true
    rotateX?: true
    rotateY?: true
    rotateZ?: true
    scaleX?: true
    scaleY?: true
    scaleZ?: true
  }

  export type ArtworkGizmoMaxAggregateInputType = {
    id?: true
    artwork_file_id?: true
    transportX?: true
    transportY?: true
    transportZ?: true
    rotateX?: true
    rotateY?: true
    rotateZ?: true
    scaleX?: true
    scaleY?: true
    scaleZ?: true
  }

  export type ArtworkGizmoCountAggregateInputType = {
    id?: true
    artwork_file_id?: true
    transportX?: true
    transportY?: true
    transportZ?: true
    rotateX?: true
    rotateY?: true
    rotateZ?: true
    scaleX?: true
    scaleY?: true
    scaleZ?: true
    _all?: true
  }

  export type ArtworkGizmoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtworkGizmo to aggregate.
     */
    where?: ArtworkGizmoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkGizmos to fetch.
     */
    orderBy?: ArtworkGizmoOrderByWithRelationInput | ArtworkGizmoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtworkGizmoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkGizmos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkGizmos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArtworkGizmos
    **/
    _count?: true | ArtworkGizmoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtworkGizmoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtworkGizmoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtworkGizmoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtworkGizmoMaxAggregateInputType
  }

  export type GetArtworkGizmoAggregateType<T extends ArtworkGizmoAggregateArgs> = {
        [P in keyof T & keyof AggregateArtworkGizmo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtworkGizmo[P]>
      : GetScalarType<T[P], AggregateArtworkGizmo[P]>
  }




  export type ArtworkGizmoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkGizmoWhereInput
    orderBy?: ArtworkGizmoOrderByWithAggregationInput | ArtworkGizmoOrderByWithAggregationInput[]
    by: ArtworkGizmoScalarFieldEnum[] | ArtworkGizmoScalarFieldEnum
    having?: ArtworkGizmoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtworkGizmoCountAggregateInputType | true
    _avg?: ArtworkGizmoAvgAggregateInputType
    _sum?: ArtworkGizmoSumAggregateInputType
    _min?: ArtworkGizmoMinAggregateInputType
    _max?: ArtworkGizmoMaxAggregateInputType
  }

  export type ArtworkGizmoGroupByOutputType = {
    id: number
    artwork_file_id: number
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
    _count: ArtworkGizmoCountAggregateOutputType | null
    _avg: ArtworkGizmoAvgAggregateOutputType | null
    _sum: ArtworkGizmoSumAggregateOutputType | null
    _min: ArtworkGizmoMinAggregateOutputType | null
    _max: ArtworkGizmoMaxAggregateOutputType | null
  }

  type GetArtworkGizmoGroupByPayload<T extends ArtworkGizmoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtworkGizmoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtworkGizmoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtworkGizmoGroupByOutputType[P]>
            : GetScalarType<T[P], ArtworkGizmoGroupByOutputType[P]>
        }
      >
    >


  export type ArtworkGizmoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_file_id?: boolean
    transportX?: boolean
    transportY?: boolean
    transportZ?: boolean
    rotateX?: boolean
    rotateY?: boolean
    rotateZ?: boolean
    scaleX?: boolean
    scaleY?: boolean
    scaleZ?: boolean
    artwork_file?: boolean | ArtworkFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkGizmo"]>

  export type ArtworkGizmoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_file_id?: boolean
    transportX?: boolean
    transportY?: boolean
    transportZ?: boolean
    rotateX?: boolean
    rotateY?: boolean
    rotateZ?: boolean
    scaleX?: boolean
    scaleY?: boolean
    scaleZ?: boolean
    artwork_file?: boolean | ArtworkFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkGizmo"]>

  export type ArtworkGizmoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_file_id?: boolean
    transportX?: boolean
    transportY?: boolean
    transportZ?: boolean
    rotateX?: boolean
    rotateY?: boolean
    rotateZ?: boolean
    scaleX?: boolean
    scaleY?: boolean
    scaleZ?: boolean
    artwork_file?: boolean | ArtworkFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkGizmo"]>

  export type ArtworkGizmoSelectScalar = {
    id?: boolean
    artwork_file_id?: boolean
    transportX?: boolean
    transportY?: boolean
    transportZ?: boolean
    rotateX?: boolean
    rotateY?: boolean
    rotateZ?: boolean
    scaleX?: boolean
    scaleY?: boolean
    scaleZ?: boolean
  }

  export type ArtworkGizmoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "artwork_file_id" | "transportX" | "transportY" | "transportZ" | "rotateX" | "rotateY" | "rotateZ" | "scaleX" | "scaleY" | "scaleZ", ExtArgs["result"]["artworkGizmo"]>
  export type ArtworkGizmoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork_file?: boolean | ArtworkFileDefaultArgs<ExtArgs>
  }
  export type ArtworkGizmoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork_file?: boolean | ArtworkFileDefaultArgs<ExtArgs>
  }
  export type ArtworkGizmoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork_file?: boolean | ArtworkFileDefaultArgs<ExtArgs>
  }

  export type $ArtworkGizmoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArtworkGizmo"
    objects: {
      artwork_file: Prisma.$ArtworkFilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      artwork_file_id: number
      transportX: number
      transportY: number
      transportZ: number
      rotateX: number
      rotateY: number
      rotateZ: number
      scaleX: number
      scaleY: number
      scaleZ: number
    }, ExtArgs["result"]["artworkGizmo"]>
    composites: {}
  }

  type ArtworkGizmoGetPayload<S extends boolean | null | undefined | ArtworkGizmoDefaultArgs> = $Result.GetResult<Prisma.$ArtworkGizmoPayload, S>

  type ArtworkGizmoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtworkGizmoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtworkGizmoCountAggregateInputType | true
    }

  export interface ArtworkGizmoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArtworkGizmo'], meta: { name: 'ArtworkGizmo' } }
    /**
     * Find zero or one ArtworkGizmo that matches the filter.
     * @param {ArtworkGizmoFindUniqueArgs} args - Arguments to find a ArtworkGizmo
     * @example
     * // Get one ArtworkGizmo
     * const artworkGizmo = await prisma.artworkGizmo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtworkGizmoFindUniqueArgs>(args: SelectSubset<T, ArtworkGizmoFindUniqueArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArtworkGizmo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtworkGizmoFindUniqueOrThrowArgs} args - Arguments to find a ArtworkGizmo
     * @example
     * // Get one ArtworkGizmo
     * const artworkGizmo = await prisma.artworkGizmo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtworkGizmoFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtworkGizmoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtworkGizmo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGizmoFindFirstArgs} args - Arguments to find a ArtworkGizmo
     * @example
     * // Get one ArtworkGizmo
     * const artworkGizmo = await prisma.artworkGizmo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtworkGizmoFindFirstArgs>(args?: SelectSubset<T, ArtworkGizmoFindFirstArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtworkGizmo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGizmoFindFirstOrThrowArgs} args - Arguments to find a ArtworkGizmo
     * @example
     * // Get one ArtworkGizmo
     * const artworkGizmo = await prisma.artworkGizmo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtworkGizmoFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtworkGizmoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArtworkGizmos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGizmoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArtworkGizmos
     * const artworkGizmos = await prisma.artworkGizmo.findMany()
     * 
     * // Get first 10 ArtworkGizmos
     * const artworkGizmos = await prisma.artworkGizmo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artworkGizmoWithIdOnly = await prisma.artworkGizmo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtworkGizmoFindManyArgs>(args?: SelectSubset<T, ArtworkGizmoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArtworkGizmo.
     * @param {ArtworkGizmoCreateArgs} args - Arguments to create a ArtworkGizmo.
     * @example
     * // Create one ArtworkGizmo
     * const ArtworkGizmo = await prisma.artworkGizmo.create({
     *   data: {
     *     // ... data to create a ArtworkGizmo
     *   }
     * })
     * 
     */
    create<T extends ArtworkGizmoCreateArgs>(args: SelectSubset<T, ArtworkGizmoCreateArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArtworkGizmos.
     * @param {ArtworkGizmoCreateManyArgs} args - Arguments to create many ArtworkGizmos.
     * @example
     * // Create many ArtworkGizmos
     * const artworkGizmo = await prisma.artworkGizmo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtworkGizmoCreateManyArgs>(args?: SelectSubset<T, ArtworkGizmoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArtworkGizmos and returns the data saved in the database.
     * @param {ArtworkGizmoCreateManyAndReturnArgs} args - Arguments to create many ArtworkGizmos.
     * @example
     * // Create many ArtworkGizmos
     * const artworkGizmo = await prisma.artworkGizmo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArtworkGizmos and only return the `id`
     * const artworkGizmoWithIdOnly = await prisma.artworkGizmo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtworkGizmoCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtworkGizmoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArtworkGizmo.
     * @param {ArtworkGizmoDeleteArgs} args - Arguments to delete one ArtworkGizmo.
     * @example
     * // Delete one ArtworkGizmo
     * const ArtworkGizmo = await prisma.artworkGizmo.delete({
     *   where: {
     *     // ... filter to delete one ArtworkGizmo
     *   }
     * })
     * 
     */
    delete<T extends ArtworkGizmoDeleteArgs>(args: SelectSubset<T, ArtworkGizmoDeleteArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArtworkGizmo.
     * @param {ArtworkGizmoUpdateArgs} args - Arguments to update one ArtworkGizmo.
     * @example
     * // Update one ArtworkGizmo
     * const artworkGizmo = await prisma.artworkGizmo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtworkGizmoUpdateArgs>(args: SelectSubset<T, ArtworkGizmoUpdateArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArtworkGizmos.
     * @param {ArtworkGizmoDeleteManyArgs} args - Arguments to filter ArtworkGizmos to delete.
     * @example
     * // Delete a few ArtworkGizmos
     * const { count } = await prisma.artworkGizmo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtworkGizmoDeleteManyArgs>(args?: SelectSubset<T, ArtworkGizmoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtworkGizmos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGizmoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArtworkGizmos
     * const artworkGizmo = await prisma.artworkGizmo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtworkGizmoUpdateManyArgs>(args: SelectSubset<T, ArtworkGizmoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtworkGizmos and returns the data updated in the database.
     * @param {ArtworkGizmoUpdateManyAndReturnArgs} args - Arguments to update many ArtworkGizmos.
     * @example
     * // Update many ArtworkGizmos
     * const artworkGizmo = await prisma.artworkGizmo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArtworkGizmos and only return the `id`
     * const artworkGizmoWithIdOnly = await prisma.artworkGizmo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtworkGizmoUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtworkGizmoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArtworkGizmo.
     * @param {ArtworkGizmoUpsertArgs} args - Arguments to update or create a ArtworkGizmo.
     * @example
     * // Update or create a ArtworkGizmo
     * const artworkGizmo = await prisma.artworkGizmo.upsert({
     *   create: {
     *     // ... data to create a ArtworkGizmo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArtworkGizmo we want to update
     *   }
     * })
     */
    upsert<T extends ArtworkGizmoUpsertArgs>(args: SelectSubset<T, ArtworkGizmoUpsertArgs<ExtArgs>>): Prisma__ArtworkGizmoClient<$Result.GetResult<Prisma.$ArtworkGizmoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArtworkGizmos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGizmoCountArgs} args - Arguments to filter ArtworkGizmos to count.
     * @example
     * // Count the number of ArtworkGizmos
     * const count = await prisma.artworkGizmo.count({
     *   where: {
     *     // ... the filter for the ArtworkGizmos we want to count
     *   }
     * })
    **/
    count<T extends ArtworkGizmoCountArgs>(
      args?: Subset<T, ArtworkGizmoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtworkGizmoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArtworkGizmo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGizmoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtworkGizmoAggregateArgs>(args: Subset<T, ArtworkGizmoAggregateArgs>): Prisma.PrismaPromise<GetArtworkGizmoAggregateType<T>>

    /**
     * Group by ArtworkGizmo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkGizmoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtworkGizmoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtworkGizmoGroupByArgs['orderBy'] }
        : { orderBy?: ArtworkGizmoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtworkGizmoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtworkGizmoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArtworkGizmo model
   */
  readonly fields: ArtworkGizmoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArtworkGizmo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtworkGizmoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    artwork_file<T extends ArtworkFileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtworkFileDefaultArgs<ExtArgs>>): Prisma__ArtworkFileClient<$Result.GetResult<Prisma.$ArtworkFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArtworkGizmo model
   */
  interface ArtworkGizmoFieldRefs {
    readonly id: FieldRef<"ArtworkGizmo", 'Int'>
    readonly artwork_file_id: FieldRef<"ArtworkGizmo", 'Int'>
    readonly transportX: FieldRef<"ArtworkGizmo", 'Int'>
    readonly transportY: FieldRef<"ArtworkGizmo", 'Int'>
    readonly transportZ: FieldRef<"ArtworkGizmo", 'Int'>
    readonly rotateX: FieldRef<"ArtworkGizmo", 'Int'>
    readonly rotateY: FieldRef<"ArtworkGizmo", 'Int'>
    readonly rotateZ: FieldRef<"ArtworkGizmo", 'Int'>
    readonly scaleX: FieldRef<"ArtworkGizmo", 'Int'>
    readonly scaleY: FieldRef<"ArtworkGizmo", 'Int'>
    readonly scaleZ: FieldRef<"ArtworkGizmo", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ArtworkGizmo findUnique
   */
  export type ArtworkGizmoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkGizmo to fetch.
     */
    where: ArtworkGizmoWhereUniqueInput
  }

  /**
   * ArtworkGizmo findUniqueOrThrow
   */
  export type ArtworkGizmoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkGizmo to fetch.
     */
    where: ArtworkGizmoWhereUniqueInput
  }

  /**
   * ArtworkGizmo findFirst
   */
  export type ArtworkGizmoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkGizmo to fetch.
     */
    where?: ArtworkGizmoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkGizmos to fetch.
     */
    orderBy?: ArtworkGizmoOrderByWithRelationInput | ArtworkGizmoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtworkGizmos.
     */
    cursor?: ArtworkGizmoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkGizmos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkGizmos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtworkGizmos.
     */
    distinct?: ArtworkGizmoScalarFieldEnum | ArtworkGizmoScalarFieldEnum[]
  }

  /**
   * ArtworkGizmo findFirstOrThrow
   */
  export type ArtworkGizmoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkGizmo to fetch.
     */
    where?: ArtworkGizmoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkGizmos to fetch.
     */
    orderBy?: ArtworkGizmoOrderByWithRelationInput | ArtworkGizmoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtworkGizmos.
     */
    cursor?: ArtworkGizmoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkGizmos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkGizmos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtworkGizmos.
     */
    distinct?: ArtworkGizmoScalarFieldEnum | ArtworkGizmoScalarFieldEnum[]
  }

  /**
   * ArtworkGizmo findMany
   */
  export type ArtworkGizmoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkGizmos to fetch.
     */
    where?: ArtworkGizmoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkGizmos to fetch.
     */
    orderBy?: ArtworkGizmoOrderByWithRelationInput | ArtworkGizmoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArtworkGizmos.
     */
    cursor?: ArtworkGizmoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkGizmos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkGizmos.
     */
    skip?: number
    distinct?: ArtworkGizmoScalarFieldEnum | ArtworkGizmoScalarFieldEnum[]
  }

  /**
   * ArtworkGizmo create
   */
  export type ArtworkGizmoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * The data needed to create a ArtworkGizmo.
     */
    data: XOR<ArtworkGizmoCreateInput, ArtworkGizmoUncheckedCreateInput>
  }

  /**
   * ArtworkGizmo createMany
   */
  export type ArtworkGizmoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArtworkGizmos.
     */
    data: ArtworkGizmoCreateManyInput | ArtworkGizmoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArtworkGizmo createManyAndReturn
   */
  export type ArtworkGizmoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * The data used to create many ArtworkGizmos.
     */
    data: ArtworkGizmoCreateManyInput | ArtworkGizmoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtworkGizmo update
   */
  export type ArtworkGizmoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * The data needed to update a ArtworkGizmo.
     */
    data: XOR<ArtworkGizmoUpdateInput, ArtworkGizmoUncheckedUpdateInput>
    /**
     * Choose, which ArtworkGizmo to update.
     */
    where: ArtworkGizmoWhereUniqueInput
  }

  /**
   * ArtworkGizmo updateMany
   */
  export type ArtworkGizmoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArtworkGizmos.
     */
    data: XOR<ArtworkGizmoUpdateManyMutationInput, ArtworkGizmoUncheckedUpdateManyInput>
    /**
     * Filter which ArtworkGizmos to update
     */
    where?: ArtworkGizmoWhereInput
    /**
     * Limit how many ArtworkGizmos to update.
     */
    limit?: number
  }

  /**
   * ArtworkGizmo updateManyAndReturn
   */
  export type ArtworkGizmoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * The data used to update ArtworkGizmos.
     */
    data: XOR<ArtworkGizmoUpdateManyMutationInput, ArtworkGizmoUncheckedUpdateManyInput>
    /**
     * Filter which ArtworkGizmos to update
     */
    where?: ArtworkGizmoWhereInput
    /**
     * Limit how many ArtworkGizmos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtworkGizmo upsert
   */
  export type ArtworkGizmoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * The filter to search for the ArtworkGizmo to update in case it exists.
     */
    where: ArtworkGizmoWhereUniqueInput
    /**
     * In case the ArtworkGizmo found by the `where` argument doesn't exist, create a new ArtworkGizmo with this data.
     */
    create: XOR<ArtworkGizmoCreateInput, ArtworkGizmoUncheckedCreateInput>
    /**
     * In case the ArtworkGizmo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtworkGizmoUpdateInput, ArtworkGizmoUncheckedUpdateInput>
  }

  /**
   * ArtworkGizmo delete
   */
  export type ArtworkGizmoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
    /**
     * Filter which ArtworkGizmo to delete.
     */
    where: ArtworkGizmoWhereUniqueInput
  }

  /**
   * ArtworkGizmo deleteMany
   */
  export type ArtworkGizmoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtworkGizmos to delete
     */
    where?: ArtworkGizmoWhereInput
    /**
     * Limit how many ArtworkGizmos to delete.
     */
    limit?: number
  }

  /**
   * ArtworkGizmo without action
   */
  export type ArtworkGizmoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkGizmo
     */
    select?: ArtworkGizmoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkGizmo
     */
    omit?: ArtworkGizmoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkGizmoInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    artwork_id: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    artwork_id: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    slug_id: string | null
    user_id: number | null
    artwork_id: number | null
    body: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    slug_id: string | null
    user_id: number | null
    artwork_id: number | null
    body: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    slug_id: number
    user_id: number
    artwork_id: number
    body: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    user_id?: true
    artwork_id?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    user_id?: true
    artwork_id?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    slug_id?: true
    user_id?: true
    artwork_id?: true
    body?: true
    created_at?: true
    updated_at?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    slug_id?: true
    user_id?: true
    artwork_id?: true
    body?: true
    created_at?: true
    updated_at?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    slug_id?: true
    user_id?: true
    artwork_id?: true
    body?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    slug_id: string
    user_id: number
    artwork_id: number
    body: string
    created_at: Date
    updated_at: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    artwork_id?: boolean
    body?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | Comment$userArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    artwork_id?: boolean
    body?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | Comment$userArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    artwork_id?: boolean
    body?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | Comment$userArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    slug_id?: boolean
    user_id?: boolean
    artwork_id?: boolean
    body?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug_id" | "user_id" | "artwork_id" | "body" | "created_at" | "updated_at", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Comment$userArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Comment$userArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Comment$userArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      artwork: Prisma.$ArtworkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug_id: string
      user_id: number
      artwork_id: number
      body: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Comment$userArgs<ExtArgs> = {}>(args?: Subset<T, Comment$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    artwork<T extends ArtworkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtworkDefaultArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly slug_id: FieldRef<"Comment", 'String'>
    readonly user_id: FieldRef<"Comment", 'Int'>
    readonly artwork_id: FieldRef<"Comment", 'Int'>
    readonly body: FieldRef<"Comment", 'String'>
    readonly created_at: FieldRef<"Comment", 'DateTime'>
    readonly updated_at: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment.user
   */
  export type Comment$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model ArtworkRanks
   */

  export type AggregateArtworkRanks = {
    _count: ArtworkRanksCountAggregateOutputType | null
    _avg: ArtworkRanksAvgAggregateOutputType | null
    _sum: ArtworkRanksSumAggregateOutputType | null
    _min: ArtworkRanksMinAggregateOutputType | null
    _max: ArtworkRanksMaxAggregateOutputType | null
  }

  export type ArtworkRanksAvgAggregateOutputType = {
    id: number | null
    artwork_id: number | null
    rank_id: number | null
    user_id: number | null
  }

  export type ArtworkRanksSumAggregateOutputType = {
    id: number | null
    artwork_id: number | null
    rank_id: number | null
    user_id: number | null
  }

  export type ArtworkRanksMinAggregateOutputType = {
    id: number | null
    artwork_id: number | null
    rank_id: number | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ArtworkRanksMaxAggregateOutputType = {
    id: number | null
    artwork_id: number | null
    rank_id: number | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ArtworkRanksCountAggregateOutputType = {
    id: number
    artwork_id: number
    rank_id: number
    user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ArtworkRanksAvgAggregateInputType = {
    id?: true
    artwork_id?: true
    rank_id?: true
    user_id?: true
  }

  export type ArtworkRanksSumAggregateInputType = {
    id?: true
    artwork_id?: true
    rank_id?: true
    user_id?: true
  }

  export type ArtworkRanksMinAggregateInputType = {
    id?: true
    artwork_id?: true
    rank_id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ArtworkRanksMaxAggregateInputType = {
    id?: true
    artwork_id?: true
    rank_id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ArtworkRanksCountAggregateInputType = {
    id?: true
    artwork_id?: true
    rank_id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ArtworkRanksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtworkRanks to aggregate.
     */
    where?: ArtworkRanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkRanks to fetch.
     */
    orderBy?: ArtworkRanksOrderByWithRelationInput | ArtworkRanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtworkRanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkRanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArtworkRanks
    **/
    _count?: true | ArtworkRanksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtworkRanksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtworkRanksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtworkRanksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtworkRanksMaxAggregateInputType
  }

  export type GetArtworkRanksAggregateType<T extends ArtworkRanksAggregateArgs> = {
        [P in keyof T & keyof AggregateArtworkRanks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtworkRanks[P]>
      : GetScalarType<T[P], AggregateArtworkRanks[P]>
  }




  export type ArtworkRanksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtworkRanksWhereInput
    orderBy?: ArtworkRanksOrderByWithAggregationInput | ArtworkRanksOrderByWithAggregationInput[]
    by: ArtworkRanksScalarFieldEnum[] | ArtworkRanksScalarFieldEnum
    having?: ArtworkRanksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtworkRanksCountAggregateInputType | true
    _avg?: ArtworkRanksAvgAggregateInputType
    _sum?: ArtworkRanksSumAggregateInputType
    _min?: ArtworkRanksMinAggregateInputType
    _max?: ArtworkRanksMaxAggregateInputType
  }

  export type ArtworkRanksGroupByOutputType = {
    id: number
    artwork_id: number
    rank_id: number
    user_id: number
    created_at: Date
    updated_at: Date
    _count: ArtworkRanksCountAggregateOutputType | null
    _avg: ArtworkRanksAvgAggregateOutputType | null
    _sum: ArtworkRanksSumAggregateOutputType | null
    _min: ArtworkRanksMinAggregateOutputType | null
    _max: ArtworkRanksMaxAggregateOutputType | null
  }

  type GetArtworkRanksGroupByPayload<T extends ArtworkRanksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtworkRanksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtworkRanksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtworkRanksGroupByOutputType[P]>
            : GetScalarType<T[P], ArtworkRanksGroupByOutputType[P]>
        }
      >
    >


  export type ArtworkRanksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_id?: boolean
    rank_id?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    ranks?: boolean | RanksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkRanks"]>

  export type ArtworkRanksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_id?: boolean
    rank_id?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    ranks?: boolean | RanksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkRanks"]>

  export type ArtworkRanksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    artwork_id?: boolean
    rank_id?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    ranks?: boolean | RanksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artworkRanks"]>

  export type ArtworkRanksSelectScalar = {
    id?: boolean
    artwork_id?: boolean
    rank_id?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ArtworkRanksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "artwork_id" | "rank_id" | "user_id" | "created_at" | "updated_at", ExtArgs["result"]["artworkRanks"]>
  export type ArtworkRanksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    ranks?: boolean | RanksDefaultArgs<ExtArgs>
  }
  export type ArtworkRanksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    ranks?: boolean | RanksDefaultArgs<ExtArgs>
  }
  export type ArtworkRanksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    artwork?: boolean | ArtworkDefaultArgs<ExtArgs>
    ranks?: boolean | RanksDefaultArgs<ExtArgs>
  }

  export type $ArtworkRanksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArtworkRanks"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      artwork: Prisma.$ArtworkPayload<ExtArgs>
      ranks: Prisma.$RanksPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      artwork_id: number
      rank_id: number
      user_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["artworkRanks"]>
    composites: {}
  }

  type ArtworkRanksGetPayload<S extends boolean | null | undefined | ArtworkRanksDefaultArgs> = $Result.GetResult<Prisma.$ArtworkRanksPayload, S>

  type ArtworkRanksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtworkRanksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtworkRanksCountAggregateInputType | true
    }

  export interface ArtworkRanksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArtworkRanks'], meta: { name: 'ArtworkRanks' } }
    /**
     * Find zero or one ArtworkRanks that matches the filter.
     * @param {ArtworkRanksFindUniqueArgs} args - Arguments to find a ArtworkRanks
     * @example
     * // Get one ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtworkRanksFindUniqueArgs>(args: SelectSubset<T, ArtworkRanksFindUniqueArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArtworkRanks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtworkRanksFindUniqueOrThrowArgs} args - Arguments to find a ArtworkRanks
     * @example
     * // Get one ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtworkRanksFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtworkRanksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtworkRanks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkRanksFindFirstArgs} args - Arguments to find a ArtworkRanks
     * @example
     * // Get one ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtworkRanksFindFirstArgs>(args?: SelectSubset<T, ArtworkRanksFindFirstArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtworkRanks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkRanksFindFirstOrThrowArgs} args - Arguments to find a ArtworkRanks
     * @example
     * // Get one ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtworkRanksFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtworkRanksFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArtworkRanks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkRanksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.findMany()
     * 
     * // Get first 10 ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artworkRanksWithIdOnly = await prisma.artworkRanks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtworkRanksFindManyArgs>(args?: SelectSubset<T, ArtworkRanksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArtworkRanks.
     * @param {ArtworkRanksCreateArgs} args - Arguments to create a ArtworkRanks.
     * @example
     * // Create one ArtworkRanks
     * const ArtworkRanks = await prisma.artworkRanks.create({
     *   data: {
     *     // ... data to create a ArtworkRanks
     *   }
     * })
     * 
     */
    create<T extends ArtworkRanksCreateArgs>(args: SelectSubset<T, ArtworkRanksCreateArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArtworkRanks.
     * @param {ArtworkRanksCreateManyArgs} args - Arguments to create many ArtworkRanks.
     * @example
     * // Create many ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtworkRanksCreateManyArgs>(args?: SelectSubset<T, ArtworkRanksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArtworkRanks and returns the data saved in the database.
     * @param {ArtworkRanksCreateManyAndReturnArgs} args - Arguments to create many ArtworkRanks.
     * @example
     * // Create many ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArtworkRanks and only return the `id`
     * const artworkRanksWithIdOnly = await prisma.artworkRanks.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtworkRanksCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtworkRanksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArtworkRanks.
     * @param {ArtworkRanksDeleteArgs} args - Arguments to delete one ArtworkRanks.
     * @example
     * // Delete one ArtworkRanks
     * const ArtworkRanks = await prisma.artworkRanks.delete({
     *   where: {
     *     // ... filter to delete one ArtworkRanks
     *   }
     * })
     * 
     */
    delete<T extends ArtworkRanksDeleteArgs>(args: SelectSubset<T, ArtworkRanksDeleteArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArtworkRanks.
     * @param {ArtworkRanksUpdateArgs} args - Arguments to update one ArtworkRanks.
     * @example
     * // Update one ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtworkRanksUpdateArgs>(args: SelectSubset<T, ArtworkRanksUpdateArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArtworkRanks.
     * @param {ArtworkRanksDeleteManyArgs} args - Arguments to filter ArtworkRanks to delete.
     * @example
     * // Delete a few ArtworkRanks
     * const { count } = await prisma.artworkRanks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtworkRanksDeleteManyArgs>(args?: SelectSubset<T, ArtworkRanksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtworkRanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkRanksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtworkRanksUpdateManyArgs>(args: SelectSubset<T, ArtworkRanksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtworkRanks and returns the data updated in the database.
     * @param {ArtworkRanksUpdateManyAndReturnArgs} args - Arguments to update many ArtworkRanks.
     * @example
     * // Update many ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArtworkRanks and only return the `id`
     * const artworkRanksWithIdOnly = await prisma.artworkRanks.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtworkRanksUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtworkRanksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArtworkRanks.
     * @param {ArtworkRanksUpsertArgs} args - Arguments to update or create a ArtworkRanks.
     * @example
     * // Update or create a ArtworkRanks
     * const artworkRanks = await prisma.artworkRanks.upsert({
     *   create: {
     *     // ... data to create a ArtworkRanks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArtworkRanks we want to update
     *   }
     * })
     */
    upsert<T extends ArtworkRanksUpsertArgs>(args: SelectSubset<T, ArtworkRanksUpsertArgs<ExtArgs>>): Prisma__ArtworkRanksClient<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArtworkRanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkRanksCountArgs} args - Arguments to filter ArtworkRanks to count.
     * @example
     * // Count the number of ArtworkRanks
     * const count = await prisma.artworkRanks.count({
     *   where: {
     *     // ... the filter for the ArtworkRanks we want to count
     *   }
     * })
    **/
    count<T extends ArtworkRanksCountArgs>(
      args?: Subset<T, ArtworkRanksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtworkRanksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArtworkRanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkRanksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtworkRanksAggregateArgs>(args: Subset<T, ArtworkRanksAggregateArgs>): Prisma.PrismaPromise<GetArtworkRanksAggregateType<T>>

    /**
     * Group by ArtworkRanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtworkRanksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtworkRanksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtworkRanksGroupByArgs['orderBy'] }
        : { orderBy?: ArtworkRanksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtworkRanksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtworkRanksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArtworkRanks model
   */
  readonly fields: ArtworkRanksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArtworkRanks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtworkRanksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    artwork<T extends ArtworkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtworkDefaultArgs<ExtArgs>>): Prisma__ArtworkClient<$Result.GetResult<Prisma.$ArtworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ranks<T extends RanksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RanksDefaultArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArtworkRanks model
   */
  interface ArtworkRanksFieldRefs {
    readonly id: FieldRef<"ArtworkRanks", 'Int'>
    readonly artwork_id: FieldRef<"ArtworkRanks", 'Int'>
    readonly rank_id: FieldRef<"ArtworkRanks", 'Int'>
    readonly user_id: FieldRef<"ArtworkRanks", 'Int'>
    readonly created_at: FieldRef<"ArtworkRanks", 'DateTime'>
    readonly updated_at: FieldRef<"ArtworkRanks", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArtworkRanks findUnique
   */
  export type ArtworkRanksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkRanks to fetch.
     */
    where: ArtworkRanksWhereUniqueInput
  }

  /**
   * ArtworkRanks findUniqueOrThrow
   */
  export type ArtworkRanksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkRanks to fetch.
     */
    where: ArtworkRanksWhereUniqueInput
  }

  /**
   * ArtworkRanks findFirst
   */
  export type ArtworkRanksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkRanks to fetch.
     */
    where?: ArtworkRanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkRanks to fetch.
     */
    orderBy?: ArtworkRanksOrderByWithRelationInput | ArtworkRanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtworkRanks.
     */
    cursor?: ArtworkRanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkRanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtworkRanks.
     */
    distinct?: ArtworkRanksScalarFieldEnum | ArtworkRanksScalarFieldEnum[]
  }

  /**
   * ArtworkRanks findFirstOrThrow
   */
  export type ArtworkRanksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkRanks to fetch.
     */
    where?: ArtworkRanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkRanks to fetch.
     */
    orderBy?: ArtworkRanksOrderByWithRelationInput | ArtworkRanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtworkRanks.
     */
    cursor?: ArtworkRanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkRanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtworkRanks.
     */
    distinct?: ArtworkRanksScalarFieldEnum | ArtworkRanksScalarFieldEnum[]
  }

  /**
   * ArtworkRanks findMany
   */
  export type ArtworkRanksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * Filter, which ArtworkRanks to fetch.
     */
    where?: ArtworkRanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtworkRanks to fetch.
     */
    orderBy?: ArtworkRanksOrderByWithRelationInput | ArtworkRanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArtworkRanks.
     */
    cursor?: ArtworkRanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtworkRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtworkRanks.
     */
    skip?: number
    distinct?: ArtworkRanksScalarFieldEnum | ArtworkRanksScalarFieldEnum[]
  }

  /**
   * ArtworkRanks create
   */
  export type ArtworkRanksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * The data needed to create a ArtworkRanks.
     */
    data: XOR<ArtworkRanksCreateInput, ArtworkRanksUncheckedCreateInput>
  }

  /**
   * ArtworkRanks createMany
   */
  export type ArtworkRanksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArtworkRanks.
     */
    data: ArtworkRanksCreateManyInput | ArtworkRanksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArtworkRanks createManyAndReturn
   */
  export type ArtworkRanksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * The data used to create many ArtworkRanks.
     */
    data: ArtworkRanksCreateManyInput | ArtworkRanksCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtworkRanks update
   */
  export type ArtworkRanksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * The data needed to update a ArtworkRanks.
     */
    data: XOR<ArtworkRanksUpdateInput, ArtworkRanksUncheckedUpdateInput>
    /**
     * Choose, which ArtworkRanks to update.
     */
    where: ArtworkRanksWhereUniqueInput
  }

  /**
   * ArtworkRanks updateMany
   */
  export type ArtworkRanksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArtworkRanks.
     */
    data: XOR<ArtworkRanksUpdateManyMutationInput, ArtworkRanksUncheckedUpdateManyInput>
    /**
     * Filter which ArtworkRanks to update
     */
    where?: ArtworkRanksWhereInput
    /**
     * Limit how many ArtworkRanks to update.
     */
    limit?: number
  }

  /**
   * ArtworkRanks updateManyAndReturn
   */
  export type ArtworkRanksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * The data used to update ArtworkRanks.
     */
    data: XOR<ArtworkRanksUpdateManyMutationInput, ArtworkRanksUncheckedUpdateManyInput>
    /**
     * Filter which ArtworkRanks to update
     */
    where?: ArtworkRanksWhereInput
    /**
     * Limit how many ArtworkRanks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtworkRanks upsert
   */
  export type ArtworkRanksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * The filter to search for the ArtworkRanks to update in case it exists.
     */
    where: ArtworkRanksWhereUniqueInput
    /**
     * In case the ArtworkRanks found by the `where` argument doesn't exist, create a new ArtworkRanks with this data.
     */
    create: XOR<ArtworkRanksCreateInput, ArtworkRanksUncheckedCreateInput>
    /**
     * In case the ArtworkRanks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtworkRanksUpdateInput, ArtworkRanksUncheckedUpdateInput>
  }

  /**
   * ArtworkRanks delete
   */
  export type ArtworkRanksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    /**
     * Filter which ArtworkRanks to delete.
     */
    where: ArtworkRanksWhereUniqueInput
  }

  /**
   * ArtworkRanks deleteMany
   */
  export type ArtworkRanksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtworkRanks to delete
     */
    where?: ArtworkRanksWhereInput
    /**
     * Limit how many ArtworkRanks to delete.
     */
    limit?: number
  }

  /**
   * ArtworkRanks without action
   */
  export type ArtworkRanksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
  }


  /**
   * Model Ranks
   */

  export type AggregateRanks = {
    _count: RanksCountAggregateOutputType | null
    _avg: RanksAvgAggregateOutputType | null
    _sum: RanksSumAggregateOutputType | null
    _min: RanksMinAggregateOutputType | null
    _max: RanksMaxAggregateOutputType | null
  }

  export type RanksAvgAggregateOutputType = {
    id: number | null
    rank_type_id: number | null
  }

  export type RanksSumAggregateOutputType = {
    id: number | null
    rank_type_id: number | null
  }

  export type RanksMinAggregateOutputType = {
    id: number | null
    name: string | null
    rank_type_id: number | null
  }

  export type RanksMaxAggregateOutputType = {
    id: number | null
    name: string | null
    rank_type_id: number | null
  }

  export type RanksCountAggregateOutputType = {
    id: number
    name: number
    rank_type_id: number
    _all: number
  }


  export type RanksAvgAggregateInputType = {
    id?: true
    rank_type_id?: true
  }

  export type RanksSumAggregateInputType = {
    id?: true
    rank_type_id?: true
  }

  export type RanksMinAggregateInputType = {
    id?: true
    name?: true
    rank_type_id?: true
  }

  export type RanksMaxAggregateInputType = {
    id?: true
    name?: true
    rank_type_id?: true
  }

  export type RanksCountAggregateInputType = {
    id?: true
    name?: true
    rank_type_id?: true
    _all?: true
  }

  export type RanksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ranks to aggregate.
     */
    where?: RanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ranks to fetch.
     */
    orderBy?: RanksOrderByWithRelationInput | RanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ranks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ranks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ranks
    **/
    _count?: true | RanksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RanksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RanksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RanksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RanksMaxAggregateInputType
  }

  export type GetRanksAggregateType<T extends RanksAggregateArgs> = {
        [P in keyof T & keyof AggregateRanks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRanks[P]>
      : GetScalarType<T[P], AggregateRanks[P]>
  }




  export type RanksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RanksWhereInput
    orderBy?: RanksOrderByWithAggregationInput | RanksOrderByWithAggregationInput[]
    by: RanksScalarFieldEnum[] | RanksScalarFieldEnum
    having?: RanksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RanksCountAggregateInputType | true
    _avg?: RanksAvgAggregateInputType
    _sum?: RanksSumAggregateInputType
    _min?: RanksMinAggregateInputType
    _max?: RanksMaxAggregateInputType
  }

  export type RanksGroupByOutputType = {
    id: number
    name: string
    rank_type_id: number
    _count: RanksCountAggregateOutputType | null
    _avg: RanksAvgAggregateOutputType | null
    _sum: RanksSumAggregateOutputType | null
    _min: RanksMinAggregateOutputType | null
    _max: RanksMaxAggregateOutputType | null
  }

  type GetRanksGroupByPayload<T extends RanksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RanksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RanksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RanksGroupByOutputType[P]>
            : GetScalarType<T[P], RanksGroupByOutputType[P]>
        }
      >
    >


  export type RanksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rank_type_id?: boolean
    artwork_ranks?: boolean | Ranks$artwork_ranksArgs<ExtArgs>
    rank_type?: boolean | RankTypesDefaultArgs<ExtArgs>
    _count?: boolean | RanksCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ranks"]>

  export type RanksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rank_type_id?: boolean
    rank_type?: boolean | RankTypesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ranks"]>

  export type RanksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rank_type_id?: boolean
    rank_type?: boolean | RankTypesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ranks"]>

  export type RanksSelectScalar = {
    id?: boolean
    name?: boolean
    rank_type_id?: boolean
  }

  export type RanksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "rank_type_id", ExtArgs["result"]["ranks"]>
  export type RanksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artwork_ranks?: boolean | Ranks$artwork_ranksArgs<ExtArgs>
    rank_type?: boolean | RankTypesDefaultArgs<ExtArgs>
    _count?: boolean | RanksCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RanksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rank_type?: boolean | RankTypesDefaultArgs<ExtArgs>
  }
  export type RanksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rank_type?: boolean | RankTypesDefaultArgs<ExtArgs>
  }

  export type $RanksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ranks"
    objects: {
      artwork_ranks: Prisma.$ArtworkRanksPayload<ExtArgs>[]
      rank_type: Prisma.$RankTypesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      rank_type_id: number
    }, ExtArgs["result"]["ranks"]>
    composites: {}
  }

  type RanksGetPayload<S extends boolean | null | undefined | RanksDefaultArgs> = $Result.GetResult<Prisma.$RanksPayload, S>

  type RanksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RanksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RanksCountAggregateInputType | true
    }

  export interface RanksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ranks'], meta: { name: 'Ranks' } }
    /**
     * Find zero or one Ranks that matches the filter.
     * @param {RanksFindUniqueArgs} args - Arguments to find a Ranks
     * @example
     * // Get one Ranks
     * const ranks = await prisma.ranks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RanksFindUniqueArgs>(args: SelectSubset<T, RanksFindUniqueArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ranks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RanksFindUniqueOrThrowArgs} args - Arguments to find a Ranks
     * @example
     * // Get one Ranks
     * const ranks = await prisma.ranks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RanksFindUniqueOrThrowArgs>(args: SelectSubset<T, RanksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ranks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RanksFindFirstArgs} args - Arguments to find a Ranks
     * @example
     * // Get one Ranks
     * const ranks = await prisma.ranks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RanksFindFirstArgs>(args?: SelectSubset<T, RanksFindFirstArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ranks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RanksFindFirstOrThrowArgs} args - Arguments to find a Ranks
     * @example
     * // Get one Ranks
     * const ranks = await prisma.ranks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RanksFindFirstOrThrowArgs>(args?: SelectSubset<T, RanksFindFirstOrThrowArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ranks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RanksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ranks
     * const ranks = await prisma.ranks.findMany()
     * 
     * // Get first 10 Ranks
     * const ranks = await prisma.ranks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ranksWithIdOnly = await prisma.ranks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RanksFindManyArgs>(args?: SelectSubset<T, RanksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ranks.
     * @param {RanksCreateArgs} args - Arguments to create a Ranks.
     * @example
     * // Create one Ranks
     * const Ranks = await prisma.ranks.create({
     *   data: {
     *     // ... data to create a Ranks
     *   }
     * })
     * 
     */
    create<T extends RanksCreateArgs>(args: SelectSubset<T, RanksCreateArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ranks.
     * @param {RanksCreateManyArgs} args - Arguments to create many Ranks.
     * @example
     * // Create many Ranks
     * const ranks = await prisma.ranks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RanksCreateManyArgs>(args?: SelectSubset<T, RanksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ranks and returns the data saved in the database.
     * @param {RanksCreateManyAndReturnArgs} args - Arguments to create many Ranks.
     * @example
     * // Create many Ranks
     * const ranks = await prisma.ranks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ranks and only return the `id`
     * const ranksWithIdOnly = await prisma.ranks.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RanksCreateManyAndReturnArgs>(args?: SelectSubset<T, RanksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ranks.
     * @param {RanksDeleteArgs} args - Arguments to delete one Ranks.
     * @example
     * // Delete one Ranks
     * const Ranks = await prisma.ranks.delete({
     *   where: {
     *     // ... filter to delete one Ranks
     *   }
     * })
     * 
     */
    delete<T extends RanksDeleteArgs>(args: SelectSubset<T, RanksDeleteArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ranks.
     * @param {RanksUpdateArgs} args - Arguments to update one Ranks.
     * @example
     * // Update one Ranks
     * const ranks = await prisma.ranks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RanksUpdateArgs>(args: SelectSubset<T, RanksUpdateArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ranks.
     * @param {RanksDeleteManyArgs} args - Arguments to filter Ranks to delete.
     * @example
     * // Delete a few Ranks
     * const { count } = await prisma.ranks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RanksDeleteManyArgs>(args?: SelectSubset<T, RanksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ranks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RanksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ranks
     * const ranks = await prisma.ranks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RanksUpdateManyArgs>(args: SelectSubset<T, RanksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ranks and returns the data updated in the database.
     * @param {RanksUpdateManyAndReturnArgs} args - Arguments to update many Ranks.
     * @example
     * // Update many Ranks
     * const ranks = await prisma.ranks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ranks and only return the `id`
     * const ranksWithIdOnly = await prisma.ranks.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RanksUpdateManyAndReturnArgs>(args: SelectSubset<T, RanksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ranks.
     * @param {RanksUpsertArgs} args - Arguments to update or create a Ranks.
     * @example
     * // Update or create a Ranks
     * const ranks = await prisma.ranks.upsert({
     *   create: {
     *     // ... data to create a Ranks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ranks we want to update
     *   }
     * })
     */
    upsert<T extends RanksUpsertArgs>(args: SelectSubset<T, RanksUpsertArgs<ExtArgs>>): Prisma__RanksClient<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ranks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RanksCountArgs} args - Arguments to filter Ranks to count.
     * @example
     * // Count the number of Ranks
     * const count = await prisma.ranks.count({
     *   where: {
     *     // ... the filter for the Ranks we want to count
     *   }
     * })
    **/
    count<T extends RanksCountArgs>(
      args?: Subset<T, RanksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RanksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ranks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RanksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RanksAggregateArgs>(args: Subset<T, RanksAggregateArgs>): Prisma.PrismaPromise<GetRanksAggregateType<T>>

    /**
     * Group by Ranks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RanksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RanksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RanksGroupByArgs['orderBy'] }
        : { orderBy?: RanksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RanksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRanksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ranks model
   */
  readonly fields: RanksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ranks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RanksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    artwork_ranks<T extends Ranks$artwork_ranksArgs<ExtArgs> = {}>(args?: Subset<T, Ranks$artwork_ranksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtworkRanksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rank_type<T extends RankTypesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RankTypesDefaultArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ranks model
   */
  interface RanksFieldRefs {
    readonly id: FieldRef<"Ranks", 'Int'>
    readonly name: FieldRef<"Ranks", 'String'>
    readonly rank_type_id: FieldRef<"Ranks", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Ranks findUnique
   */
  export type RanksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * Filter, which Ranks to fetch.
     */
    where: RanksWhereUniqueInput
  }

  /**
   * Ranks findUniqueOrThrow
   */
  export type RanksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * Filter, which Ranks to fetch.
     */
    where: RanksWhereUniqueInput
  }

  /**
   * Ranks findFirst
   */
  export type RanksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * Filter, which Ranks to fetch.
     */
    where?: RanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ranks to fetch.
     */
    orderBy?: RanksOrderByWithRelationInput | RanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ranks.
     */
    cursor?: RanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ranks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ranks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ranks.
     */
    distinct?: RanksScalarFieldEnum | RanksScalarFieldEnum[]
  }

  /**
   * Ranks findFirstOrThrow
   */
  export type RanksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * Filter, which Ranks to fetch.
     */
    where?: RanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ranks to fetch.
     */
    orderBy?: RanksOrderByWithRelationInput | RanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ranks.
     */
    cursor?: RanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ranks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ranks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ranks.
     */
    distinct?: RanksScalarFieldEnum | RanksScalarFieldEnum[]
  }

  /**
   * Ranks findMany
   */
  export type RanksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * Filter, which Ranks to fetch.
     */
    where?: RanksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ranks to fetch.
     */
    orderBy?: RanksOrderByWithRelationInput | RanksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ranks.
     */
    cursor?: RanksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ranks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ranks.
     */
    skip?: number
    distinct?: RanksScalarFieldEnum | RanksScalarFieldEnum[]
  }

  /**
   * Ranks create
   */
  export type RanksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * The data needed to create a Ranks.
     */
    data: XOR<RanksCreateInput, RanksUncheckedCreateInput>
  }

  /**
   * Ranks createMany
   */
  export type RanksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ranks.
     */
    data: RanksCreateManyInput | RanksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ranks createManyAndReturn
   */
  export type RanksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * The data used to create many Ranks.
     */
    data: RanksCreateManyInput | RanksCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ranks update
   */
  export type RanksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * The data needed to update a Ranks.
     */
    data: XOR<RanksUpdateInput, RanksUncheckedUpdateInput>
    /**
     * Choose, which Ranks to update.
     */
    where: RanksWhereUniqueInput
  }

  /**
   * Ranks updateMany
   */
  export type RanksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ranks.
     */
    data: XOR<RanksUpdateManyMutationInput, RanksUncheckedUpdateManyInput>
    /**
     * Filter which Ranks to update
     */
    where?: RanksWhereInput
    /**
     * Limit how many Ranks to update.
     */
    limit?: number
  }

  /**
   * Ranks updateManyAndReturn
   */
  export type RanksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * The data used to update Ranks.
     */
    data: XOR<RanksUpdateManyMutationInput, RanksUncheckedUpdateManyInput>
    /**
     * Filter which Ranks to update
     */
    where?: RanksWhereInput
    /**
     * Limit how many Ranks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ranks upsert
   */
  export type RanksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * The filter to search for the Ranks to update in case it exists.
     */
    where: RanksWhereUniqueInput
    /**
     * In case the Ranks found by the `where` argument doesn't exist, create a new Ranks with this data.
     */
    create: XOR<RanksCreateInput, RanksUncheckedCreateInput>
    /**
     * In case the Ranks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RanksUpdateInput, RanksUncheckedUpdateInput>
  }

  /**
   * Ranks delete
   */
  export type RanksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    /**
     * Filter which Ranks to delete.
     */
    where: RanksWhereUniqueInput
  }

  /**
   * Ranks deleteMany
   */
  export type RanksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ranks to delete
     */
    where?: RanksWhereInput
    /**
     * Limit how many Ranks to delete.
     */
    limit?: number
  }

  /**
   * Ranks.artwork_ranks
   */
  export type Ranks$artwork_ranksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtworkRanks
     */
    select?: ArtworkRanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtworkRanks
     */
    omit?: ArtworkRanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtworkRanksInclude<ExtArgs> | null
    where?: ArtworkRanksWhereInput
    orderBy?: ArtworkRanksOrderByWithRelationInput | ArtworkRanksOrderByWithRelationInput[]
    cursor?: ArtworkRanksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtworkRanksScalarFieldEnum | ArtworkRanksScalarFieldEnum[]
  }

  /**
   * Ranks without action
   */
  export type RanksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
  }


  /**
   * Model RankTypes
   */

  export type AggregateRankTypes = {
    _count: RankTypesCountAggregateOutputType | null
    _avg: RankTypesAvgAggregateOutputType | null
    _sum: RankTypesSumAggregateOutputType | null
    _min: RankTypesMinAggregateOutputType | null
    _max: RankTypesMaxAggregateOutputType | null
  }

  export type RankTypesAvgAggregateOutputType = {
    id: number | null
  }

  export type RankTypesSumAggregateOutputType = {
    id: number | null
  }

  export type RankTypesMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type RankTypesMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type RankTypesCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type RankTypesAvgAggregateInputType = {
    id?: true
  }

  export type RankTypesSumAggregateInputType = {
    id?: true
  }

  export type RankTypesMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type RankTypesMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type RankTypesCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type RankTypesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RankTypes to aggregate.
     */
    where?: RankTypesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankTypes to fetch.
     */
    orderBy?: RankTypesOrderByWithRelationInput | RankTypesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RankTypesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RankTypes
    **/
    _count?: true | RankTypesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RankTypesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RankTypesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RankTypesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RankTypesMaxAggregateInputType
  }

  export type GetRankTypesAggregateType<T extends RankTypesAggregateArgs> = {
        [P in keyof T & keyof AggregateRankTypes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRankTypes[P]>
      : GetScalarType<T[P], AggregateRankTypes[P]>
  }




  export type RankTypesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RankTypesWhereInput
    orderBy?: RankTypesOrderByWithAggregationInput | RankTypesOrderByWithAggregationInput[]
    by: RankTypesScalarFieldEnum[] | RankTypesScalarFieldEnum
    having?: RankTypesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RankTypesCountAggregateInputType | true
    _avg?: RankTypesAvgAggregateInputType
    _sum?: RankTypesSumAggregateInputType
    _min?: RankTypesMinAggregateInputType
    _max?: RankTypesMaxAggregateInputType
  }

  export type RankTypesGroupByOutputType = {
    id: number
    name: string
    _count: RankTypesCountAggregateOutputType | null
    _avg: RankTypesAvgAggregateOutputType | null
    _sum: RankTypesSumAggregateOutputType | null
    _min: RankTypesMinAggregateOutputType | null
    _max: RankTypesMaxAggregateOutputType | null
  }

  type GetRankTypesGroupByPayload<T extends RankTypesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RankTypesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RankTypesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RankTypesGroupByOutputType[P]>
            : GetScalarType<T[P], RankTypesGroupByOutputType[P]>
        }
      >
    >


  export type RankTypesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ranks?: boolean | RankTypes$ranksArgs<ExtArgs>
    _count?: boolean | RankTypesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rankTypes"]>

  export type RankTypesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["rankTypes"]>

  export type RankTypesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["rankTypes"]>

  export type RankTypesSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type RankTypesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["rankTypes"]>
  export type RankTypesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ranks?: boolean | RankTypes$ranksArgs<ExtArgs>
    _count?: boolean | RankTypesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RankTypesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RankTypesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RankTypesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RankTypes"
    objects: {
      ranks: Prisma.$RanksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["rankTypes"]>
    composites: {}
  }

  type RankTypesGetPayload<S extends boolean | null | undefined | RankTypesDefaultArgs> = $Result.GetResult<Prisma.$RankTypesPayload, S>

  type RankTypesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RankTypesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RankTypesCountAggregateInputType | true
    }

  export interface RankTypesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RankTypes'], meta: { name: 'RankTypes' } }
    /**
     * Find zero or one RankTypes that matches the filter.
     * @param {RankTypesFindUniqueArgs} args - Arguments to find a RankTypes
     * @example
     * // Get one RankTypes
     * const rankTypes = await prisma.rankTypes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RankTypesFindUniqueArgs>(args: SelectSubset<T, RankTypesFindUniqueArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RankTypes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RankTypesFindUniqueOrThrowArgs} args - Arguments to find a RankTypes
     * @example
     * // Get one RankTypes
     * const rankTypes = await prisma.rankTypes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RankTypesFindUniqueOrThrowArgs>(args: SelectSubset<T, RankTypesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RankTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankTypesFindFirstArgs} args - Arguments to find a RankTypes
     * @example
     * // Get one RankTypes
     * const rankTypes = await prisma.rankTypes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RankTypesFindFirstArgs>(args?: SelectSubset<T, RankTypesFindFirstArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RankTypes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankTypesFindFirstOrThrowArgs} args - Arguments to find a RankTypes
     * @example
     * // Get one RankTypes
     * const rankTypes = await prisma.rankTypes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RankTypesFindFirstOrThrowArgs>(args?: SelectSubset<T, RankTypesFindFirstOrThrowArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RankTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankTypesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RankTypes
     * const rankTypes = await prisma.rankTypes.findMany()
     * 
     * // Get first 10 RankTypes
     * const rankTypes = await prisma.rankTypes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rankTypesWithIdOnly = await prisma.rankTypes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RankTypesFindManyArgs>(args?: SelectSubset<T, RankTypesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RankTypes.
     * @param {RankTypesCreateArgs} args - Arguments to create a RankTypes.
     * @example
     * // Create one RankTypes
     * const RankTypes = await prisma.rankTypes.create({
     *   data: {
     *     // ... data to create a RankTypes
     *   }
     * })
     * 
     */
    create<T extends RankTypesCreateArgs>(args: SelectSubset<T, RankTypesCreateArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RankTypes.
     * @param {RankTypesCreateManyArgs} args - Arguments to create many RankTypes.
     * @example
     * // Create many RankTypes
     * const rankTypes = await prisma.rankTypes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RankTypesCreateManyArgs>(args?: SelectSubset<T, RankTypesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RankTypes and returns the data saved in the database.
     * @param {RankTypesCreateManyAndReturnArgs} args - Arguments to create many RankTypes.
     * @example
     * // Create many RankTypes
     * const rankTypes = await prisma.rankTypes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RankTypes and only return the `id`
     * const rankTypesWithIdOnly = await prisma.rankTypes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RankTypesCreateManyAndReturnArgs>(args?: SelectSubset<T, RankTypesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RankTypes.
     * @param {RankTypesDeleteArgs} args - Arguments to delete one RankTypes.
     * @example
     * // Delete one RankTypes
     * const RankTypes = await prisma.rankTypes.delete({
     *   where: {
     *     // ... filter to delete one RankTypes
     *   }
     * })
     * 
     */
    delete<T extends RankTypesDeleteArgs>(args: SelectSubset<T, RankTypesDeleteArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RankTypes.
     * @param {RankTypesUpdateArgs} args - Arguments to update one RankTypes.
     * @example
     * // Update one RankTypes
     * const rankTypes = await prisma.rankTypes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RankTypesUpdateArgs>(args: SelectSubset<T, RankTypesUpdateArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RankTypes.
     * @param {RankTypesDeleteManyArgs} args - Arguments to filter RankTypes to delete.
     * @example
     * // Delete a few RankTypes
     * const { count } = await prisma.rankTypes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RankTypesDeleteManyArgs>(args?: SelectSubset<T, RankTypesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RankTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankTypesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RankTypes
     * const rankTypes = await prisma.rankTypes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RankTypesUpdateManyArgs>(args: SelectSubset<T, RankTypesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RankTypes and returns the data updated in the database.
     * @param {RankTypesUpdateManyAndReturnArgs} args - Arguments to update many RankTypes.
     * @example
     * // Update many RankTypes
     * const rankTypes = await prisma.rankTypes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RankTypes and only return the `id`
     * const rankTypesWithIdOnly = await prisma.rankTypes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RankTypesUpdateManyAndReturnArgs>(args: SelectSubset<T, RankTypesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RankTypes.
     * @param {RankTypesUpsertArgs} args - Arguments to update or create a RankTypes.
     * @example
     * // Update or create a RankTypes
     * const rankTypes = await prisma.rankTypes.upsert({
     *   create: {
     *     // ... data to create a RankTypes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RankTypes we want to update
     *   }
     * })
     */
    upsert<T extends RankTypesUpsertArgs>(args: SelectSubset<T, RankTypesUpsertArgs<ExtArgs>>): Prisma__RankTypesClient<$Result.GetResult<Prisma.$RankTypesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RankTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankTypesCountArgs} args - Arguments to filter RankTypes to count.
     * @example
     * // Count the number of RankTypes
     * const count = await prisma.rankTypes.count({
     *   where: {
     *     // ... the filter for the RankTypes we want to count
     *   }
     * })
    **/
    count<T extends RankTypesCountArgs>(
      args?: Subset<T, RankTypesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RankTypesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RankTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankTypesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RankTypesAggregateArgs>(args: Subset<T, RankTypesAggregateArgs>): Prisma.PrismaPromise<GetRankTypesAggregateType<T>>

    /**
     * Group by RankTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankTypesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RankTypesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RankTypesGroupByArgs['orderBy'] }
        : { orderBy?: RankTypesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RankTypesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRankTypesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RankTypes model
   */
  readonly fields: RankTypesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RankTypes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RankTypesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ranks<T extends RankTypes$ranksArgs<ExtArgs> = {}>(args?: Subset<T, RankTypes$ranksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RanksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RankTypes model
   */
  interface RankTypesFieldRefs {
    readonly id: FieldRef<"RankTypes", 'Int'>
    readonly name: FieldRef<"RankTypes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RankTypes findUnique
   */
  export type RankTypesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * Filter, which RankTypes to fetch.
     */
    where: RankTypesWhereUniqueInput
  }

  /**
   * RankTypes findUniqueOrThrow
   */
  export type RankTypesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * Filter, which RankTypes to fetch.
     */
    where: RankTypesWhereUniqueInput
  }

  /**
   * RankTypes findFirst
   */
  export type RankTypesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * Filter, which RankTypes to fetch.
     */
    where?: RankTypesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankTypes to fetch.
     */
    orderBy?: RankTypesOrderByWithRelationInput | RankTypesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RankTypes.
     */
    cursor?: RankTypesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RankTypes.
     */
    distinct?: RankTypesScalarFieldEnum | RankTypesScalarFieldEnum[]
  }

  /**
   * RankTypes findFirstOrThrow
   */
  export type RankTypesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * Filter, which RankTypes to fetch.
     */
    where?: RankTypesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankTypes to fetch.
     */
    orderBy?: RankTypesOrderByWithRelationInput | RankTypesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RankTypes.
     */
    cursor?: RankTypesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RankTypes.
     */
    distinct?: RankTypesScalarFieldEnum | RankTypesScalarFieldEnum[]
  }

  /**
   * RankTypes findMany
   */
  export type RankTypesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * Filter, which RankTypes to fetch.
     */
    where?: RankTypesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankTypes to fetch.
     */
    orderBy?: RankTypesOrderByWithRelationInput | RankTypesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RankTypes.
     */
    cursor?: RankTypesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankTypes.
     */
    skip?: number
    distinct?: RankTypesScalarFieldEnum | RankTypesScalarFieldEnum[]
  }

  /**
   * RankTypes create
   */
  export type RankTypesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * The data needed to create a RankTypes.
     */
    data: XOR<RankTypesCreateInput, RankTypesUncheckedCreateInput>
  }

  /**
   * RankTypes createMany
   */
  export type RankTypesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RankTypes.
     */
    data: RankTypesCreateManyInput | RankTypesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RankTypes createManyAndReturn
   */
  export type RankTypesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * The data used to create many RankTypes.
     */
    data: RankTypesCreateManyInput | RankTypesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RankTypes update
   */
  export type RankTypesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * The data needed to update a RankTypes.
     */
    data: XOR<RankTypesUpdateInput, RankTypesUncheckedUpdateInput>
    /**
     * Choose, which RankTypes to update.
     */
    where: RankTypesWhereUniqueInput
  }

  /**
   * RankTypes updateMany
   */
  export type RankTypesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RankTypes.
     */
    data: XOR<RankTypesUpdateManyMutationInput, RankTypesUncheckedUpdateManyInput>
    /**
     * Filter which RankTypes to update
     */
    where?: RankTypesWhereInput
    /**
     * Limit how many RankTypes to update.
     */
    limit?: number
  }

  /**
   * RankTypes updateManyAndReturn
   */
  export type RankTypesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * The data used to update RankTypes.
     */
    data: XOR<RankTypesUpdateManyMutationInput, RankTypesUncheckedUpdateManyInput>
    /**
     * Filter which RankTypes to update
     */
    where?: RankTypesWhereInput
    /**
     * Limit how many RankTypes to update.
     */
    limit?: number
  }

  /**
   * RankTypes upsert
   */
  export type RankTypesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * The filter to search for the RankTypes to update in case it exists.
     */
    where: RankTypesWhereUniqueInput
    /**
     * In case the RankTypes found by the `where` argument doesn't exist, create a new RankTypes with this data.
     */
    create: XOR<RankTypesCreateInput, RankTypesUncheckedCreateInput>
    /**
     * In case the RankTypes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RankTypesUpdateInput, RankTypesUncheckedUpdateInput>
  }

  /**
   * RankTypes delete
   */
  export type RankTypesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
    /**
     * Filter which RankTypes to delete.
     */
    where: RankTypesWhereUniqueInput
  }

  /**
   * RankTypes deleteMany
   */
  export type RankTypesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RankTypes to delete
     */
    where?: RankTypesWhereInput
    /**
     * Limit how many RankTypes to delete.
     */
    limit?: number
  }

  /**
   * RankTypes.ranks
   */
  export type RankTypes$ranksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ranks
     */
    select?: RanksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ranks
     */
    omit?: RanksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RanksInclude<ExtArgs> | null
    where?: RanksWhereInput
    orderBy?: RanksOrderByWithRelationInput | RanksOrderByWithRelationInput[]
    cursor?: RanksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RanksScalarFieldEnum | RanksScalarFieldEnum[]
  }

  /**
   * RankTypes without action
   */
  export type RankTypesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankTypes
     */
    select?: RankTypesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankTypes
     */
    omit?: RankTypesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankTypesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    slug_id: 'slug_id',
    name: 'name',
    name_kana: 'name_kana',
    handle_name: 'handle_name',
    password: 'password',
    birthday: 'birthday',
    introduction: 'introduction',
    phone_number: 'phone_number',
    email: 'email',
    address: 'address',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AuthPayloadScalarFieldEnum: {
    id: 'id',
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    user_id: 'user_id',
    created_at: 'created_at',
    expires_at: 'expires_at'
  };

  export type AuthPayloadScalarFieldEnum = (typeof AuthPayloadScalarFieldEnum)[keyof typeof AuthPayloadScalarFieldEnum]


  export const FollowScalarFieldEnum: {
    followed_by_id: 'followed_by_id',
    following_id: 'following_id'
  };

  export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum]


  export const ArtworkScalarFieldEnum: {
    id: 'id',
    slug_id: 'slug_id',
    user_id: 'user_id',
    title: 'title',
    likes: 'likes',
    bads: 'bads',
    feature: 'feature',
    deleted: 'deleted',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ArtworkScalarFieldEnum = (typeof ArtworkScalarFieldEnum)[keyof typeof ArtworkScalarFieldEnum]


  export const ArtworkFileScalarFieldEnum: {
    id: 'id',
    artwork_id: 'artwork_id',
    file_name: 'file_name',
    extension: 'extension',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ArtworkFileScalarFieldEnum = (typeof ArtworkFileScalarFieldEnum)[keyof typeof ArtworkFileScalarFieldEnum]


  export const ArtworkGizmoScalarFieldEnum: {
    id: 'id',
    artwork_file_id: 'artwork_file_id',
    transportX: 'transportX',
    transportY: 'transportY',
    transportZ: 'transportZ',
    rotateX: 'rotateX',
    rotateY: 'rotateY',
    rotateZ: 'rotateZ',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    scaleZ: 'scaleZ'
  };

  export type ArtworkGizmoScalarFieldEnum = (typeof ArtworkGizmoScalarFieldEnum)[keyof typeof ArtworkGizmoScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    slug_id: 'slug_id',
    user_id: 'user_id',
    artwork_id: 'artwork_id',
    body: 'body',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ArtworkRanksScalarFieldEnum: {
    id: 'id',
    artwork_id: 'artwork_id',
    rank_id: 'rank_id',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ArtworkRanksScalarFieldEnum = (typeof ArtworkRanksScalarFieldEnum)[keyof typeof ArtworkRanksScalarFieldEnum]


  export const RanksScalarFieldEnum: {
    id: 'id',
    name: 'name',
    rank_type_id: 'rank_type_id'
  };

  export type RanksScalarFieldEnum = (typeof RanksScalarFieldEnum)[keyof typeof RanksScalarFieldEnum]


  export const RankTypesScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type RankTypesScalarFieldEnum = (typeof RankTypesScalarFieldEnum)[keyof typeof RankTypesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    slug_id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    name_kana?: StringNullableFilter<"User"> | string | null
    handle_name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    birthday?: DateTimeFilter<"User"> | Date | string
    introduction?: StringFilter<"User"> | string
    phone_number?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    address?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    auth_payload?: XOR<AuthPayloadNullableScalarRelationFilter, AuthPayloadWhereInput> | null
    artworks?: ArtworkListRelationFilter
    artwork_ranks?: ArtworkRanksListRelationFilter
    comments?: CommentListRelationFilter
    followed_by?: FollowListRelationFilter
    following?: FollowListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    slug_id?: SortOrder
    name?: SortOrder
    name_kana?: SortOrderInput | SortOrder
    handle_name?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    introduction?: SortOrder
    phone_number?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    auth_payload?: AuthPayloadOrderByWithRelationInput
    artworks?: ArtworkOrderByRelationAggregateInput
    artwork_ranks?: ArtworkRanksOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    followed_by?: FollowOrderByRelationAggregateInput
    following?: FollowOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug_id?: string
    handle_name?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    name_kana?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    birthday?: DateTimeFilter<"User"> | Date | string
    introduction?: StringFilter<"User"> | string
    phone_number?: StringFilter<"User"> | string
    address?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    auth_payload?: XOR<AuthPayloadNullableScalarRelationFilter, AuthPayloadWhereInput> | null
    artworks?: ArtworkListRelationFilter
    artwork_ranks?: ArtworkRanksListRelationFilter
    comments?: CommentListRelationFilter
    followed_by?: FollowListRelationFilter
    following?: FollowListRelationFilter
  }, "id" | "slug_id" | "handle_name" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    slug_id?: SortOrder
    name?: SortOrder
    name_kana?: SortOrderInput | SortOrder
    handle_name?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    introduction?: SortOrder
    phone_number?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    slug_id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    name_kana?: StringNullableWithAggregatesFilter<"User"> | string | null
    handle_name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    birthday?: DateTimeWithAggregatesFilter<"User"> | Date | string
    introduction?: StringWithAggregatesFilter<"User"> | string
    phone_number?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    address?: StringWithAggregatesFilter<"User"> | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AuthPayloadWhereInput = {
    AND?: AuthPayloadWhereInput | AuthPayloadWhereInput[]
    OR?: AuthPayloadWhereInput[]
    NOT?: AuthPayloadWhereInput | AuthPayloadWhereInput[]
    id?: StringFilter<"AuthPayload"> | string
    access_token?: StringFilter<"AuthPayload"> | string
    refresh_token?: StringFilter<"AuthPayload"> | string
    user_id?: IntFilter<"AuthPayload"> | number
    created_at?: DateTimeFilter<"AuthPayload"> | Date | string
    expires_at?: DateTimeFilter<"AuthPayload"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuthPayloadOrderByWithRelationInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthPayloadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: number
    AND?: AuthPayloadWhereInput | AuthPayloadWhereInput[]
    OR?: AuthPayloadWhereInput[]
    NOT?: AuthPayloadWhereInput | AuthPayloadWhereInput[]
    access_token?: StringFilter<"AuthPayload"> | string
    refresh_token?: StringFilter<"AuthPayload"> | string
    created_at?: DateTimeFilter<"AuthPayload"> | Date | string
    expires_at?: DateTimeFilter<"AuthPayload"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "user_id">

  export type AuthPayloadOrderByWithAggregationInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    _count?: AuthPayloadCountOrderByAggregateInput
    _avg?: AuthPayloadAvgOrderByAggregateInput
    _max?: AuthPayloadMaxOrderByAggregateInput
    _min?: AuthPayloadMinOrderByAggregateInput
    _sum?: AuthPayloadSumOrderByAggregateInput
  }

  export type AuthPayloadScalarWhereWithAggregatesInput = {
    AND?: AuthPayloadScalarWhereWithAggregatesInput | AuthPayloadScalarWhereWithAggregatesInput[]
    OR?: AuthPayloadScalarWhereWithAggregatesInput[]
    NOT?: AuthPayloadScalarWhereWithAggregatesInput | AuthPayloadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthPayload"> | string
    access_token?: StringWithAggregatesFilter<"AuthPayload"> | string
    refresh_token?: StringWithAggregatesFilter<"AuthPayload"> | string
    user_id?: IntWithAggregatesFilter<"AuthPayload"> | number
    created_at?: DateTimeWithAggregatesFilter<"AuthPayload"> | Date | string
    expires_at?: DateTimeWithAggregatesFilter<"AuthPayload"> | Date | string
  }

  export type FollowWhereInput = {
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    followed_by_id?: IntFilter<"Follow"> | number
    following_id?: IntFilter<"Follow"> | number
    followedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FollowOrderByWithRelationInput = {
    followed_by_id?: SortOrder
    following_id?: SortOrder
    followedBy?: UserOrderByWithRelationInput
    following?: UserOrderByWithRelationInput
  }

  export type FollowWhereUniqueInput = Prisma.AtLeast<{
    following_id_followed_by_id?: FollowFollowing_idFollowed_by_idCompoundUniqueInput
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    followed_by_id?: IntFilter<"Follow"> | number
    following_id?: IntFilter<"Follow"> | number
    followedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "following_id_followed_by_id">

  export type FollowOrderByWithAggregationInput = {
    followed_by_id?: SortOrder
    following_id?: SortOrder
    _count?: FollowCountOrderByAggregateInput
    _avg?: FollowAvgOrderByAggregateInput
    _max?: FollowMaxOrderByAggregateInput
    _min?: FollowMinOrderByAggregateInput
    _sum?: FollowSumOrderByAggregateInput
  }

  export type FollowScalarWhereWithAggregatesInput = {
    AND?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    OR?: FollowScalarWhereWithAggregatesInput[]
    NOT?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    followed_by_id?: IntWithAggregatesFilter<"Follow"> | number
    following_id?: IntWithAggregatesFilter<"Follow"> | number
  }

  export type ArtworkWhereInput = {
    AND?: ArtworkWhereInput | ArtworkWhereInput[]
    OR?: ArtworkWhereInput[]
    NOT?: ArtworkWhereInput | ArtworkWhereInput[]
    id?: IntFilter<"Artwork"> | number
    slug_id?: StringFilter<"Artwork"> | string
    user_id?: IntFilter<"Artwork"> | number
    title?: StringFilter<"Artwork"> | string
    likes?: IntFilter<"Artwork"> | number
    bads?: IntFilter<"Artwork"> | number
    feature?: StringFilter<"Artwork"> | string
    deleted?: BoolFilter<"Artwork"> | boolean
    created_at?: DateTimeFilter<"Artwork"> | Date | string
    updated_at?: DateTimeFilter<"Artwork"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    artwork_file?: ArtworkFileListRelationFilter
    artwork_ranks?: ArtworkRanksListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type ArtworkOrderByWithRelationInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    likes?: SortOrder
    bads?: SortOrder
    feature?: SortOrder
    deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    artwork_file?: ArtworkFileOrderByRelationAggregateInput
    artwork_ranks?: ArtworkRanksOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type ArtworkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug_id?: string
    AND?: ArtworkWhereInput | ArtworkWhereInput[]
    OR?: ArtworkWhereInput[]
    NOT?: ArtworkWhereInput | ArtworkWhereInput[]
    user_id?: IntFilter<"Artwork"> | number
    title?: StringFilter<"Artwork"> | string
    likes?: IntFilter<"Artwork"> | number
    bads?: IntFilter<"Artwork"> | number
    feature?: StringFilter<"Artwork"> | string
    deleted?: BoolFilter<"Artwork"> | boolean
    created_at?: DateTimeFilter<"Artwork"> | Date | string
    updated_at?: DateTimeFilter<"Artwork"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    artwork_file?: ArtworkFileListRelationFilter
    artwork_ranks?: ArtworkRanksListRelationFilter
    comments?: CommentListRelationFilter
  }, "id" | "slug_id">

  export type ArtworkOrderByWithAggregationInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    likes?: SortOrder
    bads?: SortOrder
    feature?: SortOrder
    deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ArtworkCountOrderByAggregateInput
    _avg?: ArtworkAvgOrderByAggregateInput
    _max?: ArtworkMaxOrderByAggregateInput
    _min?: ArtworkMinOrderByAggregateInput
    _sum?: ArtworkSumOrderByAggregateInput
  }

  export type ArtworkScalarWhereWithAggregatesInput = {
    AND?: ArtworkScalarWhereWithAggregatesInput | ArtworkScalarWhereWithAggregatesInput[]
    OR?: ArtworkScalarWhereWithAggregatesInput[]
    NOT?: ArtworkScalarWhereWithAggregatesInput | ArtworkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Artwork"> | number
    slug_id?: StringWithAggregatesFilter<"Artwork"> | string
    user_id?: IntWithAggregatesFilter<"Artwork"> | number
    title?: StringWithAggregatesFilter<"Artwork"> | string
    likes?: IntWithAggregatesFilter<"Artwork"> | number
    bads?: IntWithAggregatesFilter<"Artwork"> | number
    feature?: StringWithAggregatesFilter<"Artwork"> | string
    deleted?: BoolWithAggregatesFilter<"Artwork"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Artwork"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Artwork"> | Date | string
  }

  export type ArtworkFileWhereInput = {
    AND?: ArtworkFileWhereInput | ArtworkFileWhereInput[]
    OR?: ArtworkFileWhereInput[]
    NOT?: ArtworkFileWhereInput | ArtworkFileWhereInput[]
    id?: IntFilter<"ArtworkFile"> | number
    artwork_id?: IntFilter<"ArtworkFile"> | number
    file_name?: StringFilter<"ArtworkFile"> | string
    extension?: StringFilter<"ArtworkFile"> | string
    created_at?: DateTimeFilter<"ArtworkFile"> | Date | string
    updated_at?: DateTimeFilter<"ArtworkFile"> | Date | string
    artwork?: XOR<ArtworkScalarRelationFilter, ArtworkWhereInput>
    artwork_gizmo?: ArtworkGizmoListRelationFilter
  }

  export type ArtworkFileOrderByWithRelationInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    file_name?: SortOrder
    extension?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    artwork?: ArtworkOrderByWithRelationInput
    artwork_gizmo?: ArtworkGizmoOrderByRelationAggregateInput
  }

  export type ArtworkFileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ArtworkFileWhereInput | ArtworkFileWhereInput[]
    OR?: ArtworkFileWhereInput[]
    NOT?: ArtworkFileWhereInput | ArtworkFileWhereInput[]
    artwork_id?: IntFilter<"ArtworkFile"> | number
    file_name?: StringFilter<"ArtworkFile"> | string
    extension?: StringFilter<"ArtworkFile"> | string
    created_at?: DateTimeFilter<"ArtworkFile"> | Date | string
    updated_at?: DateTimeFilter<"ArtworkFile"> | Date | string
    artwork?: XOR<ArtworkScalarRelationFilter, ArtworkWhereInput>
    artwork_gizmo?: ArtworkGizmoListRelationFilter
  }, "id">

  export type ArtworkFileOrderByWithAggregationInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    file_name?: SortOrder
    extension?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ArtworkFileCountOrderByAggregateInput
    _avg?: ArtworkFileAvgOrderByAggregateInput
    _max?: ArtworkFileMaxOrderByAggregateInput
    _min?: ArtworkFileMinOrderByAggregateInput
    _sum?: ArtworkFileSumOrderByAggregateInput
  }

  export type ArtworkFileScalarWhereWithAggregatesInput = {
    AND?: ArtworkFileScalarWhereWithAggregatesInput | ArtworkFileScalarWhereWithAggregatesInput[]
    OR?: ArtworkFileScalarWhereWithAggregatesInput[]
    NOT?: ArtworkFileScalarWhereWithAggregatesInput | ArtworkFileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArtworkFile"> | number
    artwork_id?: IntWithAggregatesFilter<"ArtworkFile"> | number
    file_name?: StringWithAggregatesFilter<"ArtworkFile"> | string
    extension?: StringWithAggregatesFilter<"ArtworkFile"> | string
    created_at?: DateTimeWithAggregatesFilter<"ArtworkFile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ArtworkFile"> | Date | string
  }

  export type ArtworkGizmoWhereInput = {
    AND?: ArtworkGizmoWhereInput | ArtworkGizmoWhereInput[]
    OR?: ArtworkGizmoWhereInput[]
    NOT?: ArtworkGizmoWhereInput | ArtworkGizmoWhereInput[]
    id?: IntFilter<"ArtworkGizmo"> | number
    artwork_file_id?: IntFilter<"ArtworkGizmo"> | number
    transportX?: IntFilter<"ArtworkGizmo"> | number
    transportY?: IntFilter<"ArtworkGizmo"> | number
    transportZ?: IntFilter<"ArtworkGizmo"> | number
    rotateX?: IntFilter<"ArtworkGizmo"> | number
    rotateY?: IntFilter<"ArtworkGizmo"> | number
    rotateZ?: IntFilter<"ArtworkGizmo"> | number
    scaleX?: IntFilter<"ArtworkGizmo"> | number
    scaleY?: IntFilter<"ArtworkGizmo"> | number
    scaleZ?: IntFilter<"ArtworkGizmo"> | number
    artwork_file?: XOR<ArtworkFileScalarRelationFilter, ArtworkFileWhereInput>
  }

  export type ArtworkGizmoOrderByWithRelationInput = {
    id?: SortOrder
    artwork_file_id?: SortOrder
    transportX?: SortOrder
    transportY?: SortOrder
    transportZ?: SortOrder
    rotateX?: SortOrder
    rotateY?: SortOrder
    rotateZ?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    scaleZ?: SortOrder
    artwork_file?: ArtworkFileOrderByWithRelationInput
  }

  export type ArtworkGizmoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ArtworkGizmoWhereInput | ArtworkGizmoWhereInput[]
    OR?: ArtworkGizmoWhereInput[]
    NOT?: ArtworkGizmoWhereInput | ArtworkGizmoWhereInput[]
    artwork_file_id?: IntFilter<"ArtworkGizmo"> | number
    transportX?: IntFilter<"ArtworkGizmo"> | number
    transportY?: IntFilter<"ArtworkGizmo"> | number
    transportZ?: IntFilter<"ArtworkGizmo"> | number
    rotateX?: IntFilter<"ArtworkGizmo"> | number
    rotateY?: IntFilter<"ArtworkGizmo"> | number
    rotateZ?: IntFilter<"ArtworkGizmo"> | number
    scaleX?: IntFilter<"ArtworkGizmo"> | number
    scaleY?: IntFilter<"ArtworkGizmo"> | number
    scaleZ?: IntFilter<"ArtworkGizmo"> | number
    artwork_file?: XOR<ArtworkFileScalarRelationFilter, ArtworkFileWhereInput>
  }, "id">

  export type ArtworkGizmoOrderByWithAggregationInput = {
    id?: SortOrder
    artwork_file_id?: SortOrder
    transportX?: SortOrder
    transportY?: SortOrder
    transportZ?: SortOrder
    rotateX?: SortOrder
    rotateY?: SortOrder
    rotateZ?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    scaleZ?: SortOrder
    _count?: ArtworkGizmoCountOrderByAggregateInput
    _avg?: ArtworkGizmoAvgOrderByAggregateInput
    _max?: ArtworkGizmoMaxOrderByAggregateInput
    _min?: ArtworkGizmoMinOrderByAggregateInput
    _sum?: ArtworkGizmoSumOrderByAggregateInput
  }

  export type ArtworkGizmoScalarWhereWithAggregatesInput = {
    AND?: ArtworkGizmoScalarWhereWithAggregatesInput | ArtworkGizmoScalarWhereWithAggregatesInput[]
    OR?: ArtworkGizmoScalarWhereWithAggregatesInput[]
    NOT?: ArtworkGizmoScalarWhereWithAggregatesInput | ArtworkGizmoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    artwork_file_id?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    transportX?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    transportY?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    transportZ?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    rotateX?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    rotateY?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    rotateZ?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    scaleX?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    scaleY?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
    scaleZ?: IntWithAggregatesFilter<"ArtworkGizmo"> | number
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    slug_id?: StringFilter<"Comment"> | string
    user_id?: IntFilter<"Comment"> | number
    artwork_id?: IntFilter<"Comment"> | number
    body?: StringFilter<"Comment"> | string
    created_at?: DateTimeFilter<"Comment"> | Date | string
    updated_at?: DateTimeFilter<"Comment"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    artwork?: XOR<ArtworkScalarRelationFilter, ArtworkWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    artwork_id?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    artwork?: ArtworkOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug_id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    user_id?: IntFilter<"Comment"> | number
    artwork_id?: IntFilter<"Comment"> | number
    body?: StringFilter<"Comment"> | string
    created_at?: DateTimeFilter<"Comment"> | Date | string
    updated_at?: DateTimeFilter<"Comment"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    artwork?: XOR<ArtworkScalarRelationFilter, ArtworkWhereInput>
  }, "id" | "slug_id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    artwork_id?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    slug_id?: StringWithAggregatesFilter<"Comment"> | string
    user_id?: IntWithAggregatesFilter<"Comment"> | number
    artwork_id?: IntWithAggregatesFilter<"Comment"> | number
    body?: StringWithAggregatesFilter<"Comment"> | string
    created_at?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type ArtworkRanksWhereInput = {
    AND?: ArtworkRanksWhereInput | ArtworkRanksWhereInput[]
    OR?: ArtworkRanksWhereInput[]
    NOT?: ArtworkRanksWhereInput | ArtworkRanksWhereInput[]
    id?: IntFilter<"ArtworkRanks"> | number
    artwork_id?: IntFilter<"ArtworkRanks"> | number
    rank_id?: IntFilter<"ArtworkRanks"> | number
    user_id?: IntFilter<"ArtworkRanks"> | number
    created_at?: DateTimeFilter<"ArtworkRanks"> | Date | string
    updated_at?: DateTimeFilter<"ArtworkRanks"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    artwork?: XOR<ArtworkScalarRelationFilter, ArtworkWhereInput>
    ranks?: XOR<RanksScalarRelationFilter, RanksWhereInput>
  }

  export type ArtworkRanksOrderByWithRelationInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    rank_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    artwork?: ArtworkOrderByWithRelationInput
    ranks?: RanksOrderByWithRelationInput
  }

  export type ArtworkRanksWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    artwork_id_rank_id_user_id?: ArtworkRanksArtwork_idRank_idUser_idCompoundUniqueInput
    AND?: ArtworkRanksWhereInput | ArtworkRanksWhereInput[]
    OR?: ArtworkRanksWhereInput[]
    NOT?: ArtworkRanksWhereInput | ArtworkRanksWhereInput[]
    artwork_id?: IntFilter<"ArtworkRanks"> | number
    rank_id?: IntFilter<"ArtworkRanks"> | number
    user_id?: IntFilter<"ArtworkRanks"> | number
    created_at?: DateTimeFilter<"ArtworkRanks"> | Date | string
    updated_at?: DateTimeFilter<"ArtworkRanks"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    artwork?: XOR<ArtworkScalarRelationFilter, ArtworkWhereInput>
    ranks?: XOR<RanksScalarRelationFilter, RanksWhereInput>
  }, "id" | "artwork_id_rank_id_user_id">

  export type ArtworkRanksOrderByWithAggregationInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    rank_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ArtworkRanksCountOrderByAggregateInput
    _avg?: ArtworkRanksAvgOrderByAggregateInput
    _max?: ArtworkRanksMaxOrderByAggregateInput
    _min?: ArtworkRanksMinOrderByAggregateInput
    _sum?: ArtworkRanksSumOrderByAggregateInput
  }

  export type ArtworkRanksScalarWhereWithAggregatesInput = {
    AND?: ArtworkRanksScalarWhereWithAggregatesInput | ArtworkRanksScalarWhereWithAggregatesInput[]
    OR?: ArtworkRanksScalarWhereWithAggregatesInput[]
    NOT?: ArtworkRanksScalarWhereWithAggregatesInput | ArtworkRanksScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArtworkRanks"> | number
    artwork_id?: IntWithAggregatesFilter<"ArtworkRanks"> | number
    rank_id?: IntWithAggregatesFilter<"ArtworkRanks"> | number
    user_id?: IntWithAggregatesFilter<"ArtworkRanks"> | number
    created_at?: DateTimeWithAggregatesFilter<"ArtworkRanks"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ArtworkRanks"> | Date | string
  }

  export type RanksWhereInput = {
    AND?: RanksWhereInput | RanksWhereInput[]
    OR?: RanksWhereInput[]
    NOT?: RanksWhereInput | RanksWhereInput[]
    id?: IntFilter<"Ranks"> | number
    name?: StringFilter<"Ranks"> | string
    rank_type_id?: IntFilter<"Ranks"> | number
    artwork_ranks?: ArtworkRanksListRelationFilter
    rank_type?: XOR<RankTypesScalarRelationFilter, RankTypesWhereInput>
  }

  export type RanksOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rank_type_id?: SortOrder
    artwork_ranks?: ArtworkRanksOrderByRelationAggregateInput
    rank_type?: RankTypesOrderByWithRelationInput
  }

  export type RanksWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RanksWhereInput | RanksWhereInput[]
    OR?: RanksWhereInput[]
    NOT?: RanksWhereInput | RanksWhereInput[]
    name?: StringFilter<"Ranks"> | string
    rank_type_id?: IntFilter<"Ranks"> | number
    artwork_ranks?: ArtworkRanksListRelationFilter
    rank_type?: XOR<RankTypesScalarRelationFilter, RankTypesWhereInput>
  }, "id">

  export type RanksOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    rank_type_id?: SortOrder
    _count?: RanksCountOrderByAggregateInput
    _avg?: RanksAvgOrderByAggregateInput
    _max?: RanksMaxOrderByAggregateInput
    _min?: RanksMinOrderByAggregateInput
    _sum?: RanksSumOrderByAggregateInput
  }

  export type RanksScalarWhereWithAggregatesInput = {
    AND?: RanksScalarWhereWithAggregatesInput | RanksScalarWhereWithAggregatesInput[]
    OR?: RanksScalarWhereWithAggregatesInput[]
    NOT?: RanksScalarWhereWithAggregatesInput | RanksScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ranks"> | number
    name?: StringWithAggregatesFilter<"Ranks"> | string
    rank_type_id?: IntWithAggregatesFilter<"Ranks"> | number
  }

  export type RankTypesWhereInput = {
    AND?: RankTypesWhereInput | RankTypesWhereInput[]
    OR?: RankTypesWhereInput[]
    NOT?: RankTypesWhereInput | RankTypesWhereInput[]
    id?: IntFilter<"RankTypes"> | number
    name?: StringFilter<"RankTypes"> | string
    ranks?: RanksListRelationFilter
  }

  export type RankTypesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ranks?: RanksOrderByRelationAggregateInput
  }

  export type RankTypesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RankTypesWhereInput | RankTypesWhereInput[]
    OR?: RankTypesWhereInput[]
    NOT?: RankTypesWhereInput | RankTypesWhereInput[]
    name?: StringFilter<"RankTypes"> | string
    ranks?: RanksListRelationFilter
  }, "id">

  export type RankTypesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: RankTypesCountOrderByAggregateInput
    _avg?: RankTypesAvgOrderByAggregateInput
    _max?: RankTypesMaxOrderByAggregateInput
    _min?: RankTypesMinOrderByAggregateInput
    _sum?: RankTypesSumOrderByAggregateInput
  }

  export type RankTypesScalarWhereWithAggregatesInput = {
    AND?: RankTypesScalarWhereWithAggregatesInput | RankTypesScalarWhereWithAggregatesInput[]
    OR?: RankTypesScalarWhereWithAggregatesInput[]
    NOT?: RankTypesScalarWhereWithAggregatesInput | RankTypesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RankTypes"> | number
    name?: StringWithAggregatesFilter<"RankTypes"> | string
  }

  export type UserCreateInput = {
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadCreateNestedOneWithoutUserInput
    artworks?: ArtworkCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    followed_by?: FollowCreateNestedManyWithoutFollowedByInput
    following?: FollowCreateNestedManyWithoutFollowingInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadUncheckedCreateNestedOneWithoutUserInput
    artworks?: ArtworkUncheckedCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    followed_by?: FollowUncheckedCreateNestedManyWithoutFollowedByInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
  }

  export type UserUpdateInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    followed_by?: FollowUpdateManyWithoutFollowedByNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUncheckedUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUncheckedUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    followed_by?: FollowUncheckedUpdateManyWithoutFollowedByNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthPayloadCreateInput = {
    id?: string
    access_token: string
    refresh_token: string
    created_at?: Date | string
    expires_at: Date | string
    user: UserCreateNestedOneWithoutAuth_payloadInput
  }

  export type AuthPayloadUncheckedCreateInput = {
    id?: string
    access_token: string
    refresh_token: string
    user_id: number
    created_at?: Date | string
    expires_at: Date | string
  }

  export type AuthPayloadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuth_payloadNestedInput
  }

  export type AuthPayloadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthPayloadCreateManyInput = {
    id?: string
    access_token: string
    refresh_token: string
    user_id: number
    created_at?: Date | string
    expires_at: Date | string
  }

  export type AuthPayloadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthPayloadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateInput = {
    followedBy: UserCreateNestedOneWithoutFollowed_byInput
    following: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowUncheckedCreateInput = {
    followed_by_id: number
    following_id: number
  }

  export type FollowUpdateInput = {
    followedBy?: UserUpdateOneRequiredWithoutFollowed_byNestedInput
    following?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowUncheckedUpdateInput = {
    followed_by_id?: IntFieldUpdateOperationsInput | number
    following_id?: IntFieldUpdateOperationsInput | number
  }

  export type FollowCreateManyInput = {
    followed_by_id: number
    following_id: number
  }

  export type FollowUpdateManyMutationInput = {

  }

  export type FollowUncheckedUpdateManyInput = {
    followed_by_id?: IntFieldUpdateOperationsInput | number
    following_id?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkCreateInput = {
    slug_id?: string
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutArtworksInput
    artwork_file?: ArtworkFileCreateNestedManyWithoutArtworkInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutArtworkInput
    comments?: CommentCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkUncheckedCreateInput = {
    id?: number
    slug_id?: string
    user_id: number
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    artwork_file?: ArtworkFileUncheckedCreateNestedManyWithoutArtworkInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutArtworkInput
    comments?: CommentUncheckedCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkUpdateInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtworksNestedInput
    artwork_file?: ArtworkFileUpdateManyWithoutArtworkNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutArtworkNestedInput
    comments?: CommentUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_file?: ArtworkFileUncheckedUpdateManyWithoutArtworkNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutArtworkNestedInput
    comments?: CommentUncheckedUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkCreateManyInput = {
    id?: number
    slug_id?: string
    user_id: number
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkUpdateManyMutationInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkFileCreateInput = {
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
    artwork: ArtworkCreateNestedOneWithoutArtwork_fileInput
    artwork_gizmo?: ArtworkGizmoCreateNestedManyWithoutArtwork_fileInput
  }

  export type ArtworkFileUncheckedCreateInput = {
    id?: number
    artwork_id: number
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
    artwork_gizmo?: ArtworkGizmoUncheckedCreateNestedManyWithoutArtwork_fileInput
  }

  export type ArtworkFileUpdateInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork?: ArtworkUpdateOneRequiredWithoutArtwork_fileNestedInput
    artwork_gizmo?: ArtworkGizmoUpdateManyWithoutArtwork_fileNestedInput
  }

  export type ArtworkFileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_gizmo?: ArtworkGizmoUncheckedUpdateManyWithoutArtwork_fileNestedInput
  }

  export type ArtworkFileCreateManyInput = {
    id?: number
    artwork_id: number
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkFileUpdateManyMutationInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkFileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkGizmoCreateInput = {
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
    artwork_file: ArtworkFileCreateNestedOneWithoutArtwork_gizmoInput
  }

  export type ArtworkGizmoUncheckedCreateInput = {
    id?: number
    artwork_file_id: number
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
  }

  export type ArtworkGizmoUpdateInput = {
    transportX?: IntFieldUpdateOperationsInput | number
    transportY?: IntFieldUpdateOperationsInput | number
    transportZ?: IntFieldUpdateOperationsInput | number
    rotateX?: IntFieldUpdateOperationsInput | number
    rotateY?: IntFieldUpdateOperationsInput | number
    rotateZ?: IntFieldUpdateOperationsInput | number
    scaleX?: IntFieldUpdateOperationsInput | number
    scaleY?: IntFieldUpdateOperationsInput | number
    scaleZ?: IntFieldUpdateOperationsInput | number
    artwork_file?: ArtworkFileUpdateOneRequiredWithoutArtwork_gizmoNestedInput
  }

  export type ArtworkGizmoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_file_id?: IntFieldUpdateOperationsInput | number
    transportX?: IntFieldUpdateOperationsInput | number
    transportY?: IntFieldUpdateOperationsInput | number
    transportZ?: IntFieldUpdateOperationsInput | number
    rotateX?: IntFieldUpdateOperationsInput | number
    rotateY?: IntFieldUpdateOperationsInput | number
    rotateZ?: IntFieldUpdateOperationsInput | number
    scaleX?: IntFieldUpdateOperationsInput | number
    scaleY?: IntFieldUpdateOperationsInput | number
    scaleZ?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkGizmoCreateManyInput = {
    id?: number
    artwork_file_id: number
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
  }

  export type ArtworkGizmoUpdateManyMutationInput = {
    transportX?: IntFieldUpdateOperationsInput | number
    transportY?: IntFieldUpdateOperationsInput | number
    transportZ?: IntFieldUpdateOperationsInput | number
    rotateX?: IntFieldUpdateOperationsInput | number
    rotateY?: IntFieldUpdateOperationsInput | number
    rotateZ?: IntFieldUpdateOperationsInput | number
    scaleX?: IntFieldUpdateOperationsInput | number
    scaleY?: IntFieldUpdateOperationsInput | number
    scaleZ?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkGizmoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_file_id?: IntFieldUpdateOperationsInput | number
    transportX?: IntFieldUpdateOperationsInput | number
    transportY?: IntFieldUpdateOperationsInput | number
    transportZ?: IntFieldUpdateOperationsInput | number
    rotateX?: IntFieldUpdateOperationsInput | number
    rotateY?: IntFieldUpdateOperationsInput | number
    rotateZ?: IntFieldUpdateOperationsInput | number
    scaleX?: IntFieldUpdateOperationsInput | number
    scaleY?: IntFieldUpdateOperationsInput | number
    scaleZ?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateInput = {
    slug_id?: string
    body: string
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutCommentsInput
    artwork: ArtworkCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    slug_id?: string
    user_id: number
    artwork_id: number
    body: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CommentUpdateInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCommentsNestedInput
    artwork?: ArtworkUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: number
    slug_id?: string
    user_id: number
    artwork_id: number
    body: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutArtwork_ranksInput
    artwork: ArtworkCreateNestedOneWithoutArtwork_ranksInput
    ranks: RanksCreateNestedOneWithoutArtwork_ranksInput
  }

  export type ArtworkRanksUncheckedCreateInput = {
    id?: number
    artwork_id: number
    rank_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtwork_ranksNestedInput
    artwork?: ArtworkUpdateOneRequiredWithoutArtwork_ranksNestedInput
    ranks?: RanksUpdateOneRequiredWithoutArtwork_ranksNestedInput
  }

  export type ArtworkRanksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    rank_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksCreateManyInput = {
    id?: number
    artwork_id: number
    rank_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    rank_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RanksCreateInput = {
    name: string
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutRanksInput
    rank_type: RankTypesCreateNestedOneWithoutRanksInput
  }

  export type RanksUncheckedCreateInput = {
    id?: number
    name: string
    rank_type_id: number
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutRanksInput
  }

  export type RanksUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    artwork_ranks?: ArtworkRanksUpdateManyWithoutRanksNestedInput
    rank_type?: RankTypesUpdateOneRequiredWithoutRanksNestedInput
  }

  export type RanksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rank_type_id?: IntFieldUpdateOperationsInput | number
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutRanksNestedInput
  }

  export type RanksCreateManyInput = {
    id?: number
    name: string
    rank_type_id: number
  }

  export type RanksUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RanksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rank_type_id?: IntFieldUpdateOperationsInput | number
  }

  export type RankTypesCreateInput = {
    name: string
    ranks?: RanksCreateNestedManyWithoutRank_typeInput
  }

  export type RankTypesUncheckedCreateInput = {
    id?: number
    name: string
    ranks?: RanksUncheckedCreateNestedManyWithoutRank_typeInput
  }

  export type RankTypesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    ranks?: RanksUpdateManyWithoutRank_typeNestedInput
  }

  export type RankTypesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ranks?: RanksUncheckedUpdateManyWithoutRank_typeNestedInput
  }

  export type RankTypesCreateManyInput = {
    id?: number
    name: string
  }

  export type RankTypesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RankTypesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthPayloadNullableScalarRelationFilter = {
    is?: AuthPayloadWhereInput | null
    isNot?: AuthPayloadWhereInput | null
  }

  export type ArtworkListRelationFilter = {
    every?: ArtworkWhereInput
    some?: ArtworkWhereInput
    none?: ArtworkWhereInput
  }

  export type ArtworkRanksListRelationFilter = {
    every?: ArtworkRanksWhereInput
    some?: ArtworkRanksWhereInput
    none?: ArtworkRanksWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type FollowListRelationFilter = {
    every?: FollowWhereInput
    some?: FollowWhereInput
    none?: FollowWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ArtworkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArtworkRanksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    name?: SortOrder
    name_kana?: SortOrder
    handle_name?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    introduction?: SortOrder
    phone_number?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    name?: SortOrder
    name_kana?: SortOrder
    handle_name?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    introduction?: SortOrder
    phone_number?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    name?: SortOrder
    name_kana?: SortOrder
    handle_name?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    introduction?: SortOrder
    phone_number?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AuthPayloadCountOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
  }

  export type AuthPayloadAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type AuthPayloadMaxOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
  }

  export type AuthPayloadMinOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
  }

  export type AuthPayloadSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type FollowFollowing_idFollowed_by_idCompoundUniqueInput = {
    following_id: number
    followed_by_id: number
  }

  export type FollowCountOrderByAggregateInput = {
    followed_by_id?: SortOrder
    following_id?: SortOrder
  }

  export type FollowAvgOrderByAggregateInput = {
    followed_by_id?: SortOrder
    following_id?: SortOrder
  }

  export type FollowMaxOrderByAggregateInput = {
    followed_by_id?: SortOrder
    following_id?: SortOrder
  }

  export type FollowMinOrderByAggregateInput = {
    followed_by_id?: SortOrder
    following_id?: SortOrder
  }

  export type FollowSumOrderByAggregateInput = {
    followed_by_id?: SortOrder
    following_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ArtworkFileListRelationFilter = {
    every?: ArtworkFileWhereInput
    some?: ArtworkFileWhereInput
    none?: ArtworkFileWhereInput
  }

  export type ArtworkFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArtworkCountOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    likes?: SortOrder
    bads?: SortOrder
    feature?: SortOrder
    deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    likes?: SortOrder
    bads?: SortOrder
  }

  export type ArtworkMaxOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    likes?: SortOrder
    bads?: SortOrder
    feature?: SortOrder
    deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkMinOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    likes?: SortOrder
    bads?: SortOrder
    feature?: SortOrder
    deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    likes?: SortOrder
    bads?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ArtworkScalarRelationFilter = {
    is?: ArtworkWhereInput
    isNot?: ArtworkWhereInput
  }

  export type ArtworkGizmoListRelationFilter = {
    every?: ArtworkGizmoWhereInput
    some?: ArtworkGizmoWhereInput
    none?: ArtworkGizmoWhereInput
  }

  export type ArtworkGizmoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArtworkFileCountOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    file_name?: SortOrder
    extension?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkFileAvgOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
  }

  export type ArtworkFileMaxOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    file_name?: SortOrder
    extension?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkFileMinOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    file_name?: SortOrder
    extension?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkFileSumOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
  }

  export type ArtworkFileScalarRelationFilter = {
    is?: ArtworkFileWhereInput
    isNot?: ArtworkFileWhereInput
  }

  export type ArtworkGizmoCountOrderByAggregateInput = {
    id?: SortOrder
    artwork_file_id?: SortOrder
    transportX?: SortOrder
    transportY?: SortOrder
    transportZ?: SortOrder
    rotateX?: SortOrder
    rotateY?: SortOrder
    rotateZ?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    scaleZ?: SortOrder
  }

  export type ArtworkGizmoAvgOrderByAggregateInput = {
    id?: SortOrder
    artwork_file_id?: SortOrder
    transportX?: SortOrder
    transportY?: SortOrder
    transportZ?: SortOrder
    rotateX?: SortOrder
    rotateY?: SortOrder
    rotateZ?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    scaleZ?: SortOrder
  }

  export type ArtworkGizmoMaxOrderByAggregateInput = {
    id?: SortOrder
    artwork_file_id?: SortOrder
    transportX?: SortOrder
    transportY?: SortOrder
    transportZ?: SortOrder
    rotateX?: SortOrder
    rotateY?: SortOrder
    rotateZ?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    scaleZ?: SortOrder
  }

  export type ArtworkGizmoMinOrderByAggregateInput = {
    id?: SortOrder
    artwork_file_id?: SortOrder
    transportX?: SortOrder
    transportY?: SortOrder
    transportZ?: SortOrder
    rotateX?: SortOrder
    rotateY?: SortOrder
    rotateZ?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    scaleZ?: SortOrder
  }

  export type ArtworkGizmoSumOrderByAggregateInput = {
    id?: SortOrder
    artwork_file_id?: SortOrder
    transportX?: SortOrder
    transportY?: SortOrder
    transportZ?: SortOrder
    rotateX?: SortOrder
    rotateY?: SortOrder
    rotateZ?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    scaleZ?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    artwork_id?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    artwork_id?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    artwork_id?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    slug_id?: SortOrder
    user_id?: SortOrder
    artwork_id?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    artwork_id?: SortOrder
  }

  export type RanksScalarRelationFilter = {
    is?: RanksWhereInput
    isNot?: RanksWhereInput
  }

  export type ArtworkRanksArtwork_idRank_idUser_idCompoundUniqueInput = {
    artwork_id: number
    rank_id: number
    user_id: number
  }

  export type ArtworkRanksCountOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    rank_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkRanksAvgOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    rank_id?: SortOrder
    user_id?: SortOrder
  }

  export type ArtworkRanksMaxOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    rank_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkRanksMinOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    rank_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ArtworkRanksSumOrderByAggregateInput = {
    id?: SortOrder
    artwork_id?: SortOrder
    rank_id?: SortOrder
    user_id?: SortOrder
  }

  export type RankTypesScalarRelationFilter = {
    is?: RankTypesWhereInput
    isNot?: RankTypesWhereInput
  }

  export type RanksCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rank_type_id?: SortOrder
  }

  export type RanksAvgOrderByAggregateInput = {
    id?: SortOrder
    rank_type_id?: SortOrder
  }

  export type RanksMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rank_type_id?: SortOrder
  }

  export type RanksMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rank_type_id?: SortOrder
  }

  export type RanksSumOrderByAggregateInput = {
    id?: SortOrder
    rank_type_id?: SortOrder
  }

  export type RanksListRelationFilter = {
    every?: RanksWhereInput
    some?: RanksWhereInput
    none?: RanksWhereInput
  }

  export type RanksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RankTypesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RankTypesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RankTypesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RankTypesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RankTypesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuthPayloadCreateNestedOneWithoutUserInput = {
    create?: XOR<AuthPayloadCreateWithoutUserInput, AuthPayloadUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthPayloadCreateOrConnectWithoutUserInput
    connect?: AuthPayloadWhereUniqueInput
  }

  export type ArtworkCreateNestedManyWithoutUserInput = {
    create?: XOR<ArtworkCreateWithoutUserInput, ArtworkUncheckedCreateWithoutUserInput> | ArtworkCreateWithoutUserInput[] | ArtworkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkCreateOrConnectWithoutUserInput | ArtworkCreateOrConnectWithoutUserInput[]
    createMany?: ArtworkCreateManyUserInputEnvelope
    connect?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
  }

  export type ArtworkRanksCreateNestedManyWithoutUserInput = {
    create?: XOR<ArtworkRanksCreateWithoutUserInput, ArtworkRanksUncheckedCreateWithoutUserInput> | ArtworkRanksCreateWithoutUserInput[] | ArtworkRanksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutUserInput | ArtworkRanksCreateOrConnectWithoutUserInput[]
    createMany?: ArtworkRanksCreateManyUserInputEnvelope
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowedByInput = {
    create?: XOR<FollowCreateWithoutFollowedByInput, FollowUncheckedCreateWithoutFollowedByInput> | FollowCreateWithoutFollowedByInput[] | FollowUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedByInput | FollowCreateOrConnectWithoutFollowedByInput[]
    createMany?: FollowCreateManyFollowedByInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type AuthPayloadUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AuthPayloadCreateWithoutUserInput, AuthPayloadUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthPayloadCreateOrConnectWithoutUserInput
    connect?: AuthPayloadWhereUniqueInput
  }

  export type ArtworkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArtworkCreateWithoutUserInput, ArtworkUncheckedCreateWithoutUserInput> | ArtworkCreateWithoutUserInput[] | ArtworkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkCreateOrConnectWithoutUserInput | ArtworkCreateOrConnectWithoutUserInput[]
    createMany?: ArtworkCreateManyUserInputEnvelope
    connect?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
  }

  export type ArtworkRanksUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArtworkRanksCreateWithoutUserInput, ArtworkRanksUncheckedCreateWithoutUserInput> | ArtworkRanksCreateWithoutUserInput[] | ArtworkRanksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutUserInput | ArtworkRanksCreateOrConnectWithoutUserInput[]
    createMany?: ArtworkRanksCreateManyUserInputEnvelope
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowedByInput = {
    create?: XOR<FollowCreateWithoutFollowedByInput, FollowUncheckedCreateWithoutFollowedByInput> | FollowCreateWithoutFollowedByInput[] | FollowUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedByInput | FollowCreateOrConnectWithoutFollowedByInput[]
    createMany?: FollowCreateManyFollowedByInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthPayloadUpdateOneWithoutUserNestedInput = {
    create?: XOR<AuthPayloadCreateWithoutUserInput, AuthPayloadUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthPayloadCreateOrConnectWithoutUserInput
    upsert?: AuthPayloadUpsertWithoutUserInput
    disconnect?: AuthPayloadWhereInput | boolean
    delete?: AuthPayloadWhereInput | boolean
    connect?: AuthPayloadWhereUniqueInput
    update?: XOR<XOR<AuthPayloadUpdateToOneWithWhereWithoutUserInput, AuthPayloadUpdateWithoutUserInput>, AuthPayloadUncheckedUpdateWithoutUserInput>
  }

  export type ArtworkUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArtworkCreateWithoutUserInput, ArtworkUncheckedCreateWithoutUserInput> | ArtworkCreateWithoutUserInput[] | ArtworkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkCreateOrConnectWithoutUserInput | ArtworkCreateOrConnectWithoutUserInput[]
    upsert?: ArtworkUpsertWithWhereUniqueWithoutUserInput | ArtworkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArtworkCreateManyUserInputEnvelope
    set?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    disconnect?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    delete?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    connect?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    update?: ArtworkUpdateWithWhereUniqueWithoutUserInput | ArtworkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArtworkUpdateManyWithWhereWithoutUserInput | ArtworkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArtworkScalarWhereInput | ArtworkScalarWhereInput[]
  }

  export type ArtworkRanksUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArtworkRanksCreateWithoutUserInput, ArtworkRanksUncheckedCreateWithoutUserInput> | ArtworkRanksCreateWithoutUserInput[] | ArtworkRanksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutUserInput | ArtworkRanksCreateOrConnectWithoutUserInput[]
    upsert?: ArtworkRanksUpsertWithWhereUniqueWithoutUserInput | ArtworkRanksUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArtworkRanksCreateManyUserInputEnvelope
    set?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    disconnect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    delete?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    update?: ArtworkRanksUpdateWithWhereUniqueWithoutUserInput | ArtworkRanksUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArtworkRanksUpdateManyWithWhereWithoutUserInput | ArtworkRanksUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowedByNestedInput = {
    create?: XOR<FollowCreateWithoutFollowedByInput, FollowUncheckedCreateWithoutFollowedByInput> | FollowCreateWithoutFollowedByInput[] | FollowUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedByInput | FollowCreateOrConnectWithoutFollowedByInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowedByInput | FollowUpsertWithWhereUniqueWithoutFollowedByInput[]
    createMany?: FollowCreateManyFollowedByInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowedByInput | FollowUpdateWithWhereUniqueWithoutFollowedByInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowedByInput | FollowUpdateManyWithWhereWithoutFollowedByInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AuthPayloadUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AuthPayloadCreateWithoutUserInput, AuthPayloadUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthPayloadCreateOrConnectWithoutUserInput
    upsert?: AuthPayloadUpsertWithoutUserInput
    disconnect?: AuthPayloadWhereInput | boolean
    delete?: AuthPayloadWhereInput | boolean
    connect?: AuthPayloadWhereUniqueInput
    update?: XOR<XOR<AuthPayloadUpdateToOneWithWhereWithoutUserInput, AuthPayloadUpdateWithoutUserInput>, AuthPayloadUncheckedUpdateWithoutUserInput>
  }

  export type ArtworkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArtworkCreateWithoutUserInput, ArtworkUncheckedCreateWithoutUserInput> | ArtworkCreateWithoutUserInput[] | ArtworkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkCreateOrConnectWithoutUserInput | ArtworkCreateOrConnectWithoutUserInput[]
    upsert?: ArtworkUpsertWithWhereUniqueWithoutUserInput | ArtworkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArtworkCreateManyUserInputEnvelope
    set?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    disconnect?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    delete?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    connect?: ArtworkWhereUniqueInput | ArtworkWhereUniqueInput[]
    update?: ArtworkUpdateWithWhereUniqueWithoutUserInput | ArtworkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArtworkUpdateManyWithWhereWithoutUserInput | ArtworkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArtworkScalarWhereInput | ArtworkScalarWhereInput[]
  }

  export type ArtworkRanksUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArtworkRanksCreateWithoutUserInput, ArtworkRanksUncheckedCreateWithoutUserInput> | ArtworkRanksCreateWithoutUserInput[] | ArtworkRanksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutUserInput | ArtworkRanksCreateOrConnectWithoutUserInput[]
    upsert?: ArtworkRanksUpsertWithWhereUniqueWithoutUserInput | ArtworkRanksUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArtworkRanksCreateManyUserInputEnvelope
    set?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    disconnect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    delete?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    update?: ArtworkRanksUpdateWithWhereUniqueWithoutUserInput | ArtworkRanksUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArtworkRanksUpdateManyWithWhereWithoutUserInput | ArtworkRanksUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowedByNestedInput = {
    create?: XOR<FollowCreateWithoutFollowedByInput, FollowUncheckedCreateWithoutFollowedByInput> | FollowCreateWithoutFollowedByInput[] | FollowUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedByInput | FollowCreateOrConnectWithoutFollowedByInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowedByInput | FollowUpsertWithWhereUniqueWithoutFollowedByInput[]
    createMany?: FollowCreateManyFollowedByInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowedByInput | FollowUpdateWithWhereUniqueWithoutFollowedByInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowedByInput | FollowUpdateManyWithWhereWithoutFollowedByInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuth_payloadInput = {
    create?: XOR<UserCreateWithoutAuth_payloadInput, UserUncheckedCreateWithoutAuth_payloadInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuth_payloadInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuth_payloadNestedInput = {
    create?: XOR<UserCreateWithoutAuth_payloadInput, UserUncheckedCreateWithoutAuth_payloadInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuth_payloadInput
    upsert?: UserUpsertWithoutAuth_payloadInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuth_payloadInput, UserUpdateWithoutAuth_payloadInput>, UserUncheckedUpdateWithoutAuth_payloadInput>
  }

  export type UserCreateNestedOneWithoutFollowed_byInput = {
    create?: XOR<UserCreateWithoutFollowed_byInput, UserUncheckedCreateWithoutFollowed_byInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowed_byInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowed_byNestedInput = {
    create?: XOR<UserCreateWithoutFollowed_byInput, UserUncheckedCreateWithoutFollowed_byInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowed_byInput
    upsert?: UserUpsertWithoutFollowed_byInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowed_byInput, UserUpdateWithoutFollowed_byInput>, UserUncheckedUpdateWithoutFollowed_byInput>
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserCreateNestedOneWithoutArtworksInput = {
    create?: XOR<UserCreateWithoutArtworksInput, UserUncheckedCreateWithoutArtworksInput>
    connectOrCreate?: UserCreateOrConnectWithoutArtworksInput
    connect?: UserWhereUniqueInput
  }

  export type ArtworkFileCreateNestedManyWithoutArtworkInput = {
    create?: XOR<ArtworkFileCreateWithoutArtworkInput, ArtworkFileUncheckedCreateWithoutArtworkInput> | ArtworkFileCreateWithoutArtworkInput[] | ArtworkFileUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkFileCreateOrConnectWithoutArtworkInput | ArtworkFileCreateOrConnectWithoutArtworkInput[]
    createMany?: ArtworkFileCreateManyArtworkInputEnvelope
    connect?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
  }

  export type ArtworkRanksCreateNestedManyWithoutArtworkInput = {
    create?: XOR<ArtworkRanksCreateWithoutArtworkInput, ArtworkRanksUncheckedCreateWithoutArtworkInput> | ArtworkRanksCreateWithoutArtworkInput[] | ArtworkRanksUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutArtworkInput | ArtworkRanksCreateOrConnectWithoutArtworkInput[]
    createMany?: ArtworkRanksCreateManyArtworkInputEnvelope
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutArtworkInput = {
    create?: XOR<CommentCreateWithoutArtworkInput, CommentUncheckedCreateWithoutArtworkInput> | CommentCreateWithoutArtworkInput[] | CommentUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutArtworkInput | CommentCreateOrConnectWithoutArtworkInput[]
    createMany?: CommentCreateManyArtworkInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ArtworkFileUncheckedCreateNestedManyWithoutArtworkInput = {
    create?: XOR<ArtworkFileCreateWithoutArtworkInput, ArtworkFileUncheckedCreateWithoutArtworkInput> | ArtworkFileCreateWithoutArtworkInput[] | ArtworkFileUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkFileCreateOrConnectWithoutArtworkInput | ArtworkFileCreateOrConnectWithoutArtworkInput[]
    createMany?: ArtworkFileCreateManyArtworkInputEnvelope
    connect?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
  }

  export type ArtworkRanksUncheckedCreateNestedManyWithoutArtworkInput = {
    create?: XOR<ArtworkRanksCreateWithoutArtworkInput, ArtworkRanksUncheckedCreateWithoutArtworkInput> | ArtworkRanksCreateWithoutArtworkInput[] | ArtworkRanksUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutArtworkInput | ArtworkRanksCreateOrConnectWithoutArtworkInput[]
    createMany?: ArtworkRanksCreateManyArtworkInputEnvelope
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutArtworkInput = {
    create?: XOR<CommentCreateWithoutArtworkInput, CommentUncheckedCreateWithoutArtworkInput> | CommentCreateWithoutArtworkInput[] | CommentUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutArtworkInput | CommentCreateOrConnectWithoutArtworkInput[]
    createMany?: CommentCreateManyArtworkInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutArtworksNestedInput = {
    create?: XOR<UserCreateWithoutArtworksInput, UserUncheckedCreateWithoutArtworksInput>
    connectOrCreate?: UserCreateOrConnectWithoutArtworksInput
    upsert?: UserUpsertWithoutArtworksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArtworksInput, UserUpdateWithoutArtworksInput>, UserUncheckedUpdateWithoutArtworksInput>
  }

  export type ArtworkFileUpdateManyWithoutArtworkNestedInput = {
    create?: XOR<ArtworkFileCreateWithoutArtworkInput, ArtworkFileUncheckedCreateWithoutArtworkInput> | ArtworkFileCreateWithoutArtworkInput[] | ArtworkFileUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkFileCreateOrConnectWithoutArtworkInput | ArtworkFileCreateOrConnectWithoutArtworkInput[]
    upsert?: ArtworkFileUpsertWithWhereUniqueWithoutArtworkInput | ArtworkFileUpsertWithWhereUniqueWithoutArtworkInput[]
    createMany?: ArtworkFileCreateManyArtworkInputEnvelope
    set?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    disconnect?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    delete?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    connect?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    update?: ArtworkFileUpdateWithWhereUniqueWithoutArtworkInput | ArtworkFileUpdateWithWhereUniqueWithoutArtworkInput[]
    updateMany?: ArtworkFileUpdateManyWithWhereWithoutArtworkInput | ArtworkFileUpdateManyWithWhereWithoutArtworkInput[]
    deleteMany?: ArtworkFileScalarWhereInput | ArtworkFileScalarWhereInput[]
  }

  export type ArtworkRanksUpdateManyWithoutArtworkNestedInput = {
    create?: XOR<ArtworkRanksCreateWithoutArtworkInput, ArtworkRanksUncheckedCreateWithoutArtworkInput> | ArtworkRanksCreateWithoutArtworkInput[] | ArtworkRanksUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutArtworkInput | ArtworkRanksCreateOrConnectWithoutArtworkInput[]
    upsert?: ArtworkRanksUpsertWithWhereUniqueWithoutArtworkInput | ArtworkRanksUpsertWithWhereUniqueWithoutArtworkInput[]
    createMany?: ArtworkRanksCreateManyArtworkInputEnvelope
    set?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    disconnect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    delete?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    update?: ArtworkRanksUpdateWithWhereUniqueWithoutArtworkInput | ArtworkRanksUpdateWithWhereUniqueWithoutArtworkInput[]
    updateMany?: ArtworkRanksUpdateManyWithWhereWithoutArtworkInput | ArtworkRanksUpdateManyWithWhereWithoutArtworkInput[]
    deleteMany?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutArtworkNestedInput = {
    create?: XOR<CommentCreateWithoutArtworkInput, CommentUncheckedCreateWithoutArtworkInput> | CommentCreateWithoutArtworkInput[] | CommentUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutArtworkInput | CommentCreateOrConnectWithoutArtworkInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutArtworkInput | CommentUpsertWithWhereUniqueWithoutArtworkInput[]
    createMany?: CommentCreateManyArtworkInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutArtworkInput | CommentUpdateWithWhereUniqueWithoutArtworkInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutArtworkInput | CommentUpdateManyWithWhereWithoutArtworkInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ArtworkFileUncheckedUpdateManyWithoutArtworkNestedInput = {
    create?: XOR<ArtworkFileCreateWithoutArtworkInput, ArtworkFileUncheckedCreateWithoutArtworkInput> | ArtworkFileCreateWithoutArtworkInput[] | ArtworkFileUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkFileCreateOrConnectWithoutArtworkInput | ArtworkFileCreateOrConnectWithoutArtworkInput[]
    upsert?: ArtworkFileUpsertWithWhereUniqueWithoutArtworkInput | ArtworkFileUpsertWithWhereUniqueWithoutArtworkInput[]
    createMany?: ArtworkFileCreateManyArtworkInputEnvelope
    set?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    disconnect?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    delete?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    connect?: ArtworkFileWhereUniqueInput | ArtworkFileWhereUniqueInput[]
    update?: ArtworkFileUpdateWithWhereUniqueWithoutArtworkInput | ArtworkFileUpdateWithWhereUniqueWithoutArtworkInput[]
    updateMany?: ArtworkFileUpdateManyWithWhereWithoutArtworkInput | ArtworkFileUpdateManyWithWhereWithoutArtworkInput[]
    deleteMany?: ArtworkFileScalarWhereInput | ArtworkFileScalarWhereInput[]
  }

  export type ArtworkRanksUncheckedUpdateManyWithoutArtworkNestedInput = {
    create?: XOR<ArtworkRanksCreateWithoutArtworkInput, ArtworkRanksUncheckedCreateWithoutArtworkInput> | ArtworkRanksCreateWithoutArtworkInput[] | ArtworkRanksUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutArtworkInput | ArtworkRanksCreateOrConnectWithoutArtworkInput[]
    upsert?: ArtworkRanksUpsertWithWhereUniqueWithoutArtworkInput | ArtworkRanksUpsertWithWhereUniqueWithoutArtworkInput[]
    createMany?: ArtworkRanksCreateManyArtworkInputEnvelope
    set?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    disconnect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    delete?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    update?: ArtworkRanksUpdateWithWhereUniqueWithoutArtworkInput | ArtworkRanksUpdateWithWhereUniqueWithoutArtworkInput[]
    updateMany?: ArtworkRanksUpdateManyWithWhereWithoutArtworkInput | ArtworkRanksUpdateManyWithWhereWithoutArtworkInput[]
    deleteMany?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutArtworkNestedInput = {
    create?: XOR<CommentCreateWithoutArtworkInput, CommentUncheckedCreateWithoutArtworkInput> | CommentCreateWithoutArtworkInput[] | CommentUncheckedCreateWithoutArtworkInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutArtworkInput | CommentCreateOrConnectWithoutArtworkInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutArtworkInput | CommentUpsertWithWhereUniqueWithoutArtworkInput[]
    createMany?: CommentCreateManyArtworkInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutArtworkInput | CommentUpdateWithWhereUniqueWithoutArtworkInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutArtworkInput | CommentUpdateManyWithWhereWithoutArtworkInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ArtworkCreateNestedOneWithoutArtwork_fileInput = {
    create?: XOR<ArtworkCreateWithoutArtwork_fileInput, ArtworkUncheckedCreateWithoutArtwork_fileInput>
    connectOrCreate?: ArtworkCreateOrConnectWithoutArtwork_fileInput
    connect?: ArtworkWhereUniqueInput
  }

  export type ArtworkGizmoCreateNestedManyWithoutArtwork_fileInput = {
    create?: XOR<ArtworkGizmoCreateWithoutArtwork_fileInput, ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput> | ArtworkGizmoCreateWithoutArtwork_fileInput[] | ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput[]
    connectOrCreate?: ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput | ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput[]
    createMany?: ArtworkGizmoCreateManyArtwork_fileInputEnvelope
    connect?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
  }

  export type ArtworkGizmoUncheckedCreateNestedManyWithoutArtwork_fileInput = {
    create?: XOR<ArtworkGizmoCreateWithoutArtwork_fileInput, ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput> | ArtworkGizmoCreateWithoutArtwork_fileInput[] | ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput[]
    connectOrCreate?: ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput | ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput[]
    createMany?: ArtworkGizmoCreateManyArtwork_fileInputEnvelope
    connect?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
  }

  export type ArtworkUpdateOneRequiredWithoutArtwork_fileNestedInput = {
    create?: XOR<ArtworkCreateWithoutArtwork_fileInput, ArtworkUncheckedCreateWithoutArtwork_fileInput>
    connectOrCreate?: ArtworkCreateOrConnectWithoutArtwork_fileInput
    upsert?: ArtworkUpsertWithoutArtwork_fileInput
    connect?: ArtworkWhereUniqueInput
    update?: XOR<XOR<ArtworkUpdateToOneWithWhereWithoutArtwork_fileInput, ArtworkUpdateWithoutArtwork_fileInput>, ArtworkUncheckedUpdateWithoutArtwork_fileInput>
  }

  export type ArtworkGizmoUpdateManyWithoutArtwork_fileNestedInput = {
    create?: XOR<ArtworkGizmoCreateWithoutArtwork_fileInput, ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput> | ArtworkGizmoCreateWithoutArtwork_fileInput[] | ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput[]
    connectOrCreate?: ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput | ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput[]
    upsert?: ArtworkGizmoUpsertWithWhereUniqueWithoutArtwork_fileInput | ArtworkGizmoUpsertWithWhereUniqueWithoutArtwork_fileInput[]
    createMany?: ArtworkGizmoCreateManyArtwork_fileInputEnvelope
    set?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    disconnect?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    delete?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    connect?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    update?: ArtworkGizmoUpdateWithWhereUniqueWithoutArtwork_fileInput | ArtworkGizmoUpdateWithWhereUniqueWithoutArtwork_fileInput[]
    updateMany?: ArtworkGizmoUpdateManyWithWhereWithoutArtwork_fileInput | ArtworkGizmoUpdateManyWithWhereWithoutArtwork_fileInput[]
    deleteMany?: ArtworkGizmoScalarWhereInput | ArtworkGizmoScalarWhereInput[]
  }

  export type ArtworkGizmoUncheckedUpdateManyWithoutArtwork_fileNestedInput = {
    create?: XOR<ArtworkGizmoCreateWithoutArtwork_fileInput, ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput> | ArtworkGizmoCreateWithoutArtwork_fileInput[] | ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput[]
    connectOrCreate?: ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput | ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput[]
    upsert?: ArtworkGizmoUpsertWithWhereUniqueWithoutArtwork_fileInput | ArtworkGizmoUpsertWithWhereUniqueWithoutArtwork_fileInput[]
    createMany?: ArtworkGizmoCreateManyArtwork_fileInputEnvelope
    set?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    disconnect?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    delete?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    connect?: ArtworkGizmoWhereUniqueInput | ArtworkGizmoWhereUniqueInput[]
    update?: ArtworkGizmoUpdateWithWhereUniqueWithoutArtwork_fileInput | ArtworkGizmoUpdateWithWhereUniqueWithoutArtwork_fileInput[]
    updateMany?: ArtworkGizmoUpdateManyWithWhereWithoutArtwork_fileInput | ArtworkGizmoUpdateManyWithWhereWithoutArtwork_fileInput[]
    deleteMany?: ArtworkGizmoScalarWhereInput | ArtworkGizmoScalarWhereInput[]
  }

  export type ArtworkFileCreateNestedOneWithoutArtwork_gizmoInput = {
    create?: XOR<ArtworkFileCreateWithoutArtwork_gizmoInput, ArtworkFileUncheckedCreateWithoutArtwork_gizmoInput>
    connectOrCreate?: ArtworkFileCreateOrConnectWithoutArtwork_gizmoInput
    connect?: ArtworkFileWhereUniqueInput
  }

  export type ArtworkFileUpdateOneRequiredWithoutArtwork_gizmoNestedInput = {
    create?: XOR<ArtworkFileCreateWithoutArtwork_gizmoInput, ArtworkFileUncheckedCreateWithoutArtwork_gizmoInput>
    connectOrCreate?: ArtworkFileCreateOrConnectWithoutArtwork_gizmoInput
    upsert?: ArtworkFileUpsertWithoutArtwork_gizmoInput
    connect?: ArtworkFileWhereUniqueInput
    update?: XOR<XOR<ArtworkFileUpdateToOneWithWhereWithoutArtwork_gizmoInput, ArtworkFileUpdateWithoutArtwork_gizmoInput>, ArtworkFileUncheckedUpdateWithoutArtwork_gizmoInput>
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type ArtworkCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ArtworkCreateWithoutCommentsInput, ArtworkUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ArtworkCreateOrConnectWithoutCommentsInput
    connect?: ArtworkWhereUniqueInput
  }

  export type UserUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type ArtworkUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ArtworkCreateWithoutCommentsInput, ArtworkUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ArtworkCreateOrConnectWithoutCommentsInput
    upsert?: ArtworkUpsertWithoutCommentsInput
    connect?: ArtworkWhereUniqueInput
    update?: XOR<XOR<ArtworkUpdateToOneWithWhereWithoutCommentsInput, ArtworkUpdateWithoutCommentsInput>, ArtworkUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutArtwork_ranksInput = {
    create?: XOR<UserCreateWithoutArtwork_ranksInput, UserUncheckedCreateWithoutArtwork_ranksInput>
    connectOrCreate?: UserCreateOrConnectWithoutArtwork_ranksInput
    connect?: UserWhereUniqueInput
  }

  export type ArtworkCreateNestedOneWithoutArtwork_ranksInput = {
    create?: XOR<ArtworkCreateWithoutArtwork_ranksInput, ArtworkUncheckedCreateWithoutArtwork_ranksInput>
    connectOrCreate?: ArtworkCreateOrConnectWithoutArtwork_ranksInput
    connect?: ArtworkWhereUniqueInput
  }

  export type RanksCreateNestedOneWithoutArtwork_ranksInput = {
    create?: XOR<RanksCreateWithoutArtwork_ranksInput, RanksUncheckedCreateWithoutArtwork_ranksInput>
    connectOrCreate?: RanksCreateOrConnectWithoutArtwork_ranksInput
    connect?: RanksWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutArtwork_ranksNestedInput = {
    create?: XOR<UserCreateWithoutArtwork_ranksInput, UserUncheckedCreateWithoutArtwork_ranksInput>
    connectOrCreate?: UserCreateOrConnectWithoutArtwork_ranksInput
    upsert?: UserUpsertWithoutArtwork_ranksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArtwork_ranksInput, UserUpdateWithoutArtwork_ranksInput>, UserUncheckedUpdateWithoutArtwork_ranksInput>
  }

  export type ArtworkUpdateOneRequiredWithoutArtwork_ranksNestedInput = {
    create?: XOR<ArtworkCreateWithoutArtwork_ranksInput, ArtworkUncheckedCreateWithoutArtwork_ranksInput>
    connectOrCreate?: ArtworkCreateOrConnectWithoutArtwork_ranksInput
    upsert?: ArtworkUpsertWithoutArtwork_ranksInput
    connect?: ArtworkWhereUniqueInput
    update?: XOR<XOR<ArtworkUpdateToOneWithWhereWithoutArtwork_ranksInput, ArtworkUpdateWithoutArtwork_ranksInput>, ArtworkUncheckedUpdateWithoutArtwork_ranksInput>
  }

  export type RanksUpdateOneRequiredWithoutArtwork_ranksNestedInput = {
    create?: XOR<RanksCreateWithoutArtwork_ranksInput, RanksUncheckedCreateWithoutArtwork_ranksInput>
    connectOrCreate?: RanksCreateOrConnectWithoutArtwork_ranksInput
    upsert?: RanksUpsertWithoutArtwork_ranksInput
    connect?: RanksWhereUniqueInput
    update?: XOR<XOR<RanksUpdateToOneWithWhereWithoutArtwork_ranksInput, RanksUpdateWithoutArtwork_ranksInput>, RanksUncheckedUpdateWithoutArtwork_ranksInput>
  }

  export type ArtworkRanksCreateNestedManyWithoutRanksInput = {
    create?: XOR<ArtworkRanksCreateWithoutRanksInput, ArtworkRanksUncheckedCreateWithoutRanksInput> | ArtworkRanksCreateWithoutRanksInput[] | ArtworkRanksUncheckedCreateWithoutRanksInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutRanksInput | ArtworkRanksCreateOrConnectWithoutRanksInput[]
    createMany?: ArtworkRanksCreateManyRanksInputEnvelope
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
  }

  export type RankTypesCreateNestedOneWithoutRanksInput = {
    create?: XOR<RankTypesCreateWithoutRanksInput, RankTypesUncheckedCreateWithoutRanksInput>
    connectOrCreate?: RankTypesCreateOrConnectWithoutRanksInput
    connect?: RankTypesWhereUniqueInput
  }

  export type ArtworkRanksUncheckedCreateNestedManyWithoutRanksInput = {
    create?: XOR<ArtworkRanksCreateWithoutRanksInput, ArtworkRanksUncheckedCreateWithoutRanksInput> | ArtworkRanksCreateWithoutRanksInput[] | ArtworkRanksUncheckedCreateWithoutRanksInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutRanksInput | ArtworkRanksCreateOrConnectWithoutRanksInput[]
    createMany?: ArtworkRanksCreateManyRanksInputEnvelope
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
  }

  export type ArtworkRanksUpdateManyWithoutRanksNestedInput = {
    create?: XOR<ArtworkRanksCreateWithoutRanksInput, ArtworkRanksUncheckedCreateWithoutRanksInput> | ArtworkRanksCreateWithoutRanksInput[] | ArtworkRanksUncheckedCreateWithoutRanksInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutRanksInput | ArtworkRanksCreateOrConnectWithoutRanksInput[]
    upsert?: ArtworkRanksUpsertWithWhereUniqueWithoutRanksInput | ArtworkRanksUpsertWithWhereUniqueWithoutRanksInput[]
    createMany?: ArtworkRanksCreateManyRanksInputEnvelope
    set?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    disconnect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    delete?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    update?: ArtworkRanksUpdateWithWhereUniqueWithoutRanksInput | ArtworkRanksUpdateWithWhereUniqueWithoutRanksInput[]
    updateMany?: ArtworkRanksUpdateManyWithWhereWithoutRanksInput | ArtworkRanksUpdateManyWithWhereWithoutRanksInput[]
    deleteMany?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
  }

  export type RankTypesUpdateOneRequiredWithoutRanksNestedInput = {
    create?: XOR<RankTypesCreateWithoutRanksInput, RankTypesUncheckedCreateWithoutRanksInput>
    connectOrCreate?: RankTypesCreateOrConnectWithoutRanksInput
    upsert?: RankTypesUpsertWithoutRanksInput
    connect?: RankTypesWhereUniqueInput
    update?: XOR<XOR<RankTypesUpdateToOneWithWhereWithoutRanksInput, RankTypesUpdateWithoutRanksInput>, RankTypesUncheckedUpdateWithoutRanksInput>
  }

  export type ArtworkRanksUncheckedUpdateManyWithoutRanksNestedInput = {
    create?: XOR<ArtworkRanksCreateWithoutRanksInput, ArtworkRanksUncheckedCreateWithoutRanksInput> | ArtworkRanksCreateWithoutRanksInput[] | ArtworkRanksUncheckedCreateWithoutRanksInput[]
    connectOrCreate?: ArtworkRanksCreateOrConnectWithoutRanksInput | ArtworkRanksCreateOrConnectWithoutRanksInput[]
    upsert?: ArtworkRanksUpsertWithWhereUniqueWithoutRanksInput | ArtworkRanksUpsertWithWhereUniqueWithoutRanksInput[]
    createMany?: ArtworkRanksCreateManyRanksInputEnvelope
    set?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    disconnect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    delete?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    connect?: ArtworkRanksWhereUniqueInput | ArtworkRanksWhereUniqueInput[]
    update?: ArtworkRanksUpdateWithWhereUniqueWithoutRanksInput | ArtworkRanksUpdateWithWhereUniqueWithoutRanksInput[]
    updateMany?: ArtworkRanksUpdateManyWithWhereWithoutRanksInput | ArtworkRanksUpdateManyWithWhereWithoutRanksInput[]
    deleteMany?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
  }

  export type RanksCreateNestedManyWithoutRank_typeInput = {
    create?: XOR<RanksCreateWithoutRank_typeInput, RanksUncheckedCreateWithoutRank_typeInput> | RanksCreateWithoutRank_typeInput[] | RanksUncheckedCreateWithoutRank_typeInput[]
    connectOrCreate?: RanksCreateOrConnectWithoutRank_typeInput | RanksCreateOrConnectWithoutRank_typeInput[]
    createMany?: RanksCreateManyRank_typeInputEnvelope
    connect?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
  }

  export type RanksUncheckedCreateNestedManyWithoutRank_typeInput = {
    create?: XOR<RanksCreateWithoutRank_typeInput, RanksUncheckedCreateWithoutRank_typeInput> | RanksCreateWithoutRank_typeInput[] | RanksUncheckedCreateWithoutRank_typeInput[]
    connectOrCreate?: RanksCreateOrConnectWithoutRank_typeInput | RanksCreateOrConnectWithoutRank_typeInput[]
    createMany?: RanksCreateManyRank_typeInputEnvelope
    connect?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
  }

  export type RanksUpdateManyWithoutRank_typeNestedInput = {
    create?: XOR<RanksCreateWithoutRank_typeInput, RanksUncheckedCreateWithoutRank_typeInput> | RanksCreateWithoutRank_typeInput[] | RanksUncheckedCreateWithoutRank_typeInput[]
    connectOrCreate?: RanksCreateOrConnectWithoutRank_typeInput | RanksCreateOrConnectWithoutRank_typeInput[]
    upsert?: RanksUpsertWithWhereUniqueWithoutRank_typeInput | RanksUpsertWithWhereUniqueWithoutRank_typeInput[]
    createMany?: RanksCreateManyRank_typeInputEnvelope
    set?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    disconnect?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    delete?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    connect?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    update?: RanksUpdateWithWhereUniqueWithoutRank_typeInput | RanksUpdateWithWhereUniqueWithoutRank_typeInput[]
    updateMany?: RanksUpdateManyWithWhereWithoutRank_typeInput | RanksUpdateManyWithWhereWithoutRank_typeInput[]
    deleteMany?: RanksScalarWhereInput | RanksScalarWhereInput[]
  }

  export type RanksUncheckedUpdateManyWithoutRank_typeNestedInput = {
    create?: XOR<RanksCreateWithoutRank_typeInput, RanksUncheckedCreateWithoutRank_typeInput> | RanksCreateWithoutRank_typeInput[] | RanksUncheckedCreateWithoutRank_typeInput[]
    connectOrCreate?: RanksCreateOrConnectWithoutRank_typeInput | RanksCreateOrConnectWithoutRank_typeInput[]
    upsert?: RanksUpsertWithWhereUniqueWithoutRank_typeInput | RanksUpsertWithWhereUniqueWithoutRank_typeInput[]
    createMany?: RanksCreateManyRank_typeInputEnvelope
    set?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    disconnect?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    delete?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    connect?: RanksWhereUniqueInput | RanksWhereUniqueInput[]
    update?: RanksUpdateWithWhereUniqueWithoutRank_typeInput | RanksUpdateWithWhereUniqueWithoutRank_typeInput[]
    updateMany?: RanksUpdateManyWithWhereWithoutRank_typeInput | RanksUpdateManyWithWhereWithoutRank_typeInput[]
    deleteMany?: RanksScalarWhereInput | RanksScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AuthPayloadCreateWithoutUserInput = {
    id?: string
    access_token: string
    refresh_token: string
    created_at?: Date | string
    expires_at: Date | string
  }

  export type AuthPayloadUncheckedCreateWithoutUserInput = {
    id?: string
    access_token: string
    refresh_token: string
    created_at?: Date | string
    expires_at: Date | string
  }

  export type AuthPayloadCreateOrConnectWithoutUserInput = {
    where: AuthPayloadWhereUniqueInput
    create: XOR<AuthPayloadCreateWithoutUserInput, AuthPayloadUncheckedCreateWithoutUserInput>
  }

  export type ArtworkCreateWithoutUserInput = {
    slug_id?: string
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    artwork_file?: ArtworkFileCreateNestedManyWithoutArtworkInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutArtworkInput
    comments?: CommentCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkUncheckedCreateWithoutUserInput = {
    id?: number
    slug_id?: string
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    artwork_file?: ArtworkFileUncheckedCreateNestedManyWithoutArtworkInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutArtworkInput
    comments?: CommentUncheckedCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkCreateOrConnectWithoutUserInput = {
    where: ArtworkWhereUniqueInput
    create: XOR<ArtworkCreateWithoutUserInput, ArtworkUncheckedCreateWithoutUserInput>
  }

  export type ArtworkCreateManyUserInputEnvelope = {
    data: ArtworkCreateManyUserInput | ArtworkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ArtworkRanksCreateWithoutUserInput = {
    created_at?: Date | string
    updated_at?: Date | string
    artwork: ArtworkCreateNestedOneWithoutArtwork_ranksInput
    ranks: RanksCreateNestedOneWithoutArtwork_ranksInput
  }

  export type ArtworkRanksUncheckedCreateWithoutUserInput = {
    id?: number
    artwork_id: number
    rank_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksCreateOrConnectWithoutUserInput = {
    where: ArtworkRanksWhereUniqueInput
    create: XOR<ArtworkRanksCreateWithoutUserInput, ArtworkRanksUncheckedCreateWithoutUserInput>
  }

  export type ArtworkRanksCreateManyUserInputEnvelope = {
    data: ArtworkRanksCreateManyUserInput | ArtworkRanksCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    slug_id?: string
    body: string
    created_at?: Date | string
    updated_at?: Date | string
    artwork: ArtworkCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: number
    slug_id?: string
    artwork_id: number
    body: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowedByInput = {
    following: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowUncheckedCreateWithoutFollowedByInput = {
    following_id: number
  }

  export type FollowCreateOrConnectWithoutFollowedByInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowedByInput, FollowUncheckedCreateWithoutFollowedByInput>
  }

  export type FollowCreateManyFollowedByInputEnvelope = {
    data: FollowCreateManyFollowedByInput | FollowCreateManyFollowedByInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowingInput = {
    followedBy: UserCreateNestedOneWithoutFollowed_byInput
  }

  export type FollowUncheckedCreateWithoutFollowingInput = {
    followed_by_id: number
  }

  export type FollowCreateOrConnectWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowCreateManyFollowingInputEnvelope = {
    data: FollowCreateManyFollowingInput | FollowCreateManyFollowingInput[]
    skipDuplicates?: boolean
  }

  export type AuthPayloadUpsertWithoutUserInput = {
    update: XOR<AuthPayloadUpdateWithoutUserInput, AuthPayloadUncheckedUpdateWithoutUserInput>
    create: XOR<AuthPayloadCreateWithoutUserInput, AuthPayloadUncheckedCreateWithoutUserInput>
    where?: AuthPayloadWhereInput
  }

  export type AuthPayloadUpdateToOneWithWhereWithoutUserInput = {
    where?: AuthPayloadWhereInput
    data: XOR<AuthPayloadUpdateWithoutUserInput, AuthPayloadUncheckedUpdateWithoutUserInput>
  }

  export type AuthPayloadUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthPayloadUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkUpsertWithWhereUniqueWithoutUserInput = {
    where: ArtworkWhereUniqueInput
    update: XOR<ArtworkUpdateWithoutUserInput, ArtworkUncheckedUpdateWithoutUserInput>
    create: XOR<ArtworkCreateWithoutUserInput, ArtworkUncheckedCreateWithoutUserInput>
  }

  export type ArtworkUpdateWithWhereUniqueWithoutUserInput = {
    where: ArtworkWhereUniqueInput
    data: XOR<ArtworkUpdateWithoutUserInput, ArtworkUncheckedUpdateWithoutUserInput>
  }

  export type ArtworkUpdateManyWithWhereWithoutUserInput = {
    where: ArtworkScalarWhereInput
    data: XOR<ArtworkUpdateManyMutationInput, ArtworkUncheckedUpdateManyWithoutUserInput>
  }

  export type ArtworkScalarWhereInput = {
    AND?: ArtworkScalarWhereInput | ArtworkScalarWhereInput[]
    OR?: ArtworkScalarWhereInput[]
    NOT?: ArtworkScalarWhereInput | ArtworkScalarWhereInput[]
    id?: IntFilter<"Artwork"> | number
    slug_id?: StringFilter<"Artwork"> | string
    user_id?: IntFilter<"Artwork"> | number
    title?: StringFilter<"Artwork"> | string
    likes?: IntFilter<"Artwork"> | number
    bads?: IntFilter<"Artwork"> | number
    feature?: StringFilter<"Artwork"> | string
    deleted?: BoolFilter<"Artwork"> | boolean
    created_at?: DateTimeFilter<"Artwork"> | Date | string
    updated_at?: DateTimeFilter<"Artwork"> | Date | string
  }

  export type ArtworkRanksUpsertWithWhereUniqueWithoutUserInput = {
    where: ArtworkRanksWhereUniqueInput
    update: XOR<ArtworkRanksUpdateWithoutUserInput, ArtworkRanksUncheckedUpdateWithoutUserInput>
    create: XOR<ArtworkRanksCreateWithoutUserInput, ArtworkRanksUncheckedCreateWithoutUserInput>
  }

  export type ArtworkRanksUpdateWithWhereUniqueWithoutUserInput = {
    where: ArtworkRanksWhereUniqueInput
    data: XOR<ArtworkRanksUpdateWithoutUserInput, ArtworkRanksUncheckedUpdateWithoutUserInput>
  }

  export type ArtworkRanksUpdateManyWithWhereWithoutUserInput = {
    where: ArtworkRanksScalarWhereInput
    data: XOR<ArtworkRanksUpdateManyMutationInput, ArtworkRanksUncheckedUpdateManyWithoutUserInput>
  }

  export type ArtworkRanksScalarWhereInput = {
    AND?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
    OR?: ArtworkRanksScalarWhereInput[]
    NOT?: ArtworkRanksScalarWhereInput | ArtworkRanksScalarWhereInput[]
    id?: IntFilter<"ArtworkRanks"> | number
    artwork_id?: IntFilter<"ArtworkRanks"> | number
    rank_id?: IntFilter<"ArtworkRanks"> | number
    user_id?: IntFilter<"ArtworkRanks"> | number
    created_at?: DateTimeFilter<"ArtworkRanks"> | Date | string
    updated_at?: DateTimeFilter<"ArtworkRanks"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    slug_id?: StringFilter<"Comment"> | string
    user_id?: IntFilter<"Comment"> | number
    artwork_id?: IntFilter<"Comment"> | number
    body?: StringFilter<"Comment"> | string
    created_at?: DateTimeFilter<"Comment"> | Date | string
    updated_at?: DateTimeFilter<"Comment"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowedByInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowedByInput, FollowUncheckedUpdateWithoutFollowedByInput>
    create: XOR<FollowCreateWithoutFollowedByInput, FollowUncheckedCreateWithoutFollowedByInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowedByInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowedByInput, FollowUncheckedUpdateWithoutFollowedByInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowedByInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowedByInput>
  }

  export type FollowScalarWhereInput = {
    AND?: FollowScalarWhereInput | FollowScalarWhereInput[]
    OR?: FollowScalarWhereInput[]
    NOT?: FollowScalarWhereInput | FollowScalarWhereInput[]
    followed_by_id?: IntFilter<"Follow"> | number
    following_id?: IntFilter<"Follow"> | number
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowingInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowingInput>
  }

  export type UserCreateWithoutAuth_payloadInput = {
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    artworks?: ArtworkCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    followed_by?: FollowCreateNestedManyWithoutFollowedByInput
    following?: FollowCreateNestedManyWithoutFollowingInput
  }

  export type UserUncheckedCreateWithoutAuth_payloadInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    artworks?: ArtworkUncheckedCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    followed_by?: FollowUncheckedCreateNestedManyWithoutFollowedByInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
  }

  export type UserCreateOrConnectWithoutAuth_payloadInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuth_payloadInput, UserUncheckedCreateWithoutAuth_payloadInput>
  }

  export type UserUpsertWithoutAuth_payloadInput = {
    update: XOR<UserUpdateWithoutAuth_payloadInput, UserUncheckedUpdateWithoutAuth_payloadInput>
    create: XOR<UserCreateWithoutAuth_payloadInput, UserUncheckedCreateWithoutAuth_payloadInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuth_payloadInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuth_payloadInput, UserUncheckedUpdateWithoutAuth_payloadInput>
  }

  export type UserUpdateWithoutAuth_payloadInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artworks?: ArtworkUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    followed_by?: FollowUpdateManyWithoutFollowedByNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
  }

  export type UserUncheckedUpdateWithoutAuth_payloadInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artworks?: ArtworkUncheckedUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    followed_by?: FollowUncheckedUpdateManyWithoutFollowedByNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
  }

  export type UserCreateWithoutFollowed_byInput = {
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadCreateNestedOneWithoutUserInput
    artworks?: ArtworkCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowingInput
  }

  export type UserUncheckedCreateWithoutFollowed_byInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadUncheckedCreateNestedOneWithoutUserInput
    artworks?: ArtworkUncheckedCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
  }

  export type UserCreateOrConnectWithoutFollowed_byInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowed_byInput, UserUncheckedCreateWithoutFollowed_byInput>
  }

  export type UserCreateWithoutFollowingInput = {
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadCreateNestedOneWithoutUserInput
    artworks?: ArtworkCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    followed_by?: FollowCreateNestedManyWithoutFollowedByInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadUncheckedCreateNestedOneWithoutUserInput
    artworks?: ArtworkUncheckedCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    followed_by?: FollowUncheckedCreateNestedManyWithoutFollowedByInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserUpsertWithoutFollowed_byInput = {
    update: XOR<UserUpdateWithoutFollowed_byInput, UserUncheckedUpdateWithoutFollowed_byInput>
    create: XOR<UserCreateWithoutFollowed_byInput, UserUncheckedCreateWithoutFollowed_byInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowed_byInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowed_byInput, UserUncheckedUpdateWithoutFollowed_byInput>
  }

  export type UserUpdateWithoutFollowed_byInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowed_byInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUncheckedUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUncheckedUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    followed_by?: FollowUpdateManyWithoutFollowedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUncheckedUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUncheckedUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    followed_by?: FollowUncheckedUpdateManyWithoutFollowedByNestedInput
  }

  export type UserCreateWithoutArtworksInput = {
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadCreateNestedOneWithoutUserInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    followed_by?: FollowCreateNestedManyWithoutFollowedByInput
    following?: FollowCreateNestedManyWithoutFollowingInput
  }

  export type UserUncheckedCreateWithoutArtworksInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadUncheckedCreateNestedOneWithoutUserInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    followed_by?: FollowUncheckedCreateNestedManyWithoutFollowedByInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
  }

  export type UserCreateOrConnectWithoutArtworksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArtworksInput, UserUncheckedCreateWithoutArtworksInput>
  }

  export type ArtworkFileCreateWithoutArtworkInput = {
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
    artwork_gizmo?: ArtworkGizmoCreateNestedManyWithoutArtwork_fileInput
  }

  export type ArtworkFileUncheckedCreateWithoutArtworkInput = {
    id?: number
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
    artwork_gizmo?: ArtworkGizmoUncheckedCreateNestedManyWithoutArtwork_fileInput
  }

  export type ArtworkFileCreateOrConnectWithoutArtworkInput = {
    where: ArtworkFileWhereUniqueInput
    create: XOR<ArtworkFileCreateWithoutArtworkInput, ArtworkFileUncheckedCreateWithoutArtworkInput>
  }

  export type ArtworkFileCreateManyArtworkInputEnvelope = {
    data: ArtworkFileCreateManyArtworkInput | ArtworkFileCreateManyArtworkInput[]
    skipDuplicates?: boolean
  }

  export type ArtworkRanksCreateWithoutArtworkInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutArtwork_ranksInput
    ranks: RanksCreateNestedOneWithoutArtwork_ranksInput
  }

  export type ArtworkRanksUncheckedCreateWithoutArtworkInput = {
    id?: number
    rank_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksCreateOrConnectWithoutArtworkInput = {
    where: ArtworkRanksWhereUniqueInput
    create: XOR<ArtworkRanksCreateWithoutArtworkInput, ArtworkRanksUncheckedCreateWithoutArtworkInput>
  }

  export type ArtworkRanksCreateManyArtworkInputEnvelope = {
    data: ArtworkRanksCreateManyArtworkInput | ArtworkRanksCreateManyArtworkInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutArtworkInput = {
    slug_id?: string
    body: string
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutArtworkInput = {
    id?: number
    slug_id?: string
    user_id: number
    body: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CommentCreateOrConnectWithoutArtworkInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutArtworkInput, CommentUncheckedCreateWithoutArtworkInput>
  }

  export type CommentCreateManyArtworkInputEnvelope = {
    data: CommentCreateManyArtworkInput | CommentCreateManyArtworkInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutArtworksInput = {
    update: XOR<UserUpdateWithoutArtworksInput, UserUncheckedUpdateWithoutArtworksInput>
    create: XOR<UserCreateWithoutArtworksInput, UserUncheckedCreateWithoutArtworksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArtworksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArtworksInput, UserUncheckedUpdateWithoutArtworksInput>
  }

  export type UserUpdateWithoutArtworksInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUpdateOneWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    followed_by?: FollowUpdateManyWithoutFollowedByNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
  }

  export type UserUncheckedUpdateWithoutArtworksInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUncheckedUpdateOneWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    followed_by?: FollowUncheckedUpdateManyWithoutFollowedByNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
  }

  export type ArtworkFileUpsertWithWhereUniqueWithoutArtworkInput = {
    where: ArtworkFileWhereUniqueInput
    update: XOR<ArtworkFileUpdateWithoutArtworkInput, ArtworkFileUncheckedUpdateWithoutArtworkInput>
    create: XOR<ArtworkFileCreateWithoutArtworkInput, ArtworkFileUncheckedCreateWithoutArtworkInput>
  }

  export type ArtworkFileUpdateWithWhereUniqueWithoutArtworkInput = {
    where: ArtworkFileWhereUniqueInput
    data: XOR<ArtworkFileUpdateWithoutArtworkInput, ArtworkFileUncheckedUpdateWithoutArtworkInput>
  }

  export type ArtworkFileUpdateManyWithWhereWithoutArtworkInput = {
    where: ArtworkFileScalarWhereInput
    data: XOR<ArtworkFileUpdateManyMutationInput, ArtworkFileUncheckedUpdateManyWithoutArtworkInput>
  }

  export type ArtworkFileScalarWhereInput = {
    AND?: ArtworkFileScalarWhereInput | ArtworkFileScalarWhereInput[]
    OR?: ArtworkFileScalarWhereInput[]
    NOT?: ArtworkFileScalarWhereInput | ArtworkFileScalarWhereInput[]
    id?: IntFilter<"ArtworkFile"> | number
    artwork_id?: IntFilter<"ArtworkFile"> | number
    file_name?: StringFilter<"ArtworkFile"> | string
    extension?: StringFilter<"ArtworkFile"> | string
    created_at?: DateTimeFilter<"ArtworkFile"> | Date | string
    updated_at?: DateTimeFilter<"ArtworkFile"> | Date | string
  }

  export type ArtworkRanksUpsertWithWhereUniqueWithoutArtworkInput = {
    where: ArtworkRanksWhereUniqueInput
    update: XOR<ArtworkRanksUpdateWithoutArtworkInput, ArtworkRanksUncheckedUpdateWithoutArtworkInput>
    create: XOR<ArtworkRanksCreateWithoutArtworkInput, ArtworkRanksUncheckedCreateWithoutArtworkInput>
  }

  export type ArtworkRanksUpdateWithWhereUniqueWithoutArtworkInput = {
    where: ArtworkRanksWhereUniqueInput
    data: XOR<ArtworkRanksUpdateWithoutArtworkInput, ArtworkRanksUncheckedUpdateWithoutArtworkInput>
  }

  export type ArtworkRanksUpdateManyWithWhereWithoutArtworkInput = {
    where: ArtworkRanksScalarWhereInput
    data: XOR<ArtworkRanksUpdateManyMutationInput, ArtworkRanksUncheckedUpdateManyWithoutArtworkInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutArtworkInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutArtworkInput, CommentUncheckedUpdateWithoutArtworkInput>
    create: XOR<CommentCreateWithoutArtworkInput, CommentUncheckedCreateWithoutArtworkInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutArtworkInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutArtworkInput, CommentUncheckedUpdateWithoutArtworkInput>
  }

  export type CommentUpdateManyWithWhereWithoutArtworkInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutArtworkInput>
  }

  export type ArtworkCreateWithoutArtwork_fileInput = {
    slug_id?: string
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutArtworksInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutArtworkInput
    comments?: CommentCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkUncheckedCreateWithoutArtwork_fileInput = {
    id?: number
    slug_id?: string
    user_id: number
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutArtworkInput
    comments?: CommentUncheckedCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkCreateOrConnectWithoutArtwork_fileInput = {
    where: ArtworkWhereUniqueInput
    create: XOR<ArtworkCreateWithoutArtwork_fileInput, ArtworkUncheckedCreateWithoutArtwork_fileInput>
  }

  export type ArtworkGizmoCreateWithoutArtwork_fileInput = {
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
  }

  export type ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput = {
    id?: number
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
  }

  export type ArtworkGizmoCreateOrConnectWithoutArtwork_fileInput = {
    where: ArtworkGizmoWhereUniqueInput
    create: XOR<ArtworkGizmoCreateWithoutArtwork_fileInput, ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput>
  }

  export type ArtworkGizmoCreateManyArtwork_fileInputEnvelope = {
    data: ArtworkGizmoCreateManyArtwork_fileInput | ArtworkGizmoCreateManyArtwork_fileInput[]
    skipDuplicates?: boolean
  }

  export type ArtworkUpsertWithoutArtwork_fileInput = {
    update: XOR<ArtworkUpdateWithoutArtwork_fileInput, ArtworkUncheckedUpdateWithoutArtwork_fileInput>
    create: XOR<ArtworkCreateWithoutArtwork_fileInput, ArtworkUncheckedCreateWithoutArtwork_fileInput>
    where?: ArtworkWhereInput
  }

  export type ArtworkUpdateToOneWithWhereWithoutArtwork_fileInput = {
    where?: ArtworkWhereInput
    data: XOR<ArtworkUpdateWithoutArtwork_fileInput, ArtworkUncheckedUpdateWithoutArtwork_fileInput>
  }

  export type ArtworkUpdateWithoutArtwork_fileInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtworksNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutArtworkNestedInput
    comments?: CommentUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkUncheckedUpdateWithoutArtwork_fileInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutArtworkNestedInput
    comments?: CommentUncheckedUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkGizmoUpsertWithWhereUniqueWithoutArtwork_fileInput = {
    where: ArtworkGizmoWhereUniqueInput
    update: XOR<ArtworkGizmoUpdateWithoutArtwork_fileInput, ArtworkGizmoUncheckedUpdateWithoutArtwork_fileInput>
    create: XOR<ArtworkGizmoCreateWithoutArtwork_fileInput, ArtworkGizmoUncheckedCreateWithoutArtwork_fileInput>
  }

  export type ArtworkGizmoUpdateWithWhereUniqueWithoutArtwork_fileInput = {
    where: ArtworkGizmoWhereUniqueInput
    data: XOR<ArtworkGizmoUpdateWithoutArtwork_fileInput, ArtworkGizmoUncheckedUpdateWithoutArtwork_fileInput>
  }

  export type ArtworkGizmoUpdateManyWithWhereWithoutArtwork_fileInput = {
    where: ArtworkGizmoScalarWhereInput
    data: XOR<ArtworkGizmoUpdateManyMutationInput, ArtworkGizmoUncheckedUpdateManyWithoutArtwork_fileInput>
  }

  export type ArtworkGizmoScalarWhereInput = {
    AND?: ArtworkGizmoScalarWhereInput | ArtworkGizmoScalarWhereInput[]
    OR?: ArtworkGizmoScalarWhereInput[]
    NOT?: ArtworkGizmoScalarWhereInput | ArtworkGizmoScalarWhereInput[]
    id?: IntFilter<"ArtworkGizmo"> | number
    artwork_file_id?: IntFilter<"ArtworkGizmo"> | number
    transportX?: IntFilter<"ArtworkGizmo"> | number
    transportY?: IntFilter<"ArtworkGizmo"> | number
    transportZ?: IntFilter<"ArtworkGizmo"> | number
    rotateX?: IntFilter<"ArtworkGizmo"> | number
    rotateY?: IntFilter<"ArtworkGizmo"> | number
    rotateZ?: IntFilter<"ArtworkGizmo"> | number
    scaleX?: IntFilter<"ArtworkGizmo"> | number
    scaleY?: IntFilter<"ArtworkGizmo"> | number
    scaleZ?: IntFilter<"ArtworkGizmo"> | number
  }

  export type ArtworkFileCreateWithoutArtwork_gizmoInput = {
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
    artwork: ArtworkCreateNestedOneWithoutArtwork_fileInput
  }

  export type ArtworkFileUncheckedCreateWithoutArtwork_gizmoInput = {
    id?: number
    artwork_id: number
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkFileCreateOrConnectWithoutArtwork_gizmoInput = {
    where: ArtworkFileWhereUniqueInput
    create: XOR<ArtworkFileCreateWithoutArtwork_gizmoInput, ArtworkFileUncheckedCreateWithoutArtwork_gizmoInput>
  }

  export type ArtworkFileUpsertWithoutArtwork_gizmoInput = {
    update: XOR<ArtworkFileUpdateWithoutArtwork_gizmoInput, ArtworkFileUncheckedUpdateWithoutArtwork_gizmoInput>
    create: XOR<ArtworkFileCreateWithoutArtwork_gizmoInput, ArtworkFileUncheckedCreateWithoutArtwork_gizmoInput>
    where?: ArtworkFileWhereInput
  }

  export type ArtworkFileUpdateToOneWithWhereWithoutArtwork_gizmoInput = {
    where?: ArtworkFileWhereInput
    data: XOR<ArtworkFileUpdateWithoutArtwork_gizmoInput, ArtworkFileUncheckedUpdateWithoutArtwork_gizmoInput>
  }

  export type ArtworkFileUpdateWithoutArtwork_gizmoInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork?: ArtworkUpdateOneRequiredWithoutArtwork_fileNestedInput
  }

  export type ArtworkFileUncheckedUpdateWithoutArtwork_gizmoInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutCommentsInput = {
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadCreateNestedOneWithoutUserInput
    artworks?: ArtworkCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutUserInput
    followed_by?: FollowCreateNestedManyWithoutFollowedByInput
    following?: FollowCreateNestedManyWithoutFollowingInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadUncheckedCreateNestedOneWithoutUserInput
    artworks?: ArtworkUncheckedCreateNestedManyWithoutUserInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutUserInput
    followed_by?: FollowUncheckedCreateNestedManyWithoutFollowedByInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type ArtworkCreateWithoutCommentsInput = {
    slug_id?: string
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutArtworksInput
    artwork_file?: ArtworkFileCreateNestedManyWithoutArtworkInput
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkUncheckedCreateWithoutCommentsInput = {
    id?: number
    slug_id?: string
    user_id: number
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    artwork_file?: ArtworkFileUncheckedCreateNestedManyWithoutArtworkInput
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkCreateOrConnectWithoutCommentsInput = {
    where: ArtworkWhereUniqueInput
    create: XOR<ArtworkCreateWithoutCommentsInput, ArtworkUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutUserNestedInput
    followed_by?: FollowUpdateManyWithoutFollowedByNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUncheckedUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUncheckedUpdateManyWithoutUserNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutUserNestedInput
    followed_by?: FollowUncheckedUpdateManyWithoutFollowedByNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
  }

  export type ArtworkUpsertWithoutCommentsInput = {
    update: XOR<ArtworkUpdateWithoutCommentsInput, ArtworkUncheckedUpdateWithoutCommentsInput>
    create: XOR<ArtworkCreateWithoutCommentsInput, ArtworkUncheckedCreateWithoutCommentsInput>
    where?: ArtworkWhereInput
  }

  export type ArtworkUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ArtworkWhereInput
    data: XOR<ArtworkUpdateWithoutCommentsInput, ArtworkUncheckedUpdateWithoutCommentsInput>
  }

  export type ArtworkUpdateWithoutCommentsInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtworksNestedInput
    artwork_file?: ArtworkFileUpdateManyWithoutArtworkNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_file?: ArtworkFileUncheckedUpdateManyWithoutArtworkNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutArtworkNestedInput
  }

  export type UserCreateWithoutArtwork_ranksInput = {
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadCreateNestedOneWithoutUserInput
    artworks?: ArtworkCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    followed_by?: FollowCreateNestedManyWithoutFollowedByInput
    following?: FollowCreateNestedManyWithoutFollowingInput
  }

  export type UserUncheckedCreateWithoutArtwork_ranksInput = {
    id?: number
    slug_id?: string
    name: string
    name_kana?: string | null
    handle_name: string
    password: string
    birthday: Date | string
    introduction: string
    phone_number: string
    email: string
    address: string
    created_at?: Date | string
    updated_at?: Date | string
    auth_payload?: AuthPayloadUncheckedCreateNestedOneWithoutUserInput
    artworks?: ArtworkUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    followed_by?: FollowUncheckedCreateNestedManyWithoutFollowedByInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
  }

  export type UserCreateOrConnectWithoutArtwork_ranksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArtwork_ranksInput, UserUncheckedCreateWithoutArtwork_ranksInput>
  }

  export type ArtworkCreateWithoutArtwork_ranksInput = {
    slug_id?: string
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutArtworksInput
    artwork_file?: ArtworkFileCreateNestedManyWithoutArtworkInput
    comments?: CommentCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkUncheckedCreateWithoutArtwork_ranksInput = {
    id?: number
    slug_id?: string
    user_id: number
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    artwork_file?: ArtworkFileUncheckedCreateNestedManyWithoutArtworkInput
    comments?: CommentUncheckedCreateNestedManyWithoutArtworkInput
  }

  export type ArtworkCreateOrConnectWithoutArtwork_ranksInput = {
    where: ArtworkWhereUniqueInput
    create: XOR<ArtworkCreateWithoutArtwork_ranksInput, ArtworkUncheckedCreateWithoutArtwork_ranksInput>
  }

  export type RanksCreateWithoutArtwork_ranksInput = {
    name: string
    rank_type: RankTypesCreateNestedOneWithoutRanksInput
  }

  export type RanksUncheckedCreateWithoutArtwork_ranksInput = {
    id?: number
    name: string
    rank_type_id: number
  }

  export type RanksCreateOrConnectWithoutArtwork_ranksInput = {
    where: RanksWhereUniqueInput
    create: XOR<RanksCreateWithoutArtwork_ranksInput, RanksUncheckedCreateWithoutArtwork_ranksInput>
  }

  export type UserUpsertWithoutArtwork_ranksInput = {
    update: XOR<UserUpdateWithoutArtwork_ranksInput, UserUncheckedUpdateWithoutArtwork_ranksInput>
    create: XOR<UserCreateWithoutArtwork_ranksInput, UserUncheckedCreateWithoutArtwork_ranksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArtwork_ranksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArtwork_ranksInput, UserUncheckedUpdateWithoutArtwork_ranksInput>
  }

  export type UserUpdateWithoutArtwork_ranksInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    followed_by?: FollowUpdateManyWithoutFollowedByNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
  }

  export type UserUncheckedUpdateWithoutArtwork_ranksInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_kana?: NullableStringFieldUpdateOperationsInput | string | null
    handle_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    introduction?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_payload?: AuthPayloadUncheckedUpdateOneWithoutUserNestedInput
    artworks?: ArtworkUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    followed_by?: FollowUncheckedUpdateManyWithoutFollowedByNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
  }

  export type ArtworkUpsertWithoutArtwork_ranksInput = {
    update: XOR<ArtworkUpdateWithoutArtwork_ranksInput, ArtworkUncheckedUpdateWithoutArtwork_ranksInput>
    create: XOR<ArtworkCreateWithoutArtwork_ranksInput, ArtworkUncheckedCreateWithoutArtwork_ranksInput>
    where?: ArtworkWhereInput
  }

  export type ArtworkUpdateToOneWithWhereWithoutArtwork_ranksInput = {
    where?: ArtworkWhereInput
    data: XOR<ArtworkUpdateWithoutArtwork_ranksInput, ArtworkUncheckedUpdateWithoutArtwork_ranksInput>
  }

  export type ArtworkUpdateWithoutArtwork_ranksInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtworksNestedInput
    artwork_file?: ArtworkFileUpdateManyWithoutArtworkNestedInput
    comments?: CommentUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkUncheckedUpdateWithoutArtwork_ranksInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_file?: ArtworkFileUncheckedUpdateManyWithoutArtworkNestedInput
    comments?: CommentUncheckedUpdateManyWithoutArtworkNestedInput
  }

  export type RanksUpsertWithoutArtwork_ranksInput = {
    update: XOR<RanksUpdateWithoutArtwork_ranksInput, RanksUncheckedUpdateWithoutArtwork_ranksInput>
    create: XOR<RanksCreateWithoutArtwork_ranksInput, RanksUncheckedCreateWithoutArtwork_ranksInput>
    where?: RanksWhereInput
  }

  export type RanksUpdateToOneWithWhereWithoutArtwork_ranksInput = {
    where?: RanksWhereInput
    data: XOR<RanksUpdateWithoutArtwork_ranksInput, RanksUncheckedUpdateWithoutArtwork_ranksInput>
  }

  export type RanksUpdateWithoutArtwork_ranksInput = {
    name?: StringFieldUpdateOperationsInput | string
    rank_type?: RankTypesUpdateOneRequiredWithoutRanksNestedInput
  }

  export type RanksUncheckedUpdateWithoutArtwork_ranksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rank_type_id?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkRanksCreateWithoutRanksInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutArtwork_ranksInput
    artwork: ArtworkCreateNestedOneWithoutArtwork_ranksInput
  }

  export type ArtworkRanksUncheckedCreateWithoutRanksInput = {
    id?: number
    artwork_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksCreateOrConnectWithoutRanksInput = {
    where: ArtworkRanksWhereUniqueInput
    create: XOR<ArtworkRanksCreateWithoutRanksInput, ArtworkRanksUncheckedCreateWithoutRanksInput>
  }

  export type ArtworkRanksCreateManyRanksInputEnvelope = {
    data: ArtworkRanksCreateManyRanksInput | ArtworkRanksCreateManyRanksInput[]
    skipDuplicates?: boolean
  }

  export type RankTypesCreateWithoutRanksInput = {
    name: string
  }

  export type RankTypesUncheckedCreateWithoutRanksInput = {
    id?: number
    name: string
  }

  export type RankTypesCreateOrConnectWithoutRanksInput = {
    where: RankTypesWhereUniqueInput
    create: XOR<RankTypesCreateWithoutRanksInput, RankTypesUncheckedCreateWithoutRanksInput>
  }

  export type ArtworkRanksUpsertWithWhereUniqueWithoutRanksInput = {
    where: ArtworkRanksWhereUniqueInput
    update: XOR<ArtworkRanksUpdateWithoutRanksInput, ArtworkRanksUncheckedUpdateWithoutRanksInput>
    create: XOR<ArtworkRanksCreateWithoutRanksInput, ArtworkRanksUncheckedCreateWithoutRanksInput>
  }

  export type ArtworkRanksUpdateWithWhereUniqueWithoutRanksInput = {
    where: ArtworkRanksWhereUniqueInput
    data: XOR<ArtworkRanksUpdateWithoutRanksInput, ArtworkRanksUncheckedUpdateWithoutRanksInput>
  }

  export type ArtworkRanksUpdateManyWithWhereWithoutRanksInput = {
    where: ArtworkRanksScalarWhereInput
    data: XOR<ArtworkRanksUpdateManyMutationInput, ArtworkRanksUncheckedUpdateManyWithoutRanksInput>
  }

  export type RankTypesUpsertWithoutRanksInput = {
    update: XOR<RankTypesUpdateWithoutRanksInput, RankTypesUncheckedUpdateWithoutRanksInput>
    create: XOR<RankTypesCreateWithoutRanksInput, RankTypesUncheckedCreateWithoutRanksInput>
    where?: RankTypesWhereInput
  }

  export type RankTypesUpdateToOneWithWhereWithoutRanksInput = {
    where?: RankTypesWhereInput
    data: XOR<RankTypesUpdateWithoutRanksInput, RankTypesUncheckedUpdateWithoutRanksInput>
  }

  export type RankTypesUpdateWithoutRanksInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RankTypesUncheckedUpdateWithoutRanksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RanksCreateWithoutRank_typeInput = {
    name: string
    artwork_ranks?: ArtworkRanksCreateNestedManyWithoutRanksInput
  }

  export type RanksUncheckedCreateWithoutRank_typeInput = {
    id?: number
    name: string
    artwork_ranks?: ArtworkRanksUncheckedCreateNestedManyWithoutRanksInput
  }

  export type RanksCreateOrConnectWithoutRank_typeInput = {
    where: RanksWhereUniqueInput
    create: XOR<RanksCreateWithoutRank_typeInput, RanksUncheckedCreateWithoutRank_typeInput>
  }

  export type RanksCreateManyRank_typeInputEnvelope = {
    data: RanksCreateManyRank_typeInput | RanksCreateManyRank_typeInput[]
    skipDuplicates?: boolean
  }

  export type RanksUpsertWithWhereUniqueWithoutRank_typeInput = {
    where: RanksWhereUniqueInput
    update: XOR<RanksUpdateWithoutRank_typeInput, RanksUncheckedUpdateWithoutRank_typeInput>
    create: XOR<RanksCreateWithoutRank_typeInput, RanksUncheckedCreateWithoutRank_typeInput>
  }

  export type RanksUpdateWithWhereUniqueWithoutRank_typeInput = {
    where: RanksWhereUniqueInput
    data: XOR<RanksUpdateWithoutRank_typeInput, RanksUncheckedUpdateWithoutRank_typeInput>
  }

  export type RanksUpdateManyWithWhereWithoutRank_typeInput = {
    where: RanksScalarWhereInput
    data: XOR<RanksUpdateManyMutationInput, RanksUncheckedUpdateManyWithoutRank_typeInput>
  }

  export type RanksScalarWhereInput = {
    AND?: RanksScalarWhereInput | RanksScalarWhereInput[]
    OR?: RanksScalarWhereInput[]
    NOT?: RanksScalarWhereInput | RanksScalarWhereInput[]
    id?: IntFilter<"Ranks"> | number
    name?: StringFilter<"Ranks"> | string
    rank_type_id?: IntFilter<"Ranks"> | number
  }

  export type ArtworkCreateManyUserInput = {
    id?: number
    slug_id?: string
    title: string
    likes?: number
    bads?: number
    feature: string
    deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksCreateManyUserInput = {
    id?: number
    artwork_id: number
    rank_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CommentCreateManyUserInput = {
    id?: number
    slug_id?: string
    artwork_id: number
    body: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FollowCreateManyFollowedByInput = {
    following_id: number
  }

  export type FollowCreateManyFollowingInput = {
    followed_by_id: number
  }

  export type ArtworkUpdateWithoutUserInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_file?: ArtworkFileUpdateManyWithoutArtworkNestedInput
    artwork_ranks?: ArtworkRanksUpdateManyWithoutArtworkNestedInput
    comments?: CommentUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_file?: ArtworkFileUncheckedUpdateManyWithoutArtworkNestedInput
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutArtworkNestedInput
    comments?: CommentUncheckedUpdateManyWithoutArtworkNestedInput
  }

  export type ArtworkUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    bads?: IntFieldUpdateOperationsInput | number
    feature?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork?: ArtworkUpdateOneRequiredWithoutArtwork_ranksNestedInput
    ranks?: RanksUpdateOneRequiredWithoutArtwork_ranksNestedInput
  }

  export type ArtworkRanksUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    rank_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    rank_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutUserInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork?: ArtworkUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    artwork_id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    artwork_id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowedByInput = {
    following?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowedByInput = {
    following_id?: IntFieldUpdateOperationsInput | number
  }

  export type FollowUncheckedUpdateManyWithoutFollowedByInput = {
    following_id?: IntFieldUpdateOperationsInput | number
  }

  export type FollowUpdateWithoutFollowingInput = {
    followedBy?: UserUpdateOneRequiredWithoutFollowed_byNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowingInput = {
    followed_by_id?: IntFieldUpdateOperationsInput | number
  }

  export type FollowUncheckedUpdateManyWithoutFollowingInput = {
    followed_by_id?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkFileCreateManyArtworkInput = {
    id?: number
    file_name?: string
    extension: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksCreateManyArtworkInput = {
    id?: number
    rank_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CommentCreateManyArtworkInput = {
    id?: number
    slug_id?: string
    user_id: number
    body: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkFileUpdateWithoutArtworkInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_gizmo?: ArtworkGizmoUpdateManyWithoutArtwork_fileNestedInput
  }

  export type ArtworkFileUncheckedUpdateWithoutArtworkInput = {
    id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    artwork_gizmo?: ArtworkGizmoUncheckedUpdateManyWithoutArtwork_fileNestedInput
  }

  export type ArtworkFileUncheckedUpdateManyWithoutArtworkInput = {
    id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksUpdateWithoutArtworkInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtwork_ranksNestedInput
    ranks?: RanksUpdateOneRequiredWithoutArtwork_ranksNestedInput
  }

  export type ArtworkRanksUncheckedUpdateWithoutArtworkInput = {
    id?: IntFieldUpdateOperationsInput | number
    rank_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksUncheckedUpdateManyWithoutArtworkInput = {
    id?: IntFieldUpdateOperationsInput | number
    rank_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutArtworkInput = {
    slug_id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutArtworkInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutArtworkInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug_id?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkGizmoCreateManyArtwork_fileInput = {
    id?: number
    transportX: number
    transportY: number
    transportZ: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    scaleZ: number
  }

  export type ArtworkGizmoUpdateWithoutArtwork_fileInput = {
    transportX?: IntFieldUpdateOperationsInput | number
    transportY?: IntFieldUpdateOperationsInput | number
    transportZ?: IntFieldUpdateOperationsInput | number
    rotateX?: IntFieldUpdateOperationsInput | number
    rotateY?: IntFieldUpdateOperationsInput | number
    rotateZ?: IntFieldUpdateOperationsInput | number
    scaleX?: IntFieldUpdateOperationsInput | number
    scaleY?: IntFieldUpdateOperationsInput | number
    scaleZ?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkGizmoUncheckedUpdateWithoutArtwork_fileInput = {
    id?: IntFieldUpdateOperationsInput | number
    transportX?: IntFieldUpdateOperationsInput | number
    transportY?: IntFieldUpdateOperationsInput | number
    transportZ?: IntFieldUpdateOperationsInput | number
    rotateX?: IntFieldUpdateOperationsInput | number
    rotateY?: IntFieldUpdateOperationsInput | number
    rotateZ?: IntFieldUpdateOperationsInput | number
    scaleX?: IntFieldUpdateOperationsInput | number
    scaleY?: IntFieldUpdateOperationsInput | number
    scaleZ?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkGizmoUncheckedUpdateManyWithoutArtwork_fileInput = {
    id?: IntFieldUpdateOperationsInput | number
    transportX?: IntFieldUpdateOperationsInput | number
    transportY?: IntFieldUpdateOperationsInput | number
    transportZ?: IntFieldUpdateOperationsInput | number
    rotateX?: IntFieldUpdateOperationsInput | number
    rotateY?: IntFieldUpdateOperationsInput | number
    rotateZ?: IntFieldUpdateOperationsInput | number
    scaleX?: IntFieldUpdateOperationsInput | number
    scaleY?: IntFieldUpdateOperationsInput | number
    scaleZ?: IntFieldUpdateOperationsInput | number
  }

  export type ArtworkRanksCreateManyRanksInput = {
    id?: number
    artwork_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ArtworkRanksUpdateWithoutRanksInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtwork_ranksNestedInput
    artwork?: ArtworkUpdateOneRequiredWithoutArtwork_ranksNestedInput
  }

  export type ArtworkRanksUncheckedUpdateWithoutRanksInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtworkRanksUncheckedUpdateManyWithoutRanksInput = {
    id?: IntFieldUpdateOperationsInput | number
    artwork_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RanksCreateManyRank_typeInput = {
    id?: number
    name: string
  }

  export type RanksUpdateWithoutRank_typeInput = {
    name?: StringFieldUpdateOperationsInput | string
    artwork_ranks?: ArtworkRanksUpdateManyWithoutRanksNestedInput
  }

  export type RanksUncheckedUpdateWithoutRank_typeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    artwork_ranks?: ArtworkRanksUncheckedUpdateManyWithoutRanksNestedInput
  }

  export type RanksUncheckedUpdateManyWithoutRank_typeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}