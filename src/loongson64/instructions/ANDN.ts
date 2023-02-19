import LoongsonRegisterGroup from "../register";

namespace LoongarchTemplate {

    /**
     * 将通用寄存器 rk 中的数据按位取反后再与通用寄存器 rj 中数据进行按位逻辑与运算，
     * 结果写入通用寄存器 rd 中。
     * @param _LRG 内部寄存器组
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param rk 通用寄存器 rk 的索引
     */
    export function ADDN ( _LRG:LoongsonRegisterGroup, rd:number, rj:number, rk:number ) : void {

        _LRG.GR[rd] = _LRG.GR[rj].and(_LRG.GR[rk].not());

    }

}