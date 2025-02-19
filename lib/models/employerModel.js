import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  companyDetails: {
    type: String,
    required: [true, 'Company details are required'],
    trim: true,
    maxlength: [1000, 'Company details cannot exceed 1000 characters']
  },
  industry: {
    type: String,
    required: [true, 'Industry is required'],
    trim: true
  },
  companySize: {
    type: String,
    required: [true, 'Company size is required'],
    enum: {
      values: ['1-10', '11-50', '51-200', '201-500', '501+'],
      message: 'Please select a valid company size'
    }
  },
  contactPersonName: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ]
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Create indexes for frequently queried fields
employerSchema.index({ status: 1 });
employerSchema.index({ companyName: 1 });
employerSchema.index({ contactEmail: 1 }, { unique: true });

const Employer = mongoose.models.Employer || mongoose.model('Employer', employerSchema);

export default Employer;
