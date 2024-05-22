import { useNavigate } from 'react-router-dom';
import {BackggroundImage, Body, DirectoryItemContainer} from'./directory-item.styles.jsx'

const DirectoryItem = ({category}) =>{

    const {imageUrl, title, route} = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
    return (

    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackggroundImage style={{
        backgroundImage: `url(${imageUrl})`
      }}/>
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
      </DirectoryItemContainer>
    )

}

export default DirectoryItem;