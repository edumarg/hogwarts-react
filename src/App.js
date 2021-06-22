import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/navBar";
import MainPage from "./components/mainPage";
import LogIn from "./components/adminLogin";
import SignUp from "./components/adminSignup";
import Student from "./components/student";
import NotFound from "./components/notFound";
import MyDashboard from "./components/dashboad";
import config from "./config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "./common/axiosCommands";

class App extends Component {
  state = {
    students: "",
    admins: "",
    currentAdmin: "",
  };

  sorteList(list) {
    const listSorted = list.sort((a, b) => b.lastEdit - a.lastEdit);
    return listSorted;
  }

  async componentDidMount() {
    const [studentsData, adminsData] = await Promise.all([
      http.get(`${config.URL}students`),

      http.get(`${config.URL}admins`),
    ]);
    // working with mongo
    this.setState({
      students: Object.values(studentsData.data) || [],
      admins: Object.values(adminsData.data) || [],
    });
    //working with MySQL
    // this.setState({
    //     students: studentsData.data || [],
    //     admins: adminsData.data || [],
    // });
    this.getStudents = setInterval(async () => {
      const [studentsData, adminsData] = await Promise.all([
        http.get(`${config.URL}students`),
        http.get(`${config.URL}admins`),
      ]);
      this.setState({
        students: studentsData.data,
        admins: adminsData.data,
      });
    }, 1800000);
  }

  handleLogin(account) {
    for (let admin of this.state.admins) {
      if (
        admin.email.toLowerCase() === account.email.toLowerCase() &&
        admin.password === account.password
      ) {
        this.setState({ currentAdmin: admin });
        toast.success("Log In success");
        return;
      }
    }
    toast.error("login fail");
  }

  handleLogOut() {
    this.setState({ currentAdmin: "" });
  }

  async handleSaveAdmin(admin) {
    let newAdmins = [...this.state.admins];
    let adminInDb = newAdmins.find(
      (a) => a.email === admin.email && a._id === admin._id
    );

    if (adminInDb) {
      const index = newAdmins.indexOf(adminInDb);
      newAdmins[index] = { ...admin };
      http.put(`${config.URL}admins/{admin.email}`, admin);
    } else if (!adminInDb) {
      newAdmins = [admin, ...newAdmins];
      http.post(`${config.URL}admins/new`);
    }

    const newAdminsSorted = this.sorteList(newAdmins);
    this.setState({ admins: newAdminsSorted });
  }

  handleSaveStudent(student) {
    let newStudents = [...this.state.students];
    let studentInDb = newStudents.find(
      (s) => s.email === student.email && s._id === student._id
    );

    if (studentInDb) {
      const index = newStudents.indexOf(studentInDb);
      newStudents[index] = { ...student };
      const newStudentsSorted = this.sorteList(newStudents);
      this.setState({ students: newStudentsSorted });

      try {
        http.put(`${config.URL}students/${student.email}`, student);
      } catch (exeption) {
        toast.error("Error editing this student");
        this.setState({ students: newStudents });
      }
    }

    // new student logic
    else if (!studentInDb) {
      newStudents = [student, ...newStudents];
      const newStudentsSorted = this.sorteList(newStudents);
      this.setState({ students: newStudentsSorted });
      try {
        http.post(`${config.URL}students/new`);
      } catch (exeption) {
        toast.error("Error saving this student");
        this.setState({ students: newStudents });
      }
    }
  }

  async handleDeleteStudent(studentToDelete) {
    const originalStudents = [...this.state.students];
    this.setState({ students: "" });
    let newStudents = originalStudents.filter(
      (student) => student._id !== studentToDelete._id
    );
    console.log("new students", newStudents);
    this.setState({ students: newStudents });
    // this.setState((prevState) => ({
    //   students: prevState.students.filter(
    //     (student) => student._id !== studentToDelete._id
    //   ),
    // }));

    try {
      http.delete(`${config.URL}students/${studentToDelete.email}`);
    } catch (exeption) {
      toast.error("Error deleting this student");
      this.setState({ students: originalStudents });
    }
  }

  render() {
    const { currentAdmin, students, admins } = this.state;
    console.log("App rendered");

    return (
      <React.Fragment>
        <ToastContainer />
        <Router>
          <NavBar
            currentAdmin={currentAdmin}
            handleLogOut={() => this.handleLogOut()}
          />{" "}
          <Switch>
            <Route
              path="/home"
              render={(props) => (
                <MainPage
                  students={students}
                  currentAdmin={currentAdmin}
                  onDelete={(student) => this.handleDeleteStudent(student)}
                  {...props}
                />
              )}
            />{" "}
            <Route
              path="/signup/:email"
              render={(props) => (
                <SignUp
                  {...props}
                  OnSaveAdmin={(admin) => this.handleSaveAdmin(admin)}
                  adminList={admins}
                />
              )}
            />{" "}
            <Route
              path="/login"
              render={(props) => (
                <LogIn
                  {...props}
                  onLogin={(account) => this.handleLogin(account)}
                  currentAdmin={currentAdmin}
                />
              )}
            />{" "}
            <Route
              path="/student/:email"
              render={(props) => (
                <Student
                  {...props}
                  onSaveStudent={(student) => this.handleSaveStudent(student)}
                />
              )}
            />{" "}
            <Route
              path="/dashboard"
              render={(props) => (
                <MyDashboard {...props} studentList={students} />
              )}
            />{" "}
            <Route path="/not-found" component={NotFound} />{" "}
            <Redirect from="/" exact to="/home" />
            <Redirect from="/" to="/not-found" />
          </Switch>{" "}
        </Router>{" "}
        <React.Fragment>
          <div class="attribution">
            <a href="https://www.freepik.com/photos/city">
              City photo created by vwalakte - www.freepik.com
            </a>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
