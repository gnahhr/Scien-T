import React, {useState} from 'react';
import './Trivias.css';
import SideNav from '../../Components/SideNav.jsx';
import Trivia from '../../Components/Trivia';
import { periodicTable } from '../../Data/PeriodicTableJSON';
import { TriviasData } from '../../Data/Trivias';
import { useEffect } from 'react';

const Trivias = ({data}) => {
  const [ curTrivia, setCurTrivia ] = useState(TriviasData[0]);
  const [ search, setSearch ] = useState("");
  const [ filtSearch, setFiltSearch ] = useState([]);

  useEffect(() => {
    if (search === "") {
      setFiltSearch([]);
    } else {
      setFiltSearch(TriviasData.filter((data) => {
        if (data.name.toLowerCase().includes(search.toLowerCase())) {
          return data;
        }
      }))
    }
  }, [search]);

  //Get Trivia Data
  const getTriviaData = (data) => {
    setCurTrivia(data);
    setSearch("");
  }

  const changeInput = (e) => {
    e.preventDefault();
    return setSearch(e.target.value);
  }

  return (
    <main>
        <div className="main-header">
          <h1>Trivias</h1>
        </div>
        <div className="Trivias">
          <div className="search-wrapper">
            <div className="search">
              <input type="text"
                    name="search"
                    id="search"
                    placeholder='Search element...'
                    value={search}
                    autocomplete="false"
                    onChange={(e) => changeInput(e)}/>
              <button className="cta">Search</button>
            </div>
            <div className="filt-data-wrapper">
              {filtSearch && filtSearch.map((filtData) =>
                            <option
                                onClick={() => getTriviaData(filtData)}>{filtData.name}</option>)}
            </div>
          </div>
          
          <Trivia data={curTrivia}/>
        </div>
    </main>
  )
}

export default Trivias