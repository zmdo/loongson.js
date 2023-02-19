import { W } from "../common/tag";
import { SignExtend } from "../common/bitextend";
import LoongsonRegisterGroup from "../register";

namespace LoongarchTemplate {

    /**
     *
     * @param _LRG 内部寄存器组
     * @param tag 符号
     * @param rd 通用寄存器 rd 的索引
     * @param si20 20位立即数
     */
    export function LU12I ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, si20:number ) : void {

        switch (tag) {
            case W :
            {
                _LRG.GR[rd] = SignExtend (si20 << 12, 32 ,_LRG.GRLEN);
            }
                break;
        }

    }

}