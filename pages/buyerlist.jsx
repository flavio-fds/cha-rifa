import { useState } from "react";
import { getAllUser } from "../service/DataUser";
import { getStatusNumber } from "../service/NumberRaffle";

export default function buyerlist() {
const [ allUser, setAllUser] = useState([]);
const [ allNumber, setAllNumber] = useState([]);

const getAllDateDB = async () => {
  const userDate = await getAllUser();
  const numberDate = await getStatusNumber();

  setAllNumber(numberDate);
  setAllUser(userDate);
}

const formatDateDB = () => {
  return allUser.map( user => {
    const filterNumberUser = allNumber.filter( number => number.buyerId === user.numberPhone )
    const filterNumberObject = filterNumberUser.map(({number}) => number)
    return (<div><hr /><div key={user.numberPhone}>{`${user.name} - ${user.numberPhone} - ${filterNumberObject.toString()}`}</div></div>)
  })
}

  return (
    <div>
      <div onClick={getAllDateDB}>CHECK</div>
      <div>
        { (allUser.length > 0) && formatDateDB()}
      </div>
    </div>
  )
}
