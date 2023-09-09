import mongoose, { Schema, Document } from 'mongoose';
import { IJobListing, jobListingSchema } from './jobListing.model';

// 2. Declare an interface representing a document in MongoDB that contains an array of job listings.
export interface IJobListings extends Document {
  jobs: IJobListing[];
}

// 4. Create a Schema corresponding to the document interface.
const jobListingsSchema: Schema = new Schema({
  jobs: {
    type: [jobListingSchema],
    required: true,
  },
});

// 5. Create a Model.
const JobListings = mongoose.model<IJobListings>(
  'JobListings',
  jobListingsSchema
);

export default JobListings;
