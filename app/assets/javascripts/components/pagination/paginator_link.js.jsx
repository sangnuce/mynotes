class PaginatorLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <a href="#" onClick={this.handleClick}>{this.props.displayText}</a>;
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onPaginatorLinkClick(this.props.pageNumber);
  }
}
