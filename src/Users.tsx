import axios from "axios";
import {useEffect, useState} from "react";
import {SearchResult, SearchUserType, UserType} from "./Github";
import s from "./Github.module.css"
import 'antd/dist/antd.css';
import {Avatar, List, Spin } from "antd";
import InfiniteScroll from 'react-infinite-scroller';


type UsersPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void

    // items: SearchUserType[]
}

export const Users = (props: UsersPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [usersDetail, setUsersDetail] = useState<null | UserType>(null);


    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term]);
    // state = {
    //     users: [],
    //     loading: false,
    //     hasMore: true,
    // };

    useEffect(() => {

    }, [])
    // componentDidMount() {
    //     this.fetchData(res => {
    //         this.setState({
    //             data: res.results,
    //         });
    //     });
    // }
    //
    // fetchData = callback => {
    //     reqwest({
    //         url: fakeDataUrl,
    //         type: 'json',
    //         method: 'get',
    //         contentType: 'application/json',
    //         success: res => {
    //             callback(res);
    //         },
    //     });
    // };
   const handleInfiniteOnLoad = () => {
        // let { data } = props.items;
            setLoading( true)
        if (users.length > 14) {
            setMessage('Infinite List loaded all');
                setHasMore( false)
                setLoading( false)
            return;
        }
        // this.fetchData(res => {
        //     data = data.concat(res.results);
        //     this.setState({
        //         data,
        //         setLoading( false)
        //     });
        // });
    };


    return <div>
        {/*<Spin />*/}
        <div className="demo-infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List
                    dataSource={users}
                    renderItem={item => (
                        <List.Item key={props.selectedUser?.id}>
                            <List.Item.Meta

                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                // title={usersDetail?.login}
                                // description={usersDetail?.followers}

                            />
                            {users.map(u => <li
                                key={u.id}
                                className={props.selectedUser === u ? s.selected : ""}
                                onClick={() => {
                                    props.onUserSelect(u)
                                }
                                }
                            >{u.login}</li>)}
                            <div>Content</div>
                        </List.Item>
                    )
                    }
                >

                    {loading && hasMore && (
                        <div className="demo-loading-container">
                            <Spin />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>


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