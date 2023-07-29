import React, { useState, useEffect, useRef } from 'react';
import "./HomeStyles.css";
import {
    PageContainer,
    DogList,
    DogItem,
    DogForm,
    Input,
    Button,
    Buttons,
    TabButton,
    ShelterForm
} from './HomeStyle';
import { dogs } from "../../dogsData"


const Home = () => {
    //uložení proměné bez znovuvyrenderování komponenty
    const dogsCount = useRef(dogs.length);

    const [listOfDogs, setListOfDogs] = useState(dogs);
    const [valid, setValid] = useState(false);
    const [activeTab, setActiveTab] = useState('list-of-dogs');
    //objekt
    const [shelterStorage, setShelterStorage] = useState({
        food: 35,
        vaccine: 15,
        pills: 20,
    });

    const [tempStorage, setTempStorage] = useState({
        food: "",
        vaccine: "",
        pills: "",
    });

    const [newDog, setNewDog] = useState({
        //když je délka více než 0 najdeme nejvyšší id
        // id: listOfDogs.length > 0 ? Math.max(...listOfDogs.map(dog => dog.id)) + 1 : 1,
        id: dogsCount.current + 1,
        name: "",
        age: "",
        race: ""

    });

    useEffect(() => {
        console.log(setNewDog);

    }, [setNewDog])

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
        let pushDog = false;
        const totalRequirements = {
            food: (dogRequirements.food * (listOfDogs.length + 1)),
            vaccine: (dogRequirements.vaccine * (listOfDogs.length + 1)),
            pills: (dogRequirements.pills * (listOfDogs.length + 1)),
        }

        if (totalRequirements.food <= shelterStorage.food &&
            totalRequirements.vaccine <= shelterStorage.vaccine &&
            totalRequirements.pills <= shelterStorage.pills)
            pushDog = true;

        if (pushDog) {

            // spread operátor (...) k vytvoření nového pole,
            // do kterého zkopíruje všechny prvky ze stávajícího seznamu psů.
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

            setValid(true);
        }
        else {
            alert("Nemůžeš přidat psa")
        }
    }

    function handleChange(event) {
        //...newDog = objekt nového psa
        //ukládání nové proměné při psané do jednoho z inputů (podle input name = event.target.name)
        const updateDog = { ...newDog, [event.target.name]: event.target.value };
        setNewDog(updateDog);
        validateData(updateDog);
    }

    function handleDelete(dogID) {
        setListOfDogs(
            listOfDogs.filter((dog) => {
                if (dogID !== dog.id)
                    return dog;
            })
        );
    }

    const handleStorage = (event) => {
        const input = event.target.value;
        const nameOfInput = event.target.name;
        //name: value
        //const [tempStorage, setTempStorage] = useState({
        //food: "",
        //vaccine: "",
        //pills: "",

        const updateStorage = { ...tempStorage, [nameOfInput]: input }

        setTempStorage(updateStorage);


    }

    const dogRequirements = {
        food: 5,
        vaccine: 1,
        pills: 2,
    };

    const updateStorage = () => {
        const storageValue = tempStorage;
        let newStorageValue = {};
        const keys = Object.keys(storageValue);


        keys.map((key) => {


            if (parseInt(storageValue[key])) {
                newStorageValue[key] = parseInt(shelterStorage[key]) + parseInt(storageValue[key]);
            }
            else {
                newStorageValue[key] = parseInt(shelterStorage[key])
            }

        });

        setShelterStorage(newStorageValue);
    }

    return (
        <PageContainer>
            <Buttons>
                <TabButton
                    onClick={() => setActiveTab('list-of-dogs')}
                    name='list-of-dogs'
                    data-active={activeTab === 'list-of-dogs'}>
                    Seznam psů
                </TabButton>

                <TabButton
                    onClick={() => setActiveTab('shelter-storage')}
                    name='shelter-storage'
                    data-active={activeTab === 'shelter-storage'}>
                    Sklad útulků
                </TabButton>
            </Buttons>
            {(activeTab === 'list-of-dogs') &&
                <>
                    <DogList name='dogList'>
                        {
                            listOfDogs.map((dog) => {
                                return (
                                    <DogItem key={dog.id}>
                                        <p>
                                            {dog.name} / {dog.race} / {dog.age}
                                        </p>
                                        <button style={{
                                            color: '#647644',
                                            fontWeight: 'bolder',
                                            border: 2 + 'px solid #647644',
                                            borderRadius: 50 + 'px',
                                            height: 25 + 'px',
                                            width: 25 + 'px',
                                        }}
                                            //když předávám parametr funkci, musím vždy obalit do anonymní funkce
                                            //tedy () =>
                                            onClick={() => handleDelete(dog.id)}
                                        >
                                            X
                                        </button>
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
                </>
            }

            {(activeTab === 'shelter-storage') &&
                <>
                    <h3>Aktuální zásoby</h3>
                    <p>granule: {shelterStorage.food} kg</p>
                    <p>vakcíny: {shelterStorage.vaccine} ks</p>
                    <p>medikamenty: {shelterStorage.pills} ks</p>
                    <ShelterForm>

                        <Input
                            type='number'
                            min='0'
                            placeholder='granule (kg)'
                            name='food'
                            value={tempStorage.food}
                            onChange={handleStorage}
                        />

                        <Input
                            type='number'
                            min='0'
                            placeholder='vakcíny (ks)'
                            name='vaccine'
                            value={tempStorage.vaccine}
                            onChange={handleStorage}
                        />

                        <Input
                            type='number'
                            min='0'
                            placeholder='léky (ks)'
                            name='pills'
                            value={tempStorage.pills}
                            onChange={handleStorage}
                        />
                        <Button
                            onClick={updateStorage}>
                            Doplnit zásoby
                        </Button>

                    </ShelterForm>
                </>
            }



        </PageContainer >
    );
}

export default Home;
