const host = "https://node-js-ecommerce-00.vercel.app/";
const deleteUser = async (userId) => {
  try {
    const resp = await fetch(`${host}/api/users/${userId}`, {
      method: "DELETE",
    });
    const result = await resp.json();
    console.log(result);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const upgradeDegradeUser = async (userId) => {
  try {
    const resp = await fetch(`${host}/api/users/premium/${userId}`, {
      method: "PUT",
    });
    const result = await resp.json();
    console.log(result);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const deleteInactiveUsers = async () => {
  try {
    const resp = await fetch(`${host}/api/users/inactive/delete`, {
      method: "DELETE",
    });
    const result = await resp.json();
    console.log(result);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
