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
    public cast ( n:ReadonlyNumber64 ) : Int64 {
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
                _n = this.negate();
            } else {
                _c = this;
                _n = n;
            }

            if (_c.h32 > _n.h32) {
                return neg;
            } else if (_c.h32 < _n.h32) {
                return !neg;
            } else {
                let _cls = _c.l32 >>> 31;
                let _nls = _n.l32 >>> 31;
                if (_cls > _nls) { 
                    // 如果当前值低 32 位的首数字大于 n 低32位的首数字
                    return neg; 
                } else if (_cls < _nls) {
                    // 如果当前值低 32 位的首数字小于 n 低32位的首数字
                    return !neg;
                } else {
                    // 如果当前值低 32 位的首数字等于 n 低32位的首数字
                    // 那么就比较后 31 位数字的大小
                    let _cl = _c.l32 & 0x7FFFFFFF;
                    let _nl = _n.l32 & 0x7FFFFFFF;
                    if (_cl > _nl) {
                        return neg;
                    } else {
                        return !neg;
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
                sum = sum.add(new Int64(n.l32 << i,0));
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

        // 正负数判断

        // TODO 这里做标准除法运算
        let res:Int64 = Int64.ZERO;
        let num:Int64 = Int64.ZERO;
        for (let i = 63; i >= 0 ; i ++) {
            // num = (num << 1) | ((n & 1 << i) >>> i)
            num = num.left(1).or(n.and(Int64.ONE.left(i)).right(i,false));
            if (num.ge(this)) {
                // res = res | (1 << i)
                res = res.or(Int64.ONE.left(i));
                // num = num - this
                num = num.sub(this);
            }
        }
        return res;
    }

    public mod ( n:Int64 ) : Int64 {

        // 对特殊值处理
        if (this.equals(Int64.ZERO) || this.equals(n)) {
            return Int64.ZERO;
        } else if (n.equals(Int64.ONE)) {
            return this;
        }

        // 正负数判断

        // TODO 这里做标准取模运算
        let res:Int64 = Int64.ZERO;
        let num:Int64 = Int64.ZERO;
        for (let i = 63; i >= 0 ; i ++) {
            // num = (num << 1) | ((n & 1 << i) >>> i)
            num = num.left(1).or(n.and(Int64.ONE.left(i)).right(i,false));
            if (num.ge(this)) {
                // res = res | (1 << i)
                res = res.or(Int64.ONE.left(i));
                // num = num - this
                num = num.sub(this);
            }
        }
        return num;
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
    public left ( n:number ) : Int64 {

		if (n >= 64) {
			return Int64.ZERO;
		} else if ( n == 0 ) {
			return this.copy();
		} else if ( n >= 32 ) {

			// 如果左移位数大于等于 32，说明原高 32 位都被抹除了
			// 低 32 位的数据会经过右移后填充到高 32 位中
			// 这里要在保证精度的情况下获取位移后的结果

			let dLen:number = 64 - n;
			let dh:number;
			if (dLen == 32) {
				dh = this._l32;
			} else {
				dh = (this._l32 & ~ ( - (1 << dLen)));
			}
			let nh:number = dh << (32 - dLen);
			return new Int64(nh,0);
		} else {

			let nh:number;
			let nl:number;

			// 这里获取的是高/低 32 位需要保留的数字的个数
			let dLen:number = 32 - n;

			// 该值为低 32 位位移后需要填充到高 32 位的数字
			let lh:number = (this._l32 & - (1 << dLen)) >>> dLen;
			nh = ((this._h32 & ~ (- (1 << dLen))) << n) | lh;
			nl = (this._l32 & ~ (- (1 << dLen))) << n;

			return new Int64(nh,nl);
		}

    }

    /**
     * 右移 n 位
     * @param n 右移的位数
     * @param sign 是否带符号（默认为带符号）
     */
    public right ( n:number, sign:boolean = true) : Int64 {

        // 进行范围限定
		if (n > 63) {
			if ( sign && (this._h32 >>> 31) > 0) {
				return Int64.BIT64;
			} else {
				return Int64.ZERO;
			}
		}
        
        let _n:number = n;

        // 无符号右移结果
        let tmp = this.slice( 63 , _n );

        // 判断是否需要带符号右移
        if ( sign && (this._h32 >>> 31) != 0) {
            if (_n < 32) {
                return new Int64(this._h32 >> _n,tmp.l32);
            } else {
                return new Int64(0xFFFFFFFF,this._h32 >> (_n - 32));
            }
        }

        return new Int64(tmp.h32,tmp.l32);
    }

    // +---------+
    //   逻辑运算
    // +---------+

    /**
     * 按位求与
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位与的值
     */
    public and ( n:Int64 ) : Int64 {
        return new Int64 (
            n.h32 & this._h32,
            n.l32 & this._l32
        );
    }

    /**
     * 按位求或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位或的值
     */
    public or ( n:Int64 ) : Int64 {
        return new Int64 (
            n.h32 | this._h32,
            n.l32 | this._l32
        );
    }

    /**
     * 按位取非
     * @returns 当前值按位取非的值
     */
    public not () : Int64 {
        return new Int64 (
            ~ this._h32 ,
            ~ this._l32 
        );
    }

    /**
     * 异或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位异或的值
     */
    public xor ( n:Int64 ) : Int64 {
        return new Int64 (
            n.h32 ^ this._h32 ,
            n.l32 ^ this._l32
        );
    }

}

export type int64 = Int64;