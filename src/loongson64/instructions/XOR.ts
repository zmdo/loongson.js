import LoongsonRegisterGroup from "../register";

namespace LoongarchTemplate {

    /**
     * 异或逻辑运算
     * @param _LRG 内部寄存器组
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param rk 通用寄存器 rk 的索引
     */
    export function XOR ( _LRG:LoongsonRegisterGroup, rd:number, rj:number, rk:number ) : void {

        _LRG.GR[rd] = _LRG.GR[rj].xor(_LRG.GR[rk]);

    }

}