import React, { useContext, useState, useEffect } from 'react';
import swal from 'sweetalert';

import { SearchTableNew } from '../../../utils/SearchTableNew.component';
import AddUsersAdminModal from '../../modal/AddUsersAdminModal';

import {
  GET_ADMIN_USERS,
  POST_NEW_ADMIN_USERS,
  DELETE_NEW_ADMIN_USERS,
  ADD_USER_ERROR,
  REMOVE_USER_ERROR,
} from '../../../context/types';

import AdminContext from '../../../context/admin/adminContext';

import { CUSTOMER } from '../../../constants/index';

// Import Modal Utility Functions

import {
  getStatusBadge,
  getAdminStatusBadge,
  getIPBadge,
} from '../../../utils/admin/admindataModalsUtils';

const MetadataTagsCard = () => {
  const adminContext = useContext(AdminContext);

  const { logData, getUsersLogs, removeUsersLogs } = adminContext;
  const [adminusers, setAdminUsers] = useState([]);
  useEffect(() => {
    getUsersLogs();
    return () => {
      removeUsersLogs();
    };
  }, []);
  useEffect(() => {
    setLogs(logData);
    // console.log(`use effect add user the value ${adminUsers}`);
  }, [logData]);

  //Changed the below useeffect for relevant variables

  const [logsdata, setLogs] = useState([]);

  const [loading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });
  // Card Configuration
  const configMetadata = {
    cardHeader: 'User Logs Data',
    type: 'admin-users',

    errorname: 'errors',

    tableheaderName: 'Datatable Of Users Logs',
    metadatatypeFilter: 'logs',
  };

  const {
    cardHeader,
    type,
    getDispatch,
    deleteDispatch,
    errorDispatch,
    errorname,
    modalname,
    tableheaderName,
    metadatatypeFilter,
    modalHeaderName,

    addButtonValue,
    modalButtonAttribute,
  } = configMetadata; //ConfigMetadata Destrucutring

  const setLoadingModal = () => {
    setLoading({
      isModalOpen: true,
      buttonLoading: true,
    });
  };

  const removeLoadingModal = () => {
    setLoading({
      isModalOpen: true,
      buttonLoading: false,
    });
  };

  const COLUMNS = [
    {
      Header: `Log Date`,
      Footer: `Log Date`,
      accessor: 'logDate',
      sticky: 'left',
    },

    {
      Header: `User Name`,
      Footer: `User Name`,
      accessor: 'username',
      sticky: 'left',
    },
    {
      Header: 'IP',
      Footer: 'IP',
      accessor: 'ip',
      Cell: ({ value }) => {
        return getIPBadge(value);
      },
    },
    {
      Header: 'URL Path',
      Footer: 'URL Path',
      accessor: 'path',
      sticky: 'left',
    },
    {
      Header: 'Request Method',
      Footer: 'Request Method',
      accessor: 'requestMethod',
      sticky: 'left',
    },
    {
      Header: 'User Agent',
      Footer: 'User Agent',
      accessor: 'userAgent',
      sticky: 'left',
    },
  ];

  return (
    <>
      <div className="row mt-2">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div
            className={
              CUSTOMER === 'KLA'
                ? 'card card-outline card-success'
                : 'card card-outline card-danger'
            }
          >
            <div className="card-header" style={{ backgroundColor: 'white' }}>
              <h3 className="card-title">
                {CUSTOMER === 'KLA' ? cardHeader : cardHeader}
              </h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="maximize"
                >
                  <i className="fas fa-expand"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
              {/* /.card-tools */}
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <SearchTableNew
                tableHeaderName={tableheaderName}
                CUSTOMER={CUSTOMER}
                columns_table={COLUMNS}
                loading={loading}
                table_data={logsdata}
                MetadataType={metadatatypeFilter}
                sear
              />

              {/* <TableSectionSpeakers
                tableHeaderName="DATATABLE OF ADDED SPEAKERS"
                customer={CUSTOMER}
                tableHeader={TABLE_HEADER_SPEAKER}
                loading={loading}
              /> */}
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
};

export default MetadataTagsCard;
