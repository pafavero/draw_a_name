'use client'
import styled from 'styled-components';
import {NameStore} from "@/utils/utils";
import {StatisticalObj, Utils} from "@/utils/utils";

const ElementStyle = styled.div`
    display: block;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: #eee;
    padding: 0 1rem;
    width: 300px;
    margin: 3px;
    overflow: hidden;
    font-size: 12px; 

    &.is_active{
        background-color: #fff;
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
};

function SelAName(props: Props) {
    const nameStore = new NameStore()

    const selOnClickEvent = (evt: React.MouseEvent<HTMLElement>, name: string) =>{
        // console.log("selOnClickEvent() in SelAName", evt, name);
        if (props.isActive)
            props.setSelName(name);
    }

    // const isWinner = (i: number) => {if(i == 0) return <span>  &lt;== is winner!</span>; else '';}
    const keyItem = 'div_name_' + props.index;
    let className = 'div_name';
    if (props.isSelected){
        className += ' sel';
    }
    if (props.isActive){
        className += ' is_active';
    }

    const time = props.obj.time?Utils.dateInHhMmYyMmDd(props.obj.time):'';
    return (
        <ElementStyle className={className} onClick={(ev: React.MouseEvent<HTMLInputElement>) => selOnClickEvent(ev, props.obj.name)} 
                title={props.isActive?'Select ' + props.obj.name:''} >
            {props.index + 1}. {props.obj.name} {time}
        </ElementStyle >

    );
}

export default SelAName;
