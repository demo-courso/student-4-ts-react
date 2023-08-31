// Uh, okay, let's start by importing stuff
import React, { useState } from 'react';
import { faker } from '@faker-js/faker'; // Wait, is this right?
import clsx from 'clsx';

// Now, time for some type stuff, I think?
// I heard TypeScript likes this stuff, whatever it is
interface TodoItemProps {
  status: string;
  label: string;
  onChecked: any; // I dunno what type this should be, so... any?
}

// Now for some functions, I guess?
// What's with those colons and stuff, TypeScript is so picky
const generateFakeTodoItem = () => ({
  label: faker.hacker.phrase(),
  status: faker.random.arrayElement(['open', 'done', 'archived']),
  id: faker.random.uuid(),
});

// This function takes a number, right? So it's like... size: number?
const generateNTodo = (size) => {
  return Array.from(Array(size).keys()).map(generateFakeTodoItem);
};

// Ugh, more type stuff
const initialList = [
  {
    label: 'This is my first todo item',
    status: 'open',
    id: faker.random.uuid(),
  },
  {
    label: 'This is some done todo',
    status: 'done',
    id: faker.random.uuid(),
  },
  {
    label: 'This is a really old todo',
    status: 'archived',
    id: faker.random.uuid(),
  },
  ...generateNTodo(10),
];

// Okay, now for the TodoItem thing
// What was that clsx thing again?
const TodoItem = ({ status, label, onChecked }) => {
  return (
    <div
      className={clsx('p-4 flex items-center', {
        'bg-gray-200': status === 'archived',
      })}
    >
      <span
        className={clsx('w-full block', { 'line-through': status !== 'open' })}
      >
        {label}
      </span>
      <input
        checked={status !== 'open'}
        disabled={status === 'archived'}
        type="checkbox"
        className="rounded text-pink-500 ml-8 cursor-pointer disabled:cursor-not-allowed disabled:bg-black disabled:hover:bg-black"
        onChange={() => onChecked(status === 'open' ? 'done' : 'open')}
      />
    </div>
  );
};

// Wait, how do you make a function component again?
function App() {
  const [todoList, setTodoList] = useState(initialList);

  // Uh, this updater thing... is it even gonna work?
  const updater = (id, newStatus) => {
    setTodoList((oldList) =>
      oldList.map((it) => {
        if (it.id !== id) {
          return it;
        }
        return {
          ...it,
          status: newStatus,
        };
      })
    );
  };

  // Okay, wrapping up I guess
  return (
    <div className="bg-white shadow rounded-lg py-8">
      <div className="divide-gray-300 divide-y">
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            label={item.label}
            status={item.status}
            onChecked={(newState) => updater(item.id, newState)}
          />
        ))}
      </div>
    </div>
  );
}

// Exporting stuff, I think
export default App;