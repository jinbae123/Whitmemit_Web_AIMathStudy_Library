import { CompSet } from "../CompSet.js";
import { Comp } from "../Comp.js";
import { Loss } from "./Loss.js";

export class SELoss extends Loss{

    constructor(){
        super();
    }

    forward(predictSetList, labelSetList){

        if(predictSetList instanceof CompSet){
            predictSetList = [predictSetList];
        }
        if(labelSetList instanceof CompSet){
            labelSetList = [labelSetList];
        }
        
        if(predictSetList.length!=labelSetList.length)
            throw new Error("predict 사이즈와 label 배치 사이즈가 다릅니다.");

        let lossCompArray=[];
        let listSize = predictSetList.length;
        for(let i=0;i<listSize;i++){

            let predictSet =predictSetList[i];
            let labelSet = labelSetList[i];

            

            
            if(predictSet.length() != labelSet.length())
                throw new Error("predictSet 와 labelSet의 차원 개수가 서로 동일하지 않습니다.");


            let resultArray =[];        
            for(let i=0;i<predictSet.length();i++){

                let predictionComp = predictSet.get(i);
                let labelComp = labelSet.get(i);

                let ml = (predictionComp.subtract(labelComp));
                ml = ml.multiply(ml);
                resultArray.push(ml);
            }

            resultArray = new CompSet(resultArray);
            let singleLoss = resultArray.sum();
            singleLoss = singleLoss.divide(new Comp(predictSet.length()));
            singleLoss.setTag("singleLoss");
            lossCompArray.push(singleLoss);
        }
        lossCompArray = new CompSet(lossCompArray);
        let totalLoss = lossCompArray.sum();
        totalLoss.setTag("totalLoss");

        return totalLoss;
    }

}

