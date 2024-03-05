import styles from './page.module.css';
import MainContainer from '@/components/main_container';
import 'bootstrap/dist/css/bootstrap.min.css';
import fs from 'fs';
import StatisticalObj from '@/components/statistical_obj';
import {APIBody} from '@/components/api_body';
import {Utils} from '@/utils/utils';

export default async function Home() {
  const initialFilePath: string = process.cwd() + '/public/initial_list.txt';
  let initialList = '';
  if (fs.existsSync(initialFilePath)) {
    initialList = await fs.promises.readFile(process.cwd() + '/public/initial_list.txt', 'utf8');
  }

  const resultPath = process.cwd() + '/public/results.json';
  let currResult: APIBody = {
    nameList: [],
    selName: null
  };
  if (fs.existsSync(resultPath)) {
    const results = await fs.promises.readFile(resultPath, 'utf8');
    currResult = JSON.parse(results);
    if(!currResult.nameList){
      currResult.nameList = [];
    }else{
      // console.log(currResult.nameList);
      let item: StatisticalObj; 
      for (item of currResult.nameList) {
        if(item.time){
          item.time = new Date(item.time);
        } 
      }
      currResult.nameList = Utils.changeOrderBasedOnWeightTimeAtInit(currResult.nameList);
    }
    if(!currResult.selName){
      currResult.selName = null;
    }
  }  

  // set date as Date (not as a string)
  

  return (
    <main className={styles.main}>
      <div className={styles.description}></div>

      <div className={styles.center}>
        <MainContainer initialList={initialList} currResult={currResult.nameList} selName={currResult.selName}/>
      </div>
    </main>
  );
}
