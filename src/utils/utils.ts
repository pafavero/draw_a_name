
export interface StatisticalObj {
  name: string
  weight: number
  time: Date | null
}
  

export class Utils{

  static shuffle(initialList: string[]) {
    /*
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * Fisher–Yates shuffle
     */

    let initialMap: StatisticalObj[] = initialList.map((item) => {return {name: item, weight: 1, time: null}});

    let currentIndex = initialMap.length;
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        // console.log(currentIndex, randomIndex);
        currentIndex--;
        
        // And swap it with the current element.
        // console.log('inversion random <-> current', array[currentIndex], array[randomIndex]);
        [initialMap[currentIndex], initialMap[randomIndex]] = [initialMap[randomIndex], initialMap[currentIndex]];
    }
  
    return initialMap;
  }
  
  
  static changeWeight(nameList: StatisticalObj[], selName: string): StatisticalObj[] {
    const REDUCE_WEIGHT = 0.8;
    const ADD_WEIGHT = REDUCE_WEIGHT / (nameList.length - 1);
    const weightList = [...nameList];
    
    let selIndex = weightList.length;
    let selObj: StatisticalObj | null = null;
    for (let currentIndex = 0; currentIndex < weightList.length; currentIndex++) {
      if(weightList[currentIndex].name == selName){
        weightList[currentIndex].time = new Date();
        weightList[currentIndex].weight -=  REDUCE_WEIGHT;
        selObj = weightList[currentIndex];
        selIndex = currentIndex;
      }else{
        // weightList[currentIndex].weight += ADD_WEIGHT;
      }
      weightList[currentIndex].weight = Math.round(weightList[currentIndex].weight * 100000) / 100000
    }

    // fix objs with same weight: find all others with the same weight
    // NONE OF FOLLOWINGS WORK, it is not possible to touch the weight
    /*const foundObjs: StatisticalObj[] = weightList.filter((item) => item != selObj && item.weight == selObj?.weight);
    foundObjs.sort((a: StatisticalObj,b: StatisticalObj) => {
      let aTime = a.time?a.time.getTime():99999999999999999;
      let bTime = b.time?b.time.getTime():99999999999999999;
      return bTime - aTime;
    })*/
    // increment them
    /*for (var i = 0; i < foundObjs.length; i++){
      console.log(selObj?.weight, "compare with", foundObjs[i].name, foundObjs[i].time)
      foundObjs[i].weight += (0.002 * i);
    }*/
    /*if (selObj && foundObjs.length > 0){
      console.log("yes found!!!")
      selObj.weight -= (0.001);
    }*/
    const  weightTimeList = Utils.changeOrderBasedOnWeightTime(weightList, selObj);
    return weightTimeList;
  }

  static changeOrderBasedOnWeightTime(weightList: StatisticalObj[], selObj: StatisticalObj | null){
    const orderListBasedOnWeght: StatisticalObj[] = [...weightList]
    orderListBasedOnWeght.sort((a: StatisticalObj,b: StatisticalObj) => b.weight - a.weight)
    
    // solution will be here, find if selObject has other with the same weight, the reorder this sublist based on time (easy to de)
    // insert the subllist in final list (difficut), For esample if selObject in position 5, other two with same weight in position 6, 7
    // i have to reorder these 3 ones. And then, remove them from original list e insert them again
    /*
    const fruits = ["name1", "name2", "name3", "name4", "name5", "name6", "name7", "name8", "name9", "name10", "name11", "name12"];

    yyy = ["new1", "new2", "new3"]; 

    fruits.splice(5, 3, ...yyy);
    console.log(fruits)
    */
    const indexes: number[] = [];
    const foundObjs: StatisticalObj[] = orderListBasedOnWeght.filter((item, index) => {
      if (item.weight == selObj?.weight) {
        indexes.push(index);
        return true;
      }
      return false;
    });
    foundObjs.sort((a: StatisticalObj,b: StatisticalObj) => {
      let aTime = a.time?a.time.getTime(): 99999999999999999;
      let bTime = b.time?b.time.getTime(): 99999999999999999;
      return aTime - bTime;
    });
    console.log(foundObjs.length, ...foundObjs);

    orderListBasedOnWeght.splice(indexes[0], foundObjs.length, ...foundObjs);
    return orderListBasedOnWeght;
  }
  
  static checkSum(nameList: StatisticalObj[]){
    // use reduce() method to find the sum
    var sum = nameList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.weight
    },0);
  
    console.log('sum', sum);
  
  }

  static padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
  }

  static dateInHhMmYyMmDd(date: Date, dateDiveder: string = "-") {
  
    return (
      [
        Utils.padTwoDigits(date.getHours()),
        Utils.padTwoDigits(date.getMinutes()),
        Utils.padTwoDigits(date.getSeconds()),
      ].join(":") +
      " " +
      [
        Utils.padTwoDigits(date.getDate()),
        Utils.padTwoDigits(date.getMonth() + 1),
        date.getFullYear(),
      ].join(dateDiveder)
    );
  }

  static getColor(value: number): string {
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
}
  
export class NameStore {
    // https://stackoverflow.com/questions/35210406/class-definition-confuse-in-typescript-and-es6
    // names: StatisticalObj[] = [
    //     {name: "XXX", weight: 1},
    //     {name: "Susanna", weight: 1}, 
    //     {name: "Noah", weight: 1}, 
    //     {name: "Emma", weight: 1}, 
    //     {name: "Oliver", weight: 1}, 
    //     {name: "Charlotte", weight: 1}, 
    //     {name: "James", weight: 1}, 
    //     {name: "Amelia", weight: 1}
    // ]
    
    constructor(){
        
    }
}
      
//     //shuffle the init list
//     console.log("  ");
//     const shuffleNameList: StatisticalObj[]  = shuffle(initNameList);
//     console.log(shuffleNameList);
//     checkSum(shuffleNameList);
  
  
//     // suppose to peak one pos 0
//     console.log("  ");
//     let weightNameList: StatisticalObj[] = changWeight(shuffleNameList, 0);
//     console.log(weightNameList);
//     checkSum(weightNameList);
  
  
//     // suppose to peak one pos 4
//     console.log("  ");
//     weightNameList = changWeight(shuffleNameList, 4);
//     console.log(weightNameList);
//     checkSum(weightNameList);
  
  
//     // list to print
//     console.log("  ");
//     const orderListBasedOnWeght: StatisticalObj[] = [...weightNameList]
//     orderListBasedOnWeght.sort((a: StatisticalObj,b: StatisticalObj) => b.weight - a.weight)
//     console.log('list to print====> ', orderListBasedOnWeght);
  
  
//     const parentElem = document.getElementById("demo") as HTMLElement;
//     console.log('parentElem', parentElem);
//     for (let currentIndex = 0; currentIndex < orderListBasedOnWeght.length; currentIndex++) {
//       const elem = document.createElement('input'); 
//       elem.type = 'radio'; 
//       elem.name = orderListBasedOnWeght[currentIndex].name; 
//       // elem.checked = checked; 
//       parentElem.appendChild(elem); 
  
//       const elem2 = document.createElement('label') as HTMLLabelElement;
//       elem2.innerText = orderListBasedOnWeght[currentIndex].name;
//       parentElem.appendChild(elem2); 
  
//     }
  
//   }
  
  // proseguire da qui   https://github.com/Kornil/simple-ts-react-app/blob/master/src/index.tsx