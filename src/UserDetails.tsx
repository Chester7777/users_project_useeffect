import axios from "axios";
import {useEffect, useState } from "react";
import {SearchUserType, UserType } from "./Github";



type UserDetailsPropsType = {
    selectedUser: SearchUserType | null
}

export const UserDetails = ({selectedUser}: UserDetailsPropsType) => {
    const [usersDetail, setUsersDetail] = useState<null | UserType>(null);

    useEffect(() => {
        if (!!selectedUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUsersDetail(res.data)
                })
        }
    }, [selectedUser]);

    return <div>

        {usersDetail && <div>
            <h2>{usersDetail.login}</h2>
            <img src={usersDetail.avatar_url}/>
            <br/>
            {usersDetail.login}, followers: {usersDetail.followers}
        </div>}
    </div>
}