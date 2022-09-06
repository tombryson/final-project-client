import React, { useState } from 'react'
import axios from 'axios'
import bootstrap from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import arrival from '../images/book-icon.png';


const Book = () => {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    // from = ""
    // to = ""

    // const SEARCH_URL = `http://localhost:3000/search/`

    const _handleSubmit = (form) => {
        setFrom(form.target.value)
    }

    const _handleTo = (form) => {
        setTo(form.target.value)
    }

    const _handleFrom = (form) => {

    }

    return (
        <><h1 className="book">Book</h1>
        <form className="book-form" onSubmit={_handleSubmit}>
            <div className="search-form">
            <input onChange={_handleFrom} required placeholder="eg. MEL" />
            <input onChange={_handleTo} required placeholder="eg. SYD" />
            <button>Search Flights</button>
            </div>
        </form>
        <div class="col-sm-3 my-1">
      <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text"><img src={arrival} alt='plane taking off' width='30px'></img></div>
        </div>
        <input type="text" class="form-control" id="inlineFormInputGroupUsername" onChange={_handleTo} required placeholder="eg. SYD"/>
      </div>
    </div>
    </>        

    
    )
}

export default Book;