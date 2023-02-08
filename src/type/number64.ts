const M32:number = 0xFFFFFFFF;
const M52:number = 0xFFFFFFFFFFFFF;

/**
 * 64 位只读数字
 */
export default class ReadonlyNumber64 {

    public static ZERO:ReadonlyNumber64 = new ReadonlyNumber64(0,0);

    // 高32位
    protected _h32:number = 0;

    // 低32位
    protected _l32:number = 0;

    /**
     * 构建 64 位只读数字
     * @param h32 高32位
     * @param l32 低32位
     */
    constructor ( h32:number, l32:number ) {
        this._h32 = h32;
        this._l32 = l32;
    }

    /**
     * 获取一个拷贝
     * @returns 拷贝值
     */
    public copy () : ReadonlyNumber64 {
        return new ReadonlyNumber64(this._h32,this._l32);
    }

    /**
     * 左移 n 位
     * @param n 左移的位数
     * @returns 
     */
    public left ( n:number ) : ReadonlyNumber64 {

        if (n > 63) {
            return ReadonlyNumber64.ZERO;
        } else if ( n > 52 ) {

            // 这里要在保证精度的情况下获取位移后的结果
            // 这里获取的是高 32 位剩下的数字的个数
            let dLen = 64 - n;
            let nh = (this._l32 & ~ ( - (1 << dLen))) << (32 - dLen);

            return new ReadonlyNumber64(nh,0);
        } else if ( n > 32 ) {
            
            // 如果左移位数大于 32，说明原高 32 位都被抹除了
            // 低 32 位的数据会经过右移后填充到高 32 位中
            
            return new ReadonlyNumber64(M32 & (this._l32 << (n - 32)),0);
        } else {

            let nh:number ;
            let nl:number ;
            
            // 这里获取的是高/低 32 位需要保留的数字的个数
            let dLen = 32 - n;
            // 该值为低 32 位位移后需要填充到高 32 位的数字
            let lh = (this._l32 & - (1 << dLen)) >> dLen; 

            if ( n > 20) {
                nh = ((this._h32 & ~ (- (1 << dLen))) << n) | lh;
                nl = (this._l32 & ~ (- (1 << dLen))) << n;
            } else {
                nh = (M32 & (this._h32 << n)) | lh;
                nl = M32 & (this._l32 << n);
            }

            return new ReadonlyNumber64(nh, nl);
        }

    }

    /**
     * 右移 n 位 
     * @param n 右移的位数
     * @param sign 是否带符号（默认为带符号）
     */
    public right ( n:number, sign:boolean = true) : ReadonlyNumber64 {
        
        // 进行范围限定
        let _n:number = n > 63 ? 63: n;

        // 无符号右移结果
        let tmp = this.slice( 63 , _n );

        // 判断是否需要带符号右移
        if ( sign && (this._h32 >>> 31) != 0) { 
            if (_n < 32) {
                return new ReadonlyNumber64(this._h32 >> _n,tmp.l32);
            } else {
                return new ReadonlyNumber64(0xFFFFFFFF,this._h32 >> (_n - 32));
            }
        }

        return tmp;
    }

    /**
     * 二进制切片
     * @param high 二进制最高位位置，取值范围 0 <= high < 64
     * @param low 二进制最低位位置，取值范围 0 <= low <= high < 64
     */
    public slice ( high:number, low:number ) : ReadonlyNumber64 {
        
        let nl:number = 0;
        let nh:number = 0;

        let _low = low;
		let _high = high + 1;
		let len = _high - _low;

		if ( _low < 32 ) {
			nl = this._l32 >>> _low;
			if ( _high <= 32) {
				let tmp = nl & ~ ( - (1 << _high ) );
				nl = ((tmp >>> _low) << _low)| nl;
				nh = 0;
			} else { // _high > 32
                // 这里获取的 tmp 是高 32 位实际留下的值
				let tmp = this._h32 & ~ ( - (1 << (_high - 32) ) );
				if ( len <= 32 ) {
					nl = (tmp << (32 - _low)) | nl;
					nh = 0;
				} else { // len > 32
					nl = (((tmp & ~ (-(1 << _low))) << (32 - _low)) | nl );
					nh = tmp >>> _low;
				}
			}
		} else { // _low >= 32
			nl = ( this._h32 & ~ (-(1 << (_high - 32))) ) >>> (_low - 32);
			nh = 0;
		}
        
        return new ReadonlyNumber64(nh,nl);
    }

    /**
     * 按位求与
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位与的值
     */
    public and ( n:ReadonlyNumber64 ) : ReadonlyNumber64 {
        return new ReadonlyNumber64 (
            n.h32 & this._h32,
            n.l32 & this._l32
        );
    }

    /**
     * 按位求或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位或的值
     */
    public or ( n:ReadonlyNumber64 ) : ReadonlyNumber64 {
        return new ReadonlyNumber64 (
            n.h32 | this._h32,
            n.l32 | this._l32
        );
    }

    /**
     * 按位取非
     * @returns 当前值按位取非的值
     */
    public not () : ReadonlyNumber64 {
        return new ReadonlyNumber64 (
            M32 & (~ this._h32) ,
            M32 & (~ this._l32)
        );
    }

    /**
     * 异或
     * @param n 进行逻辑运算的值
     * @returns 当前值与 n 按位异或的值
     */
    public xor ( n:ReadonlyNumber64 ) : ReadonlyNumber64 {
        return new ReadonlyNumber64 (
            M32 & (n.h32 ^ this._h32) ,
            M32 & (n.l32 ^ this._l32)
        );
    }

    get h32 () : number {
        return this._h32;
    }

    get l32 () : number {
        return this._l32;
    }

}

/**
 * 可写 64 位数字
 */
export class WritableNumber64 extends ReadonlyNumber64 {

    set h32 ( h32:number ) {
        this._h32 = h32;
    }

    set l32 ( l32:number ) {
        this._l32 = l32;
    }

    set value ( n:ReadonlyNumber64 ) {
        this._h32 = n.h32;
        this._l32 = n.l32;
    }

}