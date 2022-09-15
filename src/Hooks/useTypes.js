import React, { useEffect, useState } from "react";


const useTypes = (user ) => {

    const [types, setTypes] = useState(false);
    const [typesLoading, setTypesLoading] = useState(true);
    useEffect(() => {
      const email = user?.email;
      if (email) {
        fetch(`https://local-bazar-server-site.onrender.com/users/${email}`, {
          method: "GET"
        })
          .then((res) => res.json())
          .then((data) => {
            setTypes(data.types);
            setTypesLoading(false);
          });
      }
    }, [user]);
    return [types, typesLoading];
  };

export default useTypes;
