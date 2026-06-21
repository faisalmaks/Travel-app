"use client";

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            {columns.map(
              (column) => (
                <th
                  key={column}
                  className="p-3 text-left border"
                >
                  {column}
                </th>
              )
            )}

            <th className="p-3 border">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map(
            (item) => (
              <tr
                key={item._id}
              >
                {columns.map(
                  (
                    column
                  ) => (
                    <td
                      key={
                        column
                      }
                      className="p-3 border"
                    >
                      {Array.isArray(
                        item[
                          column
                        ]
                      )
                        ? item[
                            column
                          ].join(
                            ", "
                          )
                        : typeof item[
                            column
                          ] ===
                            "object" &&
                          item[
                            column
                          ] !==
                            null
                        ? JSON.stringify(
                            item[
                              column
                            ]
                          )
                        : String(
                            item[
                              column
                            ] ??
                              ""
                          )}
                    </td>
                  )
                )}

                <td className="p-3 border">

                  <button
                    onClick={() =>
                      onEdit(
                        item
                      )
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(
                        item._id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}