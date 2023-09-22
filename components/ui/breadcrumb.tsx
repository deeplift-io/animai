import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";

interface Page {
  name: string;
  href?: string;
  current: boolean;
}

export default function Breadcrumb({ pages }: { pages: Page[] | null }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <div className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              {pages[0]?.name}
            </div>
          </div>
        </li>
        <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              /> 
        {pages?.slice(1).map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
