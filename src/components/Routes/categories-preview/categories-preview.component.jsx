import { Fragment} from 'react';
import CategoryPreview from '../../category-preview/category-preview.component'
import Spinner from '../../spinner/spinner.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategorisIsLoading } from '../../../store/categories/categories.selector';

const CategoriesPreview= () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategorisIsLoading);

    return (
        <Fragment>
        {isLoading ? (<Spinner />):
            (Object.keys(categoriesMap).map( (title) =>{
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                );
            }))}
        </Fragment>
 );
 };

export default CategoriesPreview;