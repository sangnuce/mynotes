class Note extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return(
      <tr>
        <td>{this.props.note.id}</td>
        <td>{this.props.note.title}</td>
        <td>{I18n.l("time.formats.default", this.props.note.time)}</td>
        <td>{this.props.note.content}</td>
        <td>{I18n.t(`notes.statuses.${this.props.note.status}`)}</td>
        <td><button className="btn btn-info">{I18n.t("buttons.edit")}</button></td>
        <td><button className="btn btn-danger"
          onClick={this.handleDelete}>{I18n.t("buttons.delete")}</button></td>
      </tr>
    );
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
};
