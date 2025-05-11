import { Comp } from "./Comp.js";
import { CompSet } from "./CompSet.js";

export class Linear{

    constructor(inputSize, outputSize){

        this.weights=[];

        this.inputSize = inputSize;
        this.outputSize = outputSize;

        for(let i =0;i<inputSize;i++){
            let lineWeight=[];
            for(let o=0;o<outputSize;o++){
                lineWeight.push(new Comp(Math.random()));
            }
            this.weights.push(lineWeight);
        }

    }

    getWeights(){
        return this.weights.slice();
    }
    
    clearGrids(){
        for(let i =0;i<this.weights.length;i++){
            let weight = this.weights[i];

            for(let j=0;j<weight.length;j++){
                let comp = weight[j];
                comp.clearGrid();
            }

        }
    }

    forward(compSet){

        
        if(compSet instanceof CompSet){
            compSet = [compSet];
        }
        let outputArray =[]

        for (let batch=0; batch<compSet.length;batch++){
            let singleBatchCompSet = compSet[batch];
        
            let result=[];
        
            for(let o=0;o<this.outputSize;o++){

                let adds=null;
                for(let i=0;i<this.inputSize;i++){
                    let multiples = singleBatchCompSet.get(i).multiply(this.weights[i][o]);

                    if(adds==null)
                        adds = multiples;
                    else
                        adds = adds.add(multiples);
                }
            
                result.push(adds);
            }
            outputArray.push(new CompSet(result));
        }

        let returnItem = [];
        if(outputArray.length==1)
            returnItem = outputArray[0];
        else
            returnItem = outputArray;

        return returnItem;

    }



}