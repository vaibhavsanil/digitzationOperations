import React, { Fragment, useContext, useState, useEffect } from 'react';
import swal from 'sweetalert';

// Import Book Context

import BookContext from '../../context/book/bookContext';
import AuthContext from '../../context/auth/authContext';

import TableDashboardItems from '../dashboard/TableDashBoardItems';
import { SearchTableNewDashboard } from '../../utils/SearchTableDashboardNew';

import {
  modalHeaderBackColour,
  CUSTOMER,
  getBindedBadge,
  getStatusBadge,
  getTableActionItems,
  styleDashBoardCard,
  bookStateObject,
  removeclassbody,
  addclassbody,
} from '../../constants/index';

import AddBookModal from '../modal/AddBookModal.Component';

const TableDashboard = () => {
  useEffect(() => {
    removeclassbody('login-page');
    addclassbody('sidebar-mini');
  }, []);
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);

  const {
    bookSummaryTable,
    loading,
    deleteItem,
    addBookStruct,
    getBookStruct,
  } = bookContext;

  const { token } = authContext;

  useEffect(() => {
    getBookStruct();
  }, []);

  const [bookStruct, setBookStruct] = useState(bookStateObject);
  const [buttonloading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });

  // Initialize the Current Spekaer State

  const initSpeakerState = () => {
    // Intializing the Speaker State to Null
    setBookStruct(bookStateObject);
    setLoading({ buttonLoading: false });
  };

  const onChange = (e) =>
    setBookStruct({ ...bookStruct, [e.target.name]: e.target.value });

  const onChangeDate = (e) => {
    let dateVar = e.target.value;
    let dateVarRes = dateVar.split(',');

    console.info('[DEBUG] change date in ADD Book Action', dateVarRes);

    setBookStruct({
      ...bookStruct,
      dates_session: dateVarRes,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading({ buttonLoading: true });
    //const currentItemInstance = currentItem;
    // delete currentItem["last_modified_time"];
    // delete currentItem["modified_user"];
    // delete currentItem["_id"];

    addBookStruct(bookStruct).then((responseMsg) => {
      if (responseMsg === 'success') {
        initSpeakerState();
        swal(
          'Good job!',
          'The Book Has Been Successfully Added !!!',
          'success'
        );
      } else {
        initSpeakerState();
        swal(
          'Awww Snap !!!',
          'The Book was not added successfully!!! Please try again',
          'error'
        );
      }
    });
  };

  const COLUMNS_CUSTOMER = (customer) =>
    customer === 'KLA'
      ? [
          {
            Header: 'Book Id',
            Footer: 'Book Id',
            accessor: 'bookId',
            sticky: 'left',
          },

          {
            Header: 'Assembly Number',
            Footer: 'Assembly Number',
            accessor: 'assembly_number',
            sticky: 'left',
          },
          {
            Header: 'Session Number',
            Footer: 'Session Number',
            accessor: 'session_number',
            sticky: 'left',
          },
          {
            Header: 'Part Number',
            Footer: 'Part Number',
            accessor: 'part_number',
            //   Cell: ({ value }) => {
            //     return getTableItems(value);
            //   },
          },
          {
            Header: 'Number of Pages',
            Footer: 'Number of Pages',
            accessor: 'numofpages',
            //   Cell: ({ value }) => {
            //     return getTableItems(value);
            //   },
          },
          {
            Header: 'Book Status',
            Footer: 'Book Status',
            accessor: 'status_of_books',
            Cell: ({ value }) => {
              return getStatusBadge(value);
            },
          },
          {
            Header: 'Binding Status',
            Footer: 'Binding Status',
            accessor: 'binding_status',
            Cell: ({ value }) => {
              return getBindedBadge(value);
            },
          },
          {
            Header: 'Actions',
            Footer: 'Actions',
            accessor: '_id',
            Cell: ({ value }) => {
              return getTableActionItems(value);
            },
          },
        ]
      : [
          {
            Header: 'Book Id',
            Footer: 'Book Id',
            accessor: 'bookId',
            sticky: 'left',
          },
          {
            Header: 'Session Number',
            Footer: 'Session Number',
            accessor: 'session_number',
          },
          {
            Header: 'Part Number',
            Footer: 'Part Number',
            accessor: 'part_number',
            //   Cell: ({ value }) => {
            //     return getTableItems(value);
            //   },
          },
          {
            Header: 'Number of Pages',
            Footer: 'Number of Pages',
            accessor: 'numofpages',
            //   Cell: ({ value }) => {
            //     return getTableItems(value);
            //   },
          },
          {
            Header: 'Book Status',
            Footer: 'Book Status',
            accessor: 'status_of_books',
            Cell: ({ value }) => {
              return getStatusBadge(value);
            },
          },
          {
            Header: 'Binding Status',
            Footer: 'Binding Status',
            accessor: 'binding_status',
            Cell: ({ value }) => {
              return getBindedBadge(value);
            },
          },
          {
            Header: 'Actions',
            Footer: 'Actions',
            accessor: '_id',
            Cell: ({ value }) => {
              return getTableActionItems(value);
            },
          },
        ];

  return (
    <Fragment>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>335</h3>
                  <p>Number of Books Completed</p>
                </div>
                <div className="icon">
                  <i className="ion ion-ios-bookmarks" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>2,22,879</h3>
                  <p>OCR'ed Pages</p>
                </div>
                <div className="icon">
                  <i className="ion ion-ios-bookmarks" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>335</h3>
                  <p>Book's Binded</p>
                </div>
                <div className="icon">
                  <i className="ion ion-checkmark-circled" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>0</h3>
                  <p>Incomplete Metadata</p>
                </div>
                <div className="icon">
                  <i className="ion ion-sad" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Search Table New DashBoard */}
      <SearchTableNewDashboard
        customer={CUSTOMER}
        columns_table={COLUMNS_CUSTOMER(CUSTOMER)}
        table_data={bookSummaryTable}
        styleDashboardTable={styleDashBoardCard}
        cardHeaderColor={modalHeaderBackColour(CUSTOMER)}
      />

      <AddBookModal
        currentBookState={bookStruct}
        currentBookSetState={setBookStruct}
        onChange={onChange}
        onChangeDate={onChangeDate}
        onSubmit={onSubmit}
      />
    </Fragment>
  );
};

export default TableDashboard;
