import React from 'react';

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <li>
      {name} {exercises}
    </li>
  );
};

const Content = ({ parts }) => {
  const exercisesTot = parts.reduce((prev, curr) => {
    return prev + curr.exercises;
  }, 0);

  return (
    <div>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
        <p>Total of {exercisesTot}</p>
      </ul>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
