import ReadonlyNumber64 from "../type/number64";

type R64 = ReadonlyNumber64;
const ZERO = ReadonlyNumber64.ZERO;

const DEFAULT_RAM_BYTES:number = 0xFFFF;

/**
 * **随机存储器（Random Access Memory，简称 RAM）**
 * @version 0.0.1
 */
export default class RAM {

    /** 存储区 */
    private _memories:R64[];

    /** 存储器大小，单位为：字节（byte） */
    public readonly bytes : number;

    /**
     * 构建一个随机存储器
     * @param bytes 存储器大小(单位为字节,为8的整倍数)
     * @param memories 存储器
     */
    constructor( bytes:number = DEFAULT_RAM_BYTES, memories?:R64[] ) {
        this.bytes = bytes;
        let size = Math.floor(bytes/8);
        if (memories == null) {
            this._memories = new Array(size);
        } else {
            const len = this._memories.length;
            if (len > size) {
                throw new Error(`传入内存大于当前最大限制：${len} > ${size}`);
            } else {
                this._memories = memories;
            }
        }

    }

    // +---------+
    //   常用功能
    // +---------+

    public clear( start:number, end:number ) : void {
        for ( let i = start; i < end; i++ ) {
            this._memories[i] = ZERO;
        }
    }

    /**
     * 获取存储器大小
     * @param unit 返回单位（默认为字节 B ）： B/K(B)/M(B)/G(B)
     * @returns 根据单位返回的存储器大小
     */
    public getSize( unit:string = "B" ) : number {
        switch (unit.toUpperCase()) {
            case "B"  :
                return this.bytes;
            case "K"  :
            case "KB" :
                return this.bytes >>> 10;
            case "M"  :
            case "MB" :
                return this.bytes >>> 20;
            case "G"  :
            case "GB" :
                return this.bytes >>> 30;
            default :
                throw new Error("无效的单位");
        }
    }

    get memories() : R64[] {
        return this._memories;
    }

    set memories( memories:R64[]) {
        this._memories = memories;
    }

}