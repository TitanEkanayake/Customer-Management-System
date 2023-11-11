import { useEffect } from "react";
import { connect } from "react-redux";
import { FetchLoggedinUserObj, FetchUserList } from "../Redux/Action";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const StaffUserListing = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    props.loaduser();
  }, []);
  const userobj = useSelector((state) => state.user.userId);
  useEffect(() => {
    dispatch(FetchLoggedinUserObj(id));
  }, [id]);

  const handleAddUser = () => {
    navigate("/user/add");
  };
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
          <h1>Welcome, {userobj.name}!</h1>
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
    loaduser: () => dispatch(FetchUserList()),
    // removeuser: (code) => dispatch(Removeuser(code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StaffUserListing);
