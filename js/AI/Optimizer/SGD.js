import { Optimizer } from "./Optimizer.js";

export class SGD extends Optimizer{
    constructor(serializedWeights, learningRate=0.0001){
        super(serializedWeights);
        this.learningRate = learningRate;
    }

    forward(){
        super.forward();
        
        let serializedWeights = this.getSerializedWeights();
        for(let i=0; i< serializedWeights.length;i++){
            let weight = serializedWeights[i];
            let grid = weight.getGrid();
            let value = weight.getValue();

            value = value - this.learningRate * grid;
            weight.setValue(value);
        }
    }
}