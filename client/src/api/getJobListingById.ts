import axios from 'axios';

export const getJobListingById = async (listingId: string) => {
  const fetchedJobListing = await axios.get(
    `http://localhost:5000/api/job-listing/${listingId}`
  );

  return fetchedJobListing.data;
};
