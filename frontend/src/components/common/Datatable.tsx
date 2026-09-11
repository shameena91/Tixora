import type { ReactNode } from "react";

export interface DataTableColumn<T> {
  
  id?:string;
  header: string;
  accessor: keyof T;
  render?: (value: unknown, row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
}

function DataTable<T>({
  data,
  columns,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id ??String(column.accessor)}
                  className="px-6 py-4 text-sm font-semibold text-gray-600"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.id ??String(column.accessor)}
                    className="px-6 py-4 text-sm text-gray-600"
                  >
                    {column.render
                      ? column.render(item[column.accessor], item)
                      : String(item[column.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;