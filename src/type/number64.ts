const M32:number = 0xFFFFFFFF;
const M52:number = 0xFFFFFFFFFFFFF;

/**
 * 64 位只读数字
 */
export default class ReadonlyNumber64 {

    public static ZERO:ReadonlyNumber64 = new ReadonlyNumber64(0,0);
    public static BIT64:ReadonlyNumber64 = new ReadonlyNumber64(0xFFFFFFFF,0xFFFFFFFF);

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
     * 二进制切片
     * @param high 二进制最高位位置，取值范围 0 <= high < 64
     * @param low 二进制最低位位置，取值范围 0 <= low <= high < 64
     */
    public slice ( high:number, low:number ) : ReadonlyNumber64 {

        let nl:number = 0;
        let nh:number = 0;
		
        let _high:number = high + 1;
        let _low:number = low;

		// 获取切片后的长度
		let len = _high - _low;
		let dh:number;
		if (_high < 32) {
			dh = ( this._l32 & ~ (-(1 << (_high))) );
		} else if (_high == 32) {
			dh = this._l32;
		} else if (_high < 64) {
			dh = ( this._h32 & ~ (-(1 << (_high - 32))) );
		} else {
			dh = this._h32;
		}

		if ( _low < 32 ) {
			if ( _high <= 32) {
				nl = dh >>> _low;
				nh = 0;
			} else {
				nl = this._l32 >>> _low;
				if ( len <= 32 ) {
					nl = (dh << (32 - _low)) | nl;
					nh = 0;
				} else { // len > 32
					nl = ((dh & ~ (-(1 << _low))) << (32 - _low)) | nl ;
					nh = dh >>> _low;
				}
			}
		} else {
			nl = dh >>> (_low - 32);
			nh = 0;
		}

        return new ReadonlyNumber64(nh,nl);
    }

    /**
     * 判断该数是否与 n 相等
     * @param n 比较的数
     * @returns 是否相等
     */
    public equals ( n:ReadonlyNumber64 ) : boolean {
        return n.h32 == this._h32 && n.l32 == this._l32;
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