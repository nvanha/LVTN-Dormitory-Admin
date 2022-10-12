import React from 'react';
import { useRowSelect, useSortBy, useTable } from 'react-table';
import {
  CSChevronDownNavigational,
  CSChevronUpNavigational,
} from '~/components/iconography/Navigational';
import SkeletonCustom from '~/components/skeleton/SkeletonCustom';

const TableShowAll = ({
  columns, data, isLoading, onClickRow, isUseRowSelect = true,
}) => {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable(
    {
      columns,
      data: data || [],
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox
              className="form-check-input input-primary fs-5"
              {...getToggleAllRowsSelectedProps()}
            />
          ),
          Cell: ({ row }) => {
            if (row.original?.Role === 'OWNER') {
              return (
                <IndeterminateCheckbox
                  className="form-check-input input-primary fs-5"
                  {...row.getToggleRowSelectedProps()}
                />
              );
            }
            return (
              <IndeterminateCheckbox
                className="form-check-input input-primary fs-5"
                {...row.getToggleRowSelectedProps()}
              />
            );
          },
        },
        ...columns,
      ]);
    },
  );

  const ClickRow = (row) => {
    if (row?.column?.id === 'selection') return;
    if (onClickRow) onClickRow(row?.row?.original);
  };

  return (
    <div className={`table-pagination-wrapper ${!isUseRowSelect ? 'hidden-col-select' : ''}`}>
      <div className={`table-section ${isLoading ? 'disabled' : ''}`}>
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.id !== 'selection' && (
                      <span style={{ marginLeft: '5px' }}>
                        {column.isSorted ? (
                          !column.isSortedDesc ? (
                            <div
                              className="p-0"
                              style={{ verticalAlign: 'middle', width: '12px' }}
                            >
                              <CSChevronUpNavigational
                                customClassName="d-block"
                                styleInline={{ width: '12px', height: 'auto' }}
                              />
                            </div>
                          ) : (
                            <div
                              className="p-0"
                              style={{ verticalAlign: 'middle', width: '12px' }}
                            >
                              <CSChevronDownNavigational
                                customClassName="d-block"
                                styleInline={{ width: '12px', height: 'auto' }}
                              />
                            </div>
                          )
                        ) : (
                          <div
                            className="p-0"
                            style={{
                              verticalAlign: 'middle',
                              width: '12px',
                            }}
                          >
                            <CSChevronUpNavigational
                              customClassName="d-block"
                              styleInline={{ width: '7px', height: 'auto' }}
                            />
                            <CSChevronDownNavigational
                              customClassName="d-block"
                              styleInline={{ width: '7px', height: 'auto' }}
                            />
                          </div>
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {isLoading
              ? [...new Array(10)].map((item, index) => (
                <tr key={index}>
                  {[...new Array(columns?.length + 1)].map((item, index) => (
                    <td key={index}>
                      <SkeletonCustom length={1} width="100%" height="22px" />
                    </td>
                  ))}
                </tr>
              ))
              : rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        onClick={() => ClickRow(cell)}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);

export default TableShowAll;
