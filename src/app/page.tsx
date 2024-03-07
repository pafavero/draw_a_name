import styles from './page.module.css';
import MainContainer from '@/components/main_container';
import 'bootstrap/dist/css/bootstrap.min.css';
import fs from 'fs';
import StatisticalObj from '@/components/statistical_obj';
import {APIBody} from '@/components/api_body';
import {Utils} from '@/utils/utils';
import conn from '@/utils/db';
import { QueryResult } from 'pg';

type SqlQuery = {
  initial_list: string | null;
  result: string | null;
}

export default async function Home() {
  const rslt = await conn.query('select initial_list, result from book_a_seat.draw_a_name limit 1');
  
  let initialList: string | null = 'Mark, Susanna, Peter, Noah, Emma, Oliver, Charlotte, James, Amelia';
  let currResult: APIBody = {
    nameList: [],
    selName: null
  };

  if(rslt.rows.length > 0){
    const queryResult: SqlQuery = rslt.rows[0];
    initialList = queryResult['initial_list'];
    // console.log('------------->>', initialList);

    if(queryResult['result']){
      currResult = JSON.parse(queryResult['result']);
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
      console.log(currResult.selName);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}></div>

      <div className={styles.center}>
        <MainContainer initialList={initialList} currResult={currResult.nameList} selName={currResult.selName}/>
      </div>
    </main>
  );
}
