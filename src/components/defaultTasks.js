import { Timestamp } from "firebase/firestore";

const tasks = [
  {
    id: 1,
    data: function () {
      return {
        name: "Task 1",
        priority: "High",
        status: "Not completed",
        date: Timestamp.fromDate(new Date()).toDate(),
        content: "Lorem ipstum",
        sharedWith: ["User 1 ", "User 2"],
        public: false,
      };
    },
  },
  {
    id: 2,
    data: function () {
      return {
        name: "Task 2",
        priority: "Low",
        status: "Not completed",
        date: Timestamp.fromDate(new Date()).toDate(),
        content: "Lorem ipstum",
        sharedWith: ["User 3 ", "User 4"],
        public: false,
      };
    },
  },
  {
    id: 3,
    data: function () {
      return {
        name: "Task 3",
        status: "Not completed",
        priority: "Medium",
        date: Timestamp.fromDate(new Date()).toDate(),
        content: "Lorem ipstum",
        sharedWith: ["User 1 ", "User 4"],
        public: false,
      };
    },
  },
];

export default tasks;
