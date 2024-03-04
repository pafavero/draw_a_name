'use client'
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import SelAName from '@/components/sel_a_name';
import {Utils} from '@/utils/utils';
import StatisticalObj from '@/components/statistical_obj';

const ElementStyle = styled.div`
  {
      background-color: #eee;
      padding: 1rem;
  }

  .div_name_list_inner{
      height: 300px;
      overflow-y: auto;
      width: 330px;
  }
}
`;

type Props = {
  nameList: StatisticalObj[];
  selName: string | null;
  setSelName: Function;
};

function NameListCntr(props: Props) {
  const setSelName = (name: string) =>{
    // console.log("selOnClickEvent() in SelAName", name);
    props.setSelName(name);
  };

  const orderListBasedOnWeght: StatisticalObj[] = [...props.nameList];
  orderListBasedOnWeght.sort((a: StatisticalObj,b: StatisticalObj) => b.weight - a.weight)
  // console.log('list to print====> ', orderListBasedOnWeght);
  let time = '';
  const resultList = orderListBasedOnWeght.map(function(obj: StatisticalObj, i: number){
    const keyItem = 'div_name_' + i;
    let className = 'div_name';
    let isSelected = false;
    if (props.selName == obj.name){
        className += ' sel';
        isSelected = true;
        time = obj.time?Utils.dateInHhMmYyMmDd(obj.time):'';
    }
    
    return <SelAName key={keyItem} obj={obj} index={i} isSelected={isSelected} isActive={props.selName?false:true} 
        setSelName={setSelName} lenght={orderListBasedOnWeght.length} />;
  });

  const nextDraw = (evt: React.MouseEvent<HTMLElement>) =>{
      // console.log("selOnClickEvent() in SelAName", evt, name);
      props.setSelName(null);
  };


  return (
      <ElementStyle className='div_name_list'>
          {props.selName ?
              <>
                  <p>The following name has been selected: <span className='sel_name'>{props.selName + ' drawn at ' + time}</span></p>
                  <p>List for the following draw:</p>
              </>
          :
              <>
                  <p>Select a name between the name drawn.</p>
                  <p>Result of the draw:</p>
              </>
          }
          
          <div className='div_name_list_inner'>
              {resultList}
          </div>

          {props.selName && <Button onClick={nextDraw}>Execute next draw</Button>}

      </ElementStyle>
  );
}

export default NameListCntr;