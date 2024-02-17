'use client'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {NameStore} from "@/utils/utils";

const ElementStyle = styled.div`
    
    .div_name_list.div_name{
        display: block;
    }

    button{
        margin: 2px;
    }

`;

interface StaticObj {
    name: string
    weight: number
}

type Props = {
    setSelIndex: Function;
};

function SelAName(props: Props) {
    const nameStore = new NameStore()
    const initNameList: StaticObj[] = nameStore.names;

    const selOnClickEvent = (evt: React.MouseEvent<HTMLElement>, index: number) =>{
        console.log("Halli hallo!!!", evt, index);
        props.setSelIndex(index);
    }

    const isWinner = (i: number) => {if(i == 0) return <span>  &lt;== is winner!</span>; else '';}

    return (
        <ElementStyle>
            <div>
                <div className='div_name_list'>
                    {initNameList.map(function(obj: StaticObj, i: number){
                        const keyItem = 'div_name' + i
                        return <div key={keyItem} className='div_name'>{i + 1}. {obj.name}<Button type="button" title={obj.name} 
                        onClick={(ev) => selOnClickEvent(ev, i)} >Sel</Button>{isWinner(i)}</div>;
                    })}
                </div>
            </div>
        </ElementStyle>
    );
}

export default SelAName;