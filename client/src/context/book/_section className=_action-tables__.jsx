<section className="action-tables">
  <div className="row">
    <div className="col-12">
      {/* Table Searchable Start with Filter */}
      <div className="card" style={styleDashBoard}>
        <div className="card-header" style={modalHeaderBackColour(CUSTOMER)}>
          <h3
            className="card-title"
            style={{
              marginTop: "6px",
            }}
          >
            <b> Datatable of the Books & Status</b>{" "}
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
          <table
            id="example1"
            className="table table-bordered table-striped table-head-fixed text-center"
          >
            <thead>
              <tr>
                <th>Book Id</th>
                <th>Assembly Number</th>
                <th>Session Number</th>
                <th>Page Count</th>
                <th>Section Count</th>
                <th>Status</th>
                <th>Binding Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookSummaryTable !== null &&
              bookSummaryTable.length === 0 &&
              !loading ? (
                <h4>Please add a Book</h4>
              ) : (
                bookSummaryTable.map((bookItem) => (
                  <TableDashboardItems
                    bookItem={bookItem}
                    deleteItem={deleteItem}
                  />
                ))
              )}
            </tbody>
            {/* <tfoot>
                    <tr>
                      <th>Rendering engine</th>
                      <th>Browser</th>
                      <th>Platform(s)</th>
                      <th>Engine version</th>
                      <th>CSS grade</th>
                    </tr>
                  </tfoot> */}
          </table>
        </div>
        {/* /.card-body */}
      </div>
      {/* /.card */}
      {/* Table Searchable Start with Filter */}
    </div>
  </div>
  {/* Modal Open */}
</section>;
