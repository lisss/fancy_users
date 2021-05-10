import { render, screen } from '@testing-library/react';
import { Users } from '../components/Users';

test('renders learn react link', () => {
    render(<Users />);
    const loadingLabel = screen.getByText(/Loading.../);
    expect(loadingLabel).toBeInTheDocument();
});
