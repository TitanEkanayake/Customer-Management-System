import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FetchLoggedinUserObj,
  FetchUserList,
  Removeuser,
} from "../Redux/Action";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserId } from "../Redux/userSlice";

const Userlisting = (props) => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load customer list
    props.loadcustomers();

    // Fetch user data based on userId
    if (userId) {
      dispatch(FetchLoggedinUserObj(userId));
    }
  }, [userId]);

  const handledelete = (e, code) => {
    if (window.confirm("Do you want to remove?")) {
      e.preventDefault();
      props.removeuser(code);
      props.loadcustomers();
      props.fetchUserObj(userId);
      toast.success("User removed successfully.");
    }
  };

  const handleAddUser = () => {
    // Navigate to the "/user" route

    navigate("/user/add");
  };

  // useEffect(() => {
  //   dispatch(FetchLoggedinUserObj(userId));
  // }, [userId]);
  // console.log("userobj is" + userobj);

  return props.user.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.user.errmessage ? (
    <div>
      <h2>{props.user.errmessage}</h2>
    </div>
  ) : (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6 bg-white mt-4">
        <div className="mb-4">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleAddUser}
          >
            Add User [+]
          </button>
          <h1>Welcome, {props.user.userobj.name}!</h1>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.user.userlist &&
              props.user.userlist.map((item) => (
                <tr className="bg-white border-b" key={item.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <Link
                        to={"/user/edit/" + item.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={(e) => {
                        handledelete(e, item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadcustomers: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(Removeuser(code)),
    fetchUserObj: (id) => dispatch(FetchLoggedinUserObj(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);
