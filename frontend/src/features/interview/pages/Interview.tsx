//import { dummyReport } from "../services/dummyData";
import { Interview } from "../components/interview/Interview";
import { useInterview } from "../hooks/useInterview";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function InterviewPage() {
  const { report, loading } = useInterview();

  if (loading) {
    return (
      <Loader />
    )
  }

  if (!report) {
    return <Error />
  }

  return <Interview report={report} />;
}