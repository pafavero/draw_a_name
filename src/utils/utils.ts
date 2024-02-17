
export interface StaticObj {
  name: string
  weight: number
}
  

export class Utils{

  static shuffle(initialList: string[]) {
    /*
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * Fisher–Yates shuffle
     */

    let initialMap: StaticObj[] = initialList.map((item) => {return {name: item, weight: 1}});

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
  
  
  static changeWeight(nameList: StaticObj[], selName: string): StaticObj[] {
    const REDUCE_WEIGHT = 0.8;
    const ADD_WEIGHT = REDUCE_WEIGHT / (nameList.length - 1);
    const weightList = [...nameList];
    
    let currentIndex = weightList.length;
    for (let currentIndex = 0; currentIndex < weightList.length; currentIndex++) {
      if(weightList[currentIndex].name == selName)
        weightList[currentIndex].weight -=  REDUCE_WEIGHT
      else
        weightList[currentIndex].weight += ADD_WEIGHT
    }
    return weightList;
  }
  
  static checkSum(nameList: StaticObj[]){
    // use reduce() method to find the sum
    var sum = nameList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.weight
    },0);
  
    console.log('sum', sum);
  
  }
}
  
export class NameStore {
    // https://stackoverflow.com/questions/35210406/class-definition-confuse-in-typescript-and-es6
    names: StaticObj[] = [
        {name: "XXX", weight: 1},
        {name: "Susanna", weight: 1}, 
        {name: "Noah", weight: 1}, 
        {name: "Emma", weight: 1}, 
        {name: "Oliver", weight: 1}, 
        {name: "Charlotte", weight: 1}, 
        {name: "James", weight: 1}, 
        {name: "Amelia", weight: 1}
    ]
    
    constructor(){
        
    }
}
      
//     //shuffle the init list
//     console.log("  ");
//     const shuffleNameList: StaticObj[]  = shuffle(initNameList);
//     console.log(shuffleNameList);
//     checkSum(shuffleNameList);
  
  
//     // suppose to peak one pos 0
//     console.log("  ");
//     let weightNameList: StaticObj[] = changeWeight(shuffleNameList, 0);
//     console.log(weightNameList);
//     checkSum(weightNameList);
  
  
//     // suppose to peak one pos 4
//     console.log("  ");
//     weightNameList = changeWeight(shuffleNameList, 4);
//     console.log(weightNameList);
//     checkSum(weightNameList);
  
  
//     // list to print
//     console.log("  ");
//     const orderListBasedOnWeght: StaticObj[] = [...weightNameList]
//     orderListBasedOnWeght.sort((a: StaticObj,b: StaticObj) => b.weight - a.weight)
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