import React from "react";

interface Person {
  name: string;
  age?: number;
}
export default function Test() {
  let name: string;
  let name2: any; /*not recommanded */
  let name3: unknown;
  let selection: string | number;
  let isStudent: boolean;
  let hobbies: string[];
  let years: number[];
  let role: [number, string];
  let categories: Array<{ age: number; gender: string; name: string }>;

  name = "Rashmika";
  isStudent = true;
  hobbies = ["playing cricket", "playing games", "playing pubg"];
  role = [5, "rashmika"];
  categories = [
    { age: 12, gender: "male", name: "rashmika" },
    { age: 15, gender: "female", name: "Siriwardhana" },
  ];
  years = [1, 2, 3, 4, 5, 6];

  type Person = {
    name: string;
    age?: number /*optional**/;
  };

  let person: Person = {
    name: "rashmika",
    age: 24,
  };
  let persons: Person[] = []; //This is how intialize the array

  persons = [
    { name: "Rashmika ", age: 25 },
    { name: "Perera", age: 35 },
  ];

  // pre define a function

  const age = (age: number): void => {
    alert(age);
  };
  age(55);

  // above function return undefined
  // below function return nothing like it can be used as a infinite loop or throw new error

  // const checkAge: (age: number) => never = (age) => {
  //   while (true) {
  //     console.log("This will run forever");
  //   }
  // };

  // const checkAge: (age: number) => never = (age) => {
  //   throw new Error("Age not valid");
  // };

  // checkAge(25);

  function printName(name: string) {
    console.log(name);
  }

  interface Guy extends Person{
    proffesion : string
  }
  type X = Person &{
    a: string;
    b: number;
  };

  type Y = X & {
    c: string;
    d: number;
  };
  let y: Y = {
    name:"Siriwar",
    a: "Rashmika",
    b: 25,
    c:"siriwardhana",
    d:50
  };
  printName("Rashmika");
  return (
    <div className="flex justify-center items-center h-screen">
      {persons.map((item, index) => (
        <div key={index}>
          {item.name}
          {item.age}
        </div>
      ))}
    </div>
  );
}
