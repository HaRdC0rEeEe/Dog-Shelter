import styled from "styled-components";

export const PageContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;
min-height: 100vh;
width: 100%;
align-items: center;
background-color: #64766a;
`;

export const DogList = styled.div`
display: flex;
flex-direction: column;
width: 500px;
background: transparent;

`;

export const DogItem = styled.div`
display: flex;
height: 45px;
padding: 0 15px;
align-items: center;
justify-content: space-between;
background-color: #f4f2f3;
&:nth-child(even) {
        background-color: #c0a9bd;
    }
`;

//přestylujeme doglist
export const DogForm = styled(DogList)`
flex-direction: row;
margin: 50px 0;
padding-top: 0;
justify-content: space-between;
align-items: center;
`;

export const Input = styled.input`
width: 130px;
height: 25px;
padding-left: 10px;

`;

export const Button = styled.button`
width: 130px;
height: 25px;
`;
