const deleteUser = async (userId) => {
  try {
    const resp = await fetch(`http://localhost:8080/api/users/${userId}`, {
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
    const resp = await fetch(
      `http://localhost:8080/api/users/premium/${userId}`,
      {
        method: "PUT",
      }
    );
    const result = await resp.json();
    console.log(result);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const deleteInactiveUsers = async () => {
  try {
    const resp = await fetch(
      `http://localhost:8080/api/users/inactive/delete`,
      {
        method: "DELETE",
      }
    );
    const result = await resp.json();
    console.log(result);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
