export const fetchUserDashboardData = async (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                courses: [
                    {
                        id: '1',
                        name: 'Math',
                        para: 'Mathematics, often simply referred to as "math," is a fundamental field of study that deals with the properties, relationships, and patterns of numbers.',
                        subSubjects: [
                            { id: '1', name: 'Algebra', desc: 'Algebra is a branch of mathematics that deals with the study of mathematical symbols and the rules for manipulating those symbols to solve equations and understand.'},
                            { id: '2', name: 'Geometry', desc: 'Geometry is a branch of mathematics that focuses on the properties, relationships, and measurements of shapes, sizes, angles, and dimensions in space.'},
                        ],
                        completedCourses: ['1'],
                    },
                    {
                        id: '2',
                        name: 'Science',
                        para: 'Science is a systematic enterprise that seeks to understand the natural world through observation, experimentation, and the formulation of testable explanations and predictions. ',
                        subSubjects: [
                            { id: '3', name: 'Biology', desc: 'Biology is the scientific study of living organisms and their interactions with the environment. It encompasses a wide range of topics, including cellular structure, genetics, evolution, ecology, and physiology, providing insights into the diverse and intricate mechanisms that characterize life on Earth.'},
                            { id: '4', name: 'Physics', desc: 'Physics is the branch of science that explores the fundamental principles governing the behavior of matter, energy, space, and time. It seeks to understand the underlying laws and forces that govern the universe, from the smallest particles at the quantum level to the vast expanses of galaxies.'},
                        ],
                        completedCourses: ['2'],
                    },
                    {
                        id: '3',
                        name: 'English',
                        para: 'English is a West Germanic language that originated in medieval England and has evolved into a global lingua franca. It is spoken by millions of people.',
                        subSubjects: [
                            { id: '5', name: 'Grammar', desc: 'Grammar is the set of rules governing the structure, composition, and proper use of language, encompassing elements such as syntax, semantics, and phonetics, ensuring effective communication and clarity in written and spoken expression.'},
                            { id: '6', name: 'Literature', desc: 'Literature comprises written or spoken works, including fiction and non-fiction, that explore, analyze, and express the human experience, emotions, and ideas. It encompasses various forms such as novels, poetry, plays, and essays.'},
                        ],
                        completedCourses: ['3']
                    },
                    {
                        id: '4',
                        name: 'Computer Networking',
                        para: 'Computer networking involves the practice of connecting and interconnecting computing devices, such as computers, servers, and other devices.',
                        subSubjects: [
                            { id: '7', name: 'Server-Client model', desc: 'Computer networking is used in the server-client model. A server is a central computer used to store the information and maintained by the system administrator. Clients are the machines used to access the information stored in the server remotely.'},
                            { id: '8', name: 'Communication medium', desc: 'Computer network behaves as a communication medium among the users. For example, a company contains more than one computer has an email system which the employees use for daily communication.'},
                            { id: '9', name: 'E-commerce', desc: 'Computer network is also important in businesses. We can do the business over the internet. For example, amazon.com is doing their business over the internet, i.e., they are doing their business over the internet.'},
                        ],
                        completedCourses: ['4'],
                    },
                    {
                        id: '5',
                        name: 'Data Structure',
                        para: 'A data structure is a way of organizing and storing data to perform operations on that data effectively. Examples include arrays, linked lists, trees, and graphs.',
                        subSubjects: [
                            { id: '10', name: 'Array', desc: 'Array is a data structure that stores a fixed-size sequential collection of elements of the same type.'},
                            { id: '11', name: 'Linked List', desc: 'A linked list is a linear data structure consisting of nodes where each node points to the next node in the sequence.'},
                            { id: '12', name: 'Sorting Algorithms', desc: 'Sorting algorithms are algorithms that put elements in a certain order.' },
                        ],
                        completedCourses: ['5'],
                    },
                ],
            });
        }, 1000);
    });
};
