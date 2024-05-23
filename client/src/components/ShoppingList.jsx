import { useState } from 'react';

import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, BUY_ITEM } from '../utils/actions';

import { useStudentContext } from '../utils/ItemContext';

export default function StudentList() {
  const [state, dispatch] = useStudentContext();

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentMajor, setNewStudentMajor] = useState('');

  // Local state variable that will be used to hold the new name of a major before it gets dispatched to the reducer
  const [newMajorName, setNewMajorName] = useState('');

  return (
    <div>
      {state.students ? (
        <>
          <section className="student-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Major</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {state.students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.major}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          console.log('StudentList.js: Dispatched remove!');
                          // The remove student action will return a new copy of state with an updated students array after the `id` has been filtered from the array
                          return dispatch({
                            type: REMOVE_STUDENT,
                            payload: student.id,
                          });
                        }}
                      >
                        <span role="img" aria-label="delete">
                          ✖️
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <form 
              className="add-student"
              onSubmit={(e) => {
                e.preventDefault();
                console.log('StudentList.js: Dispatched add student! ');
                dispatch({
                  type: ADD_STUDENT,
                  payload: { name: newStudentName, major: newStudentMajor },
                });

                setNewStudentName('');
                setNewStudentMajor('');
              }}
            >
              <input
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="New student name..."
                type="text"
              />

              <select
                onChange={(e) => setNewStudentMajor(e.target.value)}
                value={newStudentMajor}
              >
                <option>Choose major...</option>
                {/* Map through all the majors and render an option element. If state is updated, the entire component will re-render and allow our new major to be displayed */}
                {state.majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
              {console.log(state.majors)}
              <button type="submit">
                Add Student
              </button>
            </form>
            <h3>Add a New Major</h3>
            <form 
              className="add-major"
              onSubmit={(e) => {
                e.preventDefault();
                console.log('StudentList.js: Dispatched add major! ');
                // The reducer will invoke the ADD_MAJOR case which will return a copy of state with an updated majors array containing the major name we provided in our payload
                dispatch({
                  type: ADD_MAJOR,
                  payload: newMajorName,
                });

                setNewMajorName('');
              }}
            >
              {/* The setMajorName will update only the local state variable that holds the current value of the major name */}
              <input
                value={newMajorName}
                onChange={(e) => setNewMajorName(e.target.value)}
                placeholder="New major name..."
                type="text"
                style={{ padding: '10px', marginRight: '5px' }}
              />
              <button type="submit">
                Add Major
              </button>
            </form>
          </section>
        </>
      ) : (
        <span>Hmm... seems that there are no students here!</span>
      )}
    </div>
  );
}
