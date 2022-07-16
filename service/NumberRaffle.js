export const getNumberBuyerUser = async (dataUser) => {
  try {
    const res = await fetch(`/api/number/${dataUser.numberPhone}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error);
    return false;
  }

};

export const postNumberBuyerUser = async (numbersBuyer) => {
  try {
    const result = await fetch(`/api/number/number`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(numbersBuyer),
    })
    return result.ok;
  } catch (error) {
    console.error(error);
    return false;
  }

};

export const getStatusNumber = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/allNumbers');
    const numbers = await res.json();
    return numbers;
  } catch (error) {
    console.error(error);
    return false;
  }

}
