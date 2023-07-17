import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { InputField, RecordInput, Form } from './App' 

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

// Testing the InputField component
describe('InputField', () => {
  it('renders input elements', () => {
    render(<InputField id="test_id" label="test_label" value="test_value" onChange={() => {}} />)

    expect(screen.getByLabelText(/test_label/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/test_label/i)).toHaveValue('test_value')
  })
})

// Testing the RecordInput component
describe('RecordInput', () => {
  it('renders input elements with correct values', () => {
    const inputValues = {
      record1: { artist: 'test_artist', song: 'test_song' },
    }

    render(<RecordInput recordNumber="1" handleInputChange={() => {}} inputValues={inputValues} />)

    expect(screen.getByLabelText(/Artist 1/i)).toHaveValue('test_artist')
    expect(screen.getByLabelText(/Favorite Song 1/i)).toHaveValue('test_song')
  })
})

// Testing the Form component
describe('Form', () => {
  it('renders form with submit button', () => {
    const inputValues = {
      record1: { artist: 'test_artist', song: 'test_song' },
      record2: { artist: 'test_artist', song: 'test_song' },
      record3: { artist: 'test_artist', song: 'test_song' },
    }

    render(
      <Form
        handleSubmit={() => {}}
        handleInputChange={() => {}}
        handleClearForm={() => {}}
        inputValues={inputValues}
        error={null}
      />
    )

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('handles form submission', () => {
    const handleSubmit = jest.fn()
    const inputValues = {
      record1: { artist: 'test_artist', song: 'test_song' },
      record2: { artist: 'test_artist', song: 'test_song' },
      record3: { artist: 'test_artist', song: 'test_song' },
    }

    render(
      <Form
        handleSubmit={handleSubmit}
        handleInputChange={() => {}}
        handleClearForm={() => {}}
        inputValues={inputValues}
        error={null}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})

