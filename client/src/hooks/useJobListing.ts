import { getJobListingById } from '@/api/getJobListingById';
import { useQuery } from '@tanstack/react-query';

const useJobListing = (jobListingId: string) => {
  const { data, isLoading, isError, error } = useQuery<JobListing | null>({
    queryKey: ['jobListing', jobListingId],
    queryFn: () => getJobListingById(jobListingId),
  });

  return { data, isLoading, isError, error };
};

export default useJobListing;
