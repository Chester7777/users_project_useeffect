import {Button, Input} from "antd";
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";
import s from "../SearchComponent/SearchComponent.module.css"


type SearchType = {
    value: string
    onSubmit: (fixedValue: string) => void
    setSearchTerm: (fixedValue: string) => void
}

export const SearchComponent = (props: SearchType) => {
    const [tempSearch, setTempSearch] = useState<string>("");
    const {Search} = Input


    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])


    return <div className={s.container}>
        <Search
            value={tempSearch}
            onChange={(e) => {
                setTempSearch(e.currentTarget.value)
            }}
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={() => {
                props.onSubmit(tempSearch)
            }}
        />
        <div>
            <Button type="dashed" danger onClick={() => props.setSearchTerm("¯ \\ _ (ツ) _ / ¯")}>
                Reset
            </Button>
        </div>
    </div>
}