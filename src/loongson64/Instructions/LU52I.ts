import { D } from "./common/tag";
import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";

namespace LoongarchTemplate {

    /**
     *
     * @param _LRG 内部寄存器组
     * @param tag 符号
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param si12 12位立即数
     */
    export function LU52I ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, si12:number ) : void {

        switch (tag) {
            case D :
            {
                // GR[rd] = {si12,GR[rj][51:0]}
                _LRG.GR[rd] = Int64.cast(si12).left(52).or(_LRG.GR[rj].slice(51,0));
            }
                break;
        }

    }

}