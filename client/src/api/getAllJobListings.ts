import axios from 'axios';

export const getAllJobListings = async () => {
  const fetchedJobListings = await axios.get(
    'http://localhost:5000/api/job-listings'
  );

  return fetchedJobListings.data;
};
