import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FetchLoggedinUserObj, FetchUserList } from "../Redux/Action";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectUserId, selectUserObj } from "../Redux/userSlice";

const StaffUserListing = (props) => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Load customer list
    props.loadcustomers();

    // Fetch user data based on userId
    if (userId) {
      dispatch(FetchLoggedinUserObj(userId));
    }
  }, [userId, dispatch]);

  const userObj = useSelector(selectUserObj);
  const handleAddUser = () => {
    navigate("/user/add");
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());
    navigate("/");
  };
  const filteredUsers = props.user.userlist.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (props.user.loading && userId) || userObj === null ? (
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
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Customer
          </span>{" "}
          Table.
        </h1>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleAddUser}
            >
              Add User [+]
            </button>
            {userObj && <h1>Welcome, {userObj.name}!</h1>}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Log Out
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md"
          />
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
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item) => (
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
    // removeuser: (code) => dispatch(Removeuser(code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StaffUserListing);
