'use client';

import { useCallback, useEffect, useState } from 'react';
import { trpc } from './trpc';

export default function Clientside() {
  const [users, setUsers] = useState<any[]>([]);
  const [username, setUsername] = useState('');

  const fetchUsers = useCallback(async () => {
    const res = await trpc.getAllUsers.query();
    setUsers(res);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async () => {
    await trpc.createUser.mutate({ username });
    await fetchUsers();
  };

  return (
    <div style={{ margin: 10 }}>
      <input
        type="text" onChange={e => setUsername(e.currentTarget.value)} value={username} style={{ backgroundColor: "gray" }} />
      <button onClick={handleCreateUser}>Create a user</button>
      {users.map(u => <div key={u.id}>{u.username}</div>)}
    </div>
  );
}
