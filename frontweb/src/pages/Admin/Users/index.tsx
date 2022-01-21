import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/requests';

const Users = () => {
  const [page, setPage] = useState<SpringPage<User>>();

  useEffect(() => {
    const request: AxiosRequestConfig = {
      url: '/users',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(request).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div>
      {page?.content.map((item) => (
        <p key={item.id}>{item.email}</p>
      ))}
    </div>
  );
};

export default Users;
