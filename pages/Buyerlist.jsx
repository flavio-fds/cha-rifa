import React, { useState } from 'react';
import { getAllUser } from "../service/DataUser";
import { getStatusNumber } from "../service/NumberRaffle";

export default function Buyerlist() {
  const [allUser, setAllUser] = useState([]);
  const [allNumber, setAllNumber] = useState([]);

  const getAllDateDB = async () => {
    const userDate = await getAllUser();
    const numberDate = await getStatusNumber();

    setAllNumber(numberDate);
    setAllUser(userDate);
  }

  const arrayObject = () => {
    return allUser.map(user => {
      const filterNumberUser = allNumber.filter(number => number.buyerId === user.numberPhone);
      const filterNumberObject = filterNumberUser.map(({ number }) => number);
      const filterstatusObject = filterNumberUser.map(({ status }) => status);
      // const filterNumberAndStatusObject = filterNumberUser.map(({ number, status }) => ({ number, status }));

      return { ...user, buyerId: filterNumberObject, status: filterstatusObject }
    })
  }

  const formatDateDB = () => {
    const dataUserDetails = arrayObject().sort((a,b) => (a.status[0] > b.status[0]) ? 1 : ((b.status[0] > a.status[0]) ? -1 : 0));

    return dataUserDetails.map(user => (
      <div key={user.numberPhone}>
        <hr />
        <div className={`status${user.status[0]}`}>{`${user.name} - ${user.numberPhone} - ${user.buyerId
} - ${user.status
}`}</div>
      </div>
    ))
  }

  return (
    <div>
      <div onClick={getAllDateDB}>{`CHECK ${allNumber.length || ''}`}</div>
      <div>
        {(allUser.length > 0) && formatDateDB()}
      </div>
    </div>
  )
}
