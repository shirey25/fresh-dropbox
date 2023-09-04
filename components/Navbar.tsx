import LemonIcon from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lemon-2.tsx";

interface NavbarProps {
  loggedIn: boolean;
}


export function Navbar({ loggedIn }: NavbarProps) {
  const menus = [
    {name: "Home", href: "/"},
  ];

  const loggedInMenus = [
    {name: "secret", href: "/auth/secret"},
     {name: "logout", href: "/logout"},
  ];
  const nonLoggedInMenu = [
    {name: "Login", href: "/login"},
    {name: "Signup", href: "/signup"}
  ]

  return (
    <div class="bg-black max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="text-2xl  ml-1 font-bold">
        Fresh
      </div>
      <ul class="flex gap-6">
        {menus.map((menu) => (
          <li>
            <a
              href={menu.href}
              class="text-gray-500 hover:text-gray-700 py-1 border-gray-500"
            >
              {menu.name}
            </a>
          </li>
        ))}

        {
          loggedIn ? (
            loggedInMenus.map((menu) => (
              <li>
                <a
                  href={menu.href}
                  class="text-gray-500 hover:text-gray-700 py-1 border-gray-500"
                >
                  {menu.name}
                </a>
              </li>
            ))
          ) : (
            nonLoggedInMenu.map((menu) => (
              <li>
                <a
                  href={menu.href}
                  class="text-gray-500 hover:text-gray-700 py-1 border-gray-500"
                >
                  {menu.name}
                </a>
              </li>
            ))
          )
        }
      </ul>
    </div>
  );
}