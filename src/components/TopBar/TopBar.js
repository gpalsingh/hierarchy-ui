import { useState } from "react";

const TopBar = ({ employees, handleEmployeeClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState();

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    if (searchResults) {
      setSearchResults(null);
    }
  };

  const searchEmployees = (event) => {
    event.preventDefault();
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    setSearchResults(Object.entries(employees).filter(([_, employee]) => {
      const searchTermLower = searchTerm.toLowerCase();
      return [employee.label, employee.phone, employee.email].some(term => {
        if (typeof term !== 'string') {
          return false;
        }

        return term.toLowerCase().includes(searchTermLower);
      });
    }));
  };

  const handleClick = (event, id) => {
    event.preventDefault();
    setSearchResults(null);
    setSearchTerm('');
    handleEmployeeClick(id);
  };

  return <div className="navbar navbar-expand-lg navbar-light bg-light flex-end">
    <div className="container-fluid d-flex justify-content-end">
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          value={searchTerm}
          onChange={handleInput}
          placeholder="Name, phone or email"
        />
        <button
          onClick={searchEmployees}
          className="btn btn-outline-success"
        >
          Search
        </button>
        {searchResults &&
          <ul className="list-group position-absolute mt-5 shadow" style={{ zIndex: 999 }}>
            {
              searchResults.length === 0 ?
                <li className="list-group-item">No results found. Please refine your search</li> :
                <>
                  {searchResults.map(([id, employee]) => {
                    return <li
                      className="list-group-item"
                      key={id}
                      onClick={(e) => handleClick(e, id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {employee.label}
                    </li>;
                  })}
                </>
            }
          </ul>
        }
      </form>
    </div>
  </div>;
};

export default TopBar;