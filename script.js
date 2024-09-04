class Student {
    constructor(id, name, gender, dob, address) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.address = address;
    }
}

function getStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

function addStudent(id, name, gender, dob, address) {
    const students = getStudents();
    students.push(new Student(id, name, gender, dob, address));
    saveStudents(students);
    updateTable();
}

function deleteStudent(id) {
    let students = getStudents();
    students = students.filter(student => student.id !== id);
    saveStudents(students);
    updateTable();
}

function editStudent(id) {
    const students = getStudents();
    const student = students.find(student => student.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentGender').value = student.gender;
        document.getElementById('studentDob').value = student.dob;
        document.getElementById('studentAddress').value = student.address;
        toggleForm(true);
    }

    document.getElementById('studentForm').onsubmit = function(event) {
        event.preventDefault();
        student.id = document.getElementById('studentId').value;
        student.name = document.getElementById('studentName').value;
        student.gender = document.getElementById('studentGender').value;
        student.dob = document.getElementById('studentDob').value;
        student.address = document.getElementById('studentAddress').value;
        saveStudents(students);
        updateTable();
        resetForm();
        toggleForm(false);
    };
}

function updateTable() {
    const students = getStudents();
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    students.forEach(student => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.dob}</td>
            <td>${student.address}</td>
            <td>
                <button onclick="editStudent('${student.id}')">Sửa</button>
                <button onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
        `;
    });
}

function toggleForm(show) {
    document.getElementById('floatingForm').style.display = show ? 'block' : 'none';
}

function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('studentForm').onsubmit = addStudentHandler;
}

function addStudentHandler(event) {
    event.preventDefault();
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    const gender = document.getElementById('studentGender').value;
    const dob = document.getElementById('studentDob').value;
    const address = document.getElementById('studentAddress').value;
    addStudent(id, name, gender, dob, address);
    resetForm();
    toggleForm(false);
}

document.getElementById('toggleFormButton').onclick = () => toggleForm(true);
document.getElementById('studentForm').onsubmit = addStudentHandler;

updateTable();
