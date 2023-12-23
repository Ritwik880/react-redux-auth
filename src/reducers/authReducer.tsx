import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, MARK_SUBCOURSE_COMPLETE } from '../actions/authActions';

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
                  ? [...course.completedCourses, course.id] // Update with course.id, not action.payload.courseId
                  : course.completedCourses,
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

