import React from "react";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h2 className="mb-3">Search Rooms</h2>
            <div className="form-group">
              <label htmlFor="location_field">Location</label>
              <input
                type="text"
                className="form-control"
                id="location_field"
                placeholder="new york"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="guest_field">No. of Guests</label>
              <select className="form-control" id="guest_field" value="">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="room_type_field">Room Type</label>
              <select className="form-control" id="room_type_field" value="">
                <option>King</option>
                <option>Single</option>
                <option>Twins</option>
              </select>
            </div>

            <button type="submit" className="btn btn-block py-2">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
