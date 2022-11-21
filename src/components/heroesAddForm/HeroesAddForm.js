import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../../hooks/http.hook";
import { heroAdded } from "../../actions";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescr, setHeroDescr] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const { filters } = useSelector((state) => state);
  const { request } = useHttp();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const hero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };

    request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(hero))
      .then(console.log("added"))
      .then(dispatch(heroAdded(hero)))
      .catch((error) => console.log(error));

    setHeroName("");
    setHeroDescr("");
    setHeroElement("");
  };

  const options = filters.slice(1).map(({ id, name, label }) => {
    return (
      <option key={id} value={name}>
        {label}
      </option>
    );
  });

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Імʼя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Як мене звати?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Опис
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Що я вмію?"
          style={{ height: "130px" }}
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Вибрати елемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}>
          <option>Я володію елементом</option>
          {options}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Створити
      </button>
    </form>
  );
};

export default HeroesAddForm;
