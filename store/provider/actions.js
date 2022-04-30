export async function load({ commit }, params = { status: 1 }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get("/api/v1/provider", {
        params: {
          ...params
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
