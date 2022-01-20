import React, { useCallback, useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { debounce, pickBy } from 'lodash';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {
    const { data: people, meta, filtered, attributes } = props.users;
    const [pageNumber, setPageNumber] = useState([]);
    const [params, setParams] = useState(filtered);

    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('users.index'),
                { ...pickBy(query), page: query.q ? 1 : query.page },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            )
        }, 150)
        ,
        []
    );

    useEffect(() => reload(params), [params]);
    useEffect(() => {
        let numbers = [];
        for (let i = attributes.per_page; i <= attributes.total / attributes.per_page; i = i + attributes.per_page) {
            numbers.push(i)
        }
        setPageNumber(numbers);
    }, [])

    const onChange = (event) => setParams({ ...params, [event.target.name]: event.target.value })
    const sort = (item) => {
        setParams({
            ...params,
            field: item,
            direction: params.direction == 'asc' ? 'desc' : 'asc'
        })
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end">
                        <div className="w-1/2">
                            <div className="flex items-center justify-end gap-x-2 mb-6">
                                <select name="load" id="load" onChange={onChange} value={params.load} className="rounded-lg border-gray-300 focus:ring-blue-200 focus:ring transition duration-150 ease-in form-select">
                                    {pageNumber.map((page, index) => <option key={index}>
                                        {page}
                                    </option>)}
                                </select>
                                <div className="flex items-center gap-x-2 bg-white px-2 rounded-lg border-gray-300 focus-within:ring-blue-200 focus-within:ring border focus-within:border-blue-400 transition duration-150 ease-in">
                                    <svg className="w-5 h-5 inline text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    <input type="text" name="q" id="q" onChange={onChange} value={params.q} className="border-0 focus:ring-0 form-text w-full" />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    #
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('name')}>
                                                        Name

                                                        {params.direction == 'asc' ?
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                                            :
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                        }
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                     <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('username')}>
                                                        Username

                                                        {params.direction == 'asc' ?
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                                            :
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                        }
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                     <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('email')}>
                                                        Email

                                                        {params.direction == 'asc' ?
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                                            :
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                        }
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                     <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('address')}>
                                                        Address

                                                        {params.direction == 'asc' ?
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                                            :
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                        }
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                     <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('created_at')}>
                                                        Joined

                                                        {params.direction == 'asc' ?
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                                            :
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                        }
                                                    </div>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {people.map((person, index) => (
                                                <tr key={person.email}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {meta.from + index}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {person.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {person.username}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {person.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {person.address}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {person.joined}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="flex items-center gap-x-1 mt-10">
                        {meta.links.map((item, index) => (
                            <button
                                key={index}
                                disabled={item.url == null ? true : false}
                                className={`${item.url == null ? 'text-gray-500 cursor-default' : 'text-gray-800'} w-12 h-9 rounded-lg flex items-center justify-center border bg-white`}
                                onClick={() => setParams({ ...params, page: new URL(item.url).searchParams.get('page') })}
                            >
                                {item.label}
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
        </Authenticated>
    );
}