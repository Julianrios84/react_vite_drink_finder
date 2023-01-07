import { useState, useEffect, createContext, useMemo } from 'react';
import axios from 'axios';

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [modal, setModal] = useState(false);
  const [drinkId, setDrinkId] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getRecipe = async () => {
      if (!drinkId) return;
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
        const { data } = await axios(url);
        setRecipe(data.drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [drinkId]);

  const consultDrinks = async (consult) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${consult.name}&c=${consult.category}`;
      const { data } = await axios(url);
      setDrinks(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleDrinkIdClick = (id) => {
    setDrinkId(id);
  };

  // const dataDrinks = useMemo(
  //   () => ({
  //     consultDrinks,
  //     drinks,
  //     handleModalClick,
  //     modal,
  //     handleDrinkIdClick,
  //     recipe,
  //     loading
  //   }),
  //   [
  //     consultDrinks,
  //     drinks,
  //     handleModalClick,
  //     modal,
  //     handleDrinkIdClick,
  //     recipe,
  //     loading
  //   ]
  // );

  return (
    <DrinksContext.Provider value={{
      consultDrinks,
      drinks,
      handleModalClick,
      modal,
      handleDrinkIdClick,
      recipe,
      loading
    }}>
      {children}
    </DrinksContext.Provider>
  );
};

export { DrinksProvider };
export default DrinksContext;
