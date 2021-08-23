import s from "./Github.module.css"
import {useEffect, useState} from "react";
import {Users} from "./Users";
import {UserDetails} from "./UserDetails";
import {SearchComponent} from "./SearchComponent/SearchComponent";

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
    const [searchTerm, setSearchTerm] = useState<string>("it-kamasutra");

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);


    return <div className={s.container}>
        <div>
            <SearchComponent
                value={searchTerm}
                onSubmit={(value: string) => setSearchTerm(value)}
                setSearchTerm={setSearchTerm}
            />
            <Users
                term={searchTerm}
                selectedUser={selectedUser}
                onUserSelect={setSelectedUser}
            />
        </div>
        <div>
            <UserDetails selectedUser={selectedUser}/>
        </div>
    </div>

}