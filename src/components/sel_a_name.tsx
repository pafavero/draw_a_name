'use client'
import {useSpring, animated} from 'react-spring';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {NameStore} from "@/utils/utils";
import {Utils, StaticObj} from "@/utils/utils";

const ElementStyle = styled.div`
    
    .div_name_list>.div_name{
        display: block;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 0 1rem;
        width: 300px;
        margin: 1px;
        overflow: hidden;
    }

    .div_name_list>.div_name.sel{
        background-color: lightyellow;
        border-width: 3px;    
    }

    button{
        margin: 2px;
    }

`;

type Props = {
    nameList: StaticObj[];
    selName: string | null;
    setSelName: Function;
};

function SelAName(props: Props) {
    const nameStore = new NameStore()

    const selOnClickEvent = (evt: React.MouseEvent<HTMLElement>, name: string) =>{
        console.log("selOnClickEvent() in SelAName", evt, name);
        props.setSelName(name);
    }

    const orderListBasedOnWeght: StaticObj[] = [...props.nameList]
    orderListBasedOnWeght.sort((a: StaticObj,b: StaticObj) => b.weight - a.weight)
    console.log('list to print====> ', orderListBasedOnWeght);

    // const isWinner = (i: number) => {if(i == 0) return <span>  &lt;== is winner!</span>; else '';}

    


    return (
        <ElementStyle>
            <div>
                <div className='div_name_list'>
                    {orderListBasedOnWeght.map(function(obj: StaticObj, i: number){
                        const keyItem = 'div_name' + i;
                        let className = 'div_name';
                        let isCollapsed = false;
                        if (props.selName == obj.name){
                            className += ' sel';
                            isCollapsed = true;
                        }
                        
                        if (isCollapsed){
                            const props2 = useSpring({
                                from: { height: 100 },
                                to: { height: 0 },
                            })
                            return <animated.div  key={keyItem} style={props2} >
                                {i + 1}. {obj.name}<Button type="button" title={obj.name} onClick={(ev) => selOnClickEvent(ev, obj.name)} >Sel</Button>
                            </animated.div >;
                        }else{
                            return <div  key={keyItem} className={className} >
                                {i + 1}. {obj.name}<Button type="button" title={obj.name} onClick={(ev) => selOnClickEvent(ev, obj.name)} >Sel</Button>
                            </div >;
                        }
                    })}
                </div>
            </div>
        </ElementStyle>
    );
}

export default SelAName;