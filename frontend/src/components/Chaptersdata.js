import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/chapters/';

function Chaptersdata() {
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
            <table className="styled-table">
                <thead>
                    <tr>
                        <th onClick={() => sortData('id')}>ID</th>
                        <th onClick={() => sortData('chapter_name')}>Chapter Name</th>
                        <th onClick={() => sortData('chapter_location')}>Chapter Location</th>
                        <th onClick={() => sortData('chapter_head')}>Chapter Head</th>
                        <th onClick={() => sortData('chapter_members')}>Chapter Member</th>
                        <th onClick={() => sortData('email')}>Email</th>
                        <th onClick={() => sortData('college_estd')}>College Established Year</th>
                        <th onClick={() => sortData('college_name')}>College Name</th>
                        <th onClick={() => sortData('college_address')}>College Address</th>
                        <th onClick={() => sortData('college_website')}>College Website</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.chapter_name}</td>
                            <td>{item.chapter_location}</td>
                            <td>{item.chapter_head}</td>
                            <td>{item.chapter_members}</td>
                            <td>{item.email}</td>
                            <td>{item.college_estd}</td>
                            <td>{item.college_name}</td>
                            <td>{item.college_address}</td>
                            <td>{item.college_website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default Chaptersdata;