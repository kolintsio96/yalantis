import React from 'react';
import style from './index.module.scss';
import {MonthType} from '../../../types/types';

type PropsType = {
    month:MonthType,
}

const User:React.FC<PropsType> = ({month}) => {

    return (
        <div className={style.user} style={{color: month.color}}>
            {month.month}
        </div>
    )
}
export default User