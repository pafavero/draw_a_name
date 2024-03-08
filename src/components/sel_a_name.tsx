'use client';
import styled from 'styled-components';
import {Utils} from '@/utils/utils';
import StatisticalObj from '@/components/statistical_obj';

const ElementStyle = styled.div`
  display: block;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 0 1rem;
  width: 300px;
  margin: 3px;
  overflow: hidden;
  font-size: 12px; 

  &.is_active{
      font-size: 16px; 
  }

  &.is_active:hover{
      border-width: 3px;
      margin: 0 3px;
      cursor: pointer; 
  }

  &.sel{
      background-color: lightyellow;
      border-width: 3px;    
  }

  button{
      margin: 2px;
  }

`;

type Props = {
  obj: StatisticalObj;
  index: number;
  isSelected: boolean;
  isActive: boolean;
  setSelName: Function;
  lenght: number;
};

function SelAName(props: Props) {
  const selOnClickEvent = (evt: React.MouseEvent<HTMLElement>, name: string) =>{
    // console.log("selOnClickEvent() in SelAName", evt, name);
    if (props.isActive)
      props.setSelName(name);
  };

  const keyItem = 'div_name_' + props.index;
  let className = 'div_name';
  if (props.isSelected){
    className += ' sel';
  }

  if (props.isActive){
    className += ' is_active';
  }

  const time = props.obj.time?Utils.dateInHhMmYyMmDd(props.obj.time):'';
  let color: string = Utils.getColor(props.index/props.lenght);
  if(!props.isActive)
    color = '#fff';
  return (
    <ElementStyle className={className} onClick={(ev: React.MouseEvent<HTMLInputElement>) => selOnClickEvent(ev, props.obj.name)} 
        title={props.isActive?'Select ' + props.obj.name:''} style={{backgroundColor:color}}>
        {props.index + 1}. {props.obj.name} {time}
    </ElementStyle >

  );
}

export default SelAName;
