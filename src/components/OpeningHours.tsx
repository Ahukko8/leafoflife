import React from "react";
import { Card } from "./ui/card";

const OpeningHours: React.FC = () => {
  const weekDayHours = [
    { day: "Morning", time: "9:00 AM - 11:30 AM" },
    { day: "Night", time: "20:45 pM - 22:30 PM" },
  ];

  const FridayHours = [
    {day: "Morning", time: "Off"},
    {day: "Night", time: "on call"}
  ]

  const SaturdayHours = [
    {day: "Morning", time: "9:00 AM - 11:30 AM"},
    {day: "Night", time: "on call"}
  ]

  return (
    <Card className="p-6 bg-gray-50 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Opening Hours
      </h3>
      <h4>Sunday - Thursday</h4>
      <ul className="space-y-2">
        {weekDayHours.map(({ day, time }) => (
          <li
            key={day}
            className="flex justify-between text-base text-gray-700"
          >
            <span>{day}</span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
      <h4 className="mt-5">Firday</h4>
      <ul className="space-y-2">
        {FridayHours.map(({ day, time }) => (
          <li
            key={day}
            className="flex justify-between text-base text-gray-700"
          >
            <span>{day}</span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
       <h4 className="mt-5">Saturday</h4>
      <ul className="space-y-2">
        {SaturdayHours.map(({ day, time }) => (
          <li
            key={day}
            className="flex justify-between text-base text-gray-700"
          >
            <span>{day}</span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default OpeningHours;
