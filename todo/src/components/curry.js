import React, {useState} from 'react';

const combos = {
        names: ['fred', 'chris', 'zack', 'shawn', 'joshua', 'amy'],
        titles: ['the pimpled nose poop stain', 'is a dum dum', 'please dont do that', 'the destroyer', 'is not my name!']
    }

function Curry() {
    const [sumthing, setSumthing] = useState('');
    console.log(sumthing);

    const min = 0;
    const maxTitle = combos.titles.length;
    const maxName = combos.names.length;

    function randomName() {
        const newTitle = () => Math.floor(Math.random() * (maxTitle - min) + min);

        function decide() {
            return combos.titles[newTitle()]
        }

        function combine() {
            setSumthing(combos.names[Math.floor(Math.random() * (maxName - min) + min)] + ' ' + decide())
        }

        return combine();
    }

    return(
        <>
            <p>{sumthing}</p>
            <button onClick={() => randomName()}>click me</button>
        </>
    )
}

export default Curry;