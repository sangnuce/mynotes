class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      time: '',
      content: '',
      status: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
    return (
      <div className="row">
        <form className="col col-md-12" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">{I18n.t("notes.form.title")}</label>
            <input id="title" type="text" name="title" className="form-control"
              value={this.state.title} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="time">{I18n.t("notes.form.time")}</label>
            <input id="time" type="text" name="time"
              className="form-control datetimepicker"
              value={this.state.time} onBlur={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="content">{I18n.t("notes.form.content")}</label>
            <textarea id="content" name="content" value={this.state.content}
              className="form-control vresize" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="status">{I18n.t("notes.form.status")}</label>
            <select id="status" name="status" value={this.state.status}
              onChange={this.handleChange} className="form-control">
              <option key={this.props.statuses.length}
                value="">{I18n.t("notes.form.choose_status")}</option>
              {this.props.statuses.map((status, index) => {
                return <option key={index}
                  value={status}>{I18n.t(`notes.statuses.${status}`)}</option>;
              })}
            </select>
          </div>
          <button className="btn btn-primary" type="submit"
            disabled={!this.formValid()}>{I18n.t("buttons.save")}</button>
        </form>
      </div>
    );
  }

  handleChange(e){
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  formValid(){
    return this.state.title && this.state.time &&
      this.state.content && this.state.status != '';
  }

  handleSubmit(e){
    e.preventDefault();
    $.post({
      url: this.props.url,
      dataType: 'JSON',
      data: {note: this.state},
      success: (data) => {
        this.props.handleNewRecord();
        this.setState({
          title: '',
          time: '',
          content: '',
          status: ''
        });
      }
    });
  }
}
