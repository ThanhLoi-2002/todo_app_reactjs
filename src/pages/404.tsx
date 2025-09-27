import { MailWarning } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 h-screen justify-center items-center">
      <MailWarning />
      <h2 className="font-bold text-lg">Page not found</h2>
      {/* <IvymodaButton
        color="black"
        onClick={() => navigate('/')}
        title="Back"
        buttonSize="w-1/2 h-[45px]"
      /> */}
    </div>
  );
};

export default NotFoundPage;
