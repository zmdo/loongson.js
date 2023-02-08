import ReadonlyNumber64 from "./number64";

const M32:number = 0xFFFFFFFF;

/**
 * 64位 整数
 */
export default class Int64 extends ReadonlyNumber64 {

    /**
     * 取负数
     * @returns 负数结果 
     */
    public negate () : Int64 {
        let nl = (M32 & (~ this._l32)) + 1;
        let hl = M32 & (~ this._h32);
        if ((nl & 0x100000000) != 0) {
            hl = hl + 1;
        }
        return new Int64(M32 & hl,M32 & nl);
    }

    /**
     * 加法运算
     * @param n 被加数
     * @returns 和
     */
    public add ( n:Int64 ) : Int64 {
        let nl = this._l32 + n.l32;
        let hl = this._h32 + n.h32 + (nl >>> 32);
        return new Int64(M32 & hl,M32 & nl);
    }

    /**
     * 减法运算
     * @param n 被减数
     * @returns 差
     */
    public sub ( n:Int64 ) : Int64 {
        return this.add(n.negate());
    }

}