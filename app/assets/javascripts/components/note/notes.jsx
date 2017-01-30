class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      current_page: 0,
      total_pages: 0
    };
    this._handleAddNote = this._handleAddNote.bind(this);
    this._getDataFromServer = this._getDataFromServer.bind(this);
  }

  componentWillMount() {
    this._getDataFromServer();
  }

  render() {
    return (
      <div className="notes">
        <div className="head">
          <h2 className="title pull-left">{I18n.t("notes.index.title")}</h2>
          <button className="btn btn-primary"
            id="collapse_btn" data-toggle="collapse"
            data-target="#collapsible_form">{I18n.t("buttons.add")}</button>
          <div className="collapse" id="collapsible_form">
            <NoteForm handleNewRecord={this._handleAddNote}
              url={this.props.url} statuses={this.props.statuses} />
          </div>
        </div>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>{I18n.t("notes.table.id")}</th>
              <th>{I18n.t("notes.table.title")}</th>
              <th>{I18n.t("notes.table.time")}</th>
              <th>{I18n.t("notes.table.content")}</th>
              <th>{I18n.t("notes.table.status")}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.notes.map((note) => {
              return <Note key={note.id} note={note} />
            })}
          </tbody>
        </table>
        <div className="foot">
          <PaginatorSection currentPage={this.state.current_page}
            totalPages={this.state.total_pages}
            onPaginate={this._getDataFromServer} />
        </div>
      </div>
    );
  }

  _handleAddNote(){
    $("#collapse_btn").trigger('click');
    this._getDataFromServer(this.state.current_page);
  }

  _getDataFromServer(page = 1){
    this.setState({notes: []});
    $.get({
      url: this.props.url + '/?page=' + page,
      dataType: 'JSON',
      success: (data) => {
        data.current_page = page;
        this.setState(data);
      }
    });
  }
}
