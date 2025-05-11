import {Comp} from "../Comp.js";
import {CompSet} from "../CompSet.js";


export class CompMapper{
    
    constructor(batch){
        this.array = batch;
        this.callback = (comp)=>{return comp};
    }

    setCallback(comp){
        this.callback = comp;

    }

    build(){
        
        let resultList = [];

        for(let i=0;i<this.array.length;i++){
            let compSet = this.array[i];

            let resultCompSetData=[];
            for(let j=0;j<compSet.length();j++){
                let comp = compSet.get(j);
                let newComp = this.callback(comp);

                resultCompSetData.push(newComp);
            }
            resultCompSetData = new CompSet(resultCompSetData);
            resultList.push(resultCompSetData);
        }

        return resultList;
        
    }

    

}