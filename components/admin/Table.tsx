import { ReactNode } from 'react';

export interface TableProps<T extends { id: string }> {
    columnNames: ([string, ReactNode] | string)[];
    getCols: (row: T) => ReactNode[];
    data?: T[];
    actions?: (row: T) => ReactNode;
}

export default function Table<T extends { id: string }>({ columnNames, getCols, data, actions }: TableProps<T>) {
    const columnKeys: string[] = columnNames.map((colName) => (Array.isArray(colName) ? colName[0] : colName));
    return (
        <table className="table-auto w-full">
            <thead className="bg-slate-500 text-white text-left">
                <tr>
                    {columnNames.map((colName) => {
                        const [key, name] = Array.isArray(colName) ? colName : [colName, colName];
                        return (
                            <th className="p-3 border-b-admin-black border-b-2" key={key}>
                                {name}
                            </th>
                        );
                    })}
                    {actions ? <th className="p-3 border-b-admin-black border-b-2" key="actions" /> : null}
                </tr>
            </thead>
            <tbody>
                {data?.map((row) => (
                    <tr key={row.id}>
                        {getCols(row).map((col, colIndex) => (
                            <td className="p-2 border-admin-gray border-b-2" key={`${row.id}-${columnKeys[colIndex]}`}>
                                {col}
                            </td>
                        ))}
                        {actions ? (
                            <td className="p-2 border-admin-gray border-b-2">
                                <div className="flex flex-row">{actions(row)}</div>
                            </td>
                        ) : null}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
