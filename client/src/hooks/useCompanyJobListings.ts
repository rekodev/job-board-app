import { getJobListingsByCompanyName } from '@/api/getJobListingsByCompanyName';
import { useQuery } from '@tanstack/react-query';

const useJobListingsByCompanyName = (companyName: string) => {
  const { data, isLoading, isError, error } = useQuery<JobListing[] | null>({
    queryKey: ['jobListingsByCompanyName', companyName],
    queryFn: () => getJobListingsByCompanyName(companyName),
  });

  return { data, isLoading, isError, error };
};

export default useJobListingsByCompanyName;
