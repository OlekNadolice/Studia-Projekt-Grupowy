import { createGlobalStyle } from "styled-components";

interface GlobalStyleProps {
  theme: {};
}

const GlobalCSS = createGlobalStyle<GlobalStyleProps>`


body { 
     font-family: 'Roboto', sans-serif;
     overflow-x:hidden;
   
  
    
  
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style-type: none;
}

a {
    text-decoration: none;
    
}

label {
    text-transform: capitalize;
    font-size: 1rem;
  }


  h1 {
    font-size:45px;
  }


  img {
    width:100%;
    object-fit:cover;
    height:100%;
  }


`;

export default GlobalCSS;
