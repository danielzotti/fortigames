import { component$, useContext } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { Logout } from "~/components/auth/logout/logout";
import { AuthContext } from "~/routes/layout";

export default component$(() => {
  const auth = useContext(AuthContext);

  return (
    <MainLayout>
      <h1>Profile</h1>
      <h2>{auth.value?.user?.email}</h2>
      <Logout />
      <h3>ToDo</h3>
      <ul>
        <li>ALL:</li>
        <ul>
          <li>Avatar</li>
          <li>Name</li>
          <li>Link to convention's chat</li>
          <li>Logout button</li>
        </ul>

        <li>PARTICIPANT:</li>
        <ul>
          <li>Sports icons (+ board games icon?)</li>
          <li>Link to team's chat</li>
          <li>Link to team's page</li>
        </ul>

        <li>REFEREE:</li>
        <ul>
          <li>?</li>
        </ul>

        <li>ADMIN:</li>
        <ul>
          <li>Link to admin section</li>
        </ul>
      </ul>
    </MainLayout>
  );
});
