import {APIBody} from '@/components/api_body';
import conn from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type SqlDataByInit = {
  initialList: string | null;
  result: string | null;
}

type DataByInit = {
  initialNames: string[];
  result: APIBody;
}


const getInitData = (async () => {
  const rslt = await conn.query('select initial_list as initialList, result from book_a_seat.draw_a_name limit 1');
  
  let initialNames: string[] = ['Mark, Susanna, Peter, Noah, Emma, Oliver, Charlotte, James, Amelia'];
  let result: APIBody = {
    nameList: [],
    selName: null
  };

  if(rslt.rows.length > 0){
    const queryResult: SqlDataByInit = rslt.rows[0];
    if(queryResult['initialList']){
      initialNames = queryResult['initialList'].split(',');
    }
    // console.log('------------->>', initialNames);

    if(queryResult['result']){
      result = JSON.parse(queryResult['result']);
      if(!result.nameList){
        result.nameList = [];
      }
      if(!result.selName){
        result.selName = null;
      }
      console.log(result.selName);
    }
  }
  const dataByInit: DataByInit = { initialNames: initialNames, result: result};
  return dataByInit;
});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataByInit>
) {
  if (req.method === 'GET') {
    console.log('Method get is not useful');
    const initData: DataByInit = await getInitData();
    res.status(200).json(initData);
  }
}  
