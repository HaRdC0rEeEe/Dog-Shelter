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

export const Buttons = styled.button`
margin: 30px 0;

`;

export const TabButton = styled.button`


    text-align: center;

       font-size: 20px;
       padding: 10px;
    height: 100%;
    width: 48%;
    border: 1px solid white;
    color: black;
 
    cursor: pointer;
    background-color: transparent;

${(props) => {
        if (props.name === props['data-active'])
            return `
        background-color: rgba(255,255,255,0.3);
        `

    }
    }
`;

export const ShelterForm = styled(DogForm)`
    flex-direction: column;
`;