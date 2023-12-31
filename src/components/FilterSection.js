import styled from "styled-components";
import { useFilterContext } from "../context/FilterContextProvider";
import { FaCheck } from "react-icons/fa";
import PriceFormat from "./../Helper/PriceFormat";
import { Button } from "./../styles/Button";

function FilterSection() {
  const {
    filters: { text, color, price, max_price, min_price },
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((item) => item[property]);

    if (property === "colors") {
      // return (newVal = ["All", ...new Set([].concat(...newVal))]);
      newVal = newVal.flat();
    }
    return (newVal = ["all", ...new Set(newVal)]);
  };

  const onlyCategoryData = getUniqueData(all_products, "category");
  const onlyCompanyData = getUniqueData(all_products, "company");
  const onlyColorData = getUniqueData(all_products, "colors");
  // const onlyPriceData = getUniqueData(all_products, "price");

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {onlyCategoryData.map((item, index) => (
            <button
              type="button"
              key={index}
              name="category"
              value={item}
              onClick={updateFilterValue}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFilterValue}
          >
            {onlyCompanyData.map((item, index) => (
              <option key={index} name="company" value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-style">
          {onlyColorData.map((curr_color, index) => {
            if (curr_color === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  name="color"
                  value={curr_color}
                  className="color-all--style"
                  onClick={updateFilterValue}
                >
                  All
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                name="color"
                value={curr_color}
                style={{ backgroundColor: curr_color }}
                className={
                  curr_color === color ? "btnStyle active" : "btnStyle"
                }
                onClick={updateFilterValue}
              >
                {color === curr_color ? (
                  <FaCheck className="checkStyle" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter_price">
        <h3>Price</h3>
        <PriceFormat price={price} />
        <input
          type="range"
          name="price"
          min={min_price}
          max={max_price}
          value={price}
          onChange={updateFilterValue}
        />
        <div className="filter-clear">
          <Button className="filter-clear btn" onClick={clearFilters}>
            Clear Filter
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
