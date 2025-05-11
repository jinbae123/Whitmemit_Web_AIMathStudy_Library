import { Comp } from "../Comp.js";
import { CompMapper } from "./CompMapper.js";

export class Sigmoid extends CompMapper{

    constructor(batch){
        super(batch);
        this.setCallback(
            (comp)=>{
                
                let under = comp.multiply(new Comp(-1));
                under = under.exp();
                under = new Comp(1).add(under);

                let top = new Comp(1);
                let result = top.divide(under);

                return result;

            }
        );
    }
}