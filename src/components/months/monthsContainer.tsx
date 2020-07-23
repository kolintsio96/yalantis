import Users from "./index";
import {connect} from "react-redux";
import {getUsers} from "../../redux/users-reducer";
import React from "react";
import {compose} from "redux";
import {getMonthData} from "./../../redux/selectors/users-selectors";
import {MonthType} from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type OwnPropsType = {}
type MapPropsType = {
    months:Array<MonthType>,
}
type MapDispatchType = {
    getUsers: () => void,
}
type PropsType = MapDispatchType & MapPropsType;

class UserContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers();
    }
    render() {
        return <>
            <Users
                months={this.props.months}
            />
        </>

    }
}
let mapStateToProps = (state: AppStateType):MapPropsType => {
    return {
        months: getMonthData(state)
    }
}
let mapDispatchToProps = {getUsers}

export default compose(
    connect<MapPropsType, MapDispatchType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(UserContainer)