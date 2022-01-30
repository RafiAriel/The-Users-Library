import styled from 'styled-components';

export const CustomWrapper = styled.div`
  margin: 0 auto;
  padding: 0 200px;
  top: 110px;
  position:relative;
  text-align:center;
  text-transform:capitalize;

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: 18px;

  }
  
  td,th {
    border: 1px solid #0c0b0b;
    text-align: left;
    padding: 10px;
    width: 100%;
  }

  tr:nth-child(even) {
    background-color: #ffffff;

  }

  img
  {
      margin-left: auto;
      margin-right: auto;    
  }

  .btn
  {
    margin: 3%;
  }

  
`;
