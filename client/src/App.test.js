import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


//MONGO_URL = mongodb+srv://rabi:QwiIN3Nwa9KKdoyr@cluster0.qdzxm.mongodb.net/expenseApp