import jobData from '@/api/jobs.json';
import { useQuery } from '@tanstack/react-query';

const useJobListing = (jobListingId: number) => {
  const fetchJobListing = async () => {
    return jobData[jobListingId - 1];
  };

  const { data, isLoading, isError, error } = useQuery<JobListing | null>({
    queryKey: ['jobListing', jobListingId],
    queryFn: fetchJobListing,
  });

  return { data, isLoading, isError, error };
};

export default useJobListing;
