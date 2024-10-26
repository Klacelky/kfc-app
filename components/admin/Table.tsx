import { ReactNode } from 'react';

export type TableProps<T extends { id: string }> = {
    columnNames: ([string, ReactNode] | string)[];
    getCols: (row: T) => ReactNode[];
    data?: T[];
    actions?: (row: T) => ReactNode;
};

export default function Table<T extends { id: string }>({ columnNames, getCols, data, actions }: TableProps<T>) {
    const columnKeys: string[] = columnNames.map((colName) => (Array.isArray(colName) ? colName[0] : colName));
    return (
        <div className="lg:table lg:table-auto w-full">
            <div className="lg:table-header-group bg-slate-500 text-white text-left">
                <div className="lg:table-row lg:border-none border-b-2">
                    {columnNames.map((colName) => {
                        const [key, name] = Array.isArray(colName) ? colName : [colName, colName];
                        return (
                            <div className="lg:table-cell p-3 border-slate-300 lg:border-b-2" key={key}>
                                {name}
                            </div>
                        );
                    })}
                    {actions && <div className="lg:table-cell p-3 border-slate-300 border-b-2" key="actions" />}
                </div>
            </div>
            {data?.map((row) => (
                <div className="lg:table-row lg:border-none border-slate-300 border-b-2" key={row.id}>
                    {getCols(row).map((col, colIndex) => (
                        <div
                            className="lg:table-cell p-2 border-slate-300 lg:border-b-2"
                            key={`${row.id}-${columnKeys[colIndex]}`}
                        >
                            {col}
                        </div>
                    ))}
                    {actions && (
                        <div className="lg:table-cell p-2 border-slate-300 lg:border-b-2">
                            <div className="flex flex-row">{actions(row)}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
