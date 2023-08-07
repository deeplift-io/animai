import LogoutButton from "../../(auth)/components/logout-button";

export default function MainNav() {
  return (
    <nav className="absolute w-full py-4 inline-flex justify-between px-6">
      <div className="font-logo text-slate-950 text-2xl">animai</div>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
}
