/**
 * 整数符号扩展
 * @param n 待处理整数
 * @param from 起始扩展长度
 * @param to 扩展到的长度
 * @returns 有符号整数
 */
export function SignExtend ( n:number, from:number , to:number ) : number {

    // 构造掩码，即连续 to 个 1 组成的二进制 
    let mask = (1 << to ) - 1;
    let _n = mask & n;

    // 如果符号位的是负号，那么就填充 1
    if ( ((n >> (from - 1)) & 1) != 0 ) {

        // 返回拓展后的值
        return mask & (- (1 << from)) | _n;

    }

    return _n;
}

/**
 * 整数零扩展
 * @param n 待处理整数
 * @param from 起始扩展长度
 * @param to 扩展到的长度
 * @returns 零扩展后的整数
 */
export function ZeroExtend ( n:number, from:number, to:number ) : number {
    return ((1 << from ) - 1) & n;
}