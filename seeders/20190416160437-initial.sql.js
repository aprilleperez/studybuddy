// 'use strict';

// module.exports = {
//   up: (queryInterface, DataTypes) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkInsert('People', [{
//         name: 'John Doe',
//         isBetaMember: false
//       }], {});
//     */
//     return queryInterface.bulkInsert('Users', [{
//       username: 'JDoe',
//       first_name: 'John',
//       last_name: 'Doe',
//       location: 98001,
//       email: 'jdoe@interweb.com',
//       password: 'password',
//       photo: 'https://randomuser.me/api/portraits/men/87.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       username: 'JJones',
//       first_name: 'Jerry',
//       last_name: 'Jones',
//       location: 98111,
//       email: 'jjones@interweb.com',
//       password: 'password',
//       photo: 'https://randomuser.me/api/portraits/men/8.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       username: 'ASmith',
//       first_name: 'Alexis',
//       last_name: 'Smith',
//       location: 98101,
//       email: 'asmith@interweb.com',
//       password: 'password',
//       photo: 'https://randomuser.me/api/portraits/women/56.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       username: 'FThompson',
//       first_name: 'Frank',
//       last_name: 'Thompson',
//       location: 98114,
//       email: 'fthompson@interweb.com',
//       password: 'password',
//       photo: 'https://randomuser.me/api/portraits/men/30.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       username: 'TWilliams',
//       first_name: 'Tonya',
//       last_name: 'Williams',
//       location: 98116,
//       email: 'twilliams@interweb.com',
//       password: 'password',
//       photo: 'https://randomuser.me/api/portraits/women/69.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       username: 'LAndrews',
//       first_name: 'Lana',
//       last_name: 'Andrews',
//       location: 98116,
//       email: 'landrews@interweb.com',
//       password: 'password',
//       photo: 'https://randomuser.me/api/portraits/women/70.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
//     ], {});
//   },

//   down: (queryInterface, DataTypes) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkDelete('People', null, {});
//     */
//     queryInterface.bulkDelete('Users', [{
//       username: 'JDoe'
//     },
//     {
//       username: 'JJones'
//     },
//     {
//       username: 'ASmith'
//     },
//     {
//       username: 'FThompson'
//     },
//     {
//       username: 'TWilliams'
//     },
//     {
//       username: 'LAndrews'
//     }
//     ])
//   },

//   up: (queryInterface, DataTypes) => {
//     return queryInterface.bulkInsert('Surveys', [{
//       studytopic: 'math',
//       subtopic: 'algebra',
//       preftime: 'morning',
//       prefday: 'mon',
//       meetvirtual: 0,
//       meetIP: 0,
//       username: 'JDoe',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       studytopic: 'math',
//       subtopic: 'calculus',
//       preftime: 'morning',
//       prefday: 'tues',
//       meetvirtual: 0,
//       meetIP: 0,
//       username: 'JJones',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       studytopic: 'math',
//       subtopic: 'geometry',
//       preftime: 'evening',
//       prefday: 'fri',
//       meetvirtual: 0,
//       meetIP: 1,
//       username: 'ASmith',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       studytopic: 'math',
//       subtopic: 'numtheory',
//       preftime: 'afternoon',
//       prefday: 'sun',
//       meetvirtual: 0,
//       meetIP: 1,
//       username: 'FThompson',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       studytopic: 'math',
//       subtopic: 'diffeq',
//       preftime: 'afternoon',
//       prefday: 'sat',
//       meetvirtual: 0,
//       meetIP: 1,
//       username: 'TWilliams',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       studytopic: 'math',
//       subtopic: 'diffeq',
//       preftime: 'morning',
//       prefday: 'sat',
//       meetvirtual: 0,
//       meetIP: 0,
//       username: 'LAndrews',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
//     ], {});
//   },

//   down: (queryInterface, DataTypes) => {
//     queryInterface.bulkDelete('Surveys', [{
//       username: 'JDoe'
//     },
//     {
//       username: 'JJones'
//     },
//     {
//       username: 'ASmith'
//     },
//     {
//       username: 'FThompson'
//     },
//     {
//       username: 'TWilliams'
//     },
//     {
//       username: 'LAndrews'
//     }
//     ])
//   }
// };
