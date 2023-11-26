import React, { useEffect, useState } from "react";

function SelectMp(props) {
  const roles = [
    { key: "Client", id: "63848bccf033e05cb684ec69" },
    { key: "User", id: "63848bccf033e05cb684ec69" },
    { key: "Admin", id: "63848bccf033e05cb684ec69" },
  ];
  const [active, setActive] = useState("Select Your Role");
  const [searchText, setSearchText] = useState("");
  const [sarr, setSarr] = useState([...roles]);

  function openSelect(e) {
    const csb = e.target.offsetParent.lastChild.lastChild;
    // const sb = document.getElementsByClassName("search-box")[0];
    // if (sb.classList.contains("search-box-show")) {
    //   sb.classList.remove("search-box-show");
    // } else {
    //   sb.classList.add("search-box-show");
    // }
    if (csb.classList.contains("search-box-show")) {
      csb.classList.remove("search-box-show");
    } else {
      csb.classList.add("search-box-show");
    }
  }

  function onSelection(item, e) {
    // console.log(e.target.offsetParent)
    setActive(item.key);
    props.setRole(item);
    setSearchText("");
    // openSelect();
    const csb = e.target.offsetParent;
    if (csb.classList.contains("search-box-show")) {
      csb.classList.remove("search-box-show");
    } else {
      csb.classList.add("search-box-show");
    }
  }

  useEffect(() => {
    if (searchText.length > 0) {
      const arr = roles.filter(
        (item) => item.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      setSarr(arr);
    } else {
      setSarr([...roles]);
    }
  }, [searchText]);

  return (
    <div className="search-box-cont form-control">
      <button
        type="button"
        className="clickselect"
        onClick={(e) => openSelect(e)}
      ></button>
      <span>{active}</span>
      <span className="fa fa-angle-down"></span>
      <div className="search-box">
        <div>
          <input
            type="text"
            placeholder="type your search"
            className="form-control my-1"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        {sarr.map((item, i) => {
          return (
            <span
              className="custom-option"
              key={i * 12}
              onClick={(e) => onSelection(item, e)}
            >
              {item.key}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default SelectMp;
