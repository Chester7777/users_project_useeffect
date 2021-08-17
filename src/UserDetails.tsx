import axios from "axios";
import {useEffect, useState} from "react";
import {SearchUserType, UserType} from "./Github";
import {Timer} from "./Timer";


type UserDetailsPropsType = {
    selectedUser: SearchUserType | null
}

export const UserDetails = ({selectedUser}: UserDetailsPropsType) => {
    const [usersDetail, setUsersDetail] = useState<null | UserType>(null);
    const [seconds, setSeconds] = useState<number>(6);

    useEffect(() => {
        if (!!selectedUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setSeconds(6)
                    setUsersDetail(res.data)
                })
        }
    }, [selectedUser]);

    useEffect(() => {
        if (seconds < 1) {
            setUsersDetail(null)
        }
    }, [seconds])

    return <div>
        {usersDetail && <div>
            <Timer
                setSeconds={setSeconds}
                seconds={seconds}
            />
            <h2>{usersDetail.login}</h2>
            <img src={usersDetail.avatar_url}/>
            <br/>
            {usersDetail.login}, followers: {usersDetail.followers}
        </div>}
    </div>
}