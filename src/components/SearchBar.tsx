interface SearchBarProps {
  searchStr: string;
  todoStatus: string;
  searchTodo: SearchTodo;
  filterTodo: FilterTodo;
}

function SearchBar(props: SearchBarProps) {
  const { searchStr, todoStatus, searchTodo, filterTodo } = props;

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    filterTodo(button.name);
  };

  return (
    <>
      <div className='todo-form'>
        <input
          type='text'
          value={searchStr}
          className='search-input'
          placeholder='Search here...'
          onChange={(e) => searchTodo(e.target.value)}
        />
        <button
          name='all'
          className={`filter-button ${todoStatus === 'all' ? 'filter-button-active' : ''}`}
          onClick={buttonHandler}
        >
          All
        </button>
        <button
          name='done'
          className={`filter-button ${todoStatus === 'done' ? 'filter-button-active' : ''}`}
          onClick={buttonHandler}
        >
          Hoàn thành
        </button>
        <button
          name='notDone'
          className={`filter-button ${todoStatus === 'notDone' ? 'filter-button-active' : ''}`}
          onClick={buttonHandler}
        >
          Chưa hoàn thành
        </button>
      </div>
    </>
  );
}

export default SearchBar;
