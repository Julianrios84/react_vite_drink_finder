import axios from 'axios';
import { createContext, useEffect, useMemo, useState } from 'react';

const CategoriesContext = createContext();
const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { data } = await axios(url);
      setCategories(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getCategories();
  }, []);

  const data = useMemo(() => ({ categories }), [categories]);

  return (
    <CategoriesContext.Provider value={data}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesProvider };
export default CategoriesContext;
