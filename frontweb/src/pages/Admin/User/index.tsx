import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../../../types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/requests';

const Users = () => {
   const [page, setPage] = useState<SpringPage<User>>();

   useEffect(() => {
      const config: AxiosRequestConfig = {
         method: 'GET',
         url: '/users',
         withCredentials: true,
         params: {
            page: 0,
            size: 12,
         },
      };

      requestBackend(config).then((response) => {
         setPage(response.data as SpringPage<User>);
      });
   }, []);

   return (
      <div>
         {page?.content.map((user) => (
            <p key={user.id}>{user.email}</p>
         ))}
      </div>
   );
};

export default Users;
