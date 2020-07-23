import React from 'react';
import style from './index.module.scss';
import User from "./user";
import {MonthType} from "../../types/types";
type Props = {
    months:Array<MonthType>,
}
let Users:React.FC<Props> = ({months}) => {
    let mapUsers = months.map((month, index) => {
        return <User key={index} month={month}/>
    });
    return (
        <div className={style.users}>
            <div className={style.usersContainer}>
                {mapUsers}
            </div>
        </div>
    )
}


export default Users