import Changelog from "../(components)/changelog";

export default function Page() {
    return (
        <div className="flex items-center flex-col w-full">
            <h1 className="text-xl md:text-4xl font-medium pb-6">Changelog</h1>
            <p className="text-gray-800">This is a changelog for our customers and a product owner alike.</p>
            <div className="h-2"></div>
            <div className="bg-gray-400 text-gray-700 bg-opacity-10 backdrop-blur-lg rounded-xl py-0.5 px-2 inline-flex items-center space-x-1">
               Current version: 1.0.3
            </div>
            <div className="h-24"></div>
            <Changelog />
        </div>
    )
}