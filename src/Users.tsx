import axios from "axios";
import {useEffect, useState} from "react";
import {SearchResult, SearchUserType, UserType} from "./Github";
import s from "./Github.module.css"
import 'antd/dist/antd.css';
import {Avatar, List, Spin} from "antd";
import InfiniteScroll from 'react-infinite-scroller';


type UsersPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

export const Users = (props: UsersPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term]);

    return <div>
        <div className="demo-infinite-container">
            <ul>
                {loading && hasMore && (
                    <div className="demo-loading-container">
                        <Spin/>
                    </div>
                )}
                {users.map(u => <li
                    key={u.id}
                    className={props.selectedUser === u ? s.selected : ""}
                    onClick={() => {
                        props.onUserSelect(u)
                    }
                    }
                >
                    {/*<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />*/}
                    {u.login}</li>)}
            </ul>
        </div>
    </div>
}