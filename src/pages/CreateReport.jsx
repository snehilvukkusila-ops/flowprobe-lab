import { useState } from 'react'

export default function CreateReport() {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Weekly')

  return (
    <div className="card">
      <span className="tag">Create Report</span>
      <h1>Create a new report</h1>

      {step === 1 && (
        <section>
          <p>Step 1 of 2 — Name your report.</p>
          <label htmlFor="report-title">Report title</label>
          <input
            id="report-title"
            type="text"
            value={title}
            placeholder="Q3 usage summary"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!title.trim()}
            >
              Next
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <p>Step 2 of 2 — Choose a category, then create the report.</p>
          <label htmlFor="report-category">Category</label>
          <select
            id="report-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Ad hoc</option>
          </select>
          <div>
            <button type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" onClick={() => setStep(3)}>
              Create report
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <p role="status">
            Report "{title}" ({category}) created.
          </p>
        </section>
      )}
    </div>
  )
}
