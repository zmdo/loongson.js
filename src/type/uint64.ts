import ReadonlyNumber64 from "./number64";

/**
 * 64位无符号整数
 */
export default class Uint64 extends ReadonlyNumber64 {

    // +---------+
    //   常用功能
    // +---------+

    /**
     * 将只读数转换为 64 位整型数
     * @param n 64 位只读数
     * @returns 64 位整型数
     */
     public cast ( n:ReadonlyNumber64 ) : Uint64 {
        return new Uint64(n.h32,n.l32);
     }

    // +---------+
    //   移位运算
    // +---------+

    /**
     * 左移 n 位
     * @param n 左移的位数
     * @returns 左移 n 位后的结果
     */
    public left ( n:number ) : Uint64 {
        return this.cast(super.left(n));
    }

    /**
     * 右移 n 位
     * @param n 右移的位数
     */
    public right ( n:number ) : Uint64 {
        return this.cast(super.right(n,false));
    }

}