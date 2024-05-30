const config = {
  apiPath: 'http://localhost:3001',
  headers: () => {
    return {
      headers: {
        authorization: localStorage.getItem("token")
      }
    }
  }
}

export default config
