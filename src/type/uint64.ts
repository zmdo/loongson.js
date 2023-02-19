import ReadonlyNumber64 from "./number64";
import Int64 from "./int64";

/**
 * 64位无符号整数
 */
export default class Uint64 extends Int64 {

    public static BIT64:Uint64 = new Uint64(0xFFFFFFFF,0xFFFFFFFF);

    public static ZERO:Uint64 = new Uint64(0,0);
    public static ONE:Uint64 = new Uint64(0,1);

    // +---------+
    //   常用功能
    // +---------+

    /**
     * 将只读数转换为 64 位整型数
     * @param n 64 位只读数
     * @returns 64 位整型数
     */
     public static cast ( n:ReadonlyNumber64 ) : Uint64 {
        return new Uint64(n.h32,n.l32);
     }

    // +---------+
    //   比较运算
    // +---------+
    /**
     * 判断当前数值是否与 n 相等
     * @param n 比较的值
     * @returns 当前值与 n 相等返回 true，否则返回 false
     */
    public override eq ( n:Uint64 ) : boolean {
        return this.equals(n);
    }

    /**
     * 判断当前值是否大于 n
     * @param n 比较的值
     * @returns 当前值大于 n 返回 true，否则返回 false
     */
    public override gt ( n:Uint64 ) : boolean {
        // 比较高 32 位大小
        let hRes = this._compareUint32(this._h32,n.h32);
        if (hRes != 0) { // 如果高 32 位不相等
            return hRes > 0;
        } else { // 如果高 32 位相等，则比较低 32 位
            return this._compareUint32(this._l32,n.l32) > 0;
        }
    }

    /**
     * 当前值是否大于等于 n
     * @param n 比较的值
     * @returns 当前值大于等于 n 返回 true，否则返回 false
     */
    public override ge ( n:Uint64 ) : boolean {
        return n.lt(this);
    }

    /**
     * 当前值是否小于 n
     * @param n 比较的值
     * @returns 当前值小于 n 返回 true，否则返回 false
     */
    public override lt ( n:Uint64 ) : boolean {
        return n.gt(this) && !n.eq(this);
    }

    /**
     * 当前值是否小于等于 n
     * @param n 比较的值
     * @returns 当前值小于等于 n 返回 true，否则返回 false
     */
    public override le ( n:Uint64 ) : boolean {
        return n.gt(this);
    }

    /**
     * 比较 32 位无符号整数的大小
     * @param a 比较值 a
     * @param b 比较值 b
     * @returns
     * - 若 a 大于 b，则返回 1
     * - 若 a 小于 b，则返回 -1
     * - 若 a 等于 b，则返回 0
     */
    private _compareUint32( a:number, b:number ) : number {
        let _als = a >>> 31;
        let _bls = b >>> 31;
        if (_als > _bls) {
            // 如果a的首数字大于b的首数字
            return 1;
        } else if (_als < _bls) {
            // 如果a的首数字小于b的首数字
            return -1;
        } else {
            // 如果a首数字等于b的首数字
            // 那么就比较后 31 位数字的大小
            let _al = a & 0x7FFFFFFF;
            let _bl = b & 0x7FFFFFFF;
            return _al > _bl ? 1 : (_al == _bl ? 0 : -1);
        }
    }

    // +---------+
    //   算数运算
    // +---------+

    /**
     * 加法运算
     * @param n 被加数
     * @returns 和
     */
    public override add ( n:Uint64 ) : Uint64 {
        return Uint64.cast(super.and(n));
    }

    /**
     * 减法运算
     * @param n 被减数
     * @returns 差
     */
    public override sub ( n:Uint64 ) : Uint64 {
        return Uint64.cast(super.sub(n));
    }

    /**
     * 乘法运算
     * @param n 被乘数
     * @returns 积
     */
    public override mul ( n:Uint64 ) : Uint64 {
        return Uint64.cast(super.mul(n));
    }

    /**
     * 除法运算
     * @param n 被除数
     * @returns 积
     */
    public override div ( n:Uint64 ) : Uint64 {
        return this._div(n).quotient;
    }

    /**
     * 取模运算
     * @param n 被除数
     * @returns 积
     */
    public override mod ( n:Uint64 ) : Uint64 {
        return this._div(n).remainder;
    }

    /**
     * 标准非负整型除法运算
     * @param n 被除数
     * @returns
     * - quotient : 商
     * - remainder : 余数
     */
    private _div ( n:Uint64 ) : {quotient:Uint64,remainder:Uint64} {

        let _n = n;
        let _this = this.copy();

        // 经典的二进制除法运算法则

        let res = Uint64.ZERO; // 商
        let num = Uint64.ZERO; // 余数

        for (let i = 63; i >= 0 ; i --) {
            // num = (num << 1) | ((_this >>> i) & 1L);
            num = num.left(1).or(_this.right(i,false).and(Uint64.ONE));
            if ( num.ge(_n) ) { // num >= _n
                // res = (res << 1) | 1L ;
                res = res.left(1).or(Uint64.ONE);
                // num = num - _n;
                num = num.sub(_n);
            } else {
                // res = res << 1;
                res = res.left(1);
            }
        }

        return {
            quotient  : res,
            remainder : num
        };
    }

    // +---------+
    //   移位运算
    // +---------+

    /**
     * 左移 n 位
     * @param n 左移的位数
     * @returns 左移 n 位后的结果
     */
    public override left ( n:number ) : Uint64 {
        return Uint64.cast(super.left(n));
    }

    /**
     * 右移 n 位
     * @param n 右移的位数
     */
    public override right ( n:number ) : Uint64 {
        return Uint64.cast(super.right(n,false));
    }

    /**
     * 二进制切片
     * @param high 二进制最高位位置，取值范围 0 <= high < 64
     * @param low 二进制最低位位置，取值范围 0 <= low <= high < 64
     */
    public override slice(high: number, low: number): Uint64 {
        return Uint64.cast(super.slice(high,low));
    }

    // +---------+
    //   逻辑运算
    // +---------+

    /**
     * 按位求与
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位与的值
     */
    public override and ( n:ReadonlyNumber64 ) : Uint64 {
        return Uint64.cast(super.and(n));
    }

    /**
     * 按位求或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位或的值
     */
    public override or ( n:ReadonlyNumber64 ) : Uint64 {
        return Uint64.cast(super.or(n));
    }

    /**
     * 按位取非
     * @returns 当前值按位取非的值
     */
    public override not () : Uint64 {
        return Uint64.cast(super.not());
    }

    /**
     * 异或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位异或的值
     */
    public override xor ( n:ReadonlyNumber64 ) : Uint64 {
        return Uint64.cast(super.xor(n));
    }
}