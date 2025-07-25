import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import { GlobalFilter } from "./GlobalFilter";

import "./SearchTableNew.scss";

export const SearchTableNewDashboard = ({
  tableHeaderName,
  CUSTOMER,
  columns_table,
  table_data,
  MetadataType,
  styleDashboardTable,
  cardHeaderColor,
}) => {
  //const columns = useMemo(() => COLUMNS, []);
  const columns = useMemo(() => columns_table, []);

  //console.log(columns);

  //const data = useMemo(() => table_data, []);
  const data = table_data;

  // console.log(
  //   `from Search Table New value of CUSTOMER:${CUSTOMER} & MetadataType : ${MetadataType}`
  // );

  //console.log(table_data);

  //const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,

    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },

    useGlobalFilter,

    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  function addMetadataGlobalFilter(customer, metadataType) {
    if (metadataType === "Speaker") {
      return customer === "KLA" ? "Speaker's" : "Chairman's";
    } else if (metadataType === "Member") {
      return customer === "KLA" ? "Member's" : "Member's";
    } else if (metadataType === "debateTitle") {
      return customer === "KLA" ? "Debate Title's" : "Debate Title's";
    } else if (metadataType === "portfolio") {
      return customer === "KLA" ? "Portfolio's" : "Portfolio's";
    } else if (metadataType === "issues") {
      return customer === "KLA" ? "Issues's" : "Issues's";
    } else if (metadataType === "tags") {
      return customer === "KLA" ? "Tag's" : "Tag's";
    } else if (metadataType === "books") {
      return customer === "KLA" ? "Book's" : "Book's";
    }
  }

  let searchTableName = addMetadataGlobalFilter(CUSTOMER, MetadataType);

  //console.log(searchTableName);

  const tableStyle = {
    display: "block",
    height: "400px",
    overflowY: "scroll",
    borderRadius: "2px",
  };

  return (
    <>
      {/* <div className="content-wrapper"> */}
      <div className="col-12">
        <section className="action-tables">
          <div className="row">
            <div className="col-12">
              <div className="card" style={styleDashboardTable}>
                <div className="card-header" style={cardHeaderColor}>
                  <h3
                    className="card-title"
                    style={{
                      marginTop: "6px",
                    }}
                  >
                    <b> {tableHeaderName} </b>{" "}
                  </h3>
                  {/* TODO- Conditional Rendering of Buttons for RED Clolour for KLC as per the passed props */}
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#modal-lg"
                    style={{
                      float: "right",
                      width: "158px",
                    }}
                  >
                    Add Book
                  </button>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                    metadata={searchTableName}
                  />
                  <table
                    // className="table table-hover table-condensed table-scrollable"
                    className="table table-bordered table-striped table-head-fixed text-center"
                    {...getTableProps()}
                    style={tableStyle}
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr
                          style={{
                            width: "100%",
                          }}
                          {...headerGroup.getHeaderGroupProps()}
                        >
                          {headerGroup.headers.map((column) => (
                            <th
                              style={{
                                width: "500px",
                              }}
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              {column.render("Header")}
                              <span style={{ display: "inline-block" }}>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    {rows.length !== 0 ? (
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    ) : (
                      <h6
                        style={{
                          textAlign: "center",
                          marginTop: "15px",
                        }}
                      >
                        Please Add a Book .....
                      </h6>
                    )}
                    {/* <tbody {...getTableBodyProps()}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody> */}
                    {/* <tfoot>
                      {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                          {footerGroup.headers.map((column) => (
                            <td {...column.getFooterProps()}>
                              {column.render("Footer")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tfoot> */}
                  </table>

                  {/* <table
                    id="example1"
                    className="table table-bordered table-striped"
                    {...getTableProps()}
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                          {footerGroup.headers.map((column) => (
                            <td {...column.getFooterProps()}>
                              {column.render("Footer")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tfoot>
                  </table> */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* Table Searchable Start with Filter */}
            </div>
          </div>
        </section>
      </div>
      {/* </div> */}
    </>
  );
};

SearchTableNewDashboard.defaultProps = {
  tableHeaderName: "Datatable of Added Speakers",
  customer: "KLA",
  columns_table: [],
  MetadataType: "books",
  tableHeaderName: "Datatable of the Books & Status",
};

SearchTableNewDashboard.propTypes = {
  tableHeaderName: PropTypes.string.isRequired,
  CUSTOMER: PropTypes.string.isRequired,
  columns_table: PropTypes.array.isRequired,
  table_data: PropTypes.array.isRequired,
  MetadataType: PropTypes.string.isRequired,
  styleDashboardTable: PropTypes.object.isRequired,
  cardHeaderColor: PropTypes.func.isRequired,
};
