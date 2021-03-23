import './App.css';
import { useState } from 'react'

function App() {
  const [salary, setSalary] = useState('')
  const [optionS, setOptionS] = useState(1)
  const [showResult, setShowResult] = useState(false)
  const [tax, setTax] = useState(0)

  const threshHolds = [5000000, 10000000, 18000000, 32000000, 52000000, 80000000, 1e10]
  const percents = [5, 10, 15, 20, 25, 30, 35]
  const adding1s = [0, 250000, 750000, 1950000, 4750000, 9750000, 18150000]
  const subtract2s = [0, 250000, 750000, 1650000, 3250000, 5850000, 9850000]
  const handleSubmit = (e) => {
    e.preventDefault();
    let percent = 5, adding1 = 0, subtract2= 0, delta1 = 0
    for (let i=0; i<=6; i++) {
      if (salary <= threshHolds[i]) {
        percent = percents[i]/100
        adding1 = adding1s[i]
        subtract2 = subtract2s[i]
        if (i === 0) delta1 = salary
        else delta1 = salary - threshHolds[i-1]
        break
      }
    }
    if (optionS === 1)
      setTax(Math.ceil(adding1 + (percent*delta1)))
    else
      setTax(Math.ceil((percent*salary) - subtract2))
    setShowResult(true)
  }

  return (
    <div className="App">
      <h1> Person Income Tax Calculator </h1>
      <form onSubmit={handleSubmit}>
      <p><label>
        Salary  
          <input type="number" min={0} max={1000000000} step={1} value={salary} onChange={(e) => { setSalary(Number(e.target.value)) }} />
      </label></p>
      <p><label>
        Option
        <input type="radio" id='option-1' name='optionS' value='1' checked={optionS === 1} onChange={() => { setOptionS(1) }} />
        <label htmlFor="option-1">1</label>
        <input type="radio" id='option-2' name='optionS' value='2' checked={optionS === 2} onChange={() => { setOptionS(2) }} />
        <label htmlFor="option-2">2</label>
      </label></p>
      
      <input type="submit" value="Submit" />
      </form>
      {showResult &&
        <p>
          Tax: {tax}
        </p>}
    </div>
  );
}

export default App;
