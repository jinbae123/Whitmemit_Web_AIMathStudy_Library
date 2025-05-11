import { Comp } from "../Comp.js";
import { CompMapper } from "./CompMapper.js";

export class RELU extends CompMapper{

    constructor(batch){
        super(batch);
        this.setCallback(
            (comp)=>{


                if(comp.getValue()>0){

                    let result = comp;
                    
                    return result;
                }else{

                    return new Comp(0.0);
                }
                

            }
        );
    }
}