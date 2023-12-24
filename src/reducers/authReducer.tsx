import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, MARK_SUBCOURSE_COMPLETE, MARK_QUIZ_COMPLETE, UNMARK_QUIZ_COMPLETE } from '../actions/authActions';

interface User {
  id: string;
  username: string;
  completedCourses: string[];
}

interface AuthState {
  user: User | null;
  courses: {
    id: string;
    name: string;
    para: string;
    subSubjects: {
      id: string;
      name: string;
      desc: string;
      completed: boolean;
    }[];
    completedCourses: string[];
    questionsData: Array<{
      id: number;
      question: string;
      options: string[];
      correctAnswer: string;
      completed: boolean;
    }>;
  }[];
}

const initialState: AuthState = {
  user: null,
  courses: [
    {
      id: '1',
      name: 'Math',
      para: 'Mathematics, often simply referred to as "math," is a fundamental field of study that deals with the properties, relationships, and patterns of numbers.',
      subSubjects: [
        { id: '1', name: 'Algebra', desc: 'Algebra is a branch of mathematics that deals with the study of mathematical symbols and the rules for manipulating those symbols to solve equations and understand.', completed: false },
        { id: '2', name: 'Geometry', desc: 'Geometry is a branch of mathematics that focuses on the properties, relationships, and measurements of shapes, sizes, angles, and dimensions in space.', completed: false },
      ],
      questionsData: [
        {
          id: 1,
          question: 'What is the result of 5 + 7?',
          options: ['10', '12', '15', '20'],
          correctAnswer: '12',
          completed: false,
        },
        {
          id: 2,
          question: 'What is the result of 8 * 4?',
          options: ['24', '32', '40', '48'],
          correctAnswer: '32',
          completed: false,
        },
        {
          id: 3,
          question: 'What is the result of 20 / 5?',
          options: ['2', '4', '5', '8'],
          correctAnswer: '4',
          completed: false,
        },
        {
          id: 4,
          question: 'What is the result of 15 - 9?',
          options: ['4', '6', '8', '12'],
          correctAnswer: '6',
          completed: false,
        },
        {
          id: 5,
          question: 'What is the result of 3^2?',
          options: ['3', '6', '9', '12'],
          correctAnswer: '9',
          completed: false,
        },
      ],
      completedCourses: ['1'],
    },
    {
      id: '2',
      name: 'Science',
      para: 'Science is a systematic enterprise that seeks to understand the natural world through observation, experimentation, and the formulation of testable explanations and predictions. ',
      subSubjects: [
        { id: '3', name: 'Biology', desc: 'Biology is the scientific study of living organisms and their interactions with the environment. It encompasses a wide range of topics, including cellular structure, genetics, evolution, ecology, and physiology, providing insights into the diverse and intricate mechanisms that characterize life on Earth.', completed: false },
        { id: '4', name: 'Physics', desc: 'Physics is the branch of science that explores the fundamental principles governing the behavior of matter, energy, space, and time. It seeks to understand the underlying laws and forces that govern the universe, from the smallest particles at the quantum level to the vast expanses of galaxies.', completed: false },
      ],
      questionsData: [
        {
          id: 1,
          question: 'What is the chemical symbol for water?',
          options: ['H2O', 'CO2', 'O2', 'N2'],
          correctAnswer: 'H2O',
          completed: false,
        },
        {
          id: 2,
          question: 'Which planet is known as the Red Planet?',
          options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
          correctAnswer: 'Mars',
          completed: false,
        },
        {
          id: 3,
          question: 'What is the largest mammal on Earth?',
          options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
          correctAnswer: 'Blue Whale',
          completed: false,
        },
        {
          id: 4,
          question: 'What gas do plants absorb from the atmosphere during photosynthesis?',
          options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
          correctAnswer: 'Carbon Dioxide',
          completed: false,
        },
        {
          id: 5,
          question: 'Which scientist formulated the theory of relativity?',
          options: ['Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Stephen Hawking'],
          correctAnswer: 'Albert Einstein',
          completed: false,
        },
      ],
      completedCourses: ['2'],
    },
    {
      id: '3',
      name: 'English',
      para: 'English is a West Germanic language that originated in medieval England and has evolved into a global lingua franca. It is spoken by millions of people.',
      subSubjects: [
        { id: '5', name: 'Grammar', desc: 'Grammar is the set of rules governing the structure, composition, and proper use of language, encompassing elements such as syntax, semantics, and phonetics, ensuring effective communication and clarity in written and spoken expression.', completed: false },
        { id: '6', name: 'Literature', desc: 'Literature comprises written or spoken works, including fiction and non-fiction, that explore, analyze, and express the human experience, emotions, and ideas. It encompasses various forms such as novels, poetry, plays, and essays.', completed: false },
      ],
      questionsData: [
        {
          id: 1,
          question: 'What is the plural form of "child"?',
          options: ['Childs', 'Childes', 'Children', 'Child'],
          correctAnswer: 'Children',
          completed: false,
        },
        {
          id: 2,
          question: 'Who wrote "Romeo and Juliet"?',
          options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
          correctAnswer: 'William Shakespeare',
          completed: false,
        },
        {
          id: 3,
          question: 'What is a synonym for "happy"?',
          options: ['Sad', 'Joyful', 'Angry', 'Excited'],
          correctAnswer: 'Joyful',
          completed: false,
        },
        {
          id: 4,
          question: 'Which of the following is a conjunction?',
          options: ['Cat', 'And', 'Run', 'Blue'],
          correctAnswer: 'And',
          completed: false,
        },
        {
          id: 5,
          question: 'In which tense is the sentence "She will go to the market tomorrow"?',
          options: ['Present', 'Past', 'Future', 'Continuous'],
          correctAnswer: 'Future',
          completed: false,
        },
      ],
      completedCourses: ['3']
    },
    {
      id: '4',
      name: 'Computer Networking',
      para: 'Computer networking involves the practice of connecting and interconnecting computing devices, such as computers, servers, and other devices.',
      subSubjects: [
        { id: '7', name: 'Server-Client model', desc: 'Computer networking is used in the server-client model. A server is a central computer used to store the information and maintained by the system administrator. Clients are the machines used to access the information stored in the server remotely.', completed: false },
        { id: '8', name: 'Communication medium', desc: 'Computer network behaves as a communication medium among the users. For example, a company contains more than one computer has an email system which the employees use for daily communication.', completed: false },
        { id: '9', name: 'E-commerce', desc: 'Computer network is also important in businesses. We can do the business over the internet. For example, amazon.com is doing their business over the internet, i.e., they are doing their business over the internet.', completed: false },
      ],
      questionsData: [
        {
          id: 1,
          question: 'What does TCP stand for?',
          options: ['Transmission Control Protocol', 'Technical Control Panel', 'Total Control Panel', 'Transmitting Computer Process'],
          correctAnswer: 'Transmission Control Protocol',
          completed: false,
        },
        {
          id: 2,
          question: 'Which layer of the OSI model is responsible for routing and forwarding?',
          options: ['Network Layer', 'Data Link Layer', 'Transport Layer', 'Physical Layer'],
          correctAnswer: 'Network Layer',
          completed: false,
        },
        {
          id: 3,
          question: 'What is the purpose of DHCP in a network?',
          options: ['Dynamic Host Configuration Protocol', 'Domain Host Configuration Protocol', 'Data Host Configuration Protocol', 'Distributed Host Configuration Protocol'],
          correctAnswer: 'Dynamic Host Configuration Protocol',
          completed: false,
        },
        {
          id: 4,
          question: 'Which device operates at the Data Link Layer of the OSI model?',
          options: ['Router', 'Hub', 'Switch', 'Bridge'],
          correctAnswer: 'Switch',
          completed: false,
        },
        {
          id: 5,
          question: 'What is the IP address range for private IP addresses as defined by RFC 1918?',
          options: ['10.0.0.0 - 10.255.255.255', '172.16.0.0 - 172.31.255.255', '192.168.0.0 - 192.168.255.255', 'All of the above'],
          correctAnswer: 'All of the above',
          completed: false,
        },
      ],
      completedCourses: ['4'],
    },
    {
      id: '5',
      name: 'Data Structure',
      para: 'A data structure is a way of organizing and storing data to perform operations on that data effectively. Examples include arrays, linked lists, trees, and graphs.',
      subSubjects: [
        { id: '10', name: 'Array', desc: 'Array is a data structure that stores a fixed-size sequential collection of elements of the same type.', completed: false },
        { id: '11', name: 'Linked List', desc: 'A linked list is a linear data structure consisting of nodes where each node points to the next node in the sequence.', completed: false },
        { id: '12', name: 'Sorting Algorithms', desc: 'Sorting algorithms are algorithms that put elements in a certain order.', completed: false },
      ],
      questionsData: [
        {
          id: 1,
          question: 'What is the time complexity of inserting an element at the end of an array?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
          correctAnswer: 'O(1)',
          completed: false,
        },
        {
          id: 2,
          question: 'Which data structure follows the Last In, First Out (LIFO) principle?',
          options: ['Queue', 'Stack', 'Linked List', 'Tree'],
          correctAnswer: 'Stack',
          completed: false,
        },
        {
          id: 3,
          question: 'What is the primary purpose of a hash function in hash tables?',
          options: ['Sorting elements', 'Searching elements', 'Mapping keys to indices', 'Removing duplicates'],
          correctAnswer: 'Mapping keys to indices',
          completed: false,
        },
        {
          id: 4,
          question: 'Which data structure is used for efficiently searching, inserting, and deleting elements?',
          options: ['Array', 'Stack', 'Queue', 'Binary Search Tree'],
          correctAnswer: 'Binary Search Tree',
          completed: false,
        },
        {
          id: 5,
          question: 'What is the space complexity of quicksort algorithm in the worst case?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
          correctAnswer: 'O(log n)',
          completed: false,
        },
      ],
      completedCourses: ['5'],
    },
  ],
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };
    case MARK_SUBCOURSE_COMPLETE:
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course.id === action.payload.courseId) {
            const updatedSubSubjects = course.subSubjects.map((subcourse) => {
              if (subcourse.id === action.payload.subcourseId) {
                return { ...subcourse, completed: true };
              }
              return subcourse;
            });

            const allSubcoursesCompleted = updatedSubSubjects.every((subcourse) => subcourse.completed);

            return {
              ...course,
              subSubjects: updatedSubSubjects,
              completedCourses: allSubcoursesCompleted
                ? [...course.completedCourses, course.id]
                : course.completedCourses,
            };
          }
          return course;
        }),
      };
      case MARK_QUIZ_COMPLETE:
        return {
          ...state,
          courses: state.courses.map((course) => {
            if (course.id === action.payload.courseId) {
              const updatedQuestionsData = course.questionsData.map((quiz) => {
                if (quiz.id === action.payload.quizId) {
                  return { ...quiz, completed: true };
                }
                return quiz;
              });
      
              const allQuizzesCompleted = updatedQuestionsData.every((quiz) => quiz.completed);
      
              return {
                ...course,
                questionsData: updatedQuestionsData,
                completedCourses: allQuizzesCompleted
                  ? [...course.completedCourses, action.payload.courseId]
                  : course.completedCourses,
              };
            }
            return course;
          }),
        };
      
      case UNMARK_QUIZ_COMPLETE:
        return {
          ...state,
          courses: state.courses.map((course) => {
            if (course.id === action.payload.courseId) {
              const updatedQuestionsData = course.questionsData.map((quiz) => {
                if (quiz.id === action.payload.quizId) {
                  return { ...quiz, completed: false };
                }
                return quiz;
              });
      
              return {
                ...course,
                questionsData: updatedQuestionsData,
                completedCourses: course.completedCourses.filter(
                  (completedCourseId) => completedCourseId !== action.payload.courseId
                ),
              };
            }
            return course;
          }),
        };
    default:
      return state;
  }
};

export default authReducer;

