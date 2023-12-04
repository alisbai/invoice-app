import { useState } from "react";
import "../styles/components/invoicesFilterMenu.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function InvoicesFilterMenu({
  visible,
  filterOptions,
  updateFilterBy,
}) {
  const [filterOptionsState, setFilterOptionsState] = useState(
    filterOptions.map((filterOption) => {
      return {
        option: filterOption,
        checked: true,
      };
    })
  );

  const toggleFilterOptionsState = (index) => {
    const newFilterOptionsState = filterOptionsState.map((filterOption) => {
      return {
        option: filterOption.option,
        checked: filterOption.checked,
      };
    });
    newFilterOptionsState[index].checked =
      !newFilterOptionsState[index].checked;
    setFilterOptionsState(newFilterOptionsState);
  };

  const handleClick = (index) => {
    toggleFilterOptionsState(index);
  };

  useEffect(() => {
    //update state of filter by.
    const newFilterBy = filterOptionsState
      .filter((option) => option.checked)
      .map((option) => option.option);
    updateFilterBy(newFilterBy);
  }, [filterOptionsState]);

  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`invoices-filter-menu ${
        visible ? "invoices-filter-menu-visible" : "invoices-filter-menu-hidden"
      } ${
        lightSwitch
          ? "invoices-filter-menu-bright-mode"
          : "invoices-filter-menu-dark-mode"
      }`}
    >
      {filterOptionsState.map((filterOption, i) => (
        <div
          onClick={() => handleClick(i)}
          className="invoices-filter-option"
          key={i}
        >
          <input
            className="invoices-filter-checkbox"
            type="checkbox"
            checked={filterOption.checked}
          />
          {filterOption.option}
        </div>
      ))}
    </div>
  );
}
