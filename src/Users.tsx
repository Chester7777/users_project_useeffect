import axios from "axios";
import {useEffect, useState } from "react";
import {SearchResult, SearchUserType, UserType } from "./Github";
import s from "./Github.module.css"


type UsersPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

export const Users = (props: UsersPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([]);
    // const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    // const [usersDetail, setUsersDetail] = useState<null | UserType>(null);

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term]);

    // useEffect(() => {
    //     if (!!props.selectedUser) {
    //         axios
    //             .get<UserType>(`https://api.github.com/users/${props.selectedUser.login}`)
    //             .then(res => {
    //                 setUsersDetail(res.data)
    //             })
    //     }
    // }, [props.selectedUser]);

    return <div>
        <ul>
            {users.map(u => <li
                key={u.id}
                className={props.selectedUser === u ? s.selected : ""}
                onClick={() => {
                    props.onUserSelect(u)
                }
                }
            >{u.login}</li>)}
        </ul>
    </div>
}