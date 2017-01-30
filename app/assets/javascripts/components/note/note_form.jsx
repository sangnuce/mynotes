class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      time: '',
      content: '',
      status: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render(){
    return (
      <div className="row">
        <form className="col col-md-12" onSubmit={this._handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">{I18n.t("notes.form.title")}</label>
            <input id="title" type="text" name="title" className="form-control"
              value={this.state.title} onChange={this._handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="time">{I18n.t("notes.form.time")}</label>
            <input id="time" type="text" name="time"
              className="form-control datetimepicker"
              value={this.state.time} onBlur={this._handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="content">{I18n.t("notes.form.content")}</label>
            <textarea id="content" name="content" value={this.state.content}
              className="form-control vresize" onChange={this._handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="status">{I18n.t("notes.form.status")}</label>
            <select id="status" name="status" value={this.state.status}
              onChange={this._handleChange} className="form-control">
              <option key={this.props.statuses.length}
                value="">{I18n.t("notes.form.choose_status")}</option>
              {this.props.statuses.map((status, index) => {
                return <option key={index}
                  value={status}>{I18n.t(`notes.statuses.${status}`)}</option>;
              })}
            </select>
          </div>
          <button className="btn btn-primary" type="submit"
            disabled={!this._form_valid()}>{I18n.t("buttons.save")}</button>
        </form>
      </div>
    );
  }

  _handleChange(e){
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  _form_valid(){
    return (this.state.title && this.state.time &&
      this.state.content && this.state.status != '');
  }

  _handleSubmit(e){
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
