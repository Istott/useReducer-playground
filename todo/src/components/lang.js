import React, {useState} from 'react';

const lang = {
    english: {
        name: 'English',
        placeHolder: 'say something...',
        location: 'The Saxon is from England and this is what he says: '
    }, 
    spanish: {
        name: 'Spanish',
        placeHolder: 'Di algo...',
        location: 'The spainard is from Spain and this is what he says: '
    }
}

function LangSelect(){
    const [langSelected, setLangSelected] = useState({
        name: '',
        placeHolder: '',
        location: ''
    });
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState('fds')

    const selectChanges = (e) => {
        if (e.target.value === 'english') {
            setLangSelected({ ...langSelected,
                name: lang.english.name,
                placeHolder: lang.english.placeHolder,
                location: lang.english.location
            })
            return;
        }

        setLangSelected({ ...langSelected,
            name: lang.spanish.name,
            placeHolder: lang.spanish.placeHolder,
            location: lang.spanish.location
        });
    }

    const submitChanges = (e) => {
        e.preventDefault();
        setSubmitted(message);
        setMessage('');

    }

    console.log(langSelected)

    return (
        <div className="languageSelector">
            <p>language choosen: {langSelected.name}</p>
            <select
                defaultValue={langSelected.name}
                onChange={selectChanges}
            >
                <option value='english'>english</option>
                <option value='spanish'>spanish</option>
            </select>

            <input
                type='text'
                value={message}
                placeholder={langSelected.placeHolder}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={submitChanges}>submit</button>

            <p>{langSelected.location}{submitted}</p>

        </div>
    )
}

export default LangSelect;