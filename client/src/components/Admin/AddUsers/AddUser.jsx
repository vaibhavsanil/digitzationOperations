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
} from '../../../utils/admin/admindataModalsUtils';

const MetadataTagsCard = () => {
  const adminContext = useContext(AdminContext);

  const {
    adminUsers,
    logData,
    currentUser,
    errors,
    getUsersAdmin,
    registerUser,
    deleteUser,
    clearErrors,
  } = adminContext;
  const [adminusers, setAdminUsers] = useState([]);
  useEffect(() => {
    getUsersAdmin();
  }, []);
  useEffect(() => {
    setAdminUsers(adminUsers);
    // console.log(`use effect add user the value ${adminUsers}`);
  }, [adminUsers]);

  //Changed the below useeffect for relevant variables

  const [currentItem, setCurrentItem] = useState({
    name: '',
    admin_status: false,
    email: '',
    password: '',
    password1: '',
    phonenumber: '',
  });

  const [loading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });
  // Card Configuration
  const configMetadata = {
    cardHeader: 'Add Users/Admin',
    type: 'admin-users',
    getDispatch: GET_ADMIN_USERS,
    errorDispatch: ADD_USER_ERROR,
    deleteDispatch: DELETE_NEW_ADMIN_USERS,
    errorname: 'errors',
    modalname: 'addUserAdmin',
    tableheaderName: "Datatable Of Added Users's",
    metadatatypeFilter: 'users',
    modalHeaderName: "ADD/EDIT Users's",

    addButtonValue: 'Add Users',
    modalButtonAttribute: 'Users',
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

  const onChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const initState = () => {
    // Intializing the Speaker State to Null
    setCurrentItem({
      name: '',
      admin_status: false,
      email: '',
      password: '',
      password1: '',
      phonenumber: '',
    });
    setLoading({ buttonLoading: false });
  };

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

  const AddEditItemFunc = async () => {
    setLoadingModal();

    // Register the user
    try {
      const res = await registerUser(currentItem);
      if (res.msg === 'success') {
        removeLoadingModal();

        swal(`${res.user.email} has been registered`, {
          icon: 'success',
        });
      } else {
        removeLoadingModal();
        // swal.fire(`Error in User`, getErrorDetails(error), `error`);
        const errorText = getErrorDetails(res);

        swal(`ERROR ${errorText}`, {
          icon: 'error',
        });
      }
      // console.info(`[DEBUG] from AddUser ${JSON.stringify(res)}`);
    } catch (error) {}
  };

  function getErrorDetails(err) {
    const errElements = ['msg', 'email', 'name', 'password', 'password1'];
    let returnString = [];
    for (const item in err) {
      if (errElements.includes(item)) {
        returnString.push(err[item]);
      } else {
        returnString.push('No errors found');
      }
    }
    let errorText = returnString.join(' ');
    return errorText;
  }

  const DeleteItemUser = (id, name) => {
    // console.info(`[DEBUG] from ADD USER delete item ${name}`);
    // let user = adminusers.filter((val) => val._id === id);

    swal({
      title: `Are you sure you want to delete ${name} ?`,
      text: 'Once deleted, you will not be able to recover this Account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await deleteUser(id);

          // console.info(
          //   `[DEBUG] From Delete Item User ${JSON.stringify(res.data)}`
          // );

          if (res.data.msg === 'success') {
            swal(`${name}  has been deleted !!!`, {
              icon: 'success',
            });
          } else {
            swal(
              `Poof! ${name} cannot be deleted .Contact System Administrator   `,
              {
                icon: 'error',
              }
            );
          }
        } catch (err) {}
      } else {
        swal(` ${name}  is safe!`);
      }
    });
  };

  const getAdminTableItems = (_id, name) => {
    // const modal = `#${modalName}-modal-metadata`;
    return (
      <button
        type="button"
        className="btn btn-link"
        onClick={(e) => DeleteItemUser(_id, name)}
      >
        Delete
      </button>
    );
  };

  const COLUMNS = [
    {
      Header: `e-Mail`,
      Footer: `e-Mail`,
      accessor: 'email',
      sticky: 'left',
    },

    {
      Header: `User Name`,
      Footer: `User Name`,
      accessor: 'name',
      sticky: 'left',
    },
    {
      Header: 'Status',
      Footer: 'Status',
      accessor: 'admin_status',
      Cell: ({ value }) => {
        return getAdminStatusBadge(value);
      },
    },
    {
      Header: 'Actions',
      Footer: 'Actions',
      accessor: '_id',
      Cell: (props) => {
        // console.log(props);
        return getAdminTableItems(props.value, props.cell.row.original.name);
      },
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
                  className={
                    CUSTOMER === 'KLA'
                      ? 'btn btn-outline-success mr-2'
                      : 'btn btn-outline-danger mr-2'
                  }
                  data-toggle="modal"
                  data-target={`#admin-modal-metadata`}
                  onClick={() => {
                    console.log('The Add User Called !!!');
                  }}
                >
                  {CUSTOMER === 'KLA' ? addButtonValue : addButtonValue}
                </button>
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
                table_data={adminUsers}
                MetadataType={metadatatypeFilter}
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

      <AddUsersAdminModal
        modalTitle={CUSTOMER === 'KLA' ? modalHeaderName : modalHeaderName}
        onChange={onChange}
        //speaker={speaker}

        loading={loading}
        //setSpeaker={setSpeaker}

        setLoading={setLoading}
        AddItem={(e) => AddEditItemFunc()}
        setCurrentItemsNull={(e) => {
          initState();
        }}
      />
    </>
  );
};

export default MetadataTagsCard;
