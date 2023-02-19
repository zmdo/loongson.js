import ReadonlyNumber64 from "./number64";

const M32:number = 0xFFFFFFFF;

/**
 * 64位有符号整数
 */
export default class Int64 extends ReadonlyNumber64 {
    
    public static BIT64:Int64 = new Int64(0xFFFFFFFF,0xFFFFFFFF);

    public static ZERO:Int64 = new Int64(0,0);
    public static ONE:Int64 = new Int64(0,1);
    public static NEGATIVE_ONE:Int64 = this.BIT64;

    // +---------+
    //   常用功能
    // +---------+

    /**
     * 将只读数转换为 64 位整型数
     * @param n 64 位只读数
     * @returns 64 位整型数
     */
    public static cast ( n:ReadonlyNumber64 ) : Int64 {
        return new Int64(n.h32,n.l32);
    }

    /**
     * 获取一个拷贝
     * @returns 拷贝值
     */
    public copy () : Int64 {
        return new Int64(this._h32,this._l32);
    }

    // +---------+
    //   比较运算
    // +---------+

    /**
     * 判断当前数值是否与 n 相等
     * @param n 比较的值
     * @returns 当前值与 n 相等返回 true，否则返回 false
     */
    public eq ( n:Int64 ) : boolean {
        return this.equals(n);
    }

    /**
     * 判断当前值是否大于 n
     * @param n 比较的值
     * @returns 当前值大于 n 返回 true，否则返回 false
     */
    public gt ( n:Int64 ) : boolean {
        
        // 获取符号位
        let cs:number = this._h32 >>> 31;
        let ns:number = n.h32 >>> 31;
        
        if (cs < ns) { // 如果当前值为正数，n的值为负数
            return true;
        } else if (cs > ns) { // 如果当前值为负数，n的值为正数数
            return false;
        } else { // 如果符号相等

            let _c:Int64;
            let _n:Int64;
            let neg = (cs != 0);
            if (neg) { 
                // 如果是负数，变成正数
                _c = this.negate();
                _n = n.negate();
            } else {
                _c = this;
                _n = n;
            }

            if (_c.h32 > _n.h32) {
                return !neg;
            } else if (_c.h32 < _n.h32) {
                return neg;
            } else {
                let _cls = _c.l32 >>> 31;
                let _nls = _n.l32 >>> 31;
                if (_cls > _nls) { 
                    // 如果当前值低 32 位的首数字大于 n 低32位的首数字
                    return !neg; 
                } else if (_cls < _nls) {
                    // 如果当前值低 32 位的首数字小于 n 低32位的首数字
                    return neg;
                } else {
                    // 如果当前值低 32 位的首数字等于 n 低32位的首数字
                    // 那么就比较后 31 位数字的大小
                    let _cl = _c.l32 & 0x7FFFFFFF;
                    let _nl = _n.l32 & 0x7FFFFFFF;
                    if (_cl > _nl) {
                        return !neg;
                    } else {
                        return neg;
                    }
                }
            }
        }
    }

    /**
     * 当前值是否大于等于 n
     * @param n 比较的值
     * @returns 当前值大于等于 n 返回 true，否则返回 false
     */
    public ge ( n:Int64 ) : boolean {
        return n.lt(this);
    }

    /**
     * 当前值是否小于 n
     * @param n 比较的值
     * @returns 当前值小于 n 返回 true，否则返回 false
     */
    public lt ( n:Int64 ) : boolean {
        return n.gt(this) && !n.eq(this);
    }

    /**
     * 当前值是否小于等于 n
     * @param n 比较的值
     * @returns 当前值小于等于 n 返回 true，否则返回 false
     */
    public le ( n:Int64 ) : boolean {
        return n.gt(this);
    }

    // +---------+
    //   算数运算
    // +---------+

    /**
     * 取负（乘以 -1）
     * @returns 负结果
     */
    public negate () : Int64 {
        if (((this._h32 >>> 31) & 1) == 0) {
            // 如果是正数，取负后就是 -n = ~n + 1
            let nl = (~ this._l32) + 1;
            let hl = (~ this._h32) + this._carry( ~ this._l32, 1 );
            return new Int64(M32 & hl,M32 & nl);
        } else {
            // 如果是负数,取负后就是 -n = ~(n - 1) = ~(n + (-1))
            return this.add(Int64.NEGATIVE_ONE).not();
        }
    }

