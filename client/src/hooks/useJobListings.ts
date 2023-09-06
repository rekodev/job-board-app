import jobData from '@/api/jobs.json';
import { useQuery } from '@tanstack/react-query';

const fetchJobListings = async () => {
  return jobData;
};

const useJobListings = () => {
  const { data, isLoading, isError, error } = useQuery<JobListing[] | null>({
    queryKey: ['jobListings'],
    queryFn: fetchJobListings,
  });

  return { data, isLoading, isError, error };
};

export default useJobListings;
