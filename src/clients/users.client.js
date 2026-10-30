function createUsersClient(request) {
  return {
    getUser(userId) {
      return request.get(`/users/${userId}`);
    },

    getUsers() {
      return request.get("/users");
    },

    createUser(data) {
      return request.post("/users", { data });
    },

    updateUser(userId, data) {
      return request.put(`/users/${userId}`, { data });
    },

    patchUser(userId, data) {
      return request.patch(`/users/${userId}`, { data });
    },

    deleteUser(userId) {
      return request.delete(`/users/${userId}`);
    },
  };
}

module.exports = { createUsersClient };
