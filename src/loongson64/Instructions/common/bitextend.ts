import ReadonlyNumber64 from "../../../type/number64";
import Int64 from "../../../type/int64";

/*
 * 位扩展
 */

const ONE:ReadonlyNumber64 = Int64.ONE;
const ZERO:ReadonlyNumber64 = Int64.ZERO;

/**
 * 整数符号扩展
 * @param n 待处理整数
 * @param from 起始扩展长度
 * @param to 扩展到的长度
 * @returns 有符号整数
 */
export function SignExtend ( n:ReadonlyNumber64, from:number , to:number ) : ReadonlyNumber64 {

    // 构造掩码，即连续 to 个 1 组成的二进制

    // mask = (1 << to ) - 1;
    let mask:ReadonlyNumber64 = Int64.ONE.left(to).sub(Int64.ONE);
    // _n = mask & n;
    let _n:ReadonlyNumber64 = mask.and(n);

    // 如果符号位的是负号，那么就填充 1

    // ((n >>> (from - 1)) & 1) != 0
    if (!(n.right(from - 1,false).and(ONE).equals(ZERO))) {
        // (mask & (- (1 << from))) | _n;
        return mask.and(Int64.ONE.left(from).negate()).or(_n);
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
export function ZeroExtend ( n:ReadonlyNumber64, from:number, to:number ) : ReadonlyNumber64 {
    // ((1 << from ) - 1) & n;
    return Int64.ONE.left(from).sub(Int64.ONE).and(n);
}