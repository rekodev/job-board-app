import { getAllJobListings } from '@/api/getAllJobListings';
import { useQuery } from '@tanstack/react-query';

const useJobListings = () => {
  const { data, isLoading, isError, error } = useQuery<JobListing[] | null>({
    queryKey: ['jobListings'],
    queryFn: getAllJobListings,
  });

  return { data, isLoading, isError, error };
};

export default useJobListings;
