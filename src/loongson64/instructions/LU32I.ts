import { D } from "../common/tag";
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
    export function LU32I ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, si20:number ) : void {

        switch (tag) {
            case D :
            {
                // GR[rd] = {SignExtend(si20,32),GR[rd][31:0]}
                _LRG.GR[rd] =
                    SignExtend (si20,20 ,32)
                    .left(32)
                    .or(_LRG.GR[rd].slice(31,0));
            }
                break;
        }

    }

}