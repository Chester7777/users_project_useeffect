import axios from "axios";
import {useEffect, useState} from "react";
import {SearchResult, SearchUserType, UserType} from "./Github";
import s from "./Github.module.css"
import {Users} from "./Users";


type SearchType = {
    value: string
    onSubmit: (fixedValue: string) => void
}

export const Search = (props: SearchType) => {
    const [tempSearch, setTempSearch] = useState<string>("");
    // const [searchTerm, SetSearchTerm] = useState<string>("it-kamasutra");
    // const [users, setUsers] = useState<SearchUserType[]>([]);
    // const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    // const [usersDetail, setUsersDetail] = useState<null | UserType>(null);

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])
    // useEffect(() => {
    //     if (selectedUser) {
    //         document.title = selectedUser.login
    //     }
    // }, [selectedUser]);

    // useEffect(() => {
    //     axios
    //         .get<SearchResult>(`https://api.github.com/search/users?q=${tempSearch}`)
    //         .then(res => {
    //             setUsers(res.data.items)
    //         })
    // }, [searchTerm]);

    return <div>
        <input
            value={tempSearch}
            onChange={(e) => {
                setTempSearch(e.currentTarget.value)
            }}
            type="text"
            placeholder={"search"}/>
        <button onClick={() => {
            props.onSubmit(tempSearch)
        }}>find
        </button>
        {/*<Users selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>*/}
    </div>
}