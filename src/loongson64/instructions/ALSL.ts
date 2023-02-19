import { W,WU,D } from "../common/tag";
import {SignExtend, ZeroExtend} from "../common/bitextend";
import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";

namespace LoongarchTemplate {

    /**
     *
     * @param _LRG 内部寄存器组
     * @param tag 符号
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param rk 通用寄存器 rk 的索引
     * @param sa2 2位立即数
     */
    export function ALSL ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, rk:number, sa2:number ) : void {

        let GRj = Int64.cast(_LRG.GR[rj]);
        let GRk = Int64.cast(_LRG.GR[rk]);

        switch (tag) {

            case W :
            {
                // tmp = (GR[rj][31:0] << (sa2 + 1)) + GR[rk][31:0]
                let tmp = GRj.slice(31,0).left(sa2 + 1).add(GRk.slice(31,0));
                // GR[rd] = SignExtend(tmp[31,0],GRLEN)
                _LRG.GR[rd] = SignExtend(tmp.slice(31,0),32,_LRG.GRLEN);
            }
                break;
            case WU :
            {
                // tmp = (GR[rj][31:0] << (sa2 + 1)) + GR[rk][31:0]
                let tmp = GRj.slice(31,0).left(sa2 + 1).add(GRk.slice(31,0));
                // GR[rd] = SignExtend(tmp[31,0],GRLEN)
                _LRG.GR[rd] = ZeroExtend(tmp.slice(31,0),32,_LRG.GRLEN);
            }
                break;
            case D :
            {
                // tmp = (GR[rj][63:0] << (sa2 + 1)) + GR[rk][63:0]
                let tmp = GRj.slice(63,0).left(sa2 + 1).add(GRk.slice(63,0));
                // GR[rd] = tmp[63:0]
                _LRG.GR[rd] = tmp.slice(63,0);
            }
                break;
        }

    }

}