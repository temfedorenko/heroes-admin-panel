import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "../../actions";
import { activeFilterChanged } from "./filtersSlice";
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { activeFilter, filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Помилка завантаження</h5>;
  }

  const renderFiltersBtns = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фільтри поки що відсутні</h5>;
    }

    let filterClassName;
    const commonClassName = "btn btn-";

    return arr.map(({ id, name, label }) => {
      switch (name) {
        case "all":
          filterClassName = `${commonClassName}outline-dark`;
          break;
        case "fire":
          filterClassName = `${commonClassName}danger`;
          break;
        case "water":
          filterClassName = `${commonClassName}primary`;
          break;
        case "wind":
          filterClassName = `${commonClassName}success`;
          break;
        case "earth":
          filterClassName = `${commonClassName}secondary`;
          break;
        default:
          filterClassName = commonClassName;
          break;
      }

      return (
        <button
          key={id}
          className={
            activeFilter === name
              ? filterClassName + " active"
              : filterClassName
          }
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const filterBtns = renderFiltersBtns(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Фільтрувати героїв за елементами</p>
        <div className="btn-group">{filterBtns}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
