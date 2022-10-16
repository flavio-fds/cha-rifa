export const getDataUser = async (dataUser) => {
  try {
    const res = await fetch(`/api/user/${dataUser.numberPhone}`)
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

export const getAllUser = async () => {
  try {
    const res = await fetch('/api/allUser');
    const user = await res.json();
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }

}
