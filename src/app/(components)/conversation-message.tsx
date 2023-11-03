import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

const ConversationMessage = ({
    message,
    profile,
  }: {
    message: any;
    profile: any;
  }) => {
    return (
      <div id="conversation" className="group w-full border-0 border-gray-200 transition-all">
        <div className="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
          <div
            className={`${
              message.role === "user" ? "md:flex-row-reverse" : "md:flex-row"
            } flex flex-1 flex-col gap-4 text-base mx-auto md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl`}
          >
            <div className="flex-shrink-0 relative items-start md:items-end">
              <div className="w-full">
                <div
                  className={`flex flex-row sticky top-0 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "user" ? (

                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-200 to-lime-200 border border-emerald-200" />
                  ) : (
                    <div className="w-8 h-8">
                    <Avatar>
                      <AvatarFallback name={message.name} />
                      <AvatarImage src="/logo/Favicon.svg" />
                    </Avatar>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative flex flex-col gap-1">
              <div className="flex flex-grow flex-col gap-3 max-w-full">
                <div
                  className={`min-h-[20px] flex flex-col gap-3 overflow-x-auto whitespace-pre-wrap break-words w-full text-sm`}
                >
                  <div
                    className={`${
                      message.role === "user" ? "text-left self-end p-2 rounded-xl bg-white bg-opacity-40 backdrop-blur-lg max-w-xs" : "text-left"
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ConversationMessage;