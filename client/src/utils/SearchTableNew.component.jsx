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

//import MOCK_DATA from "./MOCK_DATA.json";
//import { COLUMNS, GROUPED_COLUMNS } from "./columns";

//import TableItems from "./TableItem.Components";

export const SearchTableNew = ({
  tableHeaderName,
  CUSTOMER,
  columns_table,
  table_data,
  MetadataType,
  number_sections,
}) => {
  //const columns = useMemo(() => COLUMNS, []);
  const columns = useMemo(() => columns_table, []);

  //const data = useMemo(() => table_data, []);
  const data = table_data;
  //console.log(columns);

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
    } else if (metadataType === "annexure") {
      return "Annexure's";
    } else if (metadataType === "metadata") {
      return "Metadata ";
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
              <div className="card">
                <div className="card-header">
                  <h3
                    className="card-title"
                    style={{
                      marginTop: "6px",
                    }}
                  >
                    <b> {tableHeaderName} </b>{" "}
                  </h3>
                  {/* TODO- Conditional Rendering of Buttons for RED Clolour for KLC as per the passed props */}
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  {number_sections && number_sections > 0 ? (
                    <div className="row" style={{ display: "flex" }}>
                      <div className="col-5">
                        <h5>
                          Number of Section's in the Book: {number_sections}
                        </h5>
                      </div>
                      <div
                        className="col-7 mr-1"
                        style={{ marginBottom: "6px", marginLeft: "-15%" }}
                      >
                        <GlobalFilter
                          filter={globalFilter}
                          setFilter={setGlobalFilter}
                          metadata={searchTableName}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-8" style={{ marginLeft: "243px" }}>
                        <GlobalFilter
                          filter={globalFilter}
                          setFilter={setGlobalFilter}
                          metadata={searchTableName}
                        />
                      </div>
                    </div>
                  )}

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
                        There are no items in the Table ... Please Add One
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

SearchTableNew.defaultProps = {
  tableHeaderName: "Datatable of Added Speakers",
  customer: "KLA",
  columns_table: [],
};

SearchTableNew.propTypes = {
  tableHeaderName: PropTypes.string.isRequired,
  CUSTOMER: PropTypes.string.isRequired,
  columns_table: PropTypes.array.isRequired,
  table_data: PropTypes.array.isRequired,
  number_sections: PropTypes.number,
  MetadataType: PropTypes.string.isRequired,
};
