declare module 'cookie' {
    export interface CookieSerializeOptions {
      domain?: string;
      encode?(val: string): string;
      expires?: Date;
      httpOnly?: boolean;
      maxAge?: number;
      path?: string;
      sameSite?: true | false | 'lax' | 'strict' | 'none';
      secure?: boolean;
    }
  
    export function serialize(name: string, val: string, options?: CookieSerializeOptions): string;
    export function parse(str: string, options?: CookieSerializeOptions): { [key: string]: string };
}