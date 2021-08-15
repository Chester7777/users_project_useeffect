import s from "./Github.module.css"
import {useEffect, useState} from "react";
import axios from "axios";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}

export const Github = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    const [users, setUsers] = useState<SearchUserType[]>([]);
    const [tempSearch, SetTempSearch] = useState<string>("it-kamasutra");
    const [searchTerm, SetSearchTerm] = useState<string>("it-kamasutra");

    useEffect(() => {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${tempSearch}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm]);

    return <div className={s.container}>
        <div>
            <input
                value={tempSearch}
                onChange={(e) => {
                    SetTempSearch(e.currentTarget.value)
                }}
                type="text"
                placeholder={"search"}/>
            <button onClick={() => {
                SetSearchTerm(tempSearch)
            }}>find
            </button>
        </div>
        <ul>
            {users.map(u => <li
                key={u.id}
                className={selectedUser === u ? s.selected : ""}
                onClick={() => {
                    setSelectedUser(u)
                }
                }
            >{u.login}</li>)}
        </ul>
        <div>
            <h2>Username</h2>
            <div>Details</div>
        </div>
    </div>

}