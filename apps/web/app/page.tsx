import Clientside from "./Clientside";
import { trpc } from "./trpc";

export default async function Home() {
  const response = await trpc.getAllUsers.query();
  console.log(response)
  return (
    <div>
      {response.map(u => <div key={u.id}>{u.username}</div>)}
      <Clientside />
    </div>
  );
}
