
export interface StaticObj {
  name: string
  weight: number,
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
  