    /**
     * 加法运算
     * @param n 被加数
     * @returns 和
     */
    public add ( n:Int64 ) : Int64 {
        let nl = this._l32 + n.l32;
        let hl = this._h32 + n.h32 + this._carry( this._l32, n.l32);
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

    /**
     * 乘法运算
     * @param n 被乘数
     * @returns 积
     */
    public mul ( n:Int64 ) : Int64 {
        
        // 对特殊值的处理
        if (n.equals(Int64.ZERO) || this.equals(Int64.ZERO)) {
            return Int64.ZERO;
        } else if (this.equals(Int64.ONE)) {
            return n;
        } else if (n.equals(Int64.ONE)) {
            return this;
        }

        // 通用乘法计算
        let sum:Int64 = Int64.ZERO;
        for (let i = 0; i < 32 ; i ++) {
            // 低 32 位
            if ( ((this._l32 >>> i) & 1) != 0 ) {
                sum = sum.add(n.left(i));
            }
            // 高 32 位
            if ( ((this._h32 >>> i) & 1) != 0 ) {
                let dh = n.l32 << i;
                sum = sum.add(new Int64(dh,0));
            }
        }
        return sum;
    }

    /**
     * 除法运算
     * @param n 被除数
     * @returns 积
     */
    public div ( n:Int64 ) : Int64 {
        
        // 对特殊值的处理
        if (this.equals(n)) {
            return Int64.ONE;
        } else if (this.equals(Int64.ZERO)) {
            return Int64.ZERO;
        }

        return this._div(n).quotient;
    }

    /**
     * 取模运算
     * @param n 被除数
     * @returns 积
     */
    public mod ( n:Int64 ) : Int64 {

        // 对特殊值处理
        if (this.equals(Int64.ZERO) || this.equals(n)) {
            return Int64.ZERO;
        } else if (n.equals(Int64.ONE)) {
            return this;
        }

        return this._div(n).remainder;
    }

    /**
     * 标准整型除法运算
     * @param n 被除数
     * @returns
     * - quotient : 商
     * - remainder : 余数
     */
    private _div ( n:Int64 ) : {quotient:Int64,remainder:Int64} {

        // 正负数判断
        
        let _n = n;
        let _this = this.copy();

        let nh = _n.h32 >> 31;
        let th = _this.h32 >> 31;

        // 商负数标志
        let qNeg = (nh + th) == 1;
        // 余数负数标志
        let rNeg = false;

        // 将负数转换为正数
        
        if (th == 1) {
            rNeg = true;
            _this = _this.negate();
        }

        if (nh == 1) {
            _n = _n.negate();
        }
        
        // 经典的二进制除法运算法则

        let res = Int64.ZERO; // 商 
        let num = Int64.ZERO; // 余数

        for (let i = 63; i >= 0 ; i --) {
            // num = (num << 1) | ((_this >>> i) & 1L);
            num = num.left(1).or(_this.right(i,false).and(Int64.ONE));
            if ( num.ge(_n) ) { // num >= _n
                // res = (res << 1) | 1L ;
                res = res.left(1).or(Int64.ONE);
                // num = num - _n;
                num = num.sub(_n);
            } else {
                // res = res << 1;
                res = res.left(1);
            }
        }

        return {
            quotient  : qNeg ? res.negate() : res,
            remainder : rNeg ? num.negate() : num
        };
    }

    /**
     * 判断低 32 位 i + j 之后是否会向高 32 位进位
     * @param i 低32位数字 i
     * @param j 低32位数字 j
     */
    private _carry( i:number, j:number ) : number {
        let s = ((i & 0x7FFFFFFF) + (j & 0x7FFFFFFF)) >>> 31;
        return ((i >> 31) + (j >> 31) + s ) >>> 1;
    }

    // +---------+
    //   移位运算
    // +---------+

    /**
     * 左移 n 位
     * @param n 左移的位数
     * @returns 左移 n 位后的结果
     */
    public override left ( n:number ) : Int64 {
        return Int64.cast(super.left(n));
    }

    /**
     * 右移 n 位
     * @param n 右移的位数
     * @param sign 是否带符号（默认为带符号）
     */
    public override right ( n:number, sign:boolean = true) : Int64 {
        return Int64.cast(super.right(n));
    }

    /**
     * 二进制切片
     * @param high 二进制最高位位置，取值范围 0 <= high < 64
     * @param low 二进制最低位位置，取值范围 0 <= low <= high < 64
     */
    public override slice(high: number, low: number): Int64 {
        return Int64.cast(super.slice(high,low));
    }

    // +---------+
    //   逻辑运算
    // +---------+

    /**
     * 按位求与
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位与的值
     */
    public override and ( n:ReadonlyNumber64 ) : Int64 {
        return Int64.cast(super.and(n));
    }

    /**
     * 按位求或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位或的值
     */
    public override or ( n:ReadonlyNumber64 ) : Int64 {
        return Int64.cast(super.or(n));
    }

    /**
     * 按位取非
     * @returns 当前值按位取非的值
     */
    public override not () : Int64 {
        return Int64.cast(super.not());
    }

    /**
     * 异或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位异或的值
     */
    public override xor ( n:ReadonlyNumber64 ) : Int64 {
        return Int64.cast(super.xor(n));
    }

}

export type int64 = Int64;