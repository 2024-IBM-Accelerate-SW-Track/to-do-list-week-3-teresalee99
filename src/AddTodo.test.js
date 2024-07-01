import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that new-item-input is an input', () => {
  render(<App />, container);
  const element = screen.getByTestId('new-item-input');
  expect(element.outerHTML.toLowerCase().includes("<input")).toBe(true);
});

test('test that new-item-button is a button', () => {
  render(<App />, container);
  const element = screen.getByTestId('new-item-button');
  expect(element.outerHTML.toLowerCase().includes("<button")).toBe(true);
});

test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByTestId('new-item-input');
  const inputDate = screen.getByTestId('new-item-date');
  const element = screen.getByTestId('new-item-button');
  const taskName = "Duplicate Task";
  const dueDate = "07/01/2024";

  // Add task once
  fireEvent.change(inputTask, { target: { value: taskName }});
  fireEvent.change(inputDate, { target: { value: dueDate }});
  fireEvent.click(element);

  // Try to add duplicate task
  fireEvent.change(inputTask, { target: { value: taskName }});
  fireEvent.change(inputDate, { target: { value: dueDate }});
  fireEvent.click(element);

  // Check that only one instance of the task is present
  const tasks = screen.getAllByText(new RegExp(taskName, "i"));
  expect(tasks.length).toBe(1);
});
