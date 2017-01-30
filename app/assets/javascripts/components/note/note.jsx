class Note extends React.Component {
  render(){
    return(
      <tr>
        <td>{this.props.note.id}</td>
        <td>{this.props.note.title}</td>
        <td>{I18n.l("time.formats.default", this.props.note.time)}</td>
        <td>{this.props.note.content}</td>
        <td>{I18n.t(`notes.statuses.${this.props.note.status}`)}</td>
        <td><button className="btn btn-info">{I18n.t("buttons.edit")}</button></td>
        <td><button className="btn btn-danger">{I18n.t("buttons.delete")}</button></td>
      </tr>
    );
  }
};
