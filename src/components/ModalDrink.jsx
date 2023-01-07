import { Modal, Image } from 'react-bootstrap';
import useDrinks from '../hooks/useDrinks';

const ModalDrink = () => {
  const { modal, handleModalClick, recipe, loading } = useDrinks();

  const showIngredients = () => {
    let Ingredients = [];

    for (let i = 1; i < 16; i++) {
      if (recipe[`strIngredient${i}`]) {
        Ingredients.push(
          <li key={`${recipe.idDrink}-${recipe[`strIngredient${i}`]}`}>
            {recipe[`strIngredient${i}`]} {recipe[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return Ingredients;
  };

  return (
    !loading && (
      <Modal show={modal} onHide={handleModalClick}>
        <Image
          src={recipe.strDrinkThumb}
          alt={`Imagen receta ${recipe.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{recipe.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instructions</h2>
            {recipe.strInstructions}
            <h2>Ingredients and quantity</h2>
            {showIngredients()}
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};

export default ModalDrink;
