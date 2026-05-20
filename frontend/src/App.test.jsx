import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

// Mock data, consistent with App.jsx
const animals = [
  { id: 'cat', name: 'Cat' },
  { id: 'dog', name: 'Dog' },
  { id: 'lion', name: 'Lion' },
  { id: 'tiger', name: 'Tiger' },
  { id: 'goat', name: 'Goat' },
  { id: 'deer', name: 'Deer' },
  { id: 'sloth', name: 'Sloth' }
];

describe('Search Functionality', () => {

  beforeEach(() => {
    // Render the app before each test
    render(<App />);
  });

  it('renders the search input and all animals initially', () => {
    // Check for the search input
    const searchInput = screen.getByPlaceholderText(/search for an animal/i);
    expect(searchInput).toBeInTheDocument();

    // Check that all animal cards are rendered
    for (const animal of animals) {
      expect(screen.getByText(animal.name)).toBeInTheDocument();
    }
  });

  it('filters the list with a matching term', () => {
    const searchInput = screen.getByPlaceholderText(/search for an animal/i);
    
    // Simulate typing "Lion"
    fireEvent.change(searchInput, { target: { value: 'Lion' } });
    
    // Assert that "Lion" is visible
    expect(screen.getByText('Lion')).toBeInTheDocument();
    
    // Assert that other animals are not visible
    expect(screen.queryByText('Cat')).not.toBeInTheDocument();
    expect(screen.queryByText('Dog')).not.toBeInTheDocument();
  });

  it('is case-insensitive', () => {
    const searchInput = screen.getByPlaceholderText(/search for an animal/i);
    
    // Simulate typing "lion" (lowercase)
    fireEvent.change(searchInput, { target: { value: 'lion' } });
    
    // Assert that "Lion" is still visible
    expect(screen.getByText('Lion')).toBeInTheDocument();
  });

  it('filters with a partial match', () => {
    const searchInput = screen.getByPlaceholderText(/search for an animal/i);
    
    // Simulate typing "li"
    fireEvent.change(searchInput, { target: { value: 'li' } });
    
    // Assert that "Lion" is visible
    expect(screen.getByText('Lion')).toBeInTheDocument();
  });

  it('shows a message when no animals match', () => {
    const searchInput = screen.getByPlaceholderText(/search for an animal/i);
    
    // Simulate typing "Zebra"
    fireEvent.change(searchInput, { target: { value: 'Zebra' } });
    
    // Assert that no animal cards are visible
    for (const animal of animals) {
      expect(screen.queryByText(animal.name)).not.toBeInTheDocument();
    }
    
    // Assert that the "No animals found" message appears
    expect(screen.getByText('No animals found.')).toBeInTheDocument();
  });

  it('clears the filter when the input is empty', () => {
    const searchInput = screen.getByPlaceholderText(/search for an animal/i);
    
    // Type something and then clear it
    fireEvent.change(searchInput, { target: { value: 'Lion' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // Assert that all animals are visible again
    for (const animal of animals) {
      expect(screen.getByText(animal.name)).toBeInTheDocument();
    }
  });

});
