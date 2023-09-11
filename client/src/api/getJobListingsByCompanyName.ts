import axios from 'axios';

export const getJobListingsByCompanyName = async (companyName: string) => {
  const fetchedJobListings = await axios.get(
    `http://localhost:5000/api/job-listings/${companyName}`
  );

  console.log(fetchedJobListings.data);
  return fetchedJobListings.data;
};
