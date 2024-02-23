'use client'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Utils, StaticObj} from "@/utils/utils";

const ElementStyle = styled.div`
    
    .div_name_list.div_name{
        display: block;
    }

    button{
        margin: 2px;
    }

`;


type Props = {
    nameList: StaticObj[]
    setSelName: Function;
};

function SelAName(props: Props) {
    const selOnClickEvent = (evt: React.MouseEvent<HTMLElement>, name: string) =>{
        console.log("selOnClickEvent() in SelAName", evt, name);
        props.setSelName(name);
    }

    const orderListBasedOnWeght: StaticObj[] = [...props.nameList]
    orderListBasedOnWeght.sort((a: StaticObj,b: StaticObj) => b.weight - a.weight)
    console.log('list to print====> ', orderListBasedOnWeght);

    const isWinner = (i: number) => {if(i == 0) return <span>  &lt;== is winner!</span>; else '';}

    return (
        <ElementStyle>
            <div>
                <div className='div_name_list'>
                    {orderListBasedOnWeght.map(function(obj: StaticObj, i: number){
                        const keyItem = 'div_name' + i
                        return <div key={keyItem} className='div_name'>{i + 1}. {obj.name}<Button type="button" title={obj.name} 
                        onClick={(ev) => selOnClickEvent(ev, obj.name)} >Sel</Button>{isWinner(i)}</div>;
                    })}
                </div>
            </div>
        </ElementStyle>
    );
}

export default SelAName;