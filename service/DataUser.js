export const getDataUser = async (dataUser) => {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${dataUser.numberPhone}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error);
    return false;
  }

};

export const postDataUser = async (dataUser) => {
  try {
    const result = await fetch(`/api/user/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataUser),
    })
    return result.ok;
  } catch (error) {
    console.error(error);
    return false;
  }

};
