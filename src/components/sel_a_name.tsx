'use client'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {NameStore} from "@/utils/utils";
import {StaticObj} from "@/utils/utils";

const ElementStyle = styled.div`
    display: block;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0 1rem;
    width: 300px;
    margin: 3px;
    overflow: hidden;

    :hover{
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
    obj: StaticObj;
    index: number;
    isSelected: boolean;
    setSelName: Function;
};

function SelAName(props: Props) {
    const nameStore = new NameStore()

    const selOnClickEvent = (evt: React.MouseEvent<HTMLElement>, name: string) =>{
        // console.log("selOnClickEvent() in SelAName", evt, name);
        props.setSelName(name);
    }

    // const isWinner = (i: number) => {if(i == 0) return <span>  &lt;== is winner!</span>; else '';}
    const keyItem = 'div_name_' + props.index;
    let className = 'div_name';
    if (props.isSelected){
        className += ' sel';
    }

    return (
        <ElementStyle className={className} onClick={(ev: React.MouseEvent<HTMLInputElement>) => selOnClickEvent(ev, props.obj.name)} title={'Select ' + props.obj.name} >
            {props.index + 1}. {props.obj.name}
        </ElementStyle >

    );
}

export default SelAName;
