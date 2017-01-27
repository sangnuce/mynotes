class Note extends React.Component {
  render(){
    return(
      <tr>
        <td>{this.props.note.id}</td>
        <td>{this.props.note.title}</td>
        <td>{this.props.note.time}</td>
        <td>{this.props.note.content}</td>
        <td>{this.props.note.status}</td>
        <td><button className="btn btn-info">Edit</button></td>
        <td><button className="btn btn-danger">Delete</button></td>
      </tr>
    );
  }
};
