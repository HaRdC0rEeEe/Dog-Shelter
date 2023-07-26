import React, { useState, useEffect, useRef } from 'react';
import "./HomeStyles.css";
import { PageContainer, DogList, DogItem, DogForm, Input, Button } from './HomeStyle';
import { dogs } from "../../dogsData"


const Home = () => {
    //uložení proměné bez znovuvyrenderování komponenty
    const dogsCount = useRef(dogs.length);

    const [listOfDogs, setListOfDogs] = useState(dogs);
    const [valid, setValid] = useState(false);

    const [newDog, setNewDog] = useState({
        //když je délka více než 0 najdeme nejvyšší id
        // id: listOfDogs.length > 0 ? Math.max(...listOfDogs.map(dog => dog.id)) + 1 : 1,
        id: dogsCount.current + 1,
        name: "",
        age: "",
        race: ""

    });

    // useEffect(() => {
    //     console.log(listOfDogs);

    // }, [newDog])

    const validateData = (validateDog) => {
        if (validateDog.age === '' || parseInt(validateDog.age) < 0 || parseInt(validateDog) > 31)
            return setValid(false);
        if (validateDog.name.trim().length === 0)
            return setValid(false);
        if (validateDog.race.trim().length === 0)
            return setValid(false);
        return setValid(true);
    }


    function handleAdd() {

        setListOfDogs((listOfDogs) => {
            //vrácení nového listu + v něm newDog
            return [...listOfDogs, newDog];
        });

        //dogsCount.current se musí 2x inkrementovat, protože máme key nalinkovaný na id
        //takže v jeden moment budou dva keys se stejným id
        dogsCount.current++;
        //vyresetování dogga
        const updateDog = {
            id: dogsCount.current + 1,
            name: "",
            race: "",
            age: ""
        }
        setNewDog(updateDog);
        //buď tato funkce nebo spodní zakomentovaná, result je stejný
        //validateData(updateDog);
        setValid(false);
    }

    function handleChange(event) {
        //...newDog = objekt nového psa
        //ukládání nové proměné při psané do jednoho z inputů (podle input name = event.target.name)
        const updateDog = { ...newDog, [event.target.name]: event.target.value };
        setNewDog(updateDog);
        validateData(updateDog);
    }

    return (
        <PageContainer>
            <h1>Home</h1>

            <DogList name='dogList'>
                {
                    listOfDogs.map((dog) => {
                        return (
                            <DogItem key={dog.id}>
                                <p>
                                    {dog.name} / {dog.race} / {dog.age}
                                </p>
                            </DogItem>

                        )
                    })
                }

                <DogForm>
                    <Input
                        type="text"
                        placeholder="Jméno psa"
                        name='name'
                        value={newDog.name}
                        onChange={handleChange}
                    />

                    <Input
                        type="text"
                        placeholder="Rasa psa"
                        name='race'
                        value={newDog.race}
                        onChange={handleChange}
                    />

                    <Input
                        type="number"
                        placeholder="Věk psa"
                        name='age' min="0" max="31"
                        value={newDog.age}
                        onChange={handleChange}
                    />

                    <Button
                        disabled={!valid}
                        onClick={handleAdd}>
                        Přidat
                    </Button>

                </DogForm>

            </DogList>


        </PageContainer >
    );
}

export default Home;
