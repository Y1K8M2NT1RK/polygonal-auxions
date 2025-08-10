// 認証方式A (Cookie セッション純化) 用の極小 authExchange
// 現状: 付加的な Authorization ヘッダ処理 / refresh 制御は不要。
// 401/403 を捉えて UI 側で再ログイン誘導する場合はここでエラーフラグを流す拡張余地あり。
import { Exchange } from 'urql';

export const authExchangeLite: Exchange = ({ forward }) => (ops$) => {
  return forward(ops$);
};

export default authExchangeLite;
