class PaginatorLink extends React.Component {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    return <a href="#" onClick={this._handleClick}>{this.props.displayText}</a>;
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.onPaginatorLinkClick(this.props.pageNumber);
  }
}
