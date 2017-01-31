class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  render() {
    if(this.state.edit){
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.edit){
      $('.datetimepicker').datetimepicker({
        format: I18n.t('datetimepicker.formats.time')
      });
    }
  }

  handleDelete() {
    if(confirm(I18n.t("messages.confirm_delete"))) {
      $.ajax({
        url: this.props.url + '/' + this.props.note.id,
        type: 'DELETE',
        dataType: 'JSON',
        success: (data) => {
          alert(data.message);
          this.props.handleDeleteNote();
        },
        error: (data) => {
          alert(data.responseJSON.message);
        }
      });
    }
  }

  recordRow(){
    let time = '';
    if (this.props.note.time) {
      time = I18n.l("time.formats.default", this.props.note.time);
    }

    return(
      <tr>
        <td>{this.props.note.id}</td>
        <td>{this.props.note.title}</td>
        <td>{time}</td>
        <td>{this.props.note.content}</td>
        <td>{I18n.t(`notes.statuses.${this.props.note.status}`)}</td>
        <td><button className="btn btn-info"
          onClick={this.handleToggle}>{I18n.t("buttons.edit")}</button></td>
        <td><button className="btn btn-danger"
          onClick={this.handleDelete}>{I18n.t("buttons.delete")}</button></td>
      </tr>
    );
  }

  recordForm(){
    return(
      <tr>
        <td>{this.props.note.id}</td>
        <td>
          <input type="text" ref={(title) => {this.titleField = title;}}
            defaultValue={this.props.note.title} className="form-control" />
        </td>
        <td className="relative">
          <input type="text" ref={(time) => {this.timeField = time;}}
            defaultValue={this.props.note.time}className="form-control datetimepicker" />
        </td>
        <td>
          <textarea ref={(content) => {this.contentField = content;}}
            defaultValue={this.props.note.content} className="form-control vresize" />
        </td>
        <td>
          <select defaultValue={this.props.note.status} className="form-control"
            ref={(status) => {this.statusField = status;}}>
            <option key={this.props.statuses.length}
              value="">{I18n.t("notes.form.choose_status")}</option>
            {this.props.statuses.map((status, index) => {
              return <option key={index}
                value={status}>{I18n.t(`notes.statuses.${status}`)}</option>;
            })}
          </select>
        </td>
        <td><button className="btn btn-primary"
          onClick={this.handleUpdate}>{I18n.t("buttons.update")}</button></td>
        <td><button className="btn btn-default"
          onClick={this.handleToggle}>{I18n.t("buttons.cancel")}</button></td>
      </tr>
    );
  }

  handleToggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleUpdate(){
    let note = {
      title: this.titleField.value,
      time: this.timeField.value,
      content: this.contentField.value,
      status: this.statusField.value
    }

    $.ajax({
      url: this.props.url + '/' + this.props.note.id,
      type: 'PUT',
      dataType: 'JSON',
      data: {note: note},
      success: (data) => {
        this.setState({
          edit: false
        });
        this.props.handleUpdateNote();
      }
    });
  }
};
