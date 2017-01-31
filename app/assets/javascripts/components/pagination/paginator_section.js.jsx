class PaginatorSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let {currentPage, totalPages} = this.props;

    let previous = '';
    if(currentPage > 1){
      previous = <li key={0}>
        <PaginatorLink pageNumber={currentPage - 1}
          displayText={I18n.t("pagination.previous")}
          onPaginatorLinkClick={this.handleClick} />
      </li>;
    }

    let next = '';
    if(currentPage < totalPages){
      next = <li key={totalPages + 1}>
        <PaginatorLink pageNumber={currentPage + 1}
          displayText={I18n.t("pagination.next")}
          onPaginatorLinkClick={this.handleClick} />
      </li>;
    }

    let pages = '';
    if(totalPages > 1) {
      pages = [...Array(totalPages).keys()].map((index) => {
        let page = index + 1;
        let className = (page == currentPage) ? 'active' : '';
        return <li key={page} className={className}>
          <PaginatorLink pageNumber={page} displayText={page}
            onPaginatorLinkClick={this.handleClick} />
        </li>;
      });
    }

    return (
      <ul className="pagination">
        {previous}
        {pages}
        {next}
      </ul>
    );
  }

  handleClick(pageNumber) {
    this.props.onPaginate(pageNumber);
  }
}
