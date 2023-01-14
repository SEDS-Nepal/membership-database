import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/alldetails/';

function Membersdata() {
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
                        <th onClick={() => sortData('first_name')}>First Name</th>
                        <th onClick={() => sortData('middle_name')}>Middle Name</th>
                        <th onClick={() => sortData('last_name')}>Last Name</th>
                        <th onClick={() => sortData('email')}>Email</th>
                        <th onClick={() => sortData('personsid')}>Persons ID</th>
                        <th onClick={() => sortData('city')}>City</th>
                        <th onClick={() => sortData('province')}>Province</th>
                        <th onClick={() => sortData('postal_code')}>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.middle_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.city}</td>
                            <td>{item.province}</td>
                            <td>{item.postal_code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default Membersdata;