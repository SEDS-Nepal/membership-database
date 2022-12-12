import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/members/';

function Table() {
    const [people, setPeople] = useState([]);
    const [sortDirection, setSortDirection] = useState("ASC");

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setPeople(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    // create a callback for sorting table data
    const sortData = useCallback((byKey) => {
        let sortedProducts;
        if (sortDirection === "ASC") {
            setSortDirection("DSC");
            sortedProducts = people.sort(
                (p1, p2) => (p1[byKey] < p2[byKey]) ? 1 : (p1[byKey] > p2[byKey]) ? -1 : 0);
        }
        if (sortDirection === "DSC") {
            setSortDirection("ASC");
            sortedProducts = people.sort(
                (p1, p2) => (p1[byKey] > p2[byKey]) ? 1 : (p1[byKey] < p2[byKey]) ? -1 : 0);
        }
        setPeople([...sortedProducts]);
        console.log(people);
    }, [people, sortDirection]);

    return (
        <div className="main ">
            <table class="styled-table">
                <thead>
                    <tr>
                        <th onClick={() => sortData('id')}>Column 1</th>
                        <th onClick={() => sortData('first_name')}>Column 2</th>
                        <th onClick={() => sortData('last_name')}>Column 3</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default Table;