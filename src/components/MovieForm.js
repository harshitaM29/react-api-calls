import { Fragment, useState } from "react";
import classes from './MovieForm.module.css'


const MovieForm = props => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredOpeningText, setOpeningText] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const updateTitle = (e) => {
        setEnteredTitle(e.target.value);
    };

    const updateOpeningText = (e) => {
        setOpeningText(e.target.value);
    }

    const updateDate = (e) => {
        setEnteredDate(e.target.value);
    }
 
    const addMovie = (e) => {
        e.preventDefault();
        const movieData = {
            title:enteredTitle,
            openingText:enteredOpeningText,
            releaseDate:enteredDate
        }
        props.onAddMovie(movieData);
        setEnteredTitle('');
        setOpeningText('');
        setEnteredDate('')
 
    }
return (
    <Fragment>
        <form onSubmit={addMovie}>
        <div className={classes.title}>
            <label  htmlFor="title">Title</label>
            <input type="text" id="title" onChange={updateTitle} value={enteredTitle}/>
            </div>
            <div className={classes.openingText}>
            <label htmlFor="openingText">Opening Text</label>
            <textarea rows="4" cols="50"  onChange={updateOpeningText} value={enteredOpeningText} />
            {/* <input type="text" id="opening text" onChange={updateOpeningText} value={enteredOpeningText} /> */}
            </div>
            <div className={classes.date}>
            <label htmlFor="date">Release Date</label>
            <input type="date" id="date" onChange={updateDate} value={enteredDate} />
            </div>
            <div>
            <button>Add Movie</button>
            </div>
        </form>
    </Fragment>
)

};

export default MovieForm