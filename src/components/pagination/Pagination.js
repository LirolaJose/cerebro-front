import {Pagination} from "react-bootstrap";
import React, {useState} from "react";

export function MyPagination(props) {
    const [activePage] = useState(props.activePage);
    let items = [];
    for (let number = 1; number <= props.totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === props.activePage}
                             onClick={event => props.onClick(event, number)}>
                {number}
            </Pagination.Item>);
    }
    return (
        <Pagination className="justify-content-center"
                    activePage={activePage}
                    size="sm"> {items}
            {props.onClick}
        </Pagination>
    )
}