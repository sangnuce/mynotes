class Notes extends React.Component {
  constructor() {
    super();
    this.state = {notes: []};
  }

  componentWillMount() {
    this.setState({notes: this.props.notes});
  }

  render(){
    return (
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Time</th>
            <th>Content</th>
            <th>Status</th>
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
    );
  }
}
