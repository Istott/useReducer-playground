import React, {useState} from 'react';

function LangSelect(){
    const [langSelected, setLangSelected] = useState({
        name: '',
        placeHolder: '',
    });
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState('fds')

    const selectChanges = (e) => {
        const lang = {
            english: {
                name: 'English',
                placeHolder: 'say something...'
            }, 
            spanish: {
                name: 'Spanish',
                placeHolder: 'Di algo...'
            }
        }

        if (e.target.value === 'english') {
            setLangSelected({ ...langSelected,
                name: lang.english.name,
                placeHolder: lang.english.placeHolder,
            })
            return;
        }

        setLangSelected({ ...langSelected,
            name: lang.spanish.name,
            placeHolder: lang.spanish.placeHolder,
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

            <p>{submitted}</p>

        </div>
    )
}

export default LangSelect;