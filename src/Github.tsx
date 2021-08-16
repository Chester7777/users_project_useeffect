import s from "./Github.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Search} from "./Search";
import {Users} from "./Users";
import { UserDetails } from "./UserDetails";

export type SearchUserType = {
    login: string
    id: number
}
export type SearchResult = {
    items: SearchUserType[]
}
export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

export const Github = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

    // const [tempSearch, SetTempSearch] = useState<string>("it-kamasutra");
    const [searchTerm, setSearchTerm] = useState<string>("it-kamasutra");
    // const [usersDetail, setUsersDetail] = useState<null | UserType>(null);

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);
    // useEffect(() => {
    //     axios
    //         .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
    //         .then(res => {
    //             setUsers(res.data.items)
    //         })
    // }, [searchTerm]);
    // useEffect(() => {
    //     if (!!selectedUser) {
    //         axios
    //             .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
    //             .then(res => {
    //                 setUsersDetail(res.data)
    //             })
    //     }
    // }, [selectedUser]);

    return <div className={s.container}>
        <div>
            <Search value={searchTerm} onSubmit={(value: string) =>setSearchTerm(value)}/>
            <button onClick={() => setSearchTerm("it-kamasutra")}>reset</button>
            <Users term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>

            {/*<input*/}
            {/*    value={tempSearch}*/}
            {/*    onChange={(e) => {*/}
            {/*        SetTempSearch(e.currentTarget.value)*/}
            {/*    }}*/}
            {/*    type="text"*/}
            {/*    placeholder={"search"}/>*/}
            {/*<button onClick={() => {*/}
            {/*    SetSearchTerm(tempSearch)*/}
            {/*}}>find*/}
            {/*</button>*/}
        </div>
        {/*<ul>*/}
        {/*    {users.map(u => <li*/}
        {/*        key={u.id}*/}
        {/*        className={selectedUser === u ? s.selected : ""}*/}
        {/*        onClick={() => {*/}
        {/*            setSelectedUser(u)*/}
        {/*        }*/}
        {/*        }*/}
        {/*    >{u.login}</li>)}*/}
        {/*</ul>*/}
        <div>
            <UserDetails selectedUser={selectedUser} />
            {/*<h2>Username</h2>*/}
            {/*{usersDetail && <div>*/}
            {/*    <img src={usersDetail.avatar_url}/>*/}
            {/*    <br/>*/}
            {/*    {usersDetail.login}, followers: {usersDetail.followers}*/}
            {/*</div>}*/}
            {/*<div>Details</div>*/}
        </div>
    </div>

}