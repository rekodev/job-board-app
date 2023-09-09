import mongoose, { Schema } from 'mongoose';

// 1. Declare an interface for a single job listing.
export interface IJobListing {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  jobType: string;
  applicationDeadline: string;
  salaryRange: string;
}

// 3. Create a Schema for the job.
export const jobListingSchema: Schema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String,
    required: true,
  },
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

export default JobListing;
